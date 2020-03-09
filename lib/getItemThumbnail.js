import { THUMB_SERVER } from "constants/env";
import { getDefaultThumbnail } from ".";

const getItemThumbnail = (item) => {
    let url = item.object ? `${THUMB_SERVER}/${item.id}` : getDefaultThumbnail(item.sourceResource.type);
    return url;
};

export default getItemThumbnail;