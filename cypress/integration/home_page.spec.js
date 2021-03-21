describe('The Home Page', () => {

    beforeEach(() => {
        cy.visit('/');
      }
    );

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
    });

    it('doesn\'t have a link to home', () => {
        cy.get('[data-cy=link-home]').should('not.exist')
    }); 

  });