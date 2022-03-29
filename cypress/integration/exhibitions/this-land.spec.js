const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["this-land"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);

