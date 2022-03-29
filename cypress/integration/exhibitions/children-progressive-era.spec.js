const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["children-progressive-era"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


