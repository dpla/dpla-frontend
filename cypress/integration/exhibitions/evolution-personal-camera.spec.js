const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["evolution-personal-camera"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


