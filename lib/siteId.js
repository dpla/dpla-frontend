// Which site served the hit
// One of "user", "pro", "cqa", or a local hub id
const siteId = () =>
  process.env.NEXT_PUBLIC_SITE_ENV === "local"
    ? process.env.NEXT_PUBLIC_LOCAL_ID
    : process.env.NEXT_PUBLIC_SITE_ENV;

export default siteId;
