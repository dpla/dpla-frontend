const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["history-us-public-libraries"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


