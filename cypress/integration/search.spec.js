describe( 'Search', async () => {

    it('searches', () => {
        cy.fixture('searches.json').then( (searches) => {
            searches.forEach(foo => {
                cy.visit(`/search?${foo}`);
            });
        });
    });
});