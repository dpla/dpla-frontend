describe('Exhibitions', () => {
    it(`home hasn't changed`, () => {
        cy.visit('/exhibitions').getDataCy('exhibitions-home').snapshot();
    });
    it(`exhibits pages haven't changed`, () => {
        ///api/exhibition_pages?exhibit=11
        cy.request('/api/exhibitions').then( (response) => response.body.forEach( (exhibit) => {
            cy.visit(`/exhibitions/${exhibit.slug}`).getDataCy('exhibition-home').snapshot();
            cy.request(`/api/exhibition_pages?exhibit=${exhibit.id}`).then(
                    (response) => response.body.forEach( (exhibitPage) => {
                        cy.visit(`/exhibitions/${exhibit.slug}/${exhibitPage.slug}`);
                        cy.getDataCy('exhibit-page').snapshot();
                    })
                );
            })
        );
    });
});
