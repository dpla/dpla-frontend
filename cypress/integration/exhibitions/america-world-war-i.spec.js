const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["america-world-war-i"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


