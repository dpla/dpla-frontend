// DepictAssist — client-side application logic
// Adds P180 (depicts) structured data claims to Wikimedia Commons images
// contributed by DPLA institutions.

(function () {
  'use strict';

  // ── Constants ────────────────────────────────────────────
  const INSTITUTIONS_URL =
    'https://raw.githubusercontent.com/dpla/ingestion3/main/src/main/resources/wiki/institutions_v2.json';
  const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
  const RECONCILIATION_API = 'https://wikidata.reconci.link/en/api';
  const OAUTH_BASE = '/api/wikimedia/oauth';
  const TOKEN_COOKIE = 'wm_access_token';
  const MAX_SUGGESTIONS = 6;

  // ── State ────────────────────────────────────────────────
  let queue = [];           // { mid, prop, qid, label, filename }[]
  let pendingQid = null;    // QID from URL, awaiting institution load
  let accessToken = null;
  let fetchingImages = false;
  let submittingBatch = false;
  let initialized = false;

  // ── DOM refs (populated in init) ─────────────────────────
  let $select, $findBtn, $imageArea, $loading, $imageDisplay,
      $noImages, $batch, $queueList, $batchBtn, $batchLoginMsg,
      $results, $diffLinks, $loginBtn, $userInfo, $username,
      $logoutBtn, $imageTitle, $imageDescription, $imageImg,
      $imageLink, $commonsLink, $subjectHeading, $tagSuggestions,
      $skipBtn;

  // ── Entry point ──────────────────────────────────────────
  window.initDepictAssist = function () {
    // Prevent double initialization (script load + onReady race)
    if (initialized) return;
    initialized = true;

    cacheDom();
    bindEvents();
    loadAuth();
    loadInstitutions();
    restoreFromUrl();
  };

  // If the script loads after the page component has already called onReady,
  // initDepictAssist won't have been available yet. Run it now.
  if (document.querySelector('.depictassist-wrapper')) {
    window.initDepictAssist();
  }

  // ── DOM cache ────────────────────────────────────────────
  function cacheDom() {
    $select          = document.getElementById('da-institution-select');
    $findBtn         = document.getElementById('da-find-btn');
    $imageArea       = document.getElementById('da-image-area');
    $loading         = document.getElementById('da-loading');
    $imageDisplay    = document.getElementById('da-image-display');
    $noImages        = document.getElementById('da-no-images');
    $batch           = document.getElementById('da-batch');
    $queueList       = document.getElementById('da-queue-list');
    $batchBtn        = document.getElementById('da-batch-btn');
    $batchLoginMsg   = document.getElementById('da-batch-login-msg');
    $results         = document.getElementById('da-results');
    $diffLinks       = document.getElementById('da-diff-links');
    $loginBtn        = document.getElementById('da-login-btn');
    $userInfo        = document.getElementById('da-user-info');
    $username        = document.getElementById('da-username');
    $logoutBtn       = document.getElementById('da-logout-btn');
    $imageTitle      = document.getElementById('da-image-title');
    $imageDescription = document.getElementById('da-image-description');
    $imageImg        = document.getElementById('da-image-img');
    $imageLink       = document.getElementById('da-image-link');
    $commonsLink     = document.getElementById('da-image-commons-link');
    $subjectHeading  = document.getElementById('da-subject-heading');
    $tagSuggestions  = document.getElementById('da-tag-suggestions');
    $skipBtn         = document.getElementById('da-skip-btn');
  }

  function bindEvents() {
    $findBtn.addEventListener('click', onFindImages);
    $skipBtn.addEventListener('click', onFindImages);
    $batchBtn.addEventListener('click', onSubmitBatch);
    $loginBtn.addEventListener('click', onLogin);
    $logoutBtn.addEventListener('click', onLogout);
  }

  // ── URL state ────────────────────────────────────────────
  function restoreFromUrl() {
    const qid = new URLSearchParams(window.location.search).get('id');
    if (qid) pendingQid = qid;
  }

  function selectInstitutionByQid(qid) {
    for (const opt of $select.options) {
      if (opt.value === qid) {
        $select.value = qid;
        onFindImages();
        return;
      }
    }
  }

  function updateUrl(qid) {
    const url = new URL(window.location.href);
    if (qid) {
      url.searchParams.set('id', qid);
    } else {
      url.searchParams.delete('id');
    }
    window.history.replaceState({}, '', url);
  }

  // ── Institution loading ──────────────────────────────────
  async function loadInstitutions() {
    try {
      const resp = await fetch(INSTITUTIONS_URL);
      if (!resp.ok) throw new Error('Failed to fetch institutions');
      const data = await resp.json();

      populateDropdown(data);
      $select.disabled = false;
      $findBtn.disabled = false;

      if (pendingQid) {
        selectInstitutionByQid(pendingQid);
        pendingQid = null;
      }
    } catch (err) {
      console.error('DepictAssist: failed to load institutions', err);
      $select.innerHTML = '<option value="">Failed to load institutions</option>';
    }
  }

  function populateDropdown(data) {
    $select.innerHTML = '<option value="">Select an institution...</option>';
    const hubs = Object.keys(data).sort();

    for (const hub of hubs) {
      const hubData = data[hub];
      if (!hubData.institutions) continue;

      const validInsts = Object.entries(hubData.institutions)
        .filter(([, inst]) => inst.upload && inst.Wikidata)
        .sort(([a], [b]) => a.localeCompare(b));

      if (validInsts.length === 0) continue;

      const group = document.createElement('optgroup');
      group.label = hub;

      for (const [name, inst] of validInsts) {
        const opt = document.createElement('option');
        opt.value = inst.Wikidata;
        opt.textContent = name;
        group.appendChild(opt);
      }

      $select.appendChild(group);
    }
  }

  // ── Image fetching (replaces Anvil suggest()) ────────────
  async function onFindImages() {
    const qid = $select.value;
    if (!qid || fetchingImages) return;

    fetchingImages = true;
    $findBtn.disabled = true;
    $skipBtn.disabled = true;
    updateUrl(qid);
    showLoading();

    try {
      // Step 1: Get total hits to pick a random offset
      const totalUrl = buildSearchUrl(qid, 0, 0);
      const totalResp = await fetch(totalUrl);
      if (!totalResp.ok) throw new Error('Commons search failed');
      const totalData = await totalResp.json();

      const totalHits = totalData.query?.searchinfo?.totalhits ?? 0;

      if (totalHits === 0) {
        showNoImages();
        return;
      }

      // Step 2: Fetch a random image (with iiurlwidth=800 to avoid a separate image info call)
      const cap = Math.min(totalHits, 10000);
      const offset = Math.floor(Math.random() * cap);
      const searchUrl = buildSearchUrl(qid, offset, 1);
      const searchResp = await fetch(searchUrl);
      if (!searchResp.ok) throw new Error('Commons search failed');
      const searchData = await searchResp.json();

      const pages = searchData.query?.pages;
      if (!pages) { showNoImages(); return; }

      const pageId = Object.keys(pages)[0];
      if (!pageId || pageId === '-1') { showNoImages(); return; }

      const page = pages[pageId];
      const mid = 'M' + pageId;
      const pageTitle = page.title || '';

      // Extract image URL from the search response (avoids a separate imageinfo call)
      const imgUrl = page.imageinfo?.[0]?.thumburl ||
                     page.imageinfo?.[0]?.url || '';

      // Step 3: Fetch entity data and reconciliation in parallel
      const entityUrl = 'https://commons.wikimedia.org/wiki/Special:EntityData/' + mid + '.json';
      const entityResp = await fetch(entityUrl);
      if (!entityResp.ok) throw new Error('Entity data fetch failed');
      const entityData = await entityResp.json();
      const entity = entityData.entities?.[mid];
      if (!entity) { showNoImages(); return; }

      const stmts = entity.statements || {};
      const titleText = stmts.P1476?.[0]?.mainsnak?.datavalue?.value?.text || pageTitle;
      const descText = stmts.P10358?.[0]?.mainsnak?.datavalue?.value?.text || '';
      const subjects = stmts.P4272 || [];

      // Fetch tag suggestions from reconciliation API
      let tagSuggestions = [];
      let subjectName = '(no subject)';

      if (subjects.length > 0) {
        subjectName = subjects[0].mainsnak?.datavalue?.value || '';
        const narrow = subjectName.replace(/^.*--\s*/, '');

        const reconUrl = RECONCILIATION_API + '?queries=' +
          encodeURIComponent(JSON.stringify({ q1: { query: narrow } }));
        const reconResp = await fetch(reconUrl);
        if (reconResp.ok) {
          const reconData = await reconResp.json();
          const results = reconData.q1?.result || [];
          tagSuggestions = results.slice(0, MAX_SUGGESTIONS).map(r => ({
            qid: r.id,
            label: r.name || '',
            description: r.description || ''
          }));
        }
      }

      displayImage({
        mid, imgUrl, title: titleText, filename: pageTitle,
        description: descText, subjectName, tagSuggestions
      });
    } catch (err) {
      console.error('DepictAssist: error fetching image', err);
      showNoImages();
    } finally {
      fetchingImages = false;
      $findBtn.disabled = false;
      $skipBtn.disabled = false;
    }
  }

  function buildSearchUrl(qid, offset, limit) {
    const search = [
      'filetype:bitmap|drawing',
      '-fileres:0',
      'haswbstatement:P9126=' + qid,
      'haswbstatement:P4272',
      '-haswbstatement:P180'
    ].join(' ');

    return COMMONS_API +
      '?action=query&format=json&origin=*' +
      '&generator=search' +
      '&gsrsearch=' + encodeURIComponent(search) +
      '&gsrlimit=' + limit +
      '&gsroffset=' + offset +
      '&gsrinfo=totalhits' +
      '&gsrnamespace=6' +
      '&prop=info|imageinfo' +
      '&iiprop=url|size|mime' +
      '&iiurlwidth=800';
  }

  // ── Display ──────────────────────────────────────────────
  function showLoading() {
    $imageArea.style.display = 'block';
    $loading.style.display = 'block';
    $imageDisplay.style.display = 'none';
    $noImages.style.display = 'none';
    $results.style.display = 'none';
  }

  function showNoImages() {
    $loading.style.display = 'none';
    $imageDisplay.style.display = 'none';
    $noImages.style.display = 'block';
  }

  function displayImage({ mid, imgUrl, title, filename, description, subjectName, tagSuggestions }) {
    $loading.style.display = 'none';
    $noImages.style.display = 'none';
    $imageDisplay.style.display = 'block';

    $imageTitle.textContent = title;
    $imageDescription.textContent = description || '(No description provided)';
    $imageImg.src = imgUrl;
    $imageLink.href = imgUrl;

    const commonsUrl = 'https://commons.wikimedia.org/wiki/Special:EntityData/' + mid;
    $commonsLink.href = commonsUrl;
    $commonsLink.textContent = filename;

    $subjectHeading.textContent = 'Subject: \u201c' + subjectName + '\u201d';

    // Render tag chips
    $tagSuggestions.replaceChildren();
    if (tagSuggestions.length === 0) {
      const hint = document.createElement('p');
      hint.className = 'da-hint';
      hint.textContent = 'No tag suggestions available for this subject.';
      $tagSuggestions.appendChild(hint);
      return;
    }

    for (const tag of tagSuggestions) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'da-tag-chip';
      chip.setAttribute('aria-label', 'Add depicts tag: ' + tag.label);

      const labelSpan = document.createElement('span');
      labelSpan.textContent = tag.label;
      chip.appendChild(labelSpan);

      if (tag.description) {
        const descSpan = document.createElement('span');
        descSpan.className = 'da-tag-description';
        descSpan.textContent = tag.description;
        chip.appendChild(descSpan);
      }

      chip.addEventListener('click', function () {
        addToQueue(mid, 'P180', tag.qid, tag.label, filename);
        chip.classList.add('da-tag-selected');
        chip.disabled = true;
        onFindImages();
      });

      $tagSuggestions.appendChild(chip);
    }
  }

  // ── Queue management ─────────────────────────────────────
  function addToQueue(mid, prop, qid, label, filename) {
    if (queue.some(item => item.mid === mid && item.prop === prop && item.qid === qid)) {
      return;
    }
    queue.push({ mid, prop, qid, label, filename });
    renderQueue();
  }

  function renderQueue() {
    if (queue.length === 0) {
      $batch.style.display = 'none';
      return;
    }

    $batch.style.display = 'flex';
    $queueList.replaceChildren();

    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      const li = document.createElement('li');

      const strong = document.createElement('strong');
      strong.textContent = item.label;
      li.appendChild(strong);
      li.appendChild(document.createTextNode(
        ' (' + item.qid + ') \u2192 ' + item.filename + ' (' + item.mid + ') '
      ));

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'da-btn da-btn-sm';
      removeBtn.setAttribute('aria-label', 'Remove ' + item.label + ' from queue');
      removeBtn.textContent = '\u2715';
      removeBtn.addEventListener('click', function () {
        queue.splice(i, 1);
        renderQueue();
      });
      li.appendChild(removeBtn);

      $queueList.appendChild(li);
    }

    updateBatchButton();
  }

  function updateBatchButton() {
    if (accessToken) {
      $batchBtn.disabled = false;
      $batchLoginMsg.style.display = 'none';
    } else {
      $batchBtn.disabled = true;
      $batchLoginMsg.style.display = 'block';
    }
  }

  // ── Auth ─────────────────────────────────────────────────
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  async function loadAuth() {
    const token = getCookie(TOKEN_COOKIE);
    if (!token) {
      showLoggedOut();
      return;
    }

    try {
      const resp = await fetch(OAUTH_BASE + '?action=whoami');
      if (!resp.ok) throw new Error('Auth check failed');
      const data = await resp.json();

      if (data.username) {
        accessToken = token;
        showLoggedIn(data.username);
      } else {
        showLoggedOut();
      }
    } catch {
      showLoggedOut();
    }
  }

  function showLoggedIn(username) {
    $loginBtn.style.display = 'none';
    $userInfo.style.display = 'inline';
    $username.textContent = username;
    updateBatchButton();
  }

  function showLoggedOut() {
    accessToken = null;
    $loginBtn.style.display = 'inline-block';
    $userInfo.style.display = 'none';
    updateBatchButton();
  }

  function onLogin() {
    window.location.href = OAUTH_BASE + '?action=login';
  }

  async function onLogout() {
    try {
      await fetch(OAUTH_BASE + '?action=logout');
    } catch { /* ignore */ }
    document.cookie = TOKEN_COOKIE + '=; Max-Age=0; path=/; SameSite=Strict; Secure';
    showLoggedOut();
  }

  // ── Batch submit (Commons writes) ────────────────────────
  async function onSubmitBatch() {
    if (!accessToken || queue.length === 0 || submittingBatch) return;

    submittingBatch = true;
    $batchBtn.disabled = true;
    $batchBtn.textContent = 'Submitting...';

    try {
      const currentOrigin = window.location.origin;

      // Get CSRF token
      const tokenResp = await fetch(
        COMMONS_API + '?action=query&meta=tokens&format=json&origin=' + encodeURIComponent(currentOrigin),
        { headers: { 'Authorization': 'Bearer ' + accessToken } }
      );
      if (!tokenResp.ok) throw new Error('Failed to get CSRF token');
      const tokenData = await tokenResp.json();
      const csrfToken = tokenData.query?.tokens?.csrftoken;

      if (!csrfToken || csrfToken === '+\\') {
        throw new Error('Failed to obtain CSRF token. Please log in again.');
      }

      // Group claims by MID so multiple depicts on the same entity use one API call
      const byMid = new Map();
      for (const item of queue) {
        if (!byMid.has(item.mid)) byMid.set(item.mid, []);
        byMid.get(item.mid).push(item);
      }

      const diffs = [];
      const succeededMids = new Set();
      for (const [mid, items] of byMid) {
        const claims = items.map(item => ({
          mainsnak: {
            snaktype: 'value',
            property: item.prop,
            datavalue: {
              value: {
                'entity-type': 'item',
                'numeric-id': parseInt(item.qid.replace('Q', ''), 10),
                id: item.qid
              },
              type: 'wikibase-entityid'
            },
            datatype: 'wikibase-item'
          },
          type: 'statement',
          rank: 'normal',
          references: [{
            snaks: {
              P887: [{
                snaktype: 'value',
                property: 'P887',
                datavalue: {
                  value: { 'entity-type': 'item', 'numeric-id': 114065533 },
                  type: 'wikibase-entityid'
                }
              }]
            }
          }]
        }));

        const body = new URLSearchParams({
          action: 'wbeditentity',
          format: 'json',
          id: mid,
          data: JSON.stringify({ claims }),
          token: csrfToken,
          summary: 'Added depicts (P180) claim via DepictAssist (DPLA) \u2014 https://pro.dp.la/projects/dpla-wikimedia/depictassist'
        });

        const editResp = await fetch(COMMONS_API + '?origin=' + encodeURIComponent(currentOrigin), {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + accessToken },
          body: body
        });
        if (!editResp.ok) {
          console.error('DepictAssist: edit request failed', editResp.status);
          continue;
        }
        const editData = await editResp.json();

        if (editData.entity?.lastrevid) {
          diffs.push({ id: editData.entity.id, revid: editData.entity.lastrevid });
          succeededMids.add(mid);
        } else if (editData.error) {
          console.error('DepictAssist: edit error', editData.error);
        }
      }

      if (diffs.length > 0) {
        $diffLinks.innerHTML = '';
        for (const d of diffs) {
          const a = document.createElement('a');
          a.href = 'https://commons.wikimedia.org/w/index.php?diff=' + d.revid;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = d.id;
          $diffLinks.appendChild(a);
          $diffLinks.appendChild(document.createTextNode(' '));
        }
        $results.style.display = 'block';
      }

      queue = queue.filter(item => !succeededMids.has(item.mid));
      renderQueue();
    } catch (err) {
      console.error('DepictAssist: batch submit error', err);
      alert('Error submitting edits: ' + err.message);
    } finally {
      submittingBatch = false;
      $batchBtn.textContent = 'Submit batch';
      updateBatchButton();
    }
  }

})();
