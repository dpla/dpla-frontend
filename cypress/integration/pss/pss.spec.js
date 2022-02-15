const sets = require('../../fixtures/sets.json')
describe('Primary Source Sets', async () => {

    it(`home hasn't changed`, () => {
        cy
            .visit('/primary-source-sets')
            .getDataCy('pss-home')
            .snapshot();
    });

    for (const set of sets) {
        it(`${set} hasn't changed`, () => {
            cy.visit(`/primary-source-sets/${set}`)
                .getDataCy('pss-tabs').snapshot()
                .getDataCy('pss-breadcrumbs').snapshot()
                .getDataCy('pss-relateds').snapshot()
                .getDataCy('pss-footer').snapshot();
        });
    }
});

