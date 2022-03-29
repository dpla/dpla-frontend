const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["the-show"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


