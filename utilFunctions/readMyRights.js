import { rightsURLs } from "constants/site";

const readMyRights = theString => {
  // in case it's an http url
  theString = theString
    ? theString.toString().toLowerCase().replace(/https?:\/\//, "")
    : null;
  // check to see if url has a version (only works for "1.0" pattern)
  if (/\d\.\d/.test(theString)) {
    // it could be a proper URI, replace with placeholder
    const str = theString.replace(/\d\.\d/, "{version}");
    if (rightsURLs[str]) {
      let myRights = rightsURLs[str];
      const version = theString.match(/\d\.\d/)[0]; // only takes 1st occurrence
      // replace placeholder with version
      myRights.url = myRights.url.replace("{version}", version);
      return myRights;
    }
  }
  return null;
};

export default readMyRights;
