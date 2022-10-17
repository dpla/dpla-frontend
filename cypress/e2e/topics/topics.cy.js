const topics = require('../../fixtures/topics.json')
describe('Topics', async () => {

    it(`home hasn't changed`, () => {
        cy
            .visit('/browse-by-topic')
            .getDataCy('topics-home')
            .toMatchSnapshot();
    });

    for (const topic of topics) {
        it(`${topic.slug}'s home hasn't changed`, () => {
            cy
                .visit(`/browse-by-topic/${topic.slug}`)
                .getDataCy('topic-home')
                .toMatchSnapshot();
        });

        for (const subtopic of topic.subtopics) {
            it(`${topic.slug} ${subtopic} works correctly`, () => {
                cy.visit(`/browse-by-topic/${topic.slug}/${subtopic}`);
                cy.getDataCy('subtopic-sidebar').toMatchSnapshot();
                cy.getDataCy('subtopic-item-list').find('li').its('length').should('be.gt', 5);
            });
        }
    }
});

