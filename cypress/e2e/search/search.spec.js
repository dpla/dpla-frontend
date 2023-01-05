describe( 'Search',  () => {
    it('searches', async () => {
        cy.fixture('searches.json').then( (searches) => {
             searches.forEach(foo => {
                 console.log(foo);
                 cy.visit(`/search?${foo}`);
             });
         });
    });
});