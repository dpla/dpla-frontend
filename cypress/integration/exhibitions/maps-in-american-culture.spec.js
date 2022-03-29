const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["maps-in-american-culture"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


