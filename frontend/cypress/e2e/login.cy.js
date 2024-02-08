// cypress/integration/login.spec.js

describe("Login Page", () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit("/");
  });

  it("should open the Login modal when Login button is clicked", () => {
    // Click on the Login button to open the modal
    cy.contains("Login").click();

    // Verify that the Login modal is displayed
    cy.get(".modal").should("be.visible");
  });

  it("should display the Login form fields", () => {
    // Open the Login modal
    cy.contains("Login").click();

    // Verify the presence of form fields in the modal
    cy.get('input[name="Email"]').should("be.visible");
    cy.get('input[name="Password"]').should("be.visible");
  });

  it("should enable the Login button when all fields are filled correctly", () => {
    // Open the Login modal
    cy.contains("Login").click();

    // Fill in the form fields
    cy.get('input[name="Email"]').type("test@example.com");
    cy.get('input[name="Password"]').type("password");

    // Verify that the Login button is enabled
    cy.get('button[type="submit"]').should("not.be.disabled");
  });

  it("Should disable the Login button when form data is incomplete or incorrect", () => {
    // Open the Login modal
    cy.contains("Login").click();

    // Verify that an error message is displayed
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("should login successfully when valid credentials are provided", () => {
    // Open the Login modal
    cy.contains("Login").click();

    // Fill in the form fields with valid credentials
    cy.get('input[name="Email"]').type("test@example.com");
    cy.get('input[name="Password"]').type("password");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the modal is closed after successful login
    cy.get(".modal").should("not.exist");
  });
});
