const sets = require('../../fixtures/sets.json')
describe('Primary Source Sets', async () => {

    it(`home hasn't changed`, () => {
        cy
            .visit('/primary-source-sets')
            .getDataCy('pss-home')
            .toMatchSnapshot();
    });

    for (const set of sets) {
        it(`${set} hasn't changed`, () => {
            cy.visit(`/primary-source-sets/${set}`)
                .getDataCy('pss-tabs').toMatchSnapshot()
                .getDataCy('pss-breadcrumbs').toMatchSnapshot()
                .getDataCy('pss-relateds').toMatchSnapshot()
                .getDataCy('pss-footer').toMatchSnapshot();
        });
    }
});

