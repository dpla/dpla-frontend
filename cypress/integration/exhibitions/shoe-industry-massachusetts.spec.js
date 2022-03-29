const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["shoe-industry-massachusetts"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


