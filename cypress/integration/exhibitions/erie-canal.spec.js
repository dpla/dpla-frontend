const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["erie-canal"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


