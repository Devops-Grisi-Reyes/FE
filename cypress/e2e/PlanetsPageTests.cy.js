describe('Planets page tests', () => {
    var baseUrl = 'https://devops-grisi-reyes-fe.s3.amazonaws.com/index.html';
    beforeEach(() => {
        cy.visit(baseUrl)
        cy.get('#single-spa-application\\:\\@react-mf\\/navbar > div > div:nth-child(1) > a:nth-child(2)')
            .click()
    })

    it('Should successfully load the Planets page', () => {
        cy.visit(baseUrl)
    })

    it('Should check that no planet is selected when entering the page', () => {
        cy.get('div.selectedPlanet > div')
            .should('have.text', 'No planet Selected')
    })

    it('Should select a random planet and check the planet is displayed', () => {
        cy.get('#single-spa-application\\:\\@react-mf\\/planets > div > div > div.p-6.w-1\\/3 > div > a.h-12.flex.items-center')
            .its('length')
            .then(numElements => {
                const randomIndex = Cypress._.random(numElements - 1)
                cy.get('#single-spa-application\\:\\@react-mf\\/planets > div > div > div.p-6.w-1\\/3 > div > a.h-12.flex.items-center')
                    .eq(randomIndex)
                    .click()
            })
        cy.get('div.selectedPlanet > div')
            .should('not.have.text', 'No planet Selected')
    })

    it('Should fetch more planets and check the list is updated', () => {
        // Capture the list elements before clicking
        cy.get('#single-spa-application\\:\\@react-mf\\/planets > div > div > div.p-6.w-1\\/3 > div > a.h-12.flex.items-center')
            .then($originalElements => {
                // Click on the button
                cy.get('button.mb-8.font-bold.py-2.px-4.rounded.bg-warning')
                    .click()

                // Capture the list elements after clicking
                cy.get('#single-spa-application\\:\\@react-mf\\/planets > div > div > div.p-6.w-1\\/3 > div > a.h-12.flex.items-center')
                    .then($newElements => {
                        // Compare the elements
                        $newElements.each(($newElement, index) => {
                            cy.wrap($newElement)
                                .should('not.deep.equal', $originalElements.eq(index))
                        })
                    })
            })
    })
})