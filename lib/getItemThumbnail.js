import { getDefaultThumbnail } from ".";

const THUMB_SERVER =
  process.env.THUMB_SERVER || "https://dp.la/thumb";

const getItemThumbnail = (item) => {
    let url = item.object ? `${THUMB_SERVER}/${item.id}` : getDefaultThumbnail(item.sourceResource.type);
    return url;
};

export default getItemThumbnail;