const exhibits = require('../fixtures/exhibitions.json')
describe('Exhibitions', async () => {

    it(`home hasn't changed`, () => {
        cy
            .visit('/exhibitions')
            .getDataCy('exhibitions-home')
            .snapshot();
    });

    for (const exhibit of exhibits) {

        it(`${exhibit.slug}'s home hasn't changed`, async () => {
            cy
                .visit(`/exhibitions/${exhibit.slug}`)
                .getDataCy('exhibition-home')
                .snapshot();
        });

        for (const exhibitPage of exhibit.page_data) {
            it(`${exhibit.slug}'s page ${exhibitPage.slug} hasn't changed`, () => {
                cy
                    .visit(`/exhibitions/${exhibit.slug}/${exhibitPage.slug}`)
                    .getDataCy('exhibit-page')
                    .snapshot();
            });
        }
    }
});

