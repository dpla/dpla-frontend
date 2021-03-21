import pages from "../fixtures/pages.json";

describe('The top nav', () => {

    //big header
    pages.forEach((origPage) => {
        it(`hasn't changed on ${origPage.path}`, () => {
            cy.viewport(1024, 480);
            cy.visit(origPage.path);
            cy.get('[data-cy="global-header"]').snapshot();
        }); 

        pages.forEach((destPage) => {
            // the home page doesn't have a home link, 
            // so we have to skip home linking to home.
            if (!(origPage.path === "/" && destPage.path === "/")) {
                it(`${origPage.path}'s ${destPage.selector} navigates to ${destPage.path}`, () => {
                    cy.viewport(1024, 480);
                    cy.visit(origPage.path);
                    cy.get('[data-cy="global-header"]').within(() => {
                        cy.get(`[data-cy="${destPage.selector}"]`).click();
                        cy.checkTitle(destPage.title);
                    });
                });
            }
        });        
    });

    // small screen header
    pages.forEach((origPage) => {
        pages.forEach((destPage) => {
            // the home page doesn't have a home link, 
            // so we have to skip home linking to home.
            if (!(origPage.path === "/" && destPage.path === "/")) {
                it(`${origPage.path}'s ${destPage.selector} navigates to ${destPage.path}`, () => {
                    cy.viewport(800, 480);
                    cy.visit(origPage.path);
                    cy.get('[data-cy="menu-button"]').click(); //open menu
                    cy.get('[data-cy="small-screen-header"').within(() => {
                        cy.get(`[data-cy="${destPage.selector}"]`).click();
                        cy.checkTitle(destPage.title);
                    });
                });
            }
        });        
    });

})
