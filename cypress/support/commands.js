require('@cypress/snapshot').register();

Cypress.Commands.add('checkTitle', (title) => {
    cy.title().should('eq', title).snapshot({name: "Page title"})
  }
);

Cypress.Commands.add('getDataCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`);
})

Cypress.Commands.add( 'testExhibit', (exhibit) => {
    it(`${exhibit.slug}'s home hasn't changed`, () => {
        cy
            .visit(`/exhibitions/${exhibit.slug}`)
            .getDataCy('exhibition-home')
            .snapshot()
    })

    for (const exhibitPage of exhibit.pages) {
        it(`${exhibit.slug}'s page ${exhibitPage} hasn't changed`, () => {
            cy.visit(`/exhibitions/${exhibit.slug}/${exhibitPage}`)
            cy.window().then( window => {
                // seadragon's opacity and w/h params shift too much to work with
                // snapshots so we're just going to take it out of the picture heh heh

                // todo switch to typescript to clean this kind of thing up with ?.
                const seadragon = window.document.getElementById("openseadragon1")
                if (seadragon) {
                    seadragon.remove()
                }

            })
            cy.get(`[data-cy="exhibit-page"]`).snapshot();

        })
    }
});