export const exhibitFilesHelper = (url) => {
    if (url) {
        return url.replace(process.env.OMEKA_URL, `${process.env.BASE_URL}/api/exhibits`);
    } else {
        return url
    }
}
