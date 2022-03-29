const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["transcontinental-railroad"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


