const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["japanese-internment"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


