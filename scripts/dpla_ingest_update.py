import json, os, re, requests
from datetime import datetime, timedelta
from urllib.parse import quote

WP_USER     = os.environ['DPLA_WP_USER']
WP_PASSWORD = os.environ['DPLA_WP_APP_PASSWORD']
DPLA_KEY    = os.environ['DPLA_API_KEY']
SLACK_URL   = os.environ['DPLA_SLACK_WEBHOOK']

auth    = (WP_USER, WP_PASSWORD)
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}
now       = datetime.now()
yesterday = (now - timedelta(days=1)).strftime('%Y-%m-%d')

# --- Fetch DPLA data ---
providerurl  = f'https://api.dp.la/v2/items?facets=provider.name&api_key={DPLA_KEY}&page_size=0&facet_size=100'
providernames = json.loads(requests.get(providerurl).text)['facets']['provider.name']['terms']
ingestdates = {}
for provider in providernames:
    ingesturl = f'https://api.dp.la/v2/items?provider.name="{provider["term"]}"&api_key={DPLA_KEY}&page_size=1&fields=ingestDate'
    ingestdate = json.loads(requests.get(ingesturl).text)['docs'][0]['ingestDate']
    ingestdates[provider['term']] = ingestdate[:10]

# --- Sort into 4 groups ---
g30, g90, g365, gold = {}, {}, {}, {}
for hub, date in ingestdates.items():
    dt = datetime.strptime(date, '%Y-%m-%d')
    if dt > now - timedelta(days=30):
        g30[hub] = date
    elif dt > now - timedelta(days=90):
        g90[hub] = date
    elif dt > now - timedelta(days=365):
        g365[hub] = date
    else:
        gold[hub] = date

g30  = dict(sorted(g30.items(),  key=lambda x: x[1], reverse=True))
g90  = dict(sorted(g90.items(),  key=lambda x: x[1], reverse=True))
g365 = dict(sorted(g365.items(), key=lambda x: x[1], reverse=True))
gold = dict(sorted(gold.items(), key=lambda x: x[1], reverse=True))

print(f'30 days:  {len(g30)} hubs')
print(f'90 days:  {len(g90)} hubs')
print(f'365 days: {len(g365)} hubs')
print(f'Older:    {len(gold)} hubs')

# --- Generate table blocks ---
def make_table(hubs):
    rows = ''
    for hub, date in hubs.items():
        url = 'https://dp.la/search?partner=%22' + quote(hub) + '%22'
        rows += f'<tr><td><strong><a href="{url}">{hub}</a></strong></td><td>{date}</td></tr>'
    return (
        '<!-- wp:table -->\n'
        f'<figure class="wp-block-table"><table class="has-fixed-layout"><tbody>{rows}</tbody></table></figure>\n'
        '<!-- /wp:table -->'
    )

table_30  = make_table(g30)
table_90  = make_table(g90)
table_365 = make_table(g365)
table_old = make_table(gold)

# --- Fetch current page raw content ---
resp    = requests.get('https://dpla.wpengine.com/wp-json/wp/v2/pages/27879?context=edit', auth=auth, headers=headers)
content = resp.json()['content']['raw']

# --- Only publish if data has changed ---
table_pattern  = re.compile(r'<!-- wp:(?:buttons|table)[\s\S]*?-->.*?<!-- /wp:(?:buttons|table) -->', re.DOTALL)
existing_tables = table_pattern.findall(content)
new_tables      = [table_30, table_90, table_365, table_old]

if existing_tables == new_tables:
    print('No changes detected. WordPress update skipped.')
else:
    def replacer(tables):
        it = iter(tables)
        def _replace(m):
            return next(it)
        return _replace

    new_content  = table_pattern.sub(replacer(new_tables), content)
    update_resp  = requests.post(
        'https://dpla.wpengine.com/wp-json/wp/v2/pages/27879',
        auth=auth, headers=headers, json={'content': new_content}
    )
    if update_resp.status_code == 200:
        print('Data changed — page updated successfully!')
    else:
        print(update_resp.text[:500])
        raise SystemExit(1)

# --- Slack alert if any hub ingested yesterday ---
yesterday_hubs = {k: v for k, v in ingestdates.items() if v == yesterday}
if yesterday_hubs:
    lines = [f'*DPLA hubs ingested on {yesterday}:*']
    for hub in sorted(yesterday_hubs, key=yesterday_hubs.get, reverse=True):
        lines.append(f'• {hub}: {yesterday_hubs[hub]}')
    requests.post(SLACK_URL, json={'text': '\n'.join(lines)})
    print(f'Slack alert sent for {len(yesterday_hubs)} hub(s).')
else:
    print(f'No hubs ingested on {yesterday}. No Slack alert sent.')
