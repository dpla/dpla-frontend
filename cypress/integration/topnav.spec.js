import pages from "../fixtures/pages.json";

describe('The top nav', () => {
    pages.forEach((origPage) => {
        pages.forEach((destPage) => {
            // the home page doesn't have a home link, 
            // so we have to skip home linking to home.
            if (!(origPage.path === "/" && destPage.path === "/")) {
                it(`${origPage.path}'s ${destPage.selector} navigates to ${destPage.path}`, () => {
                    cy.visit(origPage.path);
                    cy.get('[data-cy="global-header"]').within( () => {
                    cy.get(`[data-cy="${destPage.selector}"]`).click();
                    cy.checkTitle(destPage.title);
                });
              });        
            }
        });
    });
})
