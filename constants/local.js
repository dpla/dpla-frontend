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
  illinois: {
    theme: "illinois",
    provider: "%22Illinois%20Digital%20Heritage%20Hub%22",
    name: "Illinois Digital Heritage Hub",
    favicon: "favicon.png",
    logo: "logo.png",
    description:
      "The Illinois Digital Heritage Hub brings together unique digital cultural heritage resources from across Illinois. Explore collections immense in volume and rich in historical detail, including photographs, manuscripts, books, audio recordings, and videos. Established in 2015 by four institutions, the Chicago Public Library, the Consortium of Academic and Research Libraries of Illinois, the Illinois State Library, and the University of Illinois at Urbana-Champaign, the content of the IDHH is made possible by a network of more than one hundred contributors from across the state.",
    locationFacet: "%22Illinois%22",
    subjectFacet: "%22Illinois%22",
    hasAbout: true,
    hasTerms: false,
    hasContact: false
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
