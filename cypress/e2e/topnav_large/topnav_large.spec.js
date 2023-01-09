import topnav from "../../fixtures/topnav.json";

describe('The big screen top nav', () => {
    
    beforeEach(() => {
        cy.visit('/about')
    })

    //big header
    it(`hasn't changed on /`, () => {
        cy.getDataCy('small-screen-header').should('not.be.visible');
        cy.getDataCy('menu-button').should('not.be.visible');
        const globalHeader = cy.getDataCy('global-header');
        globalHeader.should('be.visible')
        globalHeader.toMatchSnapshot();

    });
    topnav.forEach((destPage) => {
        // the home page doesn't have a home link,
        // so we have to skip home linking to home.
        it(`on /, ${destPage.selector} navigates to ${destPage.path}`, () => {
            cy.getDataCy('global-header').within(() => {
                cy.getDataCy(destPage.selector).click();
                cy.checkTitle(destPage.title);
            });
        });
    });

})
