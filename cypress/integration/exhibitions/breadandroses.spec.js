const exhibits = require('../../fixtures/exhibitions.json');
const exhibit = exhibits["breadandroses"];
describe(
    `Exhibition ${exhibit.slug}`,
    {},
    async () => {
        cy.testExhibit(exhibit);
    }
);


