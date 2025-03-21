const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits.find(e => e.slug === "new-deal");
describe(`Exhibition ${exhibit.slug}`, () => {
        it(`${exhibit.slug}'s home hasn't changed`, () => {
            cy.testExhibitHome(exhibit)
        });
        for (const page of exhibit.pages) {
            it(`${exhibit.slug}'s page ${page} hasn't changed`, () => {
                cy.testExhibitPage(exhibit, page);
            });
        }
    }
);