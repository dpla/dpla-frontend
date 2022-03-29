const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["new-deal"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


