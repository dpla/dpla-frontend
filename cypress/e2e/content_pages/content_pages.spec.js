describe('Content Pages', async () => {

    const pages = [
        {title: "About Us", path: "/about/about-us"},
        {title: "Board of Directors", path: "/about/board"},
        {title: "Staff", path: "/about/dpla-staff"},
        {title: "Funders", path: "/about/funders"},
        {title: "Credits", path: "/about/credits"},
        {title: "Frequently Asked Questions", path: "/about/frequently-asked-questions"},
        {title: "DPLA’s Statement on Potentially Harmful Content", path: "about/harmful-language-statement"},
        {title: "Search Tips", path: "/about/search-tips"},
        {title: "Copyright Status Filter", path: "/about/rights-categories"},
        {title: "Using DPLA’s Primary Source Sets", path: "/about/using-dplas-primary-source-sets"},
        {title: "Terms & Conditions", path: "/about/terms-conditions"},
        {title: "Privacy Policy", path: "/about/privacy-policy"},
        {title: "How Can I Use DPLA?", path: "/guides"},
        {title: "Education Guide", path: "/guides/the-education-guide-to-dpla"},
        {title: "Family Research", path: "/guides/the-family-research-guide-to-dpla"},
        {title: "Lifelong Learning", path: "/guides/the-guide-to-lifelong-learning-with-dpla"},
        {title: "Scholarly Research", path: "/guides/the-scholarly-research-guide-to-dpla"},
        {title: "For Developers", path: "/guides/for-developers"}
    ];

    for (const page of pages) {
        it(`${page.title} hasn't changed`, () => {
            cy
                .visit(page.path)
                .getDataCy('content')
                .toMatchSnapshot();
        });
     }
});
