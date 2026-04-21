(function () {
  'use strict';

  // ── Constants ────────────────────────────────────────────
  const INSTITUTIONS_URL =
    'https://raw.githubusercontent.com/dpla/ingestion3/main/src/main/resources/wiki/institutions_v2.json';
  const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
  const COMMONS_PROXY = '/api/wikimedia/commons';
  const RECONCILIATION_API = 'https://wikidata.reconci.link/en/api';
  const OAUTH_BASE = '/api/wikimedia/oauth';
  const MAX_SUGGESTIONS = 6;
  // Wikidata item for "based on heuristic" — used as reference (P887) on depicts claims
  const BASED_ON_HEURISTIC_QID = 114065533;

  // ── State ────────────────────────────────────────────────
  let queue = [];           // { mid, prop, qid, label, filename, subjectTerm, dplaUrl }[]
  let currentMid = null;    // MID of the image currently displayed
  let pendingQid = null;    // QID from URL, awaiting institution load
  let isAuthenticated = false;
  let fetchingImages = false;
  let submittingBatch = false;

  // ── DOM refs (populated in init) ─────────────────────────
  let $select, $findBtn, $imageArea, $loading, $imageDisplay,
      $noImages, $fetchError, $batch, $queueList, $batchBtn,
      $batchLoginMsg, $results, $diffLinks, $batchError, $batchErrorMsg,
      $loginBtn, $userInfo,
      $username, $logoutBtn, $imageTitle, $imageDescription,
      $imageImg, $imageLink, $commonsLink, $subjectHeading,
      $tagSuggestions, $skipBtn;

  // Track the wrapper element we've initialized on, so we can detect
  // SPA re-navigation (new DOM nodes) vs. duplicate calls on the same mount.
  let boundWrapper = null;

  // ── Entry point ──────────────────────────────────────────
  window.initDepictAssist = function () {
    const wrapper = document.querySelector('.depictassist-wrapper');
    if (!wrapper) return;

    // Same mount — skip (prevents script-load + onReady double-fire)
    if (wrapper === boundWrapper) return;

    boundWrapper = wrapper;
    queue = [];
    currentMid = null;
    isAuthenticated = false;
    fetchingImages = false;
    submittingBatch = false;

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
    $fetchError      = document.getElementById('da-fetch-error');
    $batch           = document.getElementById('da-batch');
    $queueList       = document.getElementById('da-queue-list');
    $batchBtn        = document.getElementById('da-batch-btn');
    $batchLoginMsg   = document.getElementById('da-batch-login-msg');
    $results         = document.getElementById('da-results');
    $diffLinks       = document.getElementById('da-diff-links');
    $batchError      = document.getElementById('da-batch-error');
    $batchErrorMsg   = document.getElementById('da-batch-error-msg');
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
    currentMid = null;
    $findBtn.disabled = true;
    $skipBtn.blur();
    $skipBtn.disabled = true;
    updateUrl(qid);
    showImageState('loading');
    $imageArea.scrollIntoView({ block: 'start' });

    try {
      // Step 1: Get total hits to pick a random offset (once per button press)
      const totalUrl = buildSearchUrl(qid, 0, 0);
      const totalResp = await fetch(totalUrl);
      if (!totalResp.ok) throw new Error('Commons search failed');
      const totalData = await totalResp.json();

      const totalHits = totalData.query?.searchinfo?.totalhits ?? 0;

      if (totalHits === 0) {
        showImageState('empty');
        return;
      }

      const cap = Math.min(totalHits, 10000);
      let reconTimeouts = 0;
      let attempts = 0;
      const maxAttempts = 10;

      while (true) {
        if (++attempts > maxAttempts) throw new Error('Unable to find a valid image after multiple attempts');
        // Step 2: Fetch a random image (with iiurlwidth=800 to avoid a separate image info call)
        const offset = Math.floor(Math.random() * cap);
        const searchUrl = buildSearchUrl(qid, offset, 1);
        const searchResp = await fetch(searchUrl);
        if (!searchResp.ok) throw new Error('Commons search failed');
        const searchData = await searchResp.json();

        const pages = searchData.query?.pages;
        if (!pages) { showImageState('empty'); return; }

        const pageId = Object.keys(pages)[0];
        if (!pageId || pageId === '-1') { showImageState('empty'); return; }

        const page = pages[pageId];
        const mid = 'M' + pageId;
        const pageTitle = page.title || '';

        // Extract image URL from the search response (avoids a separate imageinfo call)
        const imgUrl = page.imageinfo?.[0]?.thumburl ||
                       page.imageinfo?.[0]?.url || '';

        // Step 3: Fetch entity data
        const entityUrl = 'https://commons.wikimedia.org/wiki/Special:EntityData/' + mid + '.json';
        const entityResp = await fetch(entityUrl);
        if (!entityResp.ok) throw new Error('Entity data fetch failed');
        const entityData = await entityResp.json();
        const entity = entityData.entities?.[mid];
        if (!entity) { showImageState('empty'); return; }

        const stmts = entity.statements || {};
        const titleText = stmts.P1476?.[0]?.mainsnak?.datavalue?.value?.text || pageTitle;
        const descText = stmts.P10358?.[0]?.mainsnak?.datavalue?.value?.text || '';
        const subjects = stmts.P4272 || [];
        const dplaId = stmts.P760?.[0]?.mainsnak?.datavalue?.value;
        const dplaUrl = dplaId ? 'https://dp.la/item/' + dplaId : null;

        // Step 4: Fetch tag suggestions — 8s timeout; on timeout try a different image,
        // but give up and show an error after 3 consecutive timeouts (API is down)
        let tagSuggestions = [];
        let subjectName = '(no subject)';
        let reconTimedOut = false;

        if (subjects.length > 0) {
          subjectName = subjects[0].mainsnak?.datavalue?.value || '';
          const narrow = subjectName.replace(/^.*--\s*/, '');
          const reconUrl = RECONCILIATION_API + '?queries=' +
            encodeURIComponent(JSON.stringify({ q1: { query: narrow } }));
          try {
            const reconSignal = typeof AbortSignal.timeout === 'function'
              ? AbortSignal.timeout(8000)
              : (() => { const c = new AbortController(); setTimeout(() => c.abort(), 8000); return c.signal; })();
            const reconResp = await fetch(reconUrl, { signal: reconSignal });
            if (reconResp.ok) {
              const reconData = await reconResp.json();
              const results = reconData.q1?.result || [];
              tagSuggestions = results.slice(0, MAX_SUGGESTIONS).map(r => ({
                qid: r.id,
                label: r.name || '',
                description: r.description || ''
              }));
            }
          } catch (reconErr) {
            if (reconErr.name === 'TimeoutError' || reconErr.name === 'AbortError') {
              reconTimedOut = true;
            } else {
              throw reconErr;
            }
          }
        }

        if (reconTimedOut) {
          reconTimeouts++;
          if (reconTimeouts >= 3) throw new Error('Reconciliation API unavailable');
          continue;
        }

        displayImage({
          mid, imgUrl, title: titleText, filename: pageTitle,
          description: descText, subjectName, dplaUrl, tagSuggestions
        });
        break;
      }
    } catch (err) {
      console.error('DepictAssist: error fetching image', err);
      showImageState('error');
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
  function showImageState(state) {
    $imageArea.style.display = 'block';
    $loading.style.display = state === 'loading' ? 'block' : 'none';
    $imageDisplay.style.display = state === 'image' ? 'block' : 'none';
    $noImages.style.display = state === 'empty' ? 'block' : 'none';
    $fetchError.style.display = state === 'error' ? 'block' : 'none';
    $results.style.display = 'none';
  }

  function displayImage({ mid, imgUrl, title, filename, description, subjectName, dplaUrl, tagSuggestions }) {
    currentMid = mid;
    updateSkipButton();
    showImageState('image');

    $imageTitle.textContent = title;
    $imageDescription.textContent = description || '(No description provided)';
    $imageImg.src = imgUrl;
    $imageLink.href = imgUrl;

    $commonsLink.href = 'https://commons.wikimedia.org/wiki/' + encodeURIComponent(filename);
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
      chip.dataset.mid = mid;
      chip.dataset.qid = tag.qid;

      const labelSpan = document.createElement('span');
      labelSpan.textContent = tag.label;
      chip.appendChild(labelSpan);

      if (tag.description) {
        const descSpan = document.createElement('span');
        descSpan.className = 'da-tag-description';
        descSpan.textContent = tag.description;
        chip.appendChild(descSpan);
      }

      const qidSpan = document.createElement('span');
      qidSpan.className = 'da-tag-qid';
      qidSpan.textContent = tag.qid;
      chip.appendChild(qidSpan);

      const removeSpan = document.createElement('span');
      removeSpan.className = 'da-tag-remove';
      removeSpan.setAttribute('aria-hidden', 'true');
      removeSpan.textContent = '\u00d7';
      chip.appendChild(removeSpan);

      chip.addEventListener('click', function () {
        if (submittingBatch) return;
        if (chip.classList.contains('da-tag-selected')) {
          const idx = queue.findIndex(item => item.mid === mid && item.prop === 'P180' && item.qid === tag.qid);
          if (idx !== -1) queue.splice(idx, 1);
          chip.classList.remove('da-tag-selected');
          chip.setAttribute('aria-label', 'Add depicts tag: ' + tag.label);
          renderQueue();
        } else {
          addToQueue(mid, 'P180', tag.qid, tag.label, filename, subjectName, dplaUrl);
          chip.classList.add('da-tag-selected');
          chip.setAttribute('aria-label', 'Remove depicts tag: ' + tag.label);
        }
      });

      $tagSuggestions.appendChild(chip);
    }
  }

  // ── Queue management ─────────────────────────────────────
  function addToQueue(mid, prop, qid, label, filename, subjectTerm, dplaUrl) {
    if (queue.some(item => item.mid === mid && item.prop === prop && item.qid === qid)) {
      return;
    }
    queue.push({ mid, prop, qid, label, filename, subjectTerm, dplaUrl });
    renderQueue();
  }

  function renderQueue() {
    if (queue.length === 0) {
      $batch.style.display = 'none';
      updateSkipButton();
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
        const idx = queue.indexOf(item);
        if (idx !== -1) queue.splice(idx, 1);
        const chip = $tagSuggestions.querySelector('[data-mid="' + item.mid + '"][data-qid="' + item.qid + '"]');
        if (chip) {
          chip.classList.remove('da-tag-selected');
          chip.setAttribute('aria-label', 'Add depicts tag: ' + item.label);
        }
        renderQueue();
      });
      li.appendChild(removeBtn);

      $queueList.appendChild(li);
    }

    updateBatchButton();
    updateSkipButton();
  }

  function updateSkipButton() {
    const hasTagsForCurrent = currentMid !== null && queue.some(item => item.mid === currentMid);
    if (hasTagsForCurrent) {
      $skipBtn.textContent = 'Next';
      $skipBtn.classList.remove('da-btn-secondary');
      $skipBtn.classList.add('da-btn-primary');
    } else {
      $skipBtn.textContent = 'Skip';
      $skipBtn.classList.remove('da-btn-primary');
      $skipBtn.classList.add('da-btn-secondary');
    }
  }

  function updateBatchButton() {
    if (isAuthenticated) {
      $batchBtn.disabled = false;
      $batchLoginMsg.style.display = 'none';
    } else {
      $batchBtn.disabled = true;
      $batchLoginMsg.style.display = 'block';
    }
  }

  // ── Auth ─────────────────────────────────────────────────
  async function loadAuth() {
    try {
      const resp = await fetch(OAUTH_BASE + '?action=whoami');

      // 500 means OAuth is not configured on the server — hide login entirely
      if (resp.status === 500) {
        showOAuthUnavailable();
        return;
      }

      if (!resp.ok) throw new Error('Auth check failed');
      const data = await resp.json();

      if (data.username) {
        isAuthenticated = true;
        showLoggedIn(data.username);
      } else {
        showLoggedOut();
      }
    } catch {
      showLoggedOut();
    }
  }

  function showOAuthUnavailable() {
    isAuthenticated = false;
    $loginBtn.style.display = 'none';
    $userInfo.style.display = 'none';
    $batchBtn.disabled = true;
    $batchLoginMsg.textContent = 'Wikimedia login is not available at this time.';
    $batchLoginMsg.style.display = 'block';
  }

  function showLoggedIn(username) {
    $loginBtn.style.display = 'none';
    $userInfo.style.display = 'inline';
    $username.textContent = username;
    updateBatchButton();
  }

  function showLoggedOut() {
    isAuthenticated = false;
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
    showLoggedOut();
  }

  // ── Batch submit (Commons writes) ────────────────────────
  async function onSubmitBatch() {
    if (!isAuthenticated || queue.length === 0 || submittingBatch) return;

    submittingBatch = true;
    $batchBtn.disabled = true;
    $batchBtn.textContent = 'Submitting...';
    $results.style.display = 'none';
    $diffLinks.replaceChildren();
    $batchError.style.display = 'none';

    try {
      // _proxy=<timestamp> makes each URL unique so CloudFront never serves a
      // stale cached response; the proxy strips the parameter before forwarding.
      const tokenResp = await fetch(COMMONS_PROXY + '?action=query&meta=tokens&_proxy=' + Date.now());
      if (!tokenResp.ok) throw new Error('Failed to get CSRF token (HTTP ' + tokenResp.status + ')');
      const tokenText = await tokenResp.text();
      let tokenData;
      try {
        tokenData = JSON.parse(tokenText);
      } catch {
        throw new Error('CSRF token response was not valid JSON (HTTP ' + tokenResp.status + '): "' + tokenText.slice(0, 200) + '"');
      }
      const csrfToken = tokenData.query?.tokens?.csrftoken;

      // +\ is the valid OAuth 2.0 pseudotoken — do not reject it
      if (!csrfToken) {
        throw new Error('Failed to obtain CSRF token. Please log in again.');
      }

      // Group claims by MID so multiple depicts on the same entity use one API call
      const byMid = new Map();
      for (const item of queue) {
        if (!byMid.has(item.mid)) byMid.set(item.mid, []);
        byMid.get(item.mid).push(item);
      }

      const today = new Date().toISOString().slice(0, 10);
      const diffs = [];
      const failures = [];
      const succeededMids = new Set();
      for (const [mid, items] of byMid) {
        const claims = items.map(item => {
          const snaks = {
            P887: [{
              snaktype: 'value',
              property: 'P887',
              datavalue: {
                value: { 'entity-type': 'item', 'numeric-id': BASED_ON_HEURISTIC_QID },
                type: 'wikibase-entityid'
              }
            }],
            P123: [{
              snaktype: 'value',
              property: 'P123',
              datavalue: {
                value: { 'entity-type': 'item', 'numeric-id': 2944483, id: 'Q2944483' },
                type: 'wikibase-entityid'
              }
            }],
            P813: [{
              snaktype: 'value',
              property: 'P813',
              datavalue: {
                value: {
                  time: '+' + today + 'T00:00:00Z',
                  timezone: 0, before: 0, after: 0, precision: 11,
                  calendarmodel: 'http://www.wikidata.org/entity/Q1985727'
                },
                type: 'time'
              }
            }]
          };
          const snaksOrder = ['P887', 'P123', 'P813'];

          if (item.subjectTerm) {
            snaks.P5997 = [{
              snaktype: 'value',
              property: 'P5997',
              datavalue: { value: item.subjectTerm, type: 'string' }
            }];
            snaksOrder.splice(1, 0, 'P5997');
          }

          if (item.dplaUrl) {
            snaks.P854 = [{
              snaktype: 'value',
              property: 'P854',
              datavalue: { value: item.dplaUrl, type: 'string' }
            }];
            snaksOrder.splice(snaksOrder.indexOf('P123'), 0, 'P854');
          }

          return {
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
            references: [{ snaks, 'snaks-order': snaksOrder }]
          };
        });

        const body = new URLSearchParams({
          action: 'wbeditentity',
          format: 'json',
          id: mid,
          data: JSON.stringify({ claims }),
          token: csrfToken,
          summary: 'Added depicts (P180) claim via DepictAssist (DPLA) \u2014 https://pro.dp.la/projects/dpla-wikimedia/depictassist'
        });

        const editResp = await fetch(COMMONS_PROXY, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body
        });
        if (!editResp.ok) {
          failures.push(mid);
          continue;
        }
        const editText = await editResp.text();
        let editData;
        try {
          editData = JSON.parse(editText);
        } catch {
          console.warn('DepictAssist: edit response not JSON for', mid, ':', editText.slice(0, 200));
          failures.push(mid);
          continue;
        }

        if (editData.entity?.lastrevid) {
          diffs.push({ id: editData.entity.id, revid: editData.entity.lastrevid });
          succeededMids.add(mid);
        } else {
          failures.push(mid);
          if (editData.error) {
            console.warn('DepictAssist: edit API error for', mid, ':', JSON.stringify(editData.error).slice(0, 200));
          }
        }
      }

      if (diffs.length > 0) {
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

      if (failures.length > 0) {
        const count = failures.length;
        $batchErrorMsg.textContent = count === 1
          ? '1 edit failed. The item remains in your queue — try again.'
          : count + ' edits failed. Those items remain in your queue — try again.';
        $batchError.style.display = 'block';
      }

      queue = queue.filter(item => !succeededMids.has(item.mid));
      if (succeededMids.has(currentMid)) {
        for (const chip of $tagSuggestions.querySelectorAll('.da-tag-selected')) {
          chip.classList.remove('da-tag-selected');
          chip.setAttribute('aria-label', 'Add depicts tag: ' + (chip.querySelector('span')?.textContent || ''));
        }
      }
      renderQueue();
    } catch (err) {
      console.error('DepictAssist: batch submit error', err);
      $batchErrorMsg.textContent = 'Error submitting edits: ' + String(err?.message ?? err);
      $batchError.style.display = 'block';
    } finally {
      submittingBatch = false;
      $batchBtn.textContent = 'Submit batch';
      updateBatchButton();
    }
  }

})();
