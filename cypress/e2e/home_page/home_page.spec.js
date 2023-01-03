describe('The Home Page', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('successfully loads', () => {
        cy.checkTitle('Digital Public Library of America');
        cy.contains('images, texts, videos, and sounds from across the United States');
        cy.contains('Online Exhibitions');
        cy.contains('Primary Source Sets');
        cy.contains('How can I use DPLA?');
        cy.contains('Education');
        cy.contains('Family Research');
        cy.contains('Lifelong Learning');
        cy.contains('Scholarly Research');
        cy.contains('View all user guides');
        cy.contains('Get the latest DPLA news in your inbox');

        cy.getDataCy('home-hero').within(() => {
            cy.getDataCy('dpla-logo').snapshot();
            cy.get('form').toMatchSnapshot();
        });

        cy.getDataCy('stay-informed').toMatchSnapshot();
        cy.getDataCy('guides').toMatchSnapshot();

        cy.getDataCy('Exhibitions').should('exist');
        cy.getDataCy("Sets").should('exist');
        cy.getDataCy('news').should('exist');
        cy.getDataCy('link-home').should('not.exist');
    });
  });