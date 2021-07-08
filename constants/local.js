const LOCALS = {
  plains2peaks: {
    theme: "plains2peaks",
    provider: "%22Plains%20to%20Peaks%20Collective%22",
    background: "home-hero-bg.jpg",
    name: "Plains to Peaks Collective",
    favicon: "favicon.png",
    logo: "logo.png",
    description: "",
    locationFacet: "%22Colorado%20OR%20Wyoming%22",
    subjectFacet: "%22Colorado%20OR%20Wyoming%22",
    hasAbout: true,
    hasTerms: false,
    hasContact: true
  },
  wisconsin: {
    theme: "wisconsin",
    filters: [
      "provider.@id:http%3A//dp.la/api/contributor/wisconsin"
    ],
    name: "Recollection Wisconsin",
    favicon: "favicon.png",
    logo: "logo.png",
    background: "home-hero-bg.jpg",
    description: "Sharing our Stories. Exploring our Past.",
    locationFacet: "%22Wisconsin%22",
    subjectFacet: "%22Wisconsin%22",
    externalLink: "https://recollectionwisconsin.org",
    contactLink: "https://recollectionwisconsin.org/contact",
    hasAbout: false,
    hasTerms: false,
    hasBrowseByPartner: true
  },
  illinois: {
    theme: "illinois",
    filters: [
      "provider.@id:http%3A//dp.la/api/contributor/il"
    ],
    name: "Illinois Digital Heritage Hub",
    favicon: "favicon.png",
    logo: "logo.png",
    background: "home-hero-bg.jpg",
    description: "A Gateway to Illinois State History",
    locationFacet: "%22Illinois%22",
    subjectFacet: "*Illinois*",
    externalLink: "http://finditillinois.org/idhh/",
    hasAbout: true,
    hasTerms: false,
    hasSidebar: true,
    hasBrowseByPartner: true,
    hasBrowseAll: false,
    routes: {
      "/about" : {
        parentDir: "/about",
        path: "about.md",
        title: "About",
        description: "",
        isTopLevel: true,
        category: "About"
      },
      "/about/governance": {
        parentDir: "/about",
        path: "governance.md",
        title: "Governance",
        description: "",
        isTopLevel: false,
        category: "About"
      },
      "/about/usage-terms": {
        parentDir: "/about",
        path: "usage-terms.md",
        title: "Copyright and Usage",
        description: "",
        isTopLevel: false,
        category: "About"
      },
      "/about/outreach": {
        parentDir: "/about",
        path: "outreach-materials.md",
        title: "Outreach Materials",
        description: "",
        isTopLevel: false,
        category: "About"
      },
      "/about/privacy": {
        parentDir: "/about",
        path: "privacy.md",
        title: "Privacy",
        description: "",
        isTopLevel: false,
        category: "About"
      },
      "/about/image-credits": {
        parentDir: "/about",
        path: "image-credits.md",
        title: "Image Credits",
        description: "",
        isTopLevel: false,
        category: "About"
      },
      "/about/contact": {
        parentDir: "/about",
        path: "contact.md",
        title: "Contact",
        description: "",
        isTopLevel: false,
        category: "About"
      },
      "/for-contributors": {
        parentDir: "/for-contributors",
        path: "for-contributors.md",
        title: "For Contributors",
        description: "",
        isTopLevel: true,
        category: "For Contributors"
      },
      "/for-contributors/harvest-workflow": {
        parentDir: "/for-contributors",
        path: "harvest-workflow.md",
        title: "Harvest Workflow",
        description: "",
        isTopLevel: false,
        category: "For Contributors"
      },
      "/for-contributors/readiness": {
        parentDir: "/for-contributors",
        path: "readiness.md",
        title: "Readiness Checklist",
        description: "",
        isTopLevel: false,
        category: "For Contributors"
      },
      "/for-contributors/metadata": {
        parentDir: "/for-contributors",
        path: "metadata.md",
        title: "Metadata Resources",
        description: "",
        isTopLevel: false,
        category: "For Contributors"
      },
      "/for-contributors/provider-metadata-guide": {
        parentDir: "/for-contributors",
        path: "provider-metadata-guide.md",
        title: "Provider Metadata Guide",
        description: "",
        isTopLevel: false,
        category: "For Contributors"
      },
      "/for-contributors/subject-metadata-guide": {
        parentDir: "/for-contributors",
        path: "subject-metadata-guide.md",
        title: "Subject Metadata Guide",
        description: "",
        isTopLevel: false,
        category: "For Contributors"
      },
      "/for-contributors/type-metadata-guide": {
        parentDir: "/for-contributors",
        path: "type-metadata-guide.md",
        title: "Type Metadata Guide",
        description: "",
        isTopLevel: false,
        category: "For Contributors"
      },
      "/for-contributors/copyright": {
        parentDir: "/for-contributors",
        path: "copyright.md",
        title: "Copyright Resources",
        description: "",
        isTopLevel: false,
        category: "For Contributors"
      },
      "/for-contributors/rights-statements-guide": {
        parentDir: "/for-contributors",
        path: "rights-statements-guide.md",
        title: "Rights Statements Guide",
        description: "",
        isTopLevel: false,
        category: "For Contributors"
      },
      "/for-contributors/analytics": {
        parentDir: "/for-contributors",
        path: "analytics.md",
        title: "Analytics",
        description: "",
        isTopLevel: false,
        category: "For Contributors"
      },
      "/for-educators": {
        parentDir: "/for-educators",
        path: "for-educators.md",
        title: "For Educators",
        description: "",
        isTopLevel: true,
        category: "For Educators"
      },
      "/for-educators/search-tips": {
        parentDir: "/for-educators",
        path: "search-tips.md",
        title: "Search Tips",
        description: "",
        isTopLevel: false,
        category: "For Educators"
      }
    }
  },
  tennessee: {
    theme: "tennessee",
    filters: [
      "provider.@id:http%3A//dp.la/api/contributor/tennessee"
    ],
    name: "Digital Library of Tennessee",
    background: "home-hero-bg.jpg",
    favicon: "favicon.png",
    logo: "logo.png",
    description: "Sharing Stories From the Volunteer State",
    locationFacet: "%22Tennessee%22",
    subjectFacet: "%22Tennessee%22",
    hasAbout: true,
    hasTerms: false,
    hasBrowseAll: false,
    routes: {
      "/about": {
        parentDir: "/about",
        path: "about.md",
        title: "About",
        description: "",
        isTopLevel: true,
        category: "About"
      }
    }
  },
  florida: {
    theme: "florida",
    filters: [
      "provider.@id:http%3A//dp.la/api/contributor/florida"
    ],
    name: "Sunshine State Digital Network",
    background: "home-hero-bg.png",
    favicon: "favicon.png",
    logo: "logo.png",
    description: "Sharing Stories From the Sunshine State",
    externalLink: "https://sunshinestatedigitalnetwork.wordpress.com/",
    locationFacet: "%22Florida%22",
    subjectFacet: "%22Florida%22",
    hasAbout: false,
    hasTerms: false,
    hasBrowseByPartner: true,
    hasBrowseAll: false
  },
  bigsky: {
    theme: "bigsky",
    filters: [
      "provider.@id:http%3A//dp.la/api/contributor/mt"
    ],
    name: "Big Sky Country Digital Network",
    favicon: "favicon.png",
    logo: "logo.png",
    background: "home-hero-bg.png",
    description: "",
    locationFacet: "%22Montana%20OR%20North%20Dakota%22",
    subjectFacet: "%22Montana%20OR%20North%20Dakota%22",
    hasAbout: true,
    hasTerms: false,
    hasBrowseByPartner: true,
    hasBrowseAll: false,
    hasSidebar: false,
    expandBody: true,
    routes: {
      "/about" : {
        parentDir: "/about",
        path: "about.md",
        title: "About BSCDN",
        description: "",
        isTopLevel: true,
        category: "About"
      },
      "/contact": {
        parentDir: "/contact",
        path: "contact.md",
        title: "Contact",
        isTopLevel: true,
        category: "Contact"
      },
      "/north-dakota": {
        path: "northdakota.md",
        title: "North Dakota",
        isTopLevel: true,
        description: "",
        category: "North Dakota"
      },
      "/montana": {
        path: "montana.md",
        title: "Montana",
        isTopLevel: true,
        description: "",
        category: "Montana"
      }
    }
  },
  aviation: {
    theme: "aviation",
    name: "Cleared for Takeoff: Explore Commercial Aviation",
    favicon: "favicon.png",
    logo: "aviation-logo.png",
    background: "aviation-banner.jpg",
    description: "",
    hasAbout: true,
    hasTerms: false,
    hasBrowseByPartner: true,
    hasBrowseAll: true,
    hasSidebar: false,
    filters: [
      "tags:aviation"
    ],
    routes: {
      "/about" : {
        parentDir: "/about",
        path: "about.md",
        title: "About",
        description: "",
        isTopLevel: true,
        category: "About"
      },
      "/primary-source-set" : {
        parentDir: "/primary-source-set",
        path: "",
        title: "Primary Source Set",
        description: "",
        isTopLevel: true,
        category: "Primary Source Set"
      },
      "/exhibition" : {
        parentDir: "/exhibition",
        path: "",
        title: "Commercial Aviation Exhibition",
        description: "",
        isTopLevel: true,
        category: "Commercial Aviation Exhibition"
      }
    }
  },
  blackwomenssuffrage: {
    theme: "blackwomenssuffrage",
    name: "Black Womens' Suffrage Portal",
    favicon: "favicon.png",
    logo: "logo.png",
    background: "home-hero-bg.png",
    description: "",
    hasAbout: true,
    hasTerms: false,
    hasBrowseByPartner: false,
    hasBrowseAll: false,
    hasSidebar: true,
    filters: [
      "tags:blackwomensuffrage"
    ],
    routes: {
      "/about" : {
        parentDir: "/about",
        path: "about.md",
        title: "About",
        description: "",
        isTopLevel: true,
        category: "About"
      },
      "/timeline" : {
          parentDir: "/timeline",
          path: "timeline.md",
          title: "Timeline",
          description: "Black Women and the Vote",
          isTopLevel: true,
          category: "Timeline"
      },
      "/timeline/1820-1859": {
        parentDir: "/timeline",
        path: "1820-1859.md",
        title: "1820-1859",
        description: "",
        isTopLevel: false,
        category: "Timeline"
      },
      "/timeline/1860-1869": {
        parentDir: "/timeline",
        path: "1860-1869.md",
        title: "1860-1869",
        description: "",
        isTopLevel: false,
        category: "Timeline"
      },
      "/timeline/1870-1889": {
        parentDir: "/timeline",
        path: "1870-1889.md",
        title: "1870-1889",
        description: "",
        isTopLevel: false,
        category: "Timeline"
      },
      "/timeline/1890-1899": {
        parentDir: "/timeline",
        path: "1890-1899.md",
        title: "1890-1899",
        description: "",
        isTopLevel: false,
        category: "Timeline"
      },
      "/timeline/1900-1909": {
        parentDir: "/timeline",
        path: "1900-1909.md",
        title: "1900-1909",
        description: "",
        isTopLevel: false,
        category: "Timeline"
      },
      "/timeline/1910-1919": {
        parentDir: "/timeline",
        path: "1910-1919.md",
        title: "1910-1919",
        description: "",
        isTopLevel: false,
        category: "Timeline"
      },
      "/timeline/1920-1929": {
        parentDir: "/timeline",
        path: "1920-1929.md",
        title: "1920-1929",
        description: "",
        isTopLevel: false,
        category: "Timeline"
      },
      "/timeline/1930-1959": {
        parentDir: "/timeline",
        path: "1930-1959.md",
        title: "1930-1959",
        description: "",
        isTopLevel: false,
        category: "Timeline"
      },
      "/timeline/1960-present": {
        parentDir: "/timeline",
        path: "1960-present.md",
        title: "1960-Present",
        description: "",
        isTopLevel: false,
        category: "Timeline"
      },
      "/timeline/sources": {
        parentDir: "/timeline",
        path: "timeline-sources.md",
        title: "Sources",
        description: "",
        isTopLevel: false,
        category: "Timeline"
      },

      "/key-figures" : {
        parentDir: "/key-figures",
        path: "key-figures.md",
        title: "Key Figures",
        description: "",
        isTopLevel: true,
        category: "Key Figures"
      },
      "/key-figures/charlotte-vandine-forten": {
        parentDir: "/key-figures",
        path: "charlotte-vandine-forten.md",
        title: "Charlotte Vandine Forten",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/sojourner-truth": {
        parentDir: "/key-figures",
        path: "sojourner-truth.md",
        title: "Sojourner Truth",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/harriet-forten-purvis": {
        parentDir: "/key-figures",
        path: "harriet-forten-purvis.md",
        title: "Harriet Forten Purvis",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/margaretta-forten": {
        parentDir: "/key-figures",
        path: "margaretta-forten.md",
        title: "Margaretta Forten",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/mary-ann-shadd-cary": {
        parentDir: "/key-figures",
        path: "mary-ann-shadd-cary.md",
        title: "Mary Ann Shadd Cary",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/frances-ellen-watkins-harper": {
        parentDir: "/key-figures",
        path: "frances-ellen-watkins-harper.md",
        title: "Frances Ellen Watkins Harper",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/sarah-remond": {
        parentDir: "/key-figures",
        path: "sarah-remond.md",
        title: "Sarah Remond",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/charlotte-forten-grimke": {
        parentDir: "/key-figures",
        path: "charlotte-forten-grimke.md",
        title: "Charlotte Forten Grimké",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/harriet-purvis-jr": {
        parentDir: "/key-figures",
        path: "harriet-purvis-jr.md",
        title: "Harriet Purvis, Jr.",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/josephine-st-pierre-ruffin": {
        parentDir: "/key-figures",
        path: "josephine-st-pierre-ruffin.md",
        title: "Josephine St. Pierre Ruffin",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/charlotte-lottie-rollin": {
        parentDir: "/key-figures",
        path: "charlotte-lottie-rollin.md",
        title: "Charlotte \"Lottie\" Rollin",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/fannie-barrier-williams": {
        parentDir: "/key-figures",
        path: "fannie-barrier-williams.md",
        title: "Fannie Barrier Williams",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/mary-church-terrell": {
        parentDir: "/key-figures",
        path: "mary-church-terrell.md",
        title: "Mary Church Terrell",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/mary-talbert": {
        parentDir: "/key-figures",
        path: "mary-talbert.md",
        title: "Mary Talbert",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/lugenia-burns-hope": {
        parentDir: "/key-figures",
        path: "lugenia-burns-hope.md",
        title: "Lugenia Burns Hope",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/nannie-helen-burroughs": {
        parentDir: "/key-figures",
        path: "nannie-helen-burroughs.md",
        title: "Nannie Helen Burroughs",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/angelina-weld-grimke": {
        parentDir: "/key-figures",
        path: "angelina-weld-grimke.md",
        title: "Angelina Weld Grimké",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      },
      "/key-figures/fannie-lou-hamer": {
        parentDir: "/key-figures",
        path: "fannie-lou-hamer.md",
        title: "Fannie Lou Hamer",
        description: "",
        isTopLevel: false,
        category: "Key Figures"
      }
    }
  },
  vermont: {
    theme: "vermont",
    filters: [
      "provider.@id:http%3A//dp.la/api/contributor/vt"
    ],
    name: "Vermont Green Mountain Digital Archive",
    background: "home-hero-bg.jpg",
    favicon: "favicon.ico",
    logo: "logo.jpg",
    heroLogo: "logo-big.jpg",
    description: "Vermont Green Mountain Digital Archive",
    externalLink: "https://libraries.vermont.gov/GMDA",
    locationFacet: "%22Vermont%22",
    subjectFacet: "%22Vermont%22",
    hasAbout: true,
    hasTerms: false,
    hasSidebar: false,
    hasBrowseByPartner: true,
    hasBrowseAll: false,
    routes: {
      "/about" : {
        parentDir: "/about",
        path: "about.md",
        title: "About",
        description: "",
        isTopLevel: true,
        category: "About"
      }
    }
  },
  oklahoma: {
    theme: "oklahoma",
    filters: [
      "provider.@id:http%3A//dp.la/api/contributor/oklahoma"
    ],
    name: "OK Hub",
    background: "home-hero-bg.jpg",
    favicon: "favicon.ico",
    logo: "logo.jpg",
    heroLogo: "logo-big.jpg",
    description: "Vermont Green Mountain Digital Archive",
    externalLink: "https://dpla-okhub.library.okstate.edu/",
    locationFacet: "%22Oklahoma%22",
    subjectFacet: "%22Oklahoma%22",
    hasAbout: true,
    hasTerms: false,
    hasSidebar: false,
    hasBrowseByPartner: true,
    hasBrowseAll: false,
    routes: {
      "/about" : {
        parentDir: "/about",
        path: "about.md",
        title: "About",
        description: "",
        isTopLevel: true,
        category: "About"
      }
    }
  },
};

exports.LOCALS = LOCALS; // so it can be read/imported by next.config.js
