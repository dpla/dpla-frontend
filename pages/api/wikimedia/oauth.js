import crypto from 'crypto';
import { serialize } from 'cookie';

const CLIENT_ID = process.env.WIKIMEDIA_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.WIKIMEDIA_OAUTH_CLIENT_SECRET;
const AUTH_ENDPOINT = 'https://meta.wikimedia.org/w/rest.php/oauth2/authorize';
const TOKEN_ENDPOINT = 'https://meta.wikimedia.org/w/rest.php/oauth2/access_token';
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
const TOKEN_COOKIE = 'wm_access_token';
const STATE_COOKIE = 'wm_oauth_state';

// Derive a stable 256-bit encryption key from the OAuth client secret.
// Used to encrypt cookie values so sensitive tokens are never stored as clear text.
const ENCRYPTION_KEY = CLIENT_SECRET
  ? crypto.createHash('sha256').update(CLIENT_SECRET).digest()
  : null;

function encrypt(plaintext) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', ENCRYPTION_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return iv.toString('base64') + '.' + encrypted.toString('base64') + '.' + tag.toString('base64');
}

function decrypt(ciphertext) {
  const [ivB64, dataB64, tagB64] = ciphertext.split('.');
  if (!ivB64 || !dataB64 || !tagB64) return null;
  try {
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      ENCRYPTION_KEY,
      Buffer.from(ivB64, 'base64')
    );
    decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
    return decipher.update(Buffer.from(dataB64, 'base64'), null, 'utf8') + decipher.final('utf8');
  } catch {
    return null;
  }
}

function getCallbackUrl(req) {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return proto + '://' + host + '/api/wikimedia/oauth?action=callback';
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

  res.setHeader('Set-Cookie', serialize(STATE_COOKIE, encrypt(state), {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/',
    maxAge: 300
  }));

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

  const encryptedState = req.cookies?.[STATE_COOKIE];
  const expectedState = encryptedState ? decrypt(encryptedState) : null;
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
      body: body.toString()
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

    res.setHeader('Set-Cookie', [
      serialize(TOKEN_COOKIE, encrypt(accessToken), {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        path: '/',
        maxAge: 60 * 60 * 4
      }),
      serialize(STATE_COOKIE, '', {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
        path: '/',
        maxAge: 0
      })
    ]);

    res.redirect(302, '/projects/dpla-wikimedia/depictassist');
  } catch (err) {
    console.error('OAuth callback error:', err);
    return res.status(502).json({ error: 'Token exchange failed' });
  }
}

async function handleWhoAmI(req, res) {
  const token = decryptTokenCookie(req);

  if (!token) {
    return res.status(200).json({ username: null });
  }

  try {
    const apiUrl = COMMONS_API + '?action=query&meta=userinfo&format=json';
    const apiResp = await fetch(apiUrl, {
      headers: { 'Authorization': 'Bearer ' + token }
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
  res.setHeader('Set-Cookie', serialize(TOKEN_COOKIE, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    path: '/',
    maxAge: 0
  }));

  return res.status(200).json({ ok: true });
}

/** Read and decrypt the access token from the cookie, or return null. */
export function decryptTokenCookie(req) {
  const raw = req.cookies?.[TOKEN_COOKIE];
  if (!raw) return null;
  return decrypt(raw);
}
