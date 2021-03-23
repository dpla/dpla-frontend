import pages from "../fixtures/pages.json";
import bottomnav from "../fixtures/bottomnav.json";

describe('The bottom nav', () => {

    pages.forEach((origPage) => {
        it(`hasn't changed on ${origPage}`, () => {
            cy.visit(origPage);
            const globalHeader = cy.getDataCy('footer');
            globalHeader.should('be.visible')
            globalHeader.snapshot();

        });
        ['DPLA', 'Tools'].forEach((section) => {
            bottomnav['DPLA'].forEach((destPage) => {
                // so we have to skip home linking to home.
                // the home page doesn't have a home link, 
                it(`on ${origPage}, ${destPage.selector} navigates to ${destPage.path}`, () => {
                    cy.visit(origPage);
                    cy.getDataCy('footer').within(() => {
                        cy.getDataCy(destPage.selector).click();
                        cy.checkTitle(destPage.title);
                    });
                });
            });
        });
        bottomnav['DPLA Pro'].forEach((destPage) => {
            it(`on ${origPage}, ${destPage.selector} links to ${destPage.url}`, () => {
                cy.visit(origPage);
                cy.getDataCy('footer').within(() => {
                    cy.getDataCy(destPage.selector).should('have.attr', 'href', destPage.url);
                    cy.checkTitle(destPage.title);
                });
            })
        })
    });
})

