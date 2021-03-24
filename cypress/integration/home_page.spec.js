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
        cy.getDataCy('link-home').should('not.exist')
    }); 

    it('has the correct hero banner', () => {
      cy.getDataCy('home-hero').within(() => {
        cy.getDataCy('dpla-logo').snapshot();
        cy.get('form').snapshot();
      });
    });

    it('has guides', () => {
      cy.getDataCy('guides').snapshot();
    });

    it('has the exhibitions slider', () => {
      cy.getDataCy('Exhibitions').should('exist');
    });

    it('has the pss slider', () => {
      cy.getDataCy("Sets").should('exist');
    });

    it('has news', () => {
      const news = cy.getDataCy('news').should('exist')
      news.get('.row').snapshot();
    });

    it('has stay informed', () => {
      cy.getDataCy('stay-informed').snapshot();
    });

  });