import pages from "../fixtures/pages.json";
import bottomnav from "../fixtures/bottomnav.json";


// NOTE: This currently skips the /search link in the footer because it's too expensive
// to run search over everything the way it's currently implemented.

describe('The bottom nav', () => {

    beforeEach(() => {
        cy.viewport(1024, 768);
    });

    pages.forEach((origPage) => {
        it(`hasn't changed on ${origPage}`, () => {
            cy.visit(origPage);
            const globalHeader = cy.getDataCy('footer');
            globalHeader.should('be.visible')
            globalHeader.snapshot();

        });
        ['DPLA', 'Tools'].forEach((section) => {
            bottomnav[section].forEach((destPage) => {
                it(`on ${origPage}, ${destPage.selector} navigates to ${destPage.path}`, () => {
                    cy.visit(origPage);
                    cy.getDataCy('footer').within(() => {
                        cy.getDataCy(destPage.selector).click();
                        cy.checkTitle(destPage.title);
                    });
                });
            });
        });

        // The pro site stuff navigates off site, so we're just testing that the links
        // have the correct href
        bottomnav['DPLA Pro'].forEach((destPage) => {
            it(`on ${origPage}, ${destPage.selector} links to ${destPage.url}`, () => {
                cy.visit(origPage);
                cy.getDataCy('footer').within(() => {
                    cy.getDataCy(destPage.selector).should('have.attr', 'href', destPage.url);
                });
            })
        })
    });
})

