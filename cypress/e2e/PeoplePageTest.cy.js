describe('People page tests', () => {
  var baseUrl = 'https://devops-grisi-reyes-fe.s3.amazonaws.com/index.html';
  beforeEach(() => {
    cy.visit(baseUrl)
    cy.get('#single-spa-application\\:\\@react-mf\\/navbar > div > div:nth-child(1) > a:nth-child(1)')
      .click()
  })

  it('Should successfully load the People page', () => {
    cy.visit(baseUrl)
  })

  it('Should check that no person is selected when entering the page', () => {
    cy.get('div.selectedPerson > div')
      .should('have.text', 'No one selected')
  })

  it('Should select a random person and check the person is displayed', () => {
    cy.get('#single-spa-application\\:\\@react-mf\\/people > div > div > div.p-6.w-1\\/3 > div > a.h-12.flex.items-center')
      .then($elements => {
        const randomIndex = Cypress._.random(0, $elements.length - 1)
        cy.wrap($elements[randomIndex]).click()
      })
    cy.get('div.selectedPerson > div')
      .should('not.have.text', 'No one selected')
  })

  it('Should fetch more people and check the list is updated', () => {
    // Capture the list elements before clicking
    cy.get('#single-spa-application\\:\\@react-mf\\/people > div > div > div.p-6.w-1\\/3 > div > a.h-12.flex.items-center')
      .then($originalElements => {
        // Click on the button
        cy.get('#single-spa-application\\:\\@react-mf\\/people > div > div > div.p-6.w-1\\/3 > button')
          .click()

        // Capture the list elements after clicking
        cy.get('#single-spa-application\\:\\@react-mf\\/people > div > div > div.p-6.w-1\\/3 > div > a.h-12.flex.items-center')
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