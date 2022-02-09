export const exhibitFilesHelper = (url, currentUrl) => {
    if (url) {
        return url.replace(process.env.OMEKA_URL, `${currentUrl}/api/exhibits`);
    } else {
        return url
    }
}
