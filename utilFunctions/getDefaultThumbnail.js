import { resourceTypes } from "constants/site";
import { joinIfArray } from ".";

const imageIcon = "/static/placeholderImages/Image.svg";
const soundIcon = "/static/placeholderImages/Sound.svg";
const videoIcon = "/static/placeholderImages/Video.svg";
const textIcon = "/static/placeholderImages/Text.svg";

const getDefaultThumbnail = type => {
  type = joinIfArray(type);
  if (type === resourceTypes.TEXT) {
    return textIcon;
  } else if (type === resourceTypes.SOUND) {
    return soundIcon;
  } else if (type === resourceTypes.VIDEO) {
    return videoIcon;
  } else {
    return imageIcon;
  }
};

export default getDefaultThumbnail;
