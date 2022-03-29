const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["spirits"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


