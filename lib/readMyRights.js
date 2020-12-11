import { rightsURLs } from "constants/site";

const readMyRights = theString => {
  // in case it's an http url
  theString = theString
    ? theString.toString().toLowerCase().replace(/https?:\/\//, "")
    : null;

    // if string includes creativecommons then return data without mutating
    if(theString.includes('creativecommons')) {
      return rightsURLs[theString]
    } else if (/\d\.\d/.test(theString)){
       // check to see if url has a version (only works for "1.0" pattern)
      const str = theString.replace(/\d\.\d/, "{version}");
      // it could be a proper URI, replace with placeholder
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
