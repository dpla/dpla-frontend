import crypto from 'crypto';
import { setCookie } from 'lib/setCookie';

const CLIENT_ID = process.env.WIKIMEDIA_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.WIKIMEDIA_OAUTH_CLIENT_SECRET;
const COMMONS_BASE = 'https://commons.wikimedia.org/w';
const AUTH_ENDPOINT = `${COMMONS_BASE}/rest.php/oauth2/authorize`;
const TOKEN_ENDPOINT = `${COMMONS_BASE}/rest.php/oauth2/access_token`;
const COMMONS_API = `${COMMONS_BASE}/api.php`;
const TOKEN_COOKIE = 'wm_access_token';
const STATE_COOKIE = 'wm_oauth_state';
const FETCH_TIMEOUT_MS = 5000;
const CALLBACK_PATH = '/api/wikimedia/oauth?action=callback';
const REDIRECT_BASE = process.env.WIKIMEDIA_OAUTH_REDIRECT_BASE;

function getCallbackUrl(req) {
  if (REDIRECT_BASE) return REDIRECT_BASE + CALLBACK_PATH;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return proto + '://' + host + CALLBACK_PATH;
}

export default async function handler(req, res) {
  const { action } = req.query;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('Missing WIKIMEDIA_OAUTH_CLIENT_ID or WIKIMEDIA_OAUTH_CLIENT_SECRET');
    return res.status(500).json({ error: 'OAuth not configured' });
  }

  switch (action) {
    case 'login':
      return handleLogin(req, res);
    case 'callback':
      return handleCallback(req, res);
    case 'whoami':
      return handleWhoAmI(req, res);
    case 'logout':
      return handleLogout(req, res);
    default:
      return res.status(400).json({ error: 'Unknown action' });
  }
}

function handleLogin(req, res) {
  const state = crypto.randomBytes(16).toString('hex');

  setCookie(res, [{
    name: STATE_COOKIE,
    value: state,
    options: { httpOnly: true, secure: true, sameSite: 'Lax', path: '/', maxAge: 300 }
  }]);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: getCallbackUrl(req),
    state: state
  });

  res.redirect(302, AUTH_ENDPOINT + '?' + params.toString());
}

async function handleCallback(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  const expectedState = req.cookies?.[STATE_COOKIE];
  if (!state || !expectedState || state !== expectedState) {
    return res.status(403).json({ error: 'Invalid OAuth state' });
  }

  try {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: getCallbackUrl(req)
    });

    const tokenResp = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
    });

    if (!tokenResp.ok) {
      const errText = await tokenResp.text();
      console.error('OAuth token exchange failed:', errText);
      return res.status(502).json({ error: 'Token exchange failed' });
    }

    const tokenData = await tokenResp.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return res.status(502).json({ error: 'No access token received' });
    }

    setCookie(res, [
      {
        name: TOKEN_COOKIE,
        value: accessToken,
        options: { httpOnly: true, secure: true, sameSite: 'Strict', path: '/', maxAge: 60 * 60 * 4 }
      },
      {
        name: STATE_COOKIE,
        value: '',
        options: { httpOnly: true, secure: true, sameSite: 'Lax', path: '/', maxAge: 0 }
      }
    ]);

    res.redirect(302, '/projects/dpla-wikimedia/depictassist');
  } catch (err) {
    console.error('OAuth callback error:', err);
    return res.status(502).json({ error: 'Token exchange failed' });
  }
}

async function handleWhoAmI(req, res) {
  const token = req.cookies?.[TOKEN_COOKIE];

  if (!token) {
    return res.status(200).json({ username: null });
  }

  try {
    const apiUrl = COMMONS_API + '?action=query&meta=userinfo&format=json';
    const apiResp = await fetch(apiUrl, {
      headers: { 'Authorization': 'Bearer ' + token },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
    });

    if (!apiResp.ok) {
      return res.status(200).json({ username: null });
    }

    const data = await apiResp.json();
    const userinfo = data.query?.userinfo;

    if (!userinfo?.name || userinfo.id === 0) {
      return res.status(200).json({ username: null });
    }

    return res.status(200).json({ username: userinfo.name });
  } catch {
    return res.status(200).json({ username: null });
  }
}

function handleLogout(req, res) {
  setCookie(res, [{
    name: TOKEN_COOKIE,
    value: '',
    options: { httpOnly: true, secure: true, sameSite: 'Strict', path: '/', maxAge: 0 }
  }]);

  return res.status(200).json({ ok: true });
}
