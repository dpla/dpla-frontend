// JSON for an inline <script type="application/ld+json">. Escapes "<" so
// values containing "</script>" can't close the tag early.

const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

export default serializeJsonLd;
