describe("Forum Page", () => {
  beforeEach(() => {
    // Visit the Forum page before each test
    cy.visit("/forum");
  });

  it("should display the search bar", () => {
    // Verify the presence of the search bar
    cy.get(".forum-search-bar").should("exist");
  });

  it('should display "Post Question" button', () => {
    // Verify the presence of the "Post Question" button
    cy.get(".search-button").should("be.visible");
  });

  it("should display loading text", () => {
    // Verify the presence of the loading text
    cy.contains("Loading...").should("exist");
  });

  it("should display forum topics after loading", () => {
    // Verify that the loading text disappears after a delay of 1000ms
    cy.contains("Loading...").should("not.exist");

    // Verify the presence of forum topics
    cy.get(".forum-card").should("have.length.greaterThan", 1);
  });
});
