if (Cypress.config('SITE_ENV') == 'pro') {

  describe('The Home Page', () => {
    it('successfully loads homepage', () => {
      cy.visit('/')
      cy.title().should('eq', 'Digital Public Library of America')
      })
  })


  describe('Home Page Banner', () => {
    it('checks that hero banner has background image and is visible', () => {
      cy.visit('/')
      
      cy.get('[data-cy=homePro]')
      .contains('Welcome to the DPLA Professional Community')

      cy.get('[data-cy=heroImage]')
      .should('be.visible')
      .should('have.css', 'background-image')
      .and('eq', `url("${Cypress.config('baseUrl')}/static/images/pro/home-hero-bg.png")`)
    })
  })

  describe('Test tile links', () => {
    it('gets and checks tile links', () => {
      cy.visit('/')
      cy.get('[data-cy=hubsLink]').click()
      cy.location('href').should('eq', `${Cypress.config('baseUrl')}/hubs`);

      cy.visit('/')
      cy.get('[data-cy=prospectiveHubsLink]').click()
      cy.location('href').should('eq', `${Cypress.config('baseUrl')}/prospective-hubs`);

      cy.visit('/')
      cy.get('[data-cy=devsLink]').click()
      cy.location('href').should('eq', `${Cypress.config('baseUrl')}/developers`);

      cy.visit('/')
      cy.get('[data-cy=edLink]').click()
      cy.location('href').should('eq', `${Cypress.config('baseUrl')}/education`);

      cy.visit('/')
      cy.get('[data-cy=eventsLink]').click()
      cy.location('href').should('eq', `${Cypress.config('baseUrl')}/events`);

      cy.visit('/')
      cy.get('[data-cy=ebooksLink]').click()
      cy.location('href').should('eq', `${Cypress.config('baseUrl')}/ebooks`);


      // Rewrite test with iteration through links
      // cy.get('[data-cy=tileList]')
      // .should(a => {
      //   // console.log(a)
      //   a.each((index, li) => {
      //     // console.log(li)
      //     li.click()
      //       // console.log(cy.location('href'))
      //       cy.visit('/')

      //     // cy.location('href').should('eq', `${li.href}`)
      //     // .then(cy.visit('/'))

      //   })
      // })
    })
  })

  describe('Newslane', () => {
    it('checks that NewsLane component is visible', () => {
      cy.visit('/')
      
      cy.get('[data-cy=NewsLane]')
      .should('be.visible')
    })
  })

  describe('StayInformed', () => {
    it('checks that StayInformed component is visible', () => {
      cy.visit('/')
      
      cy.get('[data-cy=StayInformed]')
      .should('be.visible')
    })
  })

}
