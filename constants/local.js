const LOCALS = {
  plains2peaks: {
    theme: "plains2peaks",
    filters: [
      "provider.@id:http%3A//dp.la/api/contributor/p2p"
    ],
    name: "Plains to Peaks Collective",
    favicon: "favicon.png",
    provider: "%22Plains%20to%20Peaks%20Collective%22",
    background: "p2p-hero.jpg",
    logo: "logo.png",
    heroLogo: "logo-big.png",
    description: "",
    locationFacet: "%22Colorado%20OR%20Wyoming%22",
    subjectFacet: "%22Colorado%20OR%20Wyoming%22",
    hasAbout: false,
    hasSidebar: true,
    hasBrowseByPartner: true,
    hasContact: true,
    routes: {
      "/about" : {
        parentDir: "/about",
        path: "about.md",
        title: "About",
        description: "",
        isTopLevel: true,
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
      "/about/terms" : {
        parentDir: "/about",
        path: "terms.md",
        title: "Terms of Use",
        description: "",
        isTopLevel: false,
        category: "About"
      },
      "/about/harmful-content" : {
        parentDir: "/about",
        path: "harmful-content.md",
        title: "Statement on Potentially Harmful Content",
        description: "",
        isTopLevel: false,
        category: "About"
      }
    }
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
    hasBrowseByPartner: true,
    hlsLink: "https://recollectionwisconsin.org/harmful-content-statement",
    hlsLinkText: "our Statement on Harmful Content"
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
    externalLink: "https://www.library.illinois.edu/idhh-highlights/",
    hasAbout: true,
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
    hasBrowseByPartner: true,
    hasBrowseAll: false
  },
  aviation: {
    theme: "aviation",
    name: "Cleared for Takeoff: Explore Commercial Aviation",
    favicon: "favicon.png",
    logo: "aviation-logo.png",
    background: "aviation-banner.jpg",
    description: "",
    hasAbout: true,
    hasBrowseByPartner: true,
    hasBrowseAll: true,
    hasSidebar: false,
    externalLink: "https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1tw6JSsgNWr6a7kqZxrFmTwcqD7f0ybam-XjqV57y810&font=Default&lang=en&initial_zoom=2",
    tags: [
      "aviation"
    ],
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
  vermont: {
    theme: "vermont",
    filters: [
      "provider.@id:http%3A//dp.la/api/contributor/vt"
    ],
    name: "Vermont Green Mountain Digital Archive",
    background: "vt-hero.png",
    favicon: "favicon.ico",
    logo: "logo.svg",
    heroLogo: "logo-vert.svg",
    description: "Vermont Green Mountain Digital Archive",
    externalLink: "https://libraries.vermont.gov/GMDA",
    locationFacet: "%22Vermont%22",
    subjectFacet: "%22Vermont%22",
    hasAbout: false,
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
    name: "OKHUB",
    background: "ok.jpg",
    favicon: "favicon.ico",
    logo: "logo.png",
    heroLogo: "logo.png",
    description: "",
    locationFacet: "%22Oklahoma%22",
    subjectFacet: "%22Oklahoma%22",
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
      "/about/contributing-organizations" : {
        parentDir: "/about",
        path: "contributing-organizations.md",
        title: "Contributing Organizations",
        description: "Currently Contributing Organizations to the DPLA through the OKHUB",
        isTopLevel: false,
        category: "About"
      },
      "/about/managing-partners" : {
        parentDir: "/about",
        path: "managing-partners.md",
        title: "Managing Partners",
        description: "",
        isTopLevel: false,
        category: "About"
      },
      "/about/ingest-and-workflow" : {
        parentDir: "/about",
        path: "ingest-and-workflow.md",
        title: "Ingest and Workflow",
        description: "",
        isTopLevel: false,
        category: "About"
      },
      "/participate": {
        title: "Participate",
        parentDir: "/participate",
        path: "participate.md",
        description: "",
        isTopLevel: true,
        category: "Participate"
      },
      "/participate/metadata": {
        title: "Metadata",
        parentDir: "participate",
        path: "metadata.md",
        description: "OKHub Metadata Guidelines and Best Practices",
        isTopLevel: false,
        category: "Participate"
      },
      "/participate/rights-statements": {
        title: "Rights Statements",
        parentDir: "participate",
        path: "rights-statements.md",
        description: "",
        isTopLevel: false,
        category: "Participate"
      },
      "/resources": {
        parentDir: "/resources",
        title: "Resources",
        path: "resources.md",
        description: "",
        isTopLevel: true,
        category: "Resources"
      }
    }
  },
  nwdh: {
    theme: "nwdh",
    tags: [
        "nwdh"
    ],
    name: "Northwest Digital Heritage",
    background: "nwdh-hero.png",
    favicon: "favicon.ico",
    logo: "nwdh-logo.png",
    heroLogo: "nwdh-hero-logo.png",
    description: "Northwest Digital Heritage",
    externalLink: "https://www.northwestdigitalheritage.org/",
    locationFacet: "%22Northwest%22",
    subjectFacet: "%22Northwest%22",
    hasAbout: false,
    hasSidebar: false,
    hasBrowseByPartner: true,
    hasBrowseAll: false
  },
  texas: {
    theme: "texas",
    tags: [
        "texas"
    ],
    name: "TxHub",
    background: "hero_image.png",
    favicon: "favicon.png",
    logo: "texas-logo.png",
    description: "TxHub",
    locationFacet: "%22Texas%22",
    subjectFacet: "%22Texas%22",
    hasAbout: false,
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
  njde: {
    theme: "njde",
    filters: [
      "provider.@id:http%3A//dp.la/api/contributor/njde"
    ],
    name: "NJ/DE Digital Collective",
    background: "",
    favicon: "favicon.ico",
    logo: "njde-logo.png",
    heroLogo: "njde-logo.png",
    description: "NJ/DE Digital Collective",
    locationFacet: "%22New%20Jersey%20OR%20Delaware%22",
    subjectFacet: "%22New%20Jersey%20OR%20Delaware%22",
    hasAbout: false,
    hasSidebar: false,
    hasBrowseByPartner: true,
    externalLink: "https://www.njdedigitalcollective.org/",
    hasBrowseAll: false
  }

}

exports.LOCALS = LOCALS; // so it can be read/imported by next.config.js
