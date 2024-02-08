// cypress/integration/dashboard.spec.js

describe("Dashboard Page", () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit("/");

    // Click on the Login button to open the modal
    cy.contains("Login").click();

    // Fill in the form fields with valid credentials
    cy.get('input[name="Email"]').type("adminlia1919@gmail.com");
    cy.get('input[name="Password"]').type("IamPro200k");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the modal is closed after successful login
    cy.get(".modal").should("not.exist");

    cy.wait(1000);
    // Wait for the redirection to /forum and then navigate to /dashboard/forum
    cy.location("pathname").should("eq", "/forum");
    cy.visit("/dashboard/forum");
    cy.wait(3000);
  });

  it('should display the heading "Your Articles on Platform"', () => {
    // Verify the presence of the heading
    cy.contains("Your Articles on Platform").should("exist");
  });

  it("should display user articles after loading", () => {
    // Wait for a brief moment before checking for forum cards
    cy.wait(1000);

    // Verify the presence of user articles after a delay
    cy.get(".forum-card").should("have.length.gte", 1);
  });

  it("should display loading text on dashboard", () => {
    // Verify the presence of loading text
    cy.contains("Loading...").should("exist");
  });
});
