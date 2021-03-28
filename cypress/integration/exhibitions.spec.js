const exhibits = require('../fixtures/exhibitions.json')
describe('Exhibitions', async () => {

    it(`home hasn't changed`, () => {
        cy
            .visit('/exhibitions')
            .getDataCy('exhibitions-home')
            .snapshot();
    });

    for (const exhibit of exhibits) {

        it(`${exhibit.slug}'s home hasn't changed`, () => {
            cy
                .visit(`/exhibitions/${exhibit.slug}`)
                .getDataCy('exhibition-home')
                .snapshot();
        });

        for (const exhibitPage of exhibit.pages) {
            it(`${exhibit.slug}'s page ${exhibitPage} hasn't changed`, () => {
                cy
                    .visit(`/exhibitions/${exhibit.slug}/${exhibitPage}`)
                    .getDataCy('exhibit-page')
                    .snapshot();
            });
        }
    }
});

