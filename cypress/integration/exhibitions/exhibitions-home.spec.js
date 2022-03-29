describe(
    'Exhibitions',
    {},
    () => {
        it(`home hasn't changed`, () => {
            cy
                .visit('/exhibitions')
                .getDataCy('exhibitions-home')
                .snapshot();
        })
    }
);