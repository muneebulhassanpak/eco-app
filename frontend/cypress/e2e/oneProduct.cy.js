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

    // Wait for a brief moment before clicking on the EcoShop link in the header
    cy.wait(2000);

    // Click on the EcoShop link in the header
    cy.contains("EcoShop").click();

    // Wait for a brief moment before clicking on any link with class "visit-link"
    cy.wait(1000);

    // Click on any link with class "visit-link"
    cy.get(".visit-link").first().click();

    // Wait for the redirection to the page
    cy.location("pathname").should("not.eq", "/");

    // Wait for the page to load
    cy.wait(1000);
  });

  it('should display some text on the page visited from "EcoShop"', () => {
    // Verify the presence of any text on the page
    cy.wait(1000);
    cy.get("body").should("contain", "Orange");
  });
});
