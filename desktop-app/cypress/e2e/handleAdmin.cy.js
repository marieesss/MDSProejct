describe("makeUserAdmin", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("makeUserAdmin", () => {
    cy.get("input[type=text]").type("bruno@bruno.com");
    cy.get("input[type=password]").type("123Bruno!");
    cy.get("button").click();
    cy.get('a[href="/user"]').click();
    cy.contains("tr", "lea").as("targetRow");
    cy.get("@targetRow").contains("button", "Attribuer admin").click();
  });

  it("DeleteAdminRights", () => {
    cy.get("input[type=text]").type("bruno@bruno.com");
    cy.get("input[type=password]").type("123Bruno!");
    cy.get("button").click();
    cy.get('a[href="/user"]').click();
    cy.contains("tr", "lea").as("targetRow");
    cy.get("@targetRow").contains("button", "Enlever admin").click();
  });
});