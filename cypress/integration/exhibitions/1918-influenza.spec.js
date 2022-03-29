const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["1918-influenza"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


