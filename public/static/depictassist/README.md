# DepictAssist

A tool for adding structured data "depicts" (P180) claims to Wikimedia Commons
images contributed by DPLA institutions. Hosted at
[pro.dp.la/projects/dpla-wikimedia/depictassist](https://pro.dp.la/projects/dpla-wikimedia/depictassist).

## How it works

1. Users select a DPLA contributing institution from the dropdown
2. The tool finds a random Wikimedia Commons image from that institution that
   has subjects (P4272) but no depicts (P180) claims yet
3. Subject terms are sent to the Wikidata reconciliation API for tag suggestions
4. Users click tags to queue P180 claims, then submit the batch
5. Edits are posted to Commons under the user's own Wikimedia account via OAuth

## File inventory

| File | Purpose |
|------|---------|
| `depictassist.js` | Client-side application logic (image fetching, tag suggestions, batch writes) |
| `depictassist.css` | Scoped styles (all under `.depictassist-wrapper`) |
| `README.md` | This file |
| `../../../pages/projects/dpla-wikimedia/depictassist.js` | Next.js page component |
| `../../../pages/api/wikimedia/oauth.js` | OAuth 2.0 token exchange API route |

## External APIs

| API | Purpose | Auth required | CORS |
|-----|---------|---------------|------|
| Wikimedia Commons Action API | CirrusSearch for images, entity data, image info, CSRF tokens, edit submission | Bearer token (for writes) | Yes (`origin=*`) |
| Wikidata Reconciliation API | Tag suggestions from subject text | No | Yes |
| GitHub Raw (`ingestion3`) | Institution list with Wikidata QIDs | No | Yes |
| Wikimedia OAuth 2.0 (`meta.wikimedia.org`) | User authentication | Server-side client_secret | N/A (server-side) |

## Institution data

Institutions are fetched at runtime from the `institutions_v2.json` file in the
[dpla/ingestion3](https://github.com/dpla/ingestion3) repository. Only
institutions with `"upload": true` and a non-empty `"Wikidata"` QID are shown.
The dropdown groups institutions by hub.

## OAuth setup

DepictAssist uses Wikimedia OAuth 2.0. To configure:

1. Register an OAuth consumer at
   [meta.wikimedia.org/wiki/Special:OAuthConsumerRegistration](https://meta.wikimedia.org/wiki/Special:OAuthConsumerRegistration)
   - Version: OAuth 2.0
   - Project: `commons.wikimedia.org`
   - Grants: `editpage`, `createeditmovepage`
   - Callback URL: `https://pro.dp.la/api/wikimedia/oauth?action=callback`

2. Set environment variables on the server:
   - `WIKIMEDIA_OAUTH_CLIENT_ID` — from consumer registration
   - `WIKIMEDIA_OAUTH_CLIENT_SECRET` — from consumer registration (server-only, never exposed to client)

The OAuth flow:
- User clicks "Log in with Wikimedia" → redirects to meta.wikimedia.org
- After approval, callback exchanges the authorization code for an access token
- Token is stored in an httpOnly secure cookie — never exposed to client-side JS
- Authenticated Commons API calls (CSRF tokens, edits) go through
  `/api/wikimedia/commons`, which decrypts the token server-side and
  forwards requests with Bearer auth

## URL parameters

| Parameter | Example | Description |
|-----------|---------|-------------|
| `id` | `?id=Q105281139` | Pre-selects an institution by Wikidata QID |

## CSP requirements

The following external origins must be in the Content-Security-Policy `connect-src`
directive (configured in `next.config.js`):

- `https://commons.wikimedia.org` — Commons Action API
- `https://wikimedia.org` — Analytics API
- `https://wikidata.reconci.link` — Reconciliation API
- `https://raw.githubusercontent.com` — Institution data
- `https://meta.wikimedia.org` — OAuth endpoints
- `https://www.wikidata.org` — Entity links

The `form-action` directive must include `https://meta.wikimedia.org` for the
OAuth redirect.
