const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits.find(e => e.slug === "race-to-the-moon");
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