import topnav from "../../fixtures/topnav.json";

describe('The small screen top nav', () => {

    beforeEach(() => {
        cy.viewport(800, 600);
    });

    const origPage = "/";

    it(`hasn't changed on ${origPage}`, () => {
        cy.visit(origPage);
        cy.getDataCy('global-header').should('not.be.visible');
        const menuButton = cy.getDataCy('menu-button')
        menuButton.should('be.visible');
        menuButton.click();
        const smallScreenHeader = cy.getDataCy('small-screen-header')
        smallScreenHeader.should('be.visible');
        smallScreenHeader.snapshot();
    });

    topnav.forEach((destPage) => {
        // the home page doesn't have a home link,
        // so we have to skip home linking to home.
        if (!(origPage === "/" && destPage.path === "/")) {
            it(`on ${origPage}, ${destPage.selector} navigates to ${destPage.path}`, () => {
                cy.visit(origPage);
                cy.getDataCy('menu-button').click(); //open menu
                cy.getDataCy('small-screen-header').within(() => {
                    cy.getDataCy(destPage.selector).click();
                    cy.checkTitle(destPage.title);
                });
            });
        }
    });
})
