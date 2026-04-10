import React from "react";
import ErrorLinksUser from "components/ErrorComponents/ErrorLinksUser";
import ErrorLinksPro from "components/ErrorComponents/ErrorLinksPro";
import ErrorLinksLocal from "components/ErrorComponents/ErrorLinksLocal";

function ErrorLinks() {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  if (siteEnv === "user") return <ErrorLinksUser />;
  if (siteEnv === "pro") return <ErrorLinksPro />;
  if (siteEnv === "local") return <ErrorLinksLocal />;
  return <ErrorLinksUser />;
}

export default ErrorLinks;
