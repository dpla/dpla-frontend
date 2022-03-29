const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["mapping-american-civil-war"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


