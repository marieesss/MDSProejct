describe("searchUser", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("searchUser", () => {
    cy.get("input[type=text]").type("bruno@bruno.com");
    cy.get("input[type=password]").type("123Bruno!");
    cy.get("button").click();
    cy.get('a[href="/product"]').click();
    cy.contains("button", "créer un produit").click();
    cy.get("input[name=titre]").type("courgette");
    cy.get("input[name=description]").type("courgette");
    cy.get("input[name=img]").type("https://images.unsplash.com/photo-1583687355032-89b902b7335f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80");
    cy.get("select[name=cat]").select('Légume');
    cy.get("input[name=price]").type(3);
    cy.get("input[name=taille]").type(0);
    cy.get("select[name=fermier]").select('Josiane');
    cy.wait(3000)
    cy.get('button[type=submit]').click()
    cy.contains("div", "courgette").should("be.visible");
    cy.get('.card').last().find('.button-green').click();
    cy.contains("div", "courgette").should('not.contain', 'Text')



  });
});