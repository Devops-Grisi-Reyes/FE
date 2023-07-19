describe('Home page and navigation tests', () => {
  var baseUrl = 'https://devops-grisi-reyes-fe.s3.amazonaws.com/index.html';
  beforeEach(() => {
    cy.visit(baseUrl)
  })

  it('Should successfully load the home page', () => {
    cy.visit(baseUrl)
  })

  it('Should navigate to the people route and render the application', () => {
    cy.get('#single-spa-application\\:\\@react-mf\\/navbar > div > div:nth-child(1) > a:nth-child(1)')
      .click()
    cy.get('#single-spa-application\\:\\@react-mf\\/people > div > div > div.p-6.w-1\\/3 > button')
      .should('exist')
  })

  it('Should navigate to the planets route and render the application', () => {
    cy.get('#single-spa-application\\:\\@react-mf\\/navbar > div > div:nth-child(1) > a:nth-child(2)')
      .click()
    cy.get('#single-spa-application\\:\\@react-mf\\/planets > div > div > div.p-6.w-1\\/3 > button')
      .should('exist')
  })

  it('Should display the header with the correct content', () => {
    cy.get('h1.flex.flex-row.justify-center.p-16').should('exist')
    cy.get('h1.flex.flex-row.justify-center.p-16')
      .find('p.max-w-md')
      .should(
        'contain',
        'This example project shows independently built and deployed microfrontends that use React and single-spa. Each nav link above takes you to a different microfrontend.'
      )
  })

  it('Should click on the element and verify the redirection', () => {
    cy.get('#single-spa-application\\:\\@react-mf\\/navbar > div > div:nth-child(2) > a')
      .click()
    cy.url().should('not.eq', baseUrl)
  })
})