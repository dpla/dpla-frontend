const topics = require('../fixtures/topics.json')
describe('Topics', async () => {

    it(`home hasn't changed`, () => {
        cy
            .visit('/browse-by-topic')
            .getDataCy('topics-home')
            .snapshot();
    });

    for (const topic of topics) {
        it(`${topic.slug}'s home hasn't changed`, async () => {
            cy
                .visit(`/browse-by-topic/${topic.slug}`)
                .getDataCy('exhibition-home')
                .snapshot();
        });

        for (const subtopic of topic.subtopics) {
            it(`${topic.slug} ${subtopic} works correctly`, () => {
                cy.visit(`/browse-by-topic/${topic.slug}/${subtopic}`);
                cy.getDataCy('subtopic-sidebar').snapshot();
                cy.getDataCy('subtopic-item-list').find('li').its('length').should('be.gt', 10);
            });
        }
    }
});

