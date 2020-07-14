if (Cypress.config('SITE_ENV') == 'pro') {

  beforeEach(() => {
    cy.visit('/')
  })

  it('successfully loads homepage', () => {
    cy.title().should('eq', 'Digital Public Library of America')
  })


  it('checks that hero banner has background image and is visible', () => {
    cy.get('[data-cy=homePro]')
      .contains('Welcome to the DPLA Professional Community')

    cy.get('[data-cy=heroImage]')
      .should('be.visible')
      .should('have.css', 'background-image')
      .and('eq', `url("${Cypress.config('baseUrl')}/static/images/pro/home-hero-bg.png")`)
  })

  it('gets and checks tile links', () => {
    cy.get('[data-cy=hubsLink]').click()
    cy.location('href').should('eq', `${Cypress.config('baseUrl')}/hubs`);

    cy.go('back')
    cy.get('[data-cy=prospectiveHubsLink]').click()
    cy.location('href').should('eq', `${Cypress.config('baseUrl')}/prospective-hubs`);

    cy.go('back')
    cy.get('[data-cy=devsLink]').click()
    cy.location('href').should('eq', `${Cypress.config('baseUrl')}/developers`);

    cy.go('back')
    cy.get('[data-cy=edLink]').click()
    cy.location('href').should('eq', `${Cypress.config('baseUrl')}/education`);

    cy.go('back')
    cy.get('[data-cy=eventsLink]').click()
    cy.location('href').should('eq', `${Cypress.config('baseUrl')}/events`);

    cy.go('back')
    cy.get('[data-cy=ebooksLink]').click()
    cy.location('href').should('eq', `${Cypress.config('baseUrl')}/ebooks`);
  })

  it('checks that NewsLane component is visible', () => {
    cy.get('[data-cy=NewsLane]')
      .should('be.visible')
  })

  it('checks that StayInformed component is visible', () => {
    cy.get('[data-cy=StayInformed]')
      .should('be.visible')
  })

  it('checks that user can signup for emails successfully', () => {
    cy.get('form').within(($form) => {
      cy.get('input[type=email]')
        .type('fake@email.com').should('have.value', 'fake@email.com')
      cy.root().submit()
    })

    cy.get('[data-cy=subscriptionConfirmation]').should('contain', "You have successfully subscribed to DPLA's general email list! We'll send you announcements about our projects and events.") 
  })

  it('checks that user can signup for emails successfully', () => {
    cy.get('input:invalid').should('have.length', 0)
    cy.get('[type="email"]').type('not_an_email')
    cy.get('[type="submit"]').click()
    cy.get('input:invalid').should('have.length', 1)
    cy.get('[type="email"]').then(($input) => {
      expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. 'not_an_email' is missing an '@'.")
    })
  })
}
