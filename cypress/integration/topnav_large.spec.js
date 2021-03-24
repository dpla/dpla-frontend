import pages from "../fixtures/pages.json";
import topnav from "../fixtures/topnav.json";

describe('The big screen top nav', () => {
    
    beforeEach(() => {
        cy.viewport(1024, 768);
    })

    //big header
    pages.forEach((origPage) => {
        it(`hasn't changed on ${origPage}`, () => {
            cy.visit(origPage);
            cy.getDataCy('small-screen-header').should('not.be.visible');
            cy.getDataCy('menu-button').should('not.be.visible');
            const globalHeader = cy.getDataCy('global-header');
            globalHeader.should('be.visible')
            globalHeader.snapshot();

        });
        topnav.forEach((destPage) => {
            // the home page doesn't have a home link, 
            // so we have to skip home linking to home.
            if (!(origPage === "/" && destPage.path === "/")) {
                it(`on ${origPage}, ${destPage.selector} navigates to ${destPage.path}`, () => {
                    cy.visit(origPage);
                    cy.getDataCy('global-header').within(() => {
                        cy.getDataCy(destPage.selector).click();
                        cy.checkTitle(destPage.title);
                    });
                });
            }
        });        
    });

})
