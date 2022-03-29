require('@cypress/snapshot').register();

Cypress.Commands.add('checkTitle', (title) => {
    cy.title().should('eq', title).snapshot({name: "Page title"})
  }
);

Cypress.Commands.add('getDataCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`);
})

Cypress.Commands.add('testExhibitHome', (exhibit) => {
    cy
        .visit(`/exhibitions/${exhibit.slug}`)
        .getDataCy('exhibition-home')
        .snapshot();
});

Cypress.Commands.add('testExhibitPage', (exhibit, exhibitPage) => {
    cy.visit(`/exhibitions/${exhibit.slug}/${exhibitPage}`)
    cy.window().then( window => {
        // seadragon's opacity and w/h params shift too much to work with
        // snapshots so we're just going to take it out of the picture heh heh
        const seadragon = window.document.getElementById("openseadragon1");

        if (seadragon) {
            seadragon.remove()
        }
    })
    cy.get(`[data-cy="exhibit-page"]`).snapshot();
});

