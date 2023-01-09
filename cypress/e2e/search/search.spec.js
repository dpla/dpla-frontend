describe( 'Search',  () => {
    it('searches', async () => {
        cy.fixture('searches.json').then( (searches) => {
             searches.forEach(foo => {
                 cy.visit(`/search?${foo}`);
             });
         });
    });
});