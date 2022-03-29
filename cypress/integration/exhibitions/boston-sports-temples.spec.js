const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["boston-sports-temples"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


