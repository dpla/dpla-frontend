const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["civilian-conservation-corps"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


