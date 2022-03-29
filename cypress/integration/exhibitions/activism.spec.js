const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["activism"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


