describe("searchUser", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("searchUser", () => {
    cy.get("input[type=text]").type("bruno@bruno.com");
    cy.get("input[type=password]").type("123Bruno!");
    cy.get("button").click();
    cy.get('a[href="/user"]').click();
    cy.get("input[type=search]").type("josh");
    cy.get('tr').eq(1).as("result")
    cy.get('@result').find('td').eq(1).should('contain', 'josh');
  });
});