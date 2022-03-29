const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["erie-cana"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


