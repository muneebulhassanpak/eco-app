// cypress/integration/signup.spec.js

describe("Signup Page", () => {
  beforeEach(() => {
    // Visit the Signup page before each test
    cy.visit("/"); // Assuming the Signup component is part of the home page
    cy.contains("Signup").click(); // Click on the Signup button to open the modal
  });

  it("should display the Signup form fields", () => {
    // Verify the presence of form fields
    cy.get('input[name="Full Name"]').should("be.visible");
    cy.get('input[name="Email"]').should("be.visible");
    cy.get('select[name="Signup As"]').should("be.visible");
    cy.get('input[name="Password"]').should("be.visible");
  });

  it("should enable the Signup button when all fields are filled correctly", () => {
    // Fill in the form fields
    cy.get('input[name="Full Name"]').type("John Doe");
    cy.get('input[name="Email"]').type("john.doe@example.com");
    cy.get('select[name="Signup As"]').select("Farmer");
    cy.get('input[name="Password"]').type("Password123");

    // Verify that the Signup button is enabled
    cy.get('button[type="submit"]').should("not.be.disabled");
  });

  it("should disable when form data is incomplete or incorrect", () => {
    // Attempt to submit the form without filling in any fields
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("should submit the form when all fields are filled correctly", () => {
    // Fill in the form fields
    cy.get('input[name="Full Name"]').type("John Doe");
    cy.get('input[name="Email"]').type("john.doe@example.com");
    cy.get('select[name="Signup As"]').select("Farmer");
    cy.get('input[name="Password"]').type("Password123");

    // Submit the form
    cy.get('button[type="submit"]').click();
  });
});
