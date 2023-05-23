describe('deleteUser', () => {
  beforeEach(() => {
        cy.visit('http://localhost:3000')
  })

  it('deleteUser', () => {
    cy.get('input[type=text]').type('bruno@bruno.com')
    cy.get('input[type=password]').type('123Bruno!')
    cy.get('button').click()
    cy.get('a[href="/user"]').click();
    cy.contains('tr', 'JeanDeLaFontaine').as('targetRow');
    cy.get('@targetRow').contains('button', 'Supprimer').click();
  })
})