const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["gold-rush"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


