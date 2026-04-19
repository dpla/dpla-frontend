// Server-side proxy for authenticated Wikimedia Commons API calls.
// The OAuth access token is stored in an httpOnly cookie (never exposed to
// client JS). This route reads the token and forwards requests to Commons
// with Bearer auth.

const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
const TOKEN_COOKIE = 'wm_access_token';
const FETCH_TIMEOUT_MS = 10000;

// Only proxy the specific Commons actions the client needs.
const ALLOWED_GET_ACTIONS = new Set(['query']);
const ALLOWED_POST_ACTIONS = new Set(['wbeditentity']);

export default async function handler(req, res) {
  const token = req.cookies?.[TOKEN_COOKIE];
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (req.method === 'GET') {
    return handleGet(req, res, token);
  }
  if (req.method === 'POST') {
    return handlePost(req, res, token);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

async function handleGet(req, res, token) {
  const { _proxy, ...params } = req.query;

  if (!ALLOWED_GET_ACTIONS.has(params.action)) {
    return res.status(400).json({ error: 'Action not allowed' });
  }

  const qs = new URLSearchParams(params);
  qs.set('format', 'json');

  try {
    const apiResp = await fetch(COMMONS_API + '?' + qs.toString(), {
      headers: { Authorization: 'Bearer ' + token },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
    });
    return await forwardCommonsResponse(apiResp, res);
  } catch (err) {
    console.error('Commons proxy GET error:', err);
    return res.status(502).json({ error: 'Commons API request failed' });
  }
}

async function handlePost(req, res, token) {
  const bodyParams = typeof req.body === 'string'
    ? Object.fromEntries(new URLSearchParams(req.body))
    : req.body;

  if (!ALLOWED_POST_ACTIONS.has(bodyParams?.action)) {
    return res.status(400).json({ error: 'Action not allowed' });
  }

  try {
    const apiResp = await fetch(COMMONS_API, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(bodyParams).toString(),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
    });
    return await forwardCommonsResponse(apiResp, res);
  } catch (err) {
    console.error('Commons proxy POST error:', err);
    return res.status(502).json({ error: 'Commons API request failed' });
  }
}

async function forwardCommonsResponse(apiResp, res) {
  const contentType = apiResp.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await apiResp.json();
    return res.status(apiResp.ok ? 200 : apiResp.status).json(data);
  }
  const text = await apiResp.text();
  console.error('Commons API returned non-JSON response:', apiResp.status, text.slice(0, 200));
  return res.status(apiResp.status).json({ error: 'Commons API returned non-JSON response' });
}
