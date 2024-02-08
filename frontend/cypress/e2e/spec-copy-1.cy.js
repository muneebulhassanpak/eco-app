// Home page code

describe("Home Page", () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit("/");
  });

  it("should display the hero section with correct content", () => {
    // Verify the hero section elements and content
    cy.get(".hero-section").should("be.visible");
    cy.contains("h1", "Welcome to EcoGrow AgroTech Solutions").should(
      "be.visible"
    );
    cy.contains("p", "Empowering Farmers, Enhancing Agriculture").should(
      "be.visible"
    );
    cy.contains("a", "Explore Now").should("be.visible");
    cy.contains("a", "Discuss").should("be.visible");
  });

  it('should navigate to EcoShop page when "Explore Now" button is clicked', () => {
    // Click on the "Explore Now" anchor tag and verify navigation to EcoShop page
    cy.contains("a", "Explore Now").click();
    cy.url().should("include", "/ecoshop");
  });

  it('should navigate to Forum page when "Discuss" button is clicked', () => {
    // Click on the "Discuss" anchor tag and verify navigation to Forum page
    cy.contains("a", "Discuss").click();
    cy.url().should("include", "/forum");
  });
});
