require('@cypress/snapshot').register();

Cypress.Commands.add('checkTitle', (title) => {
    cy.title().should('eq', title).snapshot({name: "Page title"})
  }
);

Cypress.Commands.add('getDataCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`);
})