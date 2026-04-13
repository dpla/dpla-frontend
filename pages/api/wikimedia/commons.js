// Server-side proxy for authenticated Wikimedia Commons API calls.
// The OAuth access token is stored encrypted in an httpOnly cookie.
// This route decrypts the token and forwards requests to Commons with
// Bearer auth.

import { decryptTokenCookie } from './oauth';

const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

export default async function handler(req, res) {
  const token = decryptTokenCookie(req);
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const origin = req.headers['x-forwarded-proto']
    ? req.headers['x-forwarded-proto'] + '://' + (req.headers['x-forwarded-host'] || req.headers.host)
    : 'https://' + req.headers.host;

  if (req.method === 'GET') {
    return handleGet(req, res, token, origin);
  }
  if (req.method === 'POST') {
    return handlePost(req, res, token, origin);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

async function handleGet(req, res, token, origin) {
  const { _proxy, ...params } = req.query;
  const qs = new URLSearchParams(params);
  qs.set('format', 'json');
  qs.set('origin', origin);

  try {
    const apiResp = await fetch(COMMONS_API + '?' + qs.toString(), {
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await apiResp.json();
    return res.status(apiResp.ok ? 200 : apiResp.status).json(data);
  } catch (err) {
    console.error('Commons proxy GET error:', err);
    return res.status(502).json({ error: 'Commons API request failed' });
  }
}

async function handlePost(req, res, token, origin) {
  try {
    const apiResp = await fetch(COMMONS_API + '?origin=' + encodeURIComponent(origin), {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: typeof req.body === 'string' ? req.body : new URLSearchParams(req.body).toString()
    });
    const data = await apiResp.json();
    return res.status(apiResp.ok ? 200 : apiResp.status).json(data);
  } catch (err) {
    console.error('Commons proxy POST error:', err);
    return res.status(502).json({ error: 'Commons API request failed' });
  }
}
