# DepictAssist

A volunteer contribution tool for adding structured data "depicts" (P180) claims to
Wikimedia Commons images contributed by DPLA institutions. Hosted at
[pro.dp.la/projects/dpla-wikimedia/depictassist](https://pro.dp.la/projects/dpla-wikimedia/depictassist).

## What it does

1. A volunteer selects a DPLA contributing institution from the dropdown
2. The tool finds a random Commons image from that institution that has subject
   terms (P4272) but no depicts claims (P180) yet
3. Those subject terms are sent to the Wikidata Reconciliation API to generate
   tag suggestions; images where reconciliation produces no matches show a
   "No tag suggestions available" hint but are still displayed
4. The volunteer clicks tags to queue P180 claims; use the × button in the
   queue list to remove a queued claim
5. Edits are posted to Commons under the volunteer's own Wikimedia account via
   OAuth 2.0, with each claim citing "based on heuristic" (P887 = Q114065533) as
   its reference

## File inventory

| File | Purpose |
|------|---------|
| `depictassist.js` | Client-side app — image search, tag suggestions, batch queue, edit submission |
| `depictassist.css` | Scoped styles (all selectors under `.depictassist-wrapper`) |
| `README.md` | This file |
| `pages/projects/dpla-wikimedia/depictassist.js` | Next.js page component — HTML shell, server-side menu fetch |
| `pages/api/wikimedia/oauth.js` | Legacy server OAuth routes — superseded by client-side PKCE; pending removal |
| `pages/api/wikimedia/commons.js` | Legacy server Commons proxy — superseded by Toolforge proxy; pending removal |

The Toolforge proxy is a separate Node.js service at
`https://depictassist.toolforge.org/api` maintained in the
[toolforge-repos/depictassist](https://gitlab.wikimedia.org/toolforge-repos/depictassist)
repository. See `~/.claude/notes/toolforge-depictassist.md` for deploy instructions.

## Architecture

The DPLA pro site runs on AWS (ECS). The `98.94.0.0/16` AWS IP range is blocked by
Wikimedia's global range block, which prevents the server from making authenticated
Commons API calls on behalf of volunteers.

The solution has two parts:

1. **Client-side PKCE OAuth 2.0**: The browser handles the OAuth flow directly
   using the [PKCE](https://www.rfc-editor.org/rfc/rfc7636) extension for public
   clients. There is no `client_secret` and the access token is stored in
   `localStorage` (never sent to the DPLA server).

2. **Toolforge proxy**: Browser requests that need a Commons API call go through
   `https://depictassist.toolforge.org/api`, a small Express app running on
   [Toolforge](https://wikitech.wikimedia.org/wiki/Portal:Toolforge) — Wikimedia's
   own hosting platform, whose IPs are explicitly exempt from range blocks. The
   browser sends its Bearer token in an `Authorization` header; the proxy forwards
   it to `commons.wikimedia.org/w/api.php`.

Unauthenticated read calls (image search, entity data, reconciliation) continue to
be made directly from the browser as before — they do not need the token.

## External APIs

| API | Called from | Auth | Purpose |
|-----|-------------|------|---------|
| Toolforge proxy (`depictassist.toolforge.org/api`) | **Client** | Bearer token | CSRF tokens, `wbeditentity` edits |
| Wikimedia Commons Action API (`commons.wikimedia.org/w/api.php`) | **Client** (unauthenticated) | None | CirrusSearch for images, image info |
| Wikidata Reconciliation API (`wikidata.reconci.link/en/api`) | **Client** | None | Tag suggestions from subject text |
| GitHub Raw (`raw.githubusercontent.com`) | **Client** | None | Institution list (`institutions_v2.json`) |
| Wikimedia OAuth 2.0 authorize (`/w/rest.php/oauth2/authorize`) | **Client** (browser redirect) | — | User login + consent UI |
| Wikimedia OAuth 2.0 token (`/w/rest.php/oauth2/access_token`) | **Client** (PKCE exchange) | PKCE verifier | Authorization code → access token |

## OAuth setup

### 1. Register a Wikimedia OAuth 2.0 consumer

Go to
[meta.wikimedia.org/wiki/Special:OAuthConsumerRegistration](https://meta.wikimedia.org/wiki/Special:OAuthConsumerRegistration)
and register a **public** consumer with these settings:

| Setting | Value |
|---------|-------|
| Version | OAuth 2.0 |
| Project | `commons.wikimedia.org` |
| Consumer type | **Public** (PKCE — no client secret) |
| Grants | "Edit existing pages" |
| Callback URL | `https://pro.dp.la/projects/dpla-wikimedia/depictassist` |

The callback URL must match exactly. Wikimedia will provide a **Client ID** only
(public consumers have no secret). Update the `WIKIMEDIA_CLIENT_ID` constant in
`depictassist.js` with the registered ID. The consumer requires steward approval
before it becomes usable.

### 2. No server environment variables required

Because the token exchange happens in the browser (PKCE) and authenticated API
calls go through the Toolforge proxy, no Wikimedia credentials need to be stored
on the DPLA server. The `WIKIMEDIA_OAUTH_CLIENT_ID` and `WIKIMEDIA_OAUTH_CLIENT_SECRET`
environment variables used by the legacy `oauth.js` route are no longer needed.

### 3. CloudFront cookie forwarding no longer needed for DepictAssist

The previous architecture required the `/api/wikimedia/*` paths to have a custom
CloudFront cache behavior that forwarded `wm_access_token`, `wm_oauth_state`, and
`wm_return_to` cookies. That is no longer needed — the token lives in `localStorage`
and never touches the DPLA server.

## The OAuth flow, step by step

```text
User (browser)              Wikimedia                  Toolforge proxy
      |                         |                              |
      |-- click "Log in"        |                              |
      |   generatePkce()        |                              |
      |   store verifier in     |                              |
      |   sessionStorage        |                              |
      |                         |                              |
      |-- GET /oauth2/authorize?code_challenge=… -->           |
      |<-- Wikimedia login + approve dialog ------             |
      |-- approve ------------------------------------>        |
      |<-- 302 to /depictassist?code=X&state=Y ----            |
      |                         |                              |
      |   handleOAuthCallback() |                              |
      |   validate state        |                              |
      |-- POST /oauth2/access_token?code_verifier=… -------->  |  (direct to Wikimedia)
      |<-- { access_token: "..." } ----------------------      |
      |   store token in localStorage                          |
      |                         |                              |
      |-- submit batch          |                              |
      |-- GET /api?action=query&meta=tokens                --> |
      |   Authorization: Bearer <token>                        |
      |                         |         -- GET api.php -->   |
      |                         |         <-- CSRF token --    |
      |<-- CSRF token ---------------------------------------- |
      |                         |                              |
      |-- POST /api (wbeditentity)                         --> |
      |   Authorization: Bearer <token>                        |
      |                         |         -- POST api.php --> |
      |                         |         <-- edit result --  |
      |<-- edit result (JSON) ----------------------------     |
```

## Token storage

The access token is stored in `localStorage` under the key `da_access_token` as a
JSON object:

```json
{ "token": "...", "expiry": 1714000000000 }
```

The expiry is computed from the `expires_in` field in the Wikimedia token response
(default 4 hours if not provided). `getStoredToken()` returns `null` and removes
the entry if the token has expired.

PKCE state (verifier + random `state` value) is stored temporarily in
`sessionStorage` under `da_pkce_state` and removed immediately upon callback.

## The Toolforge proxy in detail

`https://depictassist.toolforge.org/api` is a narrow allowlist proxy:

| Method | Allowed `action` values | What it's used for |
|--------|------------------------|---------------------|
| GET | `query` | Fetch CSRF token (`meta=tokens`), check userinfo (`meta=userinfo`) |
| POST | `wbeditentity` | Add P180 depicts claims to a Commons media file |

Any other `action` value returns HTTP 400. Any request without an
`Authorization: Bearer <token>` header returns HTTP 401.

CORS is restricted to `https://pro.dp.la`. The proxy adds
`Access-Control-Allow-Origin: https://pro.dp.la` to every response, including
OPTIONS preflight responses.

Source lives at `~/github/toolforge-depictassist/`. To deploy updates, see
`~/.claude/notes/toolforge-depictassist.md`.

### CSRF tokens and the OAuth pseudotoken

Wikimedia's MediaWiki Action API requires a CSRF token for writes. To get one, the
client calls the Toolforge proxy with `action=query&meta=tokens&type=csrf`.

For OAuth 2.0 Bearer-authenticated requests, MediaWiki always returns `+\` as the
CSRF token. This is the **valid pseudotoken for OAuth flows** — it should be
passed as-is in the `token` field of subsequent write requests. Do not reject it.

## CSP requirements

Configured in `next.config.js`. DepictAssist requires these origins in `connect-src`:

- `https://commons.wikimedia.org` — unauthenticated image search and info calls; OAuth authorize redirect
- `https://wikidata.reconci.link` — tag reconciliation
- `https://raw.githubusercontent.com` — institution list
- `https://meta.wikimedia.org` — required by some Wikimedia analytics
- `https://www.wikidata.org` — entity page links shown in the UI
- `https://wikimedia.org` — Wikimedia analytics
- `https://depictassist.toolforge.org` — Toolforge proxy for authenticated Commons API calls

After adding any new external URL to the code, run `node scripts/check-csp.js` to
verify coverage.

## Institution data

Fetched at runtime from:

```text
https://raw.githubusercontent.com/dpla/ingestion3/main/src/main/resources/wiki/institutions_v2.json
```

Filtering: only institutions with `"upload": true` and a non-empty `"Wikidata"` QID
are shown. The dropdown groups institutions by hub. If the URL contains `?id=Q…`,
that institution is auto-selected once the dropdown finishes loading.

## URL parameters

| Parameter | Example | Description |
|-----------|---------|-------------|
| `id` | `?id=Q105281139` | Pre-selects an institution by Wikidata QID and starts a search |

## Non-obvious implementation details

### Image search is capped at 10,000

Commons CirrusSearch refuses offsets above 10,000. When picking a random image the
code gets the total hit count and caps it: `Math.min(totalHits, 10000)`. This means
institutions with more than 10,000 untagged images will only ever surface images
from the first 10,000 results.

### Subject terms are narrowed before reconciliation

DPLA subject terms often use the format `Broader topic--Narrower topic`. The code
strips everything up to and including `--` before sending terms to the Wikidata
Reconciliation API, so `"Politics--United States"` becomes `"United States"`. This
improves match quality significantly.

### Multiple depicts on one file use a single API call

`wbeditentity` accepts an array of claims. When the batch contains multiple tags
for the same Commons file (same M-ID), the proxy call groups them into one request
rather than one request per tag.

### All depicts claims cite "based on heuristic"

Every P180 claim added by DepictAssist includes a reference: P887 (basis of
knowledge) = Q114065533 (based on heuristic). This flags the claim as
algorithmically suggested so other editors know it warrants human review.

### Suggestion chips: selection via CSS class and disabled property

Each tag chip is stamped with `data-mid` (Commons M-ID, e.g. `M12345`) and
`data-qid` (Wikidata Q-ID, e.g. `Q67890`) when it is created. Selection state is
tracked with the `da-tag-selected` CSS class; `chip.disabled` is also set to `true`
at the same time for form control state management. Clicking a chip calls
`addToQueue()`, adds the `da-tag-selected` class, and disables the button — chips
cannot be deselected by clicking them again. To remove a queued claim, use the
× button in the batch list.

When the volunteer clicks × on a queued item in the batch list, the remove handler
uses `data-mid` and `data-qid` to find the corresponding chip in `$tagSuggestions`,
removes `da-tag-selected`, and re-enables it (`chip.disabled = false`). Without those
attributes the handler would have no way to identify the right chip after
`renderQueue()` has rebuilt the list.

### Handling images with no tag suggestions

Image selection runs inside a retry loop (`maxAttempts = 10`, tracked by an
`attempts` counter). The loop retries only for invalid data — missing pages, invalid
page IDs, or no entity data — not for empty tag suggestions.

When reconciliation returns no matches (`tagSuggestions.length === 0`), the image is
still displayed: `displayImage()` is called and renders a "No tag suggestions
available for this subject." hint in place of chips. The loop only retries when:
- The Commons search returns no pages, an invalid page ID, or no entity data →
  `showImageState('empty')` is called and the function returns immediately
- Reconciliation times out three consecutive times → an error is thrown

If `attempts` exceeds `maxAttempts`, an error is thrown and the error state is
displayed. All other unhandled errors also fall through to `showImageState('error')`.

### Image lightbox and progressive load

Clicking the thumbnail image opens a native `<dialog>` modal (`showModal()`). The
800 px thumbnail that is already loaded for the main view is set as the lightbox
`src` immediately so the modal appears without delay. A `new Image()` object then
fetches the 1 600 px version in the background; when it loads, `$lightboxImg.src`
is swapped — but only if `$lightbox.open` is still `true`, preventing an invisible
write to a dialog the volunteer has already closed.

The 1 600 px URL is derived from the existing thumb URL with a regex replace
(`/\/\d+px-/` → `/1600px-`). Wikimedia serves thumbnails as JPEG or PNG regardless
of the original file format, so there is no risk of fetching a raw TIFF. Requesting
a width wider than the original is safe: Wikimedia returns the original resolution
rather than upscaling or erroring.

### Dropdown arrow CSS conflict

`global.scss` applies `appearance: none` and a custom SVG `background-image` to all
`<select>` elements site-wide, replacing the native browser arrow. The institution
dropdown overrides both (`background-image: none; appearance: auto`) to restore the
native arrow, because leaving the global override in place causes the browser's
native arrow and the SVG arrow to render on top of each other.

### SPA re-navigation guard

`depictassist.js` is loaded as a static `<script>` tag. Next.js SPA navigation can
re-mount the page component without reloading the script, so `initDepictAssist()`
can be called more than once. The initialization function compares the wrapper DOM
node to a stored reference (`boundWrapper`) and skips re-initialization if the node
is the same mount. On a fresh navigation (new DOM node), it resets all module-level
state before re-binding.
