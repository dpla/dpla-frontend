const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["patent-medicine"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


