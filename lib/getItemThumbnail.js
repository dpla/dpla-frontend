import { getDefaultThumbnail } from ".";


const THUMB_SERVER = "https://dp.la/thumb";

const getItemThumbnail = (item) => {
    return item.object
        ? `${THUMB_SERVER}/${item.id}`
        : getDefaultThumbnail(item.sourceResource.type);

};

export default getItemThumbnail;
