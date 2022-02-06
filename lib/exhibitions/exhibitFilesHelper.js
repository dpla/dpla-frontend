export const exhibitFilesHelper = (url, currentUrl) =>
    url.replace(process.env.OMEKA_URL, `${currentUrl}/api/exhibits`);