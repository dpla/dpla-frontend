const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["leo-frank"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


