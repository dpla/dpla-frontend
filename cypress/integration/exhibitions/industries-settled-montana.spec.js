const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["industries-settled-montana"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


