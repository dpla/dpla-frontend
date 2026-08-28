import html
import os
import re
import requests
from datetime import datetime, timedelta
from urllib.parse import quote

WP_USER = os.environ["DPLA_WP_USER"]
WP_PASSWORD = os.environ["DPLA_WP_APP_PASSWORD"]
DPLA_KEY = os.environ["DPLA_API_KEY"]
SLACK_URL = os.environ["DPLA_SLACK_WEBHOOK"]

auth = (WP_USER, WP_PASSWORD)
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}
now = datetime.now()
yesterday = (now - timedelta(days=1)).strftime("%Y-%m-%d")


def get_json(url, params=None):
    resp = requests.get(url, params=params, timeout=20)
    resp.raise_for_status()
    return resp.json()


# --- Fetch DPLA data ---
providernames = get_json(
    "https://api.dp.la/v2/items",
    params={
        "facets": "provider.name",
        "api_key": DPLA_KEY,
        "page_size": 0,
        "facet_size": 100,
    },
)["facets"]["provider.name"]["terms"]

ingestdates = {}
for provider in providernames:
    data = get_json(
        "https://api.dp.la/v2/items",
        params={
            "provider.name": f'"{provider["term"]}"',
            "api_key": DPLA_KEY,
            "page_size": 1,
            "fields": "ingestDate",
        },
    )
    docs = data.get("docs", [])
    if not docs:
        print(f"Warning: no docs returned for provider {provider['term']!r}")
        continue
    ingestdates[provider["term"]] = docs[0]["ingestDate"][:10]

# --- Sort into groups; order must match the table blocks on the WP page ---
# (max age in days, label); None catches everything older than the last cutoff
BUCKETS = [(45, "45 days"), (105, "105 days"), (365, "365 days"), (None, "Older")]

today = now.date()
groups = [{} for _ in BUCKETS]
for hub, date in ingestdates.items():
    dt = datetime.strptime(date, "%Y-%m-%d").date()
    for group, (days, _) in zip(groups, BUCKETS, strict=True):
        if days is None or dt >= today - timedelta(days=days):
            group[hub] = date
            break

groups = [dict(sorted(g.items(), key=lambda x: x[1], reverse=True)) for g in groups]

for (_, label), group in zip(BUCKETS, groups, strict=True):
    print(f"{label}: {len(group)} hubs")


# --- Generate table blocks ---
def make_table(hubs):
    rows = ""
    for hub, date in hubs.items():
        url = "https://dp.la/search?partner=%22" + quote(hub) + "%22"
        escaped_hub = html.escape(hub)
        rows += f'<tr><td><strong><a href="{url}">{escaped_hub}</a></strong></td><td>{date}</td></tr>'
    return (
        "<!-- wp:table -->\n"
        f'<figure class="wp-block-table"><table class="has-fixed-layout"><tbody>{rows}</tbody></table></figure>\n'
        "<!-- /wp:table -->"
    )


new_tables = [make_table(group) for group in groups]

# --- Fetch current page raw content ---
resp = requests.get(
    "https://dpla.wpengine.com/wp-json/wp/v2/pages/27879?context=edit",
    auth=auth,
    headers=headers,
    timeout=20,
)
resp.raise_for_status()
content = resp.json()["content"]["raw"]

# --- Only publish if data has changed ---
table_pattern = re.compile(r"<!-- wp:table -->.*?<!-- /wp:table -->", re.DOTALL)
existing_tables = table_pattern.findall(content)

if existing_tables == new_tables:
    print("No changes detected. WordPress update skipped.")
elif len(existing_tables) != len(new_tables):
    print(
        f"ERROR: expected {len(new_tables)} table blocks on page, found {len(existing_tables)}. Aborting update."
    )
    raise SystemExit(1)
else:

    def replacer(tables):
        it = iter(tables)

        def _replace(m):
            return next(it)

        return _replace

    new_content = table_pattern.sub(replacer(new_tables), content)
    update_resp = requests.post(
        "https://dpla.wpengine.com/wp-json/wp/v2/pages/27879",
        auth=auth,
        headers=headers,
        json={"content": new_content},
        timeout=20,
    )
    update_resp.raise_for_status()
    print("Data changed — page updated successfully!")

# --- Slack alert if any hub ingested yesterday ---
yesterday_hubs = {k: v for k, v in ingestdates.items() if v == yesterday}
if yesterday_hubs:
    lines = [f"*DPLA hubs ingested on {yesterday}:*"]
    for hub in sorted(yesterday_hubs, key=yesterday_hubs.get, reverse=True):
        lines.append(f"• {hub}: {yesterday_hubs[hub]}")
    slack_resp = requests.post(SLACK_URL, json={"text": "\n".join(lines)}, timeout=10)
    slack_resp.raise_for_status()
    print(f"Slack alert sent for {len(yesterday_hubs)} hub(s).")
else:
    print(f"No hubs ingested on {yesterday}. No Slack alert sent.")
