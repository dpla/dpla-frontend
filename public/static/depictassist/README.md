# DepictAssist

A volunteer contribution tool for adding structured data "depicts" (P180) claims to
Wikimedia Commons images contributed by DPLA institutions. Hosted at
[pro.dp.la/projects/dpla-wikimedia/depictassist](https://pro.dp.la/projects/dpla-wikimedia/depictassist).

## What it does

1. A volunteer selects a DPLA contributing institution from the dropdown
2. The tool finds a random Commons image from that institution that has subject
   terms (P4272) but no depicts claims (P180) yet
3. Those subject terms are sent to the Wikidata Reconciliation API to generate
   tag suggestions
4. The volunteer clicks tags to queue P180 claims, then submits the batch
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
| `pages/api/wikimedia/oauth.js` | OAuth 2.0 server route — login, callback, whoami, logout |
| `pages/api/wikimedia/commons.js` | Server-side proxy for authenticated Commons API calls |
| `lib/setCookie.js` | Shared cookie-serialization utility used by the OAuth route |

## Architecture: why the proxy exists

Browser JavaScript cannot hold OAuth tokens safely — anything in JS is readable by
XSS. Instead:

- The server exchanges the OAuth code for an access token and stores it in an
  **httpOnly** cookie (`wm_access_token`). Browser JS never sees the token value.
- All authenticated Commons API calls (fetching CSRF tokens, submitting edits) go
  through `/api/wikimedia/commons`, a Next.js API route that reads the token from
  the cookie and forwards requests to Commons with `Authorization: Bearer <token>`.
- The client only ever talks to its own origin (`pro.dp.la`); Commons is contacted
  only from the server.

This also avoids CORS problems: server-to-server calls do not need a Commons CORS
`origin` parameter (which Commons rejects on authenticated OAuth requests anyway).

## External APIs

| API | Called from | Auth | Purpose |
|-----|-------------|------|---------|
| Wikimedia Commons Action API (`commons.wikimedia.org/w/api.php`) | **Server** (via proxy) | Bearer token | CSRF tokens, `wbeditentity` edits |
| Wikimedia Commons Action API | **Client** (unauthenticated) | None | CirrusSearch for images, image info |
| Wikidata Reconciliation API (`wikidata.reconci.link/en/api`) | **Client** | None | Tag suggestions from subject text |
| GitHub Raw (`raw.githubusercontent.com`) | **Client** | None | Institution list (`institutions_v2.json`) |
| Wikimedia OAuth 2.0 (`commons.wikimedia.org/w/rest.php/oauth2/*`) | **Server** | Client secret | Authorization code exchange |

Note: the unauthenticated Commons calls (image search, image info) are made
directly from the browser, not through the proxy, because they don't need the token
and are read-only.

## OAuth setup

### 1. Register a Wikimedia OAuth consumer

Go to
[meta.wikimedia.org/wiki/Special:OAuthConsumerRegistration](https://meta.wikimedia.org/wiki/Special:OAuthConsumerRegistration)
and register a new consumer with these settings:

| Setting | Value |
|---------|-------|
| Version | OAuth 2.0 |
| Project | `commons.wikimedia.org` |
| Grants | `editpage` |
| Callback URL | `https://pro.dp.la/api/wikimedia/oauth?action=callback` |
| Consumer type | Confidential (server-side) |

The callback URL must match exactly including the `?action=callback` query string.
Wikimedia will provide a **Client ID** and a **Client Secret**.

### 2. Set environment variables

Add to the server environment (not committed to git):

```bash
WIKIMEDIA_OAUTH_CLIENT_ID=<from Wikimedia registration>
WIKIMEDIA_OAUTH_CLIENT_SECRET=<from Wikimedia registration>
```

Optional override if the server cannot detect its own public hostname:

```bash
WIKIMEDIA_OAUTH_REDIRECT_BASE=https://pro.dp.la
```

If `WIKIMEDIA_OAUTH_REDIRECT_BASE` is not set, the callback URL is inferred from
the incoming request's `x-forwarded-proto` and `x-forwarded-host` headers. This
works correctly behind the CloudFront + ALB setup, but if it ever breaks (e.g.
staging or local dev), set the explicit override.

### 3. CloudFront cookie forwarding

CloudFront's default cache behavior strips cookies before forwarding requests to
the origin. The `/api/wikimedia/*` paths must have a custom cache behavior that:

- **Whitelists these cookies for forwarding**: `wm_access_token`, `wm_oauth_state`
- **Allows all HTTP methods** (HEAD, GET, DELETE, POST, PUT, PATCH, OPTIONS)
- **Disables caching** (MinTTL = DefaultTTL = MaxTTL = 0)
- **Forwards the query string** (needed by the OAuth and commons proxy routes)

Without this, the Next.js API routes receive empty `req.cookies` and every
authenticated request returns 401.

## The OAuth flow, step by step

```text
User                 pro.dp.la (Next.js)          Commons (Wikimedia)
 |                         |                              |
 |-- click "Log in" ------>|                              |
 |                         |-- generate state, set -----> |
 |                         |   wm_oauth_state cookie      |
 |<-- 302 redirect --------|                              |
 |                         |                              |
 |-- GET /w/rest.php/oauth2/authorize ----------------->  |
 |<-- Wikimedia login + approve dialog ----------------   |
 |-- approve ------------------------------------------>  |
 |<-- 302 redirect to /api/wikimedia/oauth?action=callback&code=X&state=Y
 |                         |                              |
 |-- GET callback -------->|                              |
 |                         |-- validate state vs cookie   |
 |                         |-- POST /oauth2/access_token->|
 |                         |<-- { access_token: "..." } --|
 |                         |-- set wm_access_token cookie |
 |                         |-- clear wm_oauth_state cookie|
 |<-- 302 to /depictassist-|                              |
 |                         |                              |
 |-- submit batch -------->|                              |
 |   POST /api/wikimedia/commons                          |
 |   (cookie sent automatically)                          |
 |                         |-- read wm_access_token cookie|
 |                         |-- POST wbeditentity -------> |
 |                         |<-- edit result --------------|
 |<-- edit result (JSON) --|                              |
```

### Cookies

| Cookie | httpOnly | Secure | SameSite | Max-Age | Purpose |
|--------|----------|--------|----------|---------|---------|
| `wm_oauth_state` | ✓ | ✓ | Lax | 300 s | CSRF protection for the OAuth callback |
| `wm_access_token` | ✓ | ✓ | Strict | 4 hours | Bearer token for authenticated API calls |

`SameSite=Lax` on the state cookie is intentional: the OAuth callback is a
top-level navigation arriving from `commons.wikimedia.org`, and `SameSite=Strict`
would suppress the cookie on that cross-site redirect, breaking state validation.

`SameSite=Strict` on the token cookie ensures it is never sent in any cross-site
context — only same-site requests from `pro.dp.la` can use it.

### CSRF tokens and the OAuth pseudotoken

Wikimedia's MediaWiki Action API requires a CSRF token for writes. To get one, the
client calls `/api/wikimedia/commons?action=query&meta=tokens` through the proxy.

For OAuth 2.0 Bearer-authenticated requests, MediaWiki always returns `+\` as the
CSRF token. This is the **valid pseudotoken for OAuth flows** — it should be
passed as-is in the `token` field of subsequent write requests. Do not reject it.
(Earlier code had a check `csrfToken === '+\\'` that wrongly treated this as an
error; it has been removed.)

## The commons proxy in detail

`pages/api/wikimedia/commons.js` is a narrow allowlist proxy:

| Method | Allowed `action` values | What it's used for |
|--------|------------------------|---------------------|
| GET | `query` | Fetch CSRF token (`meta=tokens`), check userinfo |
| POST | `wbeditentity` | Add P180 depicts claims to a Commons media file |

Any other `action` value returns HTTP 400. Any request without a valid
`wm_access_token` cookie returns HTTP 401.

The proxy strips the internal `_proxy` query parameter (added by client code to
avoid caching) before forwarding. It does not forward the `origin` parameter,
which Commons rejects on OAuth Bearer requests.

Errors from Commons are always HTTP 200 with an `error` field in the JSON body
(MediaWiki never returns 4xx/5xx for API-level errors). The proxy logs these to
ECS stdout so they appear in CloudWatch.

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

## CSP requirements

Configured in `next.config.js`. DepictAssist requires these origins in `connect-src`:

- `https://commons.wikimedia.org` — unauthenticated image search and info calls
- `https://wikidata.reconci.link` — tag reconciliation
- `https://raw.githubusercontent.com` — institution list
- `https://meta.wikimedia.org` — required by some Wikimedia analytics
- `https://www.wikidata.org` — entity page links shown in the UI
- `https://wikimedia.org` — Wikimedia analytics

The `form-action` directive must include `https://meta.wikimedia.org` for the OAuth
authorization redirect (the browser navigates to Wikimedia to show the approval UI).

After adding any new external URL to the code, run `node scripts/check-csp.js` to
verify coverage.

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

### SPA re-navigation guard

`depictassist.js` is loaded as a static `<script>` tag. Next.js SPA navigation can
re-mount the page component without reloading the script, so `initDepictAssist()`
can be called more than once. The initialization function compares the wrapper DOM
node to a stored reference (`boundWrapper`) and skips re-initialization if the node
is the same mount. On a fresh navigation (new DOM node), it resets all module-level
state before re-binding.
