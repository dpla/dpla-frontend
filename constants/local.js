const LOCALS = {
  wisconsin: {
    theme: "wisconsin",
    provider: "%22Recollection%20Wisconsin%22",
    name: "Recollection Wisconsin",
    favicon: "favicon.png",
    logo: "logo.png",
    description: "Sharing our Stories. Exploring our Past.",
    locationFacet: "%22Wisconsin%22",
    subjectFacet: "%22Wisconsin%22",
    externalLink: "https://recollectionwisconsin.org",
    contactLink: "https://recollectionwisconsin.org/contact",
    hasAbout: false,
    hasTerms: false,
    hasContact: true
  },
  tennessee: {
    theme: "tennessee",
    provider: "%22Digital%20Library%20of%20Tennessee%22",
    name: "Digital Library of Tennessee",
    favicon: "favicon.png",
    logo: "logo.png",
    description: "Sharing Stories From the Volunteer State",
    locationFacet: "%22Tennessee%22",
    subjectFacet: "%22Tennessee%22",
    hasAbout: true,
    hasTerms: false,
    hasContact: false
  }
};

exports.LOCALS = LOCALS; // so it can be read/imported by next.config.js
