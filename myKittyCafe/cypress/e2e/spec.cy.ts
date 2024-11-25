const baseUrl = Cypress.env('baseUrlLocal');

describe('email validation', () => {
  it('Shows message for invalid email', () => {
    cy.visit(`${baseUrl}/booking`);
    cy.get('input[name=email]').type("badmail");
    cy.contains('Book Appointment').click();
    cy.contains('Please enter a valid email address.');
  });
});

// Ensure error message pops up
describe('Empty login test', () => {
  it('prompts to enter username', () => {
    cy.visit(`${baseUrl}/login`);
    cy.contains('Log In').click();
    cy.contains('Please Enter Username');
  });
});

describe('Bad Credentials', () => {
  it('incorrect credentials', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[name=username]').type("username");
    cy.get('input[name=password]').type("pass321");
    cy.contains('Log In').click();
    cy.contains('Username or Password Incorrect!');
  });
});

describe('admin login success', () => {
  it('success login', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[name=username]').type("admin@gmail.com");
    cy.get('input[name=password]').type("password");
    cy.contains('Log In').click();
    cy.contains('1400 Adoptions and Counting');
  });
});

describe('Register prompt', () => {
  it('Message to fill in info', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[name=username]').type("admin@gmail.com");
    cy.get('input[name=password]').type("password");
    cy.contains('Log In').click();
    cy.visit(`${baseUrl}/register`);
    cy.get('input[name=username]').type("username");
    cy.get('input[name=password]').type("pass123");
    cy.get('#registerbutton').click();
    cy.contains('Please Enter All Information');
  });
});

describe('user login success', () => {
  it('success login', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[name=username]').type("farmusfresh@gmail.com");
    cy.get('input[name=password]').type("password");
    cy.contains('Log In').click();
    cy.contains('farmusfresh@gmail.com');
  });
});
