const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["history-of-survivance"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


