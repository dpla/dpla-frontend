// describe('The Home Page', () => {

//   // check Pro page
//   if(Cypress.config('SITE_ENV') == 'pro') {
//     it('successfully loads', () => {
//       cy.visit('/')
//       cy.title().should('eq', 'Digital Public Library of America')
//       cy.get('[data-cy=homePro]')
//       .contains('Welcome to the DPLA Professional Community')
//     })
//   }
  
// })

describe('Test tile links', () => {
  it('gets and checks tile links', () => {
    cy.visit('/')
    // cy.get('[data-cy=hubsLink]').click()
    // cy.location('href').should('eq', `${Cypress.config('baseUrl')}/hubs`);
  
    // cy.visit('/')
    // cy.get('[data-cy=prospectiveHubsLink]').click()
    // cy.location('href').should('eq', `${Cypress.config('baseUrl')}/prospective-hubs`);
  
    // cy.visit('/')
    // cy.get('[data-cy=devsLink]').click()
    // cy.location('href').should('eq', `${Cypress.config('baseUrl')}/developers`);
    
    // cy.visit('/')
    // cy.get('[data-cy=edLink]').click()
    // cy.location('href').should('eq', `${Cypress.config('baseUrl')}/education`);
    
    // cy.visit('/')
    // cy.get('[data-cy=eventsLink]').click()
    // cy.location('href').should('eq', `${Cypress.config('baseUrl')}/events`);
    
    // cy.visit('/')
    // cy.get('[data-cy=ebooksLink]').click()
    // cy.location('href').should('eq', `${Cypress.config('baseUrl')}/ebooks`);


    cy.get('[data-cy=tileList]')
    .should(a => {
      // console.log(a)
      a.each((index, li) => {
        // console.log(li)
        li.click()
          // console.log(cy.location('href'))
          cy.visit('/')
      
        // cy.location('href').should('eq', `${li.href}`)
        // .then(cy.visit('/'))
        
      })
    })
  }) 
})