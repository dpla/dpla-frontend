const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["radio-golden-age"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


