describe('email validation', () => {
  it('Shows message for invalid email',() => {
    cy.visit('http://localhost:8100/booking')
    cy.get('input[name=email]').type("badmail")
    cy.contains('Book Appointment').click();
    cy.contains('Please enter a valid email address.')
  })
})

// Ensure error message pops up
describe('Empty login test', () => {
  it('prompts to enter username',() => {
    cy.visit('http://localhost:8100/login')
    cy.contains('Log In').click();
    cy.contains('Please Enter Username')
  })
})

describe('Bad Credentials', () => {
  it('incorrect credentials',() => {
    cy.visit('http://localhost:8100/login')
    cy.get('input[name=username]').type("username");
    cy.get('input[name=password]').type("pass321");
    cy.contains('Log In').click();
    cy.contains('Username or Password Incorrect!')
  })
})

describe('login success', () => {
  it('success login',() => {
    cy.visit('http://localhost:8100/login');
    cy.get('input[name=username]').type("employee@gmail.com");
    cy.get('input[name=password]').type("password");
    cy.contains('Log In').click();
    cy.contains('1400 Adoptions and Counting');
  })
})

describe('Register prompt', () => {
  it('Message to fill in info',() => {
    cy.visit('http://localhost:8100/login');
    cy.get('input[name=username]').type("admin@gmail.com");
    cy.get('input[name=password]').type("password");
    cy.contains('Log In').click();
    cy.visit('http://localhost:8100/register');
    cy.get('input[name=username]').type("username");
    cy.get('input[name=password]').type("pass123");
    cy.get('#registerbutton').click();
    cy.contains('Please Enter All Information');
  })
})