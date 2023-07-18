describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  it('fails', () => {
    cy.visit('https://example.cypress.io')
    expect(true).to.be.false; // This assertion will fail
  })
})