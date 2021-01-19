describe('My First Test', () => {
    it('Does not do much!', () => {
        cy.intercept('GET', '/api/status', {'fixture': 'statuses.json'});

        cy.visit('/');

        cy.get('#NEW').click().th
    })
});
