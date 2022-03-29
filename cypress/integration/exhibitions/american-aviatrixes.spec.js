const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["american-aviatrixes"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


