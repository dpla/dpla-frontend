const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["american-empire"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


