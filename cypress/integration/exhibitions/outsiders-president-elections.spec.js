const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["outsiders-president-elections"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


