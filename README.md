# DPLA Frontend

This repository contains the frontend for all websites operated by the [Digital Public Library of America](https://dp.la). A single Next.js 15 codebase, backed by a custom Express server, serves **12 distinct sites** across three site types — the main public search portal, a professionals portal, and ten regional hub sites for DPLA's partner network.

Multi-tenancy is handled entirely through environment variables (`NEXT_PUBLIC_SITE_ENV`, `NEXT_PUBLIC_LOCAL_ID`) and Next.js routing rules. There are code forks nor separate deployments per site type.

```
Browser → AWS WAF → AWS ALB → ECS Fargate (Express + Next.js)
                                     │
                     ┌───────────────┼────────────────┐
                     ▼               ▼                ▼
            DPLA Search API    WordPress         Mailchimp
            (api.dp.la)        (dpla.wpengine.com)
                     │
            CloudFront CDN
            (thumbnails)
```

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Sites](#sites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [External Services](#external-services)
- [Deployment](#deployment)
- [Special Features](#special-features)
- [Security](#security)
- [Accessibility](#accessibility)
- [Known Issues and Deficiencies](#known-issues-and-deficiencies)
- [Adding a New Local Hub Site](#adding-a-new-local-hub-site)
- [Other Documentation](#other-documentation)

---

## Architecture Overview

The application is a **Next.js 15** app wrapped in a custom **Express** server. The Express layer handles:

- Multi-CPU clustering (always on in production)
- Custom routes: `GET /healthcheck`, `GET /robots.txt`, `POST /mailchimp`, `POST /g/contact`, `POST /g/feedback`, `GET /wp-content/*` (redirects to WordPress)
- All other requests are passed through to Next.js

**Key architectural decisions:**

- **Server-side API calls only.** The DPLA API key is never sent to the browser. All search queries run through `getServerSideProps` or `getStaticProps`.
- **WordPress for editorial content.** News, blog posts, Primary Source Sets copy, and site-wide settings are managed in a hosted WordPress instance. Responses are cached in-memory with a 90-second TTL to absorb WP Engine maintenance windows.
- **Single codebase, multiple sites.** `NEXT_PUBLIC_SITE_ENV` switches between `user`, `pro`, `local`, and `cqa` (staging). For local hub sites, `NEXT_PUBLIC_LOCAL_ID` selects the hub's configuration from `constants/local.js`.

---

## Sites

**dp.la** — main public-facing site at https://dp.la (`NEXT_PUBLIC_SITE_ENV=user`). Offers search across DPLA's full 50M-item collection, item detail pages, collection browsing, topic browsing, Primary Source Sets, exhibitions, curated lists, news, and donate pages. Staging: https://staging-internal.dp.la (requires `DPLA_INTERNAL_ACCESS` header).

**pro.dp.la** — portal for library professionals and DPLA partners at https://pro.dp.la (`NEXT_PUBLIC_SITE_ENV=pro`). Shares the same codebase and page tree as the user site but has its own branding, navigation, and WordPress content sections.

### Local Hub Sites

Local hub sites are partner-operated regional portals that scope the search interface to a subset of the DPLA collection (by `provider.@id` or by tag) and apply custom branding. Each hub has its own subdomain, logo, color palette, and optional static content pages (About, For Contributors, etc.).

| `NEXT_PUBLIC_LOCAL_ID` | Name | URL | Filter type |
|---|---|---|---|
| `aviation` | Cleared for Takeoff | aviation.dp.la | tag: `aviation` |
| `florida` | Sunshine State Digital Network | ssdn.dp.la | provider: `florida` |
| `illinois` | Illinois Digital Heritage Hub | idhh.dp.la | provider: `il` |
| `njde` | NJ/DE Digital Collective | njde.dp.la | provider: `njde` |
| `nwdh` | Northwest Digital Heritage | nwdh.dp.la | tag: `nwdh` |
| `oklahoma` | OKHUB | oklahoma.dp.la | provider: `oklahoma` |
| `plains2peaks` | Plains to Peaks Collective | ppc.dp.la | provider: `p2p` |
| `texas` | TxHub | texas.dp.la | tag: `texas` |
| `vermont` | Vermont Green Mountain Digital Archive | vt.dp.la | provider: `vt` |
| `wisconsin` | Recollection Wisconsin | recollectionwisconsin.dp.la | provider: `wisconsin` |

Hubs that filter by **tag** (`aviation`, `nwdh`, `texas`) show items from across all DPLA providers that carry that tag, rather than restricting by contributing organization. The full configuration for each hub — routes, facets, feature flags, branding assets — lives in [`constants/local.js`](constants/local.js).

See [LOCAL.md](LOCAL.md) for step-by-step instructions on adding or configuring a Local hub instance.

---

## Getting Started

### Prerequisites

- [Mise](https://mise.jdx.dev/) — recommended Node version manager
- [Yarn](https://yarnpkg.com/)

### Install Node

```bash
cd dpla-frontend
mise settings add idiomatic_version_file_enable_tools node  # enables .node-version detection
mise use                                                     # installs and activates correct version
```

### Set up Yarn and install dependencies

```bash
npm install --global yarn
yarn
```

### Configure environment variables

```bash
cp .env.example .env
# Edit .env — see Environment Variables section below
```

### Start the development server

```bash
yarn run dev
```

Open http://localhost:3000. By default the server runs as the `user` site (dp.la). To run a local hub, set `NEXT_PUBLIC_SITE_ENV=local` and `NEXT_PUBLIC_LOCAL_ID=wisconsin` (for example) in your `.env` before starting.

### Run with Docker

The Docker container requires environment variables at **both** build time and run time: Next.js bakes `NEXT_PUBLIC_*` variables into the browser bundle at build time, while the Express server reads the rest at runtime.

```bash
docker build -t dpla-frontend .
docker run --env-file .env -p 3000:3000 dpla-frontend
```

See `package.json` for additional `docker:*` helper scripts.

---

## Environment Variables

### Site identity

| Variable | Description |
|---|---|
| `NODE_ENV` | `development` or `production` |
| `NEXT_PUBLIC_SITE_ENV` | Site type: `user`, `pro`, `local`, or `cqa` (staging/QA) |
| `NEXT_PUBLIC_LOCAL_ID` | Hub ID for local sites — must match a key in `constants/local.js` (e.g. `wisconsin`) |
| `NEXT_PUBLIC_USER_BASE_URL` | User site URL for cross-site links (e.g. `https://dp.la`) |
| `NEXT_PUBLIC_PRO_BASE_URL` | Pro site URL for cross-site links (e.g. `https://pro.dp.la`) |

### DPLA API

| Variable | Description |
|---|---|
| `API_KEY` | DPLA Search API key — server-side only, never sent to the browser |
| `API_URL` | DPLA Search API base URL (e.g. `https://api.dp.la/v2` or `https://api-internal.dp.la/v2` inside the VPC) |
| `DPLA_INTERNAL_ACCESS` | Shared secret injected as an ALB header for internal API access (production only) |

### WordPress

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_WORDPRESS_URL` | WordPress base URL (e.g. `https://dpla.wpengine.com`) |
| `WP_PREVIEW_SECRET` | Draft preview secret — must match the `dpla-preview-redirect` mu-plugin *(optional)* |
| `WP_PREVIEW_USER` | WordPress username for draft preview *(optional)* |
| `WP_PREVIEW_APP_PASSWORD` | WordPress app password for draft preview *(optional)* |

### Analytics and error tracking

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_GA_TRACKING_ID` | Google Analytics tracking ID *(optional)* |
| `SENTRY_DSN` | Sentry DSN for error tracking *(optional)* |
| `SENTRY_AUTH_TOKEN` | Sentry auth token for source map upload at build time *(optional)* |
| `SENTRY_ENVIRONMENT` | Sentry environment tag (defaults to `development`) *(optional)* |

### Integrations

| Variable | Description |
|---|---|
| `MAILCHIMP_KEY` | Mailchimp API key for newsletter signups *(optional)* |
| `MAILCHIMP_PREFIX` | Mailchimp server prefix (e.g. `us4`) *(optional)* |

### Server process

| Variable | Description |
|---|---|
| `MUST_FORK` | Set to `true` to force multi-CPU clustering in dev mode (always on in production) *(optional)* |
| `PS_COUNT` | Worker process count (defaults to number of available CPUs) *(optional)* |

`NEXT_PUBLIC_*` variables are embedded in the browser bundle at build time. All others are available only on the server.

---

## Scripts

| Command | Description |
|---|---|
| `yarn run dev` | Start development server |
| `yarn run build` | Production build (Next.js build + post-build sitemap generation) |
| `yarn run start` | Start production server |
| `yarn run lint` | Run ESLint (`next lint`) |
| `yarn run test` | Run unit tests and favicon integrity checks |
| `yarn run clean` | Remove `node_modules`, `.next`, and other build artifacts |
| `yarn run analyze` | Build with bundle analyzer (`ANALYZE=true next build`) |
| `yarn run docker:build` | Build Docker image |
| `yarn run docker:run` | Run Docker container |

---

## External Services

### DPLA Search API

The DPLA Search API at `api.dp.la` powers all search, item detail, facet browsing, and collection pages. The API key (`API_KEY`) is injected server-side on every request — it is never exposed to the browser.

In production, requests are routed through `api-internal.dp.la` (internal VPC endpoint) rather than the public API, via the `DPLA_INTERNAL_ACCESS` header mechanism described in [Internal API Header](#internal-api-header).

The frontend also exposes a proxied API route at `GET /api/items/{id[,id2,...]}` that lets callers retrieve raw DPLA item JSON by ID without their own API key. See [`pages/api/items/ITEMS-API.md`](pages/api/items/ITEMS-API.md) for full documentation.

### Thumbnail Service

Item thumbnails are served through CloudFront CDN. The thumbnail URL for any item is `https://dp.la/thumb/{item-id}`. Items without a thumbnail fall back to a type-based SVG placeholder.

### WordPress

Editorial content — news and blog posts, Primary Source Sets copy, about pages, and site-wide ACF settings — is managed in a hosted WordPress instance at `https://dpla.wpengine.com`.

WordPress responses are cached in-memory with a **90-second TTL**. If WordPress is unreachable (e.g. during WP Engine's hourly maintenance windows), the server falls back to the last cached response and logs a warning. External links in WordPress content are tagged with a `.external` CSS class.

### Mailchimp

Newsletter signups are handled by `POST /mailchimp` on the Express server. The route requires `MAILCHIMP_KEY` and `MAILCHIMP_PREFIX`. The list ID is `4c517f4bd0`, with interest groups for `NEWS`, `EDUCATION`, and `GENEALOGY`.

### Google Analytics

Set `NEXT_PUBLIC_GA_TRACKING_ID` to enable Google Analytics. The Content Security Policy already includes allowances for `google-analytics.com` and `googletagmanager.com`.

### Sentry

Client, server, and edge runtimes are all instrumented with `@sentry/nextjs`. Set `SENTRY_DSN` to enable. Sentry org: `dpla`, project: `dpla-frontend`. Source maps are uploaded at build time when `SENTRY_AUTH_TOKEN` is present and are not exposed to the browser (`hideSourceMaps: true`). Request profiling is enabled at 100% (`profilesSampleRate: 1.0`).

---

## Deployment

### Docker

The Dockerfile uses a multi-stage build on `node:22-slim`:

1. **Builder stage** — installs all dependencies, runs `next build`, generates `sitemap-pages.xml`
2. **Runtime stage** — copies only `.next/`, production-only `node_modules/`, and source files; runs as the non-root `node` user; uses `tini` as PID 1

Health check endpoint: `GET /healthcheck` → HTTP 200

### AWS ECS / CodeDeploy

All sites run on AWS ECS Fargate with blue/green deployments managed by AWS CodeDeploy. The deployment sequence for each site:

1. Trigger the **Build ECR** GitHub Actions workflow to push a new Docker image to ECR
2. Squash-merge the PR to `main`
3. Start the CodePipeline manually — the auto-trigger webhook is stale (see [Known Issues](#known-issues-and-deficiencies))
4. CodeBuild pulls the new image and registers a new ECS task definition (~2 min)
5. CodeDeploy performs the blue/green traffic shift (~5–8 min)

ECS clusters:

| Site | Cluster | Tasks |
|---|---|---|
| dp.la | `frontend-user-prod` | 16 |
| pro.dp.la | `frontend-pro-production` | 2 |
| Staging | `frontend-user-staging` | 1 |
| Each local hub | One cluster per hub | varies |

### GitHub Actions

There are seventeen workflows in `.github/workflows/`:

| Workflow | Trigger | Purpose |
|---|---|---|
| `node.js.yml` | PR / push | Lint check |
| `user-production.yml` | Manual | Build ECR image for dp.la |
| `user-staging.yml` | Manual | Build ECR image for staging |
| `pro-production.yml` | Manual | Build ECR image for pro.dp.la |
| `pro-staging.yml` | Manual | Build ECR image for pro staging |
| `local-{hub}.yml` × 10 | Manual | Build ECR image for each local hub |
| `generate-hub-sitemaps.yml` | Scheduled | Generate XML sitemaps for all hubs |
| `dpla-ingest-update.yml` | External trigger | Notify on DPLA data ingest completion |

---

## Special Features

### Lists

Users can save items to named lists stored locally in the browser via `localforage` (IndexedDB). Lists are capped at **50 items** (`MAX_LIST_ITEMS` in `constants/site.js`). When viewing a list, the page fetches full item metadata from `GET /api/items/{ids}` at runtime — only IDs are stored locally, not metadata. There is no server-side list storage or user account system.

See [`pages/api/items/ITEMS-API.md`](pages/api/items/ITEMS-API.md) for the full API route specification.

### Primary Source Sets and Exhibitions

Primary Source Sets (PSS) and Exhibitions are statically generated at build time from data in `exhibitions-data/`. PSS page copy is also fetched from WordPress. Sets are shared with the Pro site for educational use and integrated with the National History Day program.

### Browse by Topic

Topic browsing uses a two-level hierarchy (topic → subtopic). Subtopic pages query a custom DPLA API endpoint (`/100_per_page`). See [Known Issues](#known-issues-and-deficiencies) for a caveat about this endpoint's long-term stability. Users cannot navigate directly between adjacent topics on the subtopic page — they must return to the topic listing to switch topics.

### WordPress Draft Preview

Draft posts and pages can be previewed before publishing. Requires the `dpla-preview-redirect` WordPress mu-plugin and the `WP_PREVIEW_*` environment variables. Preview requests use the WordPress REST API with HTTP Basic auth to fetch unpublished content.

### robots.txt

`robots.txt` is generated dynamically by `server.js` based on `NEXT_PUBLIC_SITE_ENV`:

| Site | Behavior |
|---|---|
| `user` (dp.la) | Disallows `/search` and `/qa`; sets a crawl delay; specific spiders may be explicitly allowed |
| `pro` (pro.dp.la) | Allows all crawlers; sets a 2-second crawl delay |
| `local` (hub sites) | Disallows `/search`; sets a crawl delay; includes the hub's sitemap URLs |
| `cqa` (staging) | Disallows all crawlers |

AI crawlers are blocked on all sites: GPTBot, ClaudeBot, anthropic-ai, CCBot, Google-Extended, Amazonbot, Bytespider, PerplexityBot, meta-external-agent, AhrefsBot, SemrushBot, MJ12bot, DotBot.

---

## Security

### Content Security Policy

CSP is enforced via HTTP response headers (not `<meta>` tags) to avoid conflicting with AWS WAF challenge pages. The policy uses `sha256` hashes to allowlist the specific inline scripts injected by Next.js at bootstrap.

**Important maintenance note:** The `sha256` hashes in `next.config.js` are tied to the exact content of Next.js's bootstrap scripts and **must be updated manually whenever the Next.js version is bumped**. The hashes are in the `script-src` directive. There is an open TODO to migrate to nonce-based CSP via Next.js middleware, which would eliminate this maintenance burden.

The CSP allows: Google Analytics/Tag Manager, Sentry, AWS WAF, Wikimedia, YouTube iframes, and the CloudFront CDN for fonts and media. Exception: `/static/pdfjs/*` paths are served with `'unsafe-eval'` in `script-src` due to PDF.js requiring it for Type3 font compilation.

To verify that a new external URL is covered by the CSP before shipping, run `node scripts/check-csp.js`.

### Bot and Spam Blocking

Contact forms and newsletter signups include a honeypot field (`i_prefer_usps_mail`). Submissions that populate this field are silently discarded server-side. AI and SEO crawlers are also blocked via `robots.txt` (see [robots.txt](#robotstxt) above).

### Internal API Header

Production deployments set a `DPLA_INTERNAL_ACCESS` environment variable. The `instrumentation.js` Next.js lifecycle hook injects this value as a request header when calling `api-internal.dp.la`. An ALB listener rule checks for this header to gate access to the internal VPC endpoint. This value is never exposed to the browser.

---

## Accessibility

Two VPAT 2.4 conformance reports are maintained in [`accessibility/`](accessibility/):

- [`accessibility/vpat-dpla.md`](accessibility/vpat-dpla.md) — dp.la
- [`accessibility/vpat-pro-dpla.md`](accessibility/vpat-pro-dpla.md) — pro.dp.la

**These are AI-generated drafts and have not been reviewed by a human accessibility specialist. They must not be used for procurement or distributed externally.**

Known accessibility gaps identified in the reports and codebase:

| Issue | WCAG criterion | Status |
|---|---|---|
| Empty `alt` text on search result thumbnails | 1.1.1 Non-text Content | Fail |
| Missing `<header>` and `<nav>` landmark regions | 1.3.6 Identify Purpose | Fail |
| Carousel navigation not keyboard-accessible | 2.1.1 Keyboard | Fail |
| No captions on video content | 1.2.2 Captions | Fail |
| Contact form validation errors not announced to screen readers | 4.1.3 Status Messages | Fail |
| Newsletter signup checkbox has no `<label>` | 1.3.1 Info and Relationships | Fail |
| Footer icon links (Bluesky, YouTube) lack accessible names | 4.1.2 Name, Role, Value | Fail |
| Skip-to-content link target missing `tabindex="-1"` | 2.4.1 Bypass Blocks | Partial |
| `role="main"` used instead of `<main>` element | 1.3.1 Info and Relationships | Partial |
| `autocomplete` attribute missing on email fields | 1.3.5 Identify Input Purpose | Partial |
| Primary link color (`#ca4316`) borderline contrast on white (~4.6:1) | 1.4.3 Contrast | Borderline |

No formal accessibility statement is published on dp.la or pro.dp.la.

---

## Known Issues and Deficiencies

- **Stale CodePipeline webhook.** All pipelines require a manual start after merging — the auto-trigger is broken due to an AWS CodeStar Connections migration. See [AWS ECS / CodeDeploy](#aws-ecs--codedeploy) for the fix.

- **CSP hash maintenance.** The `sha256` hashes in `next.config.js` must be updated on every Next.js version bump. See [Content Security Policy](#content-security-policy) for details and the migration path.

- **Topic browse endpoint.** The subtopic browse feature relies on a custom `/100_per_page` DPLA API endpoint that is not part of the public API contract and may not be supported in future API versions.

- **No cross-topic navigation.** Users cannot navigate from the last subtopic of one topic directly to the next topic without returning to the topic listing page.

- **Duplicate click-through tracking code.** Google Analytics event tracking for item click-throughs is duplicated across multiple components rather than extracted to a shared utility.

- **JSON-LD language codes.** `item.language` in JSON-LD markup returns only a human-readable language name, not an ISO 639 language code.

- **No formal accessibility statement.** The VPAT reports document significant unresolved accessibility issues. No accessibility statement is published on either public site.

---

## Adding a New Local Hub Site

1. Add a new entry to [`constants/local.js`](constants/local.js) with the hub's ID, name, filters, facets, routes, and feature flags.
2. Create `stylesheets/themes/{id}/theme.scss` with the hub's color variables (follow WCAG contrast requirements).
3. Add static content to `public/static/local/{id}/` — logo, favicon, hero image, and any Markdown page files referenced by `routes` in step 1.
4. Add the subdomain mapping to `LOCAL_SUBDOMAINS` in `constants/local.js`.
5. Update `next.config.js` rewrites if the hub needs any non-standard routing.
6. Add a GitHub Actions workflow at `.github/workflows/local-{id}.yml` (copy an existing one).
7. Provision an ECS cluster, ECR repository, CodePipeline, and CodeDeploy deployment group in AWS.

See [LOCAL.md](LOCAL.md) for detailed instructions on steps 1–4.

---

## Other Documentation

| Document | Contents |
|---|---|
| [LOCAL.md](LOCAL.md) | How to configure a new Local hub instance: env vars, static files, SCSS theming, `constants/local.js` |
| [pages/api/items/ITEMS-API.md](pages/api/items/ITEMS-API.md) | Items proxy API route: URL structure, authentication, response shape, use in the Lists feature |
| [accessibility/vpat-dpla.md](accessibility/vpat-dpla.md) | VPAT 2.4 draft for dp.la (AI-generated, unreviewed) |
| [accessibility/vpat-pro-dpla.md](accessibility/vpat-pro-dpla.md) | VPAT 2.4 draft for pro.dp.la (AI-generated, unreviewed) |
| [SECURITY.md](SECURITY.md) | Security policy and vulnerability reporting contact |
