import { serialize } from 'cookie';

/**
 * Set one or more cookies on the response via Set-Cookie header.
 * Each entry is { name, value, options }.
 */
export function setCookie(res, cookies) {
  const headers = cookies.map(({ name, value, options }) =>
    serialize(name, value, options)
  );
  res.setHeader('Set-Cookie', headers.length === 1 ? headers[0] : headers);
}
