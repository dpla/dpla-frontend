# Botnet & Abuse Incident History

This document summarizes distributed bot attacks and abuse campaigns that affected DPLA's
public-facing sites between March and May 2026. It is published to help partner developers
understand the threat landscape, explain changes to API rate limiting and access policies,
and share lessons that may be useful to similar small cultural-heritage organizations.

Details that would assist attackers — specific infrastructure identifiers, WAF rule logic,
rate-limit thresholds, or internal endpoint names — have been omitted.

---

## Background

DPLA operates twelve Next.js sites (dp.la, pro.dp.la, and ten regional hub sites) behind
AWS CloudFront and AWS WAF, backed by an Elasticsearch cluster shared across all sites.
A single-tenant Scala API serves both the public (`api.dp.la`) and the frontend SSR layer.

Because every server-side page render issues one or more Elasticsearch queries, distributed
scraping of the frontend is functionally equivalent to API abuse — bots that hit search pages
at volume exhaust the same ES thread pool that legitimate users depend on.

---

## Incident Timeline

### March 28 — First Singapore botnet

A distributed botnet of approximately 18,500 unique IP addresses, primarily located in
Singapore, flooded the dp.la search pages. Bots spoofed current Chrome browser user-agent
strings in a way that was indistinguishable from real browsers at the signature level —
Chrome's "UA Reduction" feature (default since Chrome 107) causes all real Chrome browsers
to report version strings like `Chrome/X.0.0.0`, so the botnet's UA strings were not
obviously fake.

AWS Bot Control in COMMON mode (signature-based detection) did not catch the traffic.
ES CPU spiked and the site degraded.

**Response:** Geographic access controls were tightened for the highest-risk origin countries.
Bot Control was upgraded from COMMON to TARGETED mode, which uses JavaScript challenges and
machine-learning behavioral analysis rather than signatures alone.

---

### March 30 — Second attack (same campaign)

The same botnet returned two days later with the same user-agent pattern. Geographic controls
stopped it immediately once applied: request rates dropped roughly five-fold within one minute,
and ES CPU normalized.

---

### April 1 — Headless browser CAPTCHA bypass

A small cluster of bots (seven IPs across six countries) was found to be solving the
geographic CAPTCHA challenges using headless Chromium. Evidence: browser console breadcrumbs
in Sentry errors included Chinese-language scraper debug output describing page-stability
detection. The bots used an older Chrome version (112) that real browsers no longer ship.

**Response:** A block rule was added for old Chrome versions originating from high-risk
geographic zones.

---

### April 9 — Wildcard crawler against a regional hub site

A distributed botnet crawled a regional hub site's faceted search results using leading
wildcard queries. These are among the most expensive query types in Elasticsearch — a full
term-dictionary scan per shard. With 65–130 concurrent wildcard queries, all six ES nodes
hit 88–95% CPU and the cluster stopped responding. Three CloudWatch alarms fired within
90 minutes.

Per-IP rate limiting was ineffective: the botnet distributed load across hundreds of source
IPs, each sending a single request per burst. The bot used a consistent, recognizably old
browser user-agent (Chrome 2018 vintage) that no real user in 2026 would have.

**Key lesson:** UA-based blocking is far more effective than per-IP rate limiting against
distributed botnets. A botnet with hundreds of IPs each sending one request will always
evade per-IP thresholds. A consistent spoofed UA is the weak point to target.

**Response:** A user-agent block rule for the specific outdated browser string was added.
It was immediately effective — all subsequent requests from this botnet were blocked at the
CDN edge.

---

### April 13 — Tencent Cloud datacenter botnet (not documented in this file's timeline)

*See April 23–24 for the larger Tencent incident.*

---

### April 20 — Two-spike event

Two CloudWatch alarm firings on the same afternoon with different root causes.

**Spike 1:** Users with deep-paginated search sessions (browsing to page 98–100 of faceted
results) caused Elasticsearch timeouts. At that depth, ES must score approximately 2,000
documents before returning 20 results, taking 18–20 seconds and hitting the API request
timeout. A burst of simultaneous such requests caused cascading 503 errors.

**Spike 2:** A 12,750-IP botnet with 19 rotating fake user-agent strings (old browsers:
Opera 8, various Chrome 10–39 vintages, Firefox 2, IE 11, etc.) and a distinctive
double-encoded malformed URL pattern hit dp.la. The CDN's geo controls and existing UA
blocklist caught approximately 96% of requests at the edge. The remaining 4% reached the
origin and, combined with concurrent background API traffic, briefly saturated the ES
thread pool for approximately two minutes.

**Lesson:** Rate limiters are reactive — every IP starts at a count of zero when a new
burst begins. All initial requests get through before thresholds accumulate. Systems would
need to be significantly undersized for a burst of this scale to cause sustained failure.

**Response:** Analysis only; no new rules added. Recommendations for API-side pagination
depth limits were noted (not yet implemented at time of writing).

---

### April 22 — Three-event day (deep pagination + distributed fake-UA botnet + library aggregator)

**Event 1 (overnight):** A single IP from a hosting provider systematically deep-paginated
the API with `page_size=500` at extreme depths (equivalent to ES `from=52,000,000+`). Each
request forces ES to score tens of millions of documents. A rate-limit rule was added for
high-depth or large-page-size queries.

**Event 2 (mid-morning):** A ~4,600-IP distributed botnet with rotating old-browser UAs
targeting the same double-encoded URL fingerprint from the April 20 incident. A UA block
rule covering the observed patterns was deployed and recorded thousands of blocks in the
following 12 hours.

**Event 3 (evening):** A single library system's PHP HTTP client sent a burst at 4.6× normal
API volume, exhausting the Scala API's internal Elasticsearch concurrency limit (a semaphore
that caps simultaneous in-flight ES requests per API task). ES response times ballooned to
10–13 seconds; new requests couldn't acquire a permit within the timeout window and returned
500 errors. The spike lasted two minutes; the system self-recovered.

**Lesson from Event 3:** Per-IP rate limits are insufficient for library and aggregator
clients that route all traffic through a single IP (NAT or proxy). Per-API-key rate limits
are the correct granularity for these actors.

---

### April 23–24 — Tencent botnet + Chrome impersonation (circuit breaker cycling)

**Phase 1 (April 23 evening):** A new botnet with a distinct fingerprint: part single-IP
high-volume, part distributed cluster from a known cloud provider's IP ranges. Targeted the
`/search` endpoint (server-side rendered), triggering frontend → API → ES call chains at
volume. ES concurrency exhausted; circuit breaker opened and began cycling.

**Phase 2 (April 24 morning):** Substantially larger escalation. New bot fingerprints
identified: fake browser UAs using a major Safari version number Apple had not yet shipped
(which became a real version the same afternoon — see below), and fake ChromeOS UAs with a
suspiciously uniform build string identical across all source IPs. Real device fleets have
build string variation; uniform strings across hundreds of IPs are a definitive botnet signal.

The Tencent Cloud IP ranges used were progressively identified and blocked; the circuit
breaker alarm cleared once the IP-range coverage was sufficient.

**Phase 3 (April 24 afternoon):** Approximately two hours after Phase 2 resolved, a new
wave arrived using US residential IP addresses and plausible current Chrome user-agents.
Analysis of browser header patterns revealed a uniform `Accept-Language: zh-CN` value across
84% of source IPs — US residential IPs claiming Chinese-primary language preference for a
US digital library, a bot mass-configuration fingerprint. A rule targeting this signal
stopped the attack; bots adapted within minutes by rotating to English-language Accept-Language.

Aggressive temporary rate limiting (lowered thresholds for 35 minutes) broke the campaign's
momentum for the remainder of the day.

**Safari version number false positive:** The morning rule blocking a "future" Safari version
caused false positives by early afternoon when it became clear that Apple had already shipped
iOS 26 / macOS 26, aligning Safari's major version with the OS. The rule was reverted.

**Lesson:** Never block a browser version string without verifying the vendor hasn't already
released or announced that version. Safari major versions now track iOS/macOS major versions
annually — a "future" version may be a real production UA within months.

**Lesson:** Single-signal bot detection has a short half-life against an active, monitored
campaign. Bots adapt via success-rate feedback loops (monitoring block rates and rotating
request profiles when blocks spike), not by analyzing WAF rules. Use layered signals.

---

### May 1–4 — NWDH partner crawl campaign

A four-day operation targeting DPLA's partner collection sites via systematic faceted search
crawling. The bot cycled through multiple DPLA partner collections across Friday, Saturday,
and Monday (Sunday was an unrelated JVM GC pause). Monday's attack was the most severe:
approximately 985,000 requests in a three-hour window (2–5 AM local time), concentrated
from AWS cloud infrastructure in Ireland and the UK (833× and 97× above baseline for those
countries respectively).

Real user error rates on item pages reached 14% during the worst window. The circuit breaker
opened; the `api-5xx-high` alarm fired.

During post-incident analysis, a rate-limiting rule was found to have a regex bug that
prevented it from ever firing — a `?` character needed to match the start of a query string
was missing, causing the pattern to never match when the relevant parameter was first in the
query string. The rule had zero recorded fires across its entire operational history.

**Lesson:** Always verify rate-limit rules are actually firing by checking CloudWatch metrics
shortly after deployment. A rule with zero all-time metric hits is a red flag.

**Lesson:** Per-IP rate limiting is not a meaningful defense against distributed botnets.
During this 985K-request attack, no source IP exceeded the per-IP rate limit. The bot
distributed load across many IPs, each sending a small number of requests.

---

### May 5 — Sustained API scraping (Turning Leaf Technologies)

A registered API user had been running a sustained bulk harvesting operation for at least
seven days before discovery: approximately 150,000 Elasticsearch queries per day, distributed
across ~40 cloud provider IPs to stay below all per-IP rate limits, using a small page size
to appear cheap per-query.

The operation was deliberately structured to stay under every existing rate limit. It was
only discovered during an unrelated investigation. At peak it accounted for 23–33% of all
API requests reaching Elasticsearch.

**Lesson:** High-volume use by a single API key distributed across many IPs is currently
invisible without explicit per-key daily volume monitoring. Per-window rate limits are not
sufficient; per-key daily volume CloudWatch alarms are needed.

**Response:** Per-key rate limiting (aggregating across all IPs sharing a key) was added to
the API WAF. The key was throttled rather than disabled — disabling it risks the operator
simply registering a new key.

The operator was identified and contacted to explain the impact and offer bulk data access
via DPLA's bulk download program (`s3://dpla-master-dataset/`) as an alternative to
paginating the API.

---

### May 5–6 — Newsletter spike + Firefox/Linux distributed item scraper

**Newsletter spike:** A single email newsletter from a Wisconsin partner organization drove
a 7.7× traffic spike on the dp.la search pages — entirely legitimate traffic. This triggered
API alarms and circuit-breaker cycling before traffic normalized. A reminder that legitimate
viral traffic can cause the same infrastructure symptoms as a botnet.

**Firefox/Linux item scraper:** An overnight distributed scraper using Firefox in headless
mode, running on Linux, across approximately 2,600 unique IPs in a 20-minute window. Each
IP loaded static Next.js assets then fetched structured metadata for individual items — bulk
catalog harvesting dressed as browser traffic.

Firefox headless passes AWS Bot Control TARGETED challenges, which are tuned primarily for
Chromium-based headless browser signals. This is a known gap; Bot Control's ML detection
handles it less effectively than Chromium-based bots.

**Response:** A CAPTCHA challenge was added for Firefox on Linux accessing item metadata
paths. Legitimate Firefox/Linux users must solve one CAPTCHA; a token cookie is then issued
and they proceed silently on subsequent requests.

---

### May 7–8 — Chrome impersonation botnet (rotating residential IPs)

A sustained campaign using residential proxy IPs and current Chrome user-agent strings.
Static asset analysis (checking whether IPs that hit search pages also fetched JavaScript
and CSS) confirmed the bots were not real browsers: real browser sessions must load JS
bundles to render search results; the bots did not.

Browser header analysis revealed a pattern absent in the bot requests that is structurally
present in all genuine Chrome browsers for page navigations. A block rule targeting this
signal reduced traffic by approximately 88% immediately after deployment.

**Lesson:** The static asset test is a strong bot discriminator. A browser loading a
search page must fetch JavaScript. An IP that only calls `/search` and never fetches any
static assets is not a real browser.

**Lesson:** `sec-fetch-user` (the header indicating a user-initiated browser navigation)
is frequently missing from bot requests that carefully spoof other browser headers. When
checking for the absence of this header, the check must be scoped to navigation requests
(`sec-fetch-mode: navigate`) only — the header is also structurally absent on subresource
requests such as image loads, and an unscoped rule will block thumbnail images for real users.

An initial deployment of this rule had exactly this bug (bare absence check, not scoped to
navigations), causing all thumbnail images to return 403 errors for macOS Chrome users
within minutes of deployment. iOS Chrome was unaffected because it uses a different UA token.
The rule was hotfixed within the same deployment window.

---

### May 8–11 — Weekend campaign (continued)

Approximately 2.5 million bot requests blocked over four days. 76% came from Singapore
datacenter IP ranges already covered by an existing IP-set block rule; the remainder was
caught by UA and browser-header rules added during prior incidents. Nine minutes of
user-facing downtime on Saturday morning.

No new rules were needed — existing coverage from the May 7–8 hardening was sufficient.

A partner service (ProQuest Summon) was briefly caught by a datacenter IP-set block
because its crawler IPs overlap with cloud provider ranges. It was added to the search-engine
allowlist and unblocked.

---

### May 12 — API key registration scanner

A scanner operating from cloud provider IP space was making bulk POST requests to the API
key registration endpoint, cycling through disposable email addresses and common test strings.
It was discovered when the scanner registered a well-known technology company's support
address, causing DPLA's key-delivery email to reach their ticketing system, which auto-replied
to DPLA's info address.

Approximately 27% of accounts in the API key database were found to be scanner-created.
The vast majority of scanner-created keys made no real data requests (9 out of ~2,800 showed
any API query activity in a 7-day window).

**Response:** Rate limits on key registration per IP were added to the API WAF. Application-
level fixes for the registration endpoint (returning identical responses for new and existing
accounts to close a user-enumeration oracle, adding disposable domain detection) were
identified as pending work.

---

### May 12–18 — Recurring CloudFront POP failures (not a botnet)

Four separate API outages totaling approximately two hours over six days, all caused by
transient routing or infrastructure events at a single CloudFront edge POP through which
100% of API traffic routes. Not attack-related — investigations confirmed no requests were
arriving at the edge during the gaps.

A CloudWatch alarm was added to detect traffic gaps. An AWS Support case and a Route53
health check remain as open action items.

---

### May 21 — JS-executing residential scraper (Sentry noise)

A Sentry error cluster (`SyntaxError: Invalid or unexpected token`) from approximately
1,767 unique residential IP addresses, all reporting the exact same older Chrome build
version — a clear bot indicator (real Chrome auto-updates; identical patch versions across
thousands of IPs are impossible organically).

These bots execute a full JavaScript environment including Sentry's error SDK, which is why
they generate Sentry events. The errors occur in the bots' modified execution environments,
not in production code — no code fix is applicable.

The Sentry issue was archived (ignored). No WAF rule was added because the specific Chrome
build version still overlaps with real user traffic as of May 2026; a block would become
safe once that version reaches end-of-life.

---

## Attack Patterns Observed

Across these incidents, the following recurring attack patterns were observed:

**Distributed per-IP requests:** Most botnets distributed load so that no single IP exceeded
per-IP rate limits. A botnet of 10,000 IPs sending one request each produces the same ES
load as a single IP sending 10,000 requests, while completely defeating per-IP defenses.

**User-agent spoofing:** Bots consistently used outdated or fake browser UA strings. Older
browser versions (Chrome 10–39, Firefox 3, Opera 8, IE variants) are reliable signals —
no real user in 2026 runs a browser from 2011–2015.

**Geographic concentration:** Several campaigns showed extreme geographic elevation in
specific countries (Singapore, Ireland, UK at 100–800× baseline for those countries). This
was useful for identifying attacks in progress, though geo-blocking has collateral cost for
legitimate users in those countries.

**Headless/residential proxy adaptation:** More sophisticated campaigns used residential
proxy networks and/or real browser engines (Firefox headless), making them harder to
distinguish from legitimate traffic. These adapted in near-real-time when new block rules
were deployed.

**Expensive query targeting:** Several botnets specifically targeted expensive query patterns:
wildcard `q=*` searches, deep pagination, and multi-facet aggregation queries. These are
costly in Elasticsearch regardless of traffic volume — a small number of such queries can
saturate the cluster.

---

## Defensive Approaches Used

**Browser header fingerprinting:** Current browsers include a specific set of headers on
page navigation requests that are difficult for bots to reproduce correctly. Analysis of
which headers were absent in bot requests (vs. present in real browser samples) was the
most reliable discriminator for sophisticated campaigns.

**Static asset analysis:** A browser loading a search page must fetch JavaScript and CSS
bundles to render results. IPs that hit content paths but never request static assets are
not real browsers. This test was used to confirm bot clusters in CloudFront log analysis.

**User-agent blocklist:** An incrementally-built list of UA strings characteristic of bot
traffic: outdated browser versions, known scraping frameworks, and template placeholders
(`{version}` literal strings from unfilled bot configuration).

**Geographic controls:** CAPTCHA challenges for countries that are disproportionate sources
of attack traffic, calibrated to balance protection against collateral impact on legitimate
users.

**Datacenter IP set blocking:** Known cloud and datacenter IP ranges used by recurring
botnet campaigns are blocked outright.

**Bot Control TARGETED + ML:** AWS Bot Control in TARGETED mode (JavaScript challenge +
machine-learning behavioral analysis) catches campaigns that evade all signature-based rules.
The ML-based coordinated activity detection was activated after sampling confirmed it
flagged only bot traffic.

**Per-key rate limiting:** Rate limits aggregated by API key (rather than by IP) are
effective against multi-IP operations that share a single registered key.

**CAPTCHA for specific high-risk paths:** Narrow CAPTCHA rules on specific endpoint+UA
combinations (e.g., item metadata endpoints accessed by Firefox on Linux) balance protection
against verified bot patterns with minimal friction for real users.

---

## Operational Lessons

1. **UA-based blocking beats per-IP rate limiting against distributed botnets.** A botnet
   with hundreds of IPs each sending one request evades all per-IP thresholds. A consistent
   spoofed UA is the attack's weak point.

2. **Verify rules are firing.** A rule with zero all-time CloudWatch metric hits is a strong
   signal it has a bug. Check metrics after deployment and periodically.

3. **Per-key daily volume monitoring doesn't exist by default.** Per-window rate limits
   catch burst abuse; daily volume monitoring catches sustained operations that stay under
   every per-window threshold. Both are needed.

4. **Bots adapt via feedback, not rule inspection.** Bot operators monitor success rates
   and rotate request profiles when blocks spike. They don't read WAF rules. Design layered
   defenses that survive one signal being neutralized.

5. **Safari version strings track iOS/macOS major versions.** A "future" version becomes
   a real production UA within months. Never block a browser version without checking the
   vendor's release calendar.

6. **Header absence checks need scope guards.** Checking for the absence of a
   navigation-specific header without scoping the rule to navigation requests will block
   subresource loads (images, fonts, scripts) for real users.

7. **Headless Firefox bypasses Chromium-tuned bot detection.** AWS Bot Control TARGETED
   is primarily tuned for Chromium-based headless signals. Firefox headless may require
   endpoint-specific CAPTCHA rules.

8. **Deep pagination is expensive regardless of intent.** Server-side page depth limits
   (rejecting requests above a configurable depth before constructing the Elasticsearch
   query) eliminate an entire class of accidental and intentional ES saturation, independent
   of WAF configuration.

9. **ES query cache invalidation multiplies all other traffic.** A bug in date-filter
   construction that used relative time expressions (`now`) prevented Elasticsearch from
   caching filter bitsets. The result was a 0.76% cache hit rate — every query did a full
   tree traversal. Fixing this to use static date bounds produced a 98% cache hit rate
   within three minutes and halved ES CPU.

---

## API Rate Limits

In response to the above incidents, the following rate-limit categories were added to the
DPLA API. The specific thresholds are not published here; contact api@dp.la with questions
about your integration.

- **Per-key rate limit** — applies to all requests sharing a registered API key, regardless
  of source IP
- **Per-key expensive-query rate limit** — applies to queries matching patterns associated
  with high ES cost (wildcards, deep pagination, large page sizes, many facets)
- **Per-IP rate limit** — general flood protection
- **Key registration rate limit** — limits bulk account registration from a single IP

If your integration is being rate-limited and you need higher throughput, please consider
DPLA's bulk data download program (`s3://dpla-master-dataset/`) as an alternative to
paginating the search API for large-scale harvesting.

---

*Last updated: June 2026*
