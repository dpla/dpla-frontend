const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["tourism-mountain-west"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


