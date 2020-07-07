describe('The Home Page', () => {

  // check Pro page
  if(Cypress.config('SITE_ENV') == 'pro') {
    it('successfully loads', () => {
      cy.visit('/')
      cy.title().should('eq', 'Digital Public Library of America')
      cy.get('[data-cy=homePro]')
      .contains('Welcome to the DPLA Professional Community')
    
      cy.get('[data-cy=hubsLink]').click()
      cy.location('href').should('eq', `${Cypress.config('baseUrl')}/hubs`);
    })
  }
  
})