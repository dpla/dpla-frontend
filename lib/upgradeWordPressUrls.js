const wordPressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export function upgradeWordPressUrls(html) {
  if (!html || !wordPressUrl) return html;
  const httpUrl = wordPressUrl.replace(/^https:\/\//, "http://");
  return html.replaceAll(httpUrl, wordPressUrl);
}
