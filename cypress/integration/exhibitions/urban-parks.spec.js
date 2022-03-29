const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["urban-parks"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


