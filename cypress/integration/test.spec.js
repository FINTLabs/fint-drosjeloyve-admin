/// <reference types="cypress"/>



describe('Showing all applications', () => {
    it('All applications showing', () => {
        cy.apiCall();
        cy.get("#total").should("contain", "6");
    })
});

describe('Showing 1 application after click on status "NEW"', () => {
    it('Shows 1 application on filter value NEW', () => {
        cy.apiCall();
        cy.get("#NEW").click();

        cy
            .get("tbody")
            .children()
            .should(
                ($tr) => {
                    // should have found 1 elements
                    expect($tr).to.have.length(1)
                }
            )
    })
});

describe('Showing 2 application after click on status "PURGE"', () => {
    it('Shows 2 application on filter value PURGE', () => {
        cy.apiCall();
        cy.get("#PURGED").click();

        cy.get("tbody")
            .children()
            .should(
                ($tr) => {
                    // should have found 1 elements
                    expect($tr).to.have.length(2)
                }
            )
    })
});

describe('Showing 1 application after click on status "PURGE" and county "Innlandet FK"', () => {
    it('Shows 1 application on filter value PURGE AND Innlandet FK', () => {
        cy.apiCall();
        cy.get("#PURGED").click();
        cy.get('#1').click();

        cy.get("tbody")
            .children()
            .should(
                ($tr) => {
                    expect($tr).to.have.length(1)
                }
            )
    })
});

describe('Clear filter and now has the correct number of rows again', () => {
    it('Correct amount of rows after clearing filter', () => {
        cy.get("#total").click();
        cy.get("#ALL").click();
        cy.get("tbody")
            .children()
            .should(
                ($tr) => {
                    expect($tr).to.have.length(6)
                }
            )
    })
});

describe('Check that that each status is showing as filter option', () => {
    it('Status filter options ok', () => {
        cy.apiCall();
        cy.get("#status")
            .children()
            .should(
                ($div) => {
                    expect($div).to.have.length(9)
                }
            )
    })
});

describe('Check that you can search for requestorName in the search field', () => {
    it('Searching requestorName success', () => {
        cy.apiCall();
        cy.searchFor("Frode");

        cy.get("tbody")
            .children()
            .should(
                ($tr) => {
                    expect($tr).to.have.length(1)
                }
            )
    })
});

describe('Clear input at check that it now has the correct number of rows again', () => {
    it('Correct amount of rows after clearing input', () => {
        cy.get("input")
            .clear();
        cy.get("tbody")
            .children()
            .should(
                ($tr) => {
                    expect($tr).to.have.length(6)
                }
            )
    })
});

describe('Check that you can search for requestorName and filter to get one result', () => {
    it('Searching requestorName and filter success', () => {
        cy.apiCall();
        cy.get("#PURGED").click();
        cy.searchFor("biltur");

        cy.get("tbody")
            .children()
            .should(
                ($tr) => {
                    expect($tr).to.have.length(1)
                }
            )
    })
});
