const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["home-front-world-war-ii"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


