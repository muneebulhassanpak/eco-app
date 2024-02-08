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

    // Wait for a brief moment before clicking on the forum link in the header
    cy.wait(1000);

    // Click on the forum link in the header
    cy.contains("Forum").click();

    // Wait for a brief moment before clicking on any forum card
    cy.wait(1000);

    // Click on the first forum card to visit its page
    cy.get(".forum-card").first().click();

    // Wait for the redirection to the forum card page
    cy.location("pathname").should("include", "/forum/");

    // Wait for the forum card page to load
    cy.wait(1000);
  });

  it('should display the text "Your message" on the forum card page', () => {
    // Verify the presence of the text "Your message"
    cy.contains("Your message").should("exist");
  });
});
