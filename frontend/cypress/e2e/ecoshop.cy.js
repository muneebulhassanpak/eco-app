describe("EcoShop Page", () => {
  beforeEach(() => {
    // Visit the EcoShop page before each test
    cy.visit("/ecoshop");
  });

  it("should display loading text", () => {
    // Verify the presence of the loading text
    cy.contains("Loading...").should("exist");
  });

  it("should display products after loading", () => {
    // Verify that the loading text disappears after a delay of 1000ms
    cy.contains("Loading...").should("not.exist");

    // Verify the presence of products
    cy.get(".product-card").should("have.length.gte", 1);
  });
});
