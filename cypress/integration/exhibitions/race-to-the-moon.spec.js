const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["race-to-the-moon"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


