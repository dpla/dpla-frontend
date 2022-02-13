describe( 'Search', async () => {

    beforeEach(() => {
        cy.viewport(1024, 768);
    });

    it('searches', () => {
        cy.fixture('searches.json').then( (searches) => {
            searches.forEach(foo => {
                cy.visit(`/search?${foo}`);
            });
        });
    });
});