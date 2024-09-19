const baseUrlS3 = Cypress.env('baseUrlLocal');

describe('user login success', () => {
    it('success login', () => {
      cy.visit(`${baseUrlS3}/login`);
      cy.get('input[name=username]').type("farmusfresh@gmail.com");
      cy.get('input[name=password]').type("password");
      cy.contains('Log In').click();
      cy.contains('farmusfresh@gmail.com');
    });
  });


  describe('Empty login test', () => {
    it('prompts to enter username', () => {
      cy.visit(`${baseUrlS3}/login`);
      cy.contains('Log In').click();
      cy.contains('Please Enter Username');
    });
  });
  
  describe('Bad Credentials', () => {
    it('incorrect credentials', () => {
      cy.visit(`${baseUrlS3}/login`);
      cy.get('input[name=username]').type("farmusfres@gmail.com");
      cy.get('input[name=password]').type("pass321");
      cy.contains('Log In').click();
      cy.contains('Username or Password Incorrect!');
    });
  });

  
describe('Register prompt to fill in', () => {
    it('Message to fill in info', () => {
      cy.visit(`${baseUrlS3}/register`);
      cy.get('input[name=username]').type("username");
      cy.get('input[name=password]').type("pass123");
      cy.get('#registerbutton').click();
      cy.contains('Please Enter All Information');
    });
  });

  
describe('Register User already exists', () => {
    it('Prompt to login, user exists', () => {
      cy.visit(`${baseUrlS3}/register`);
      cy.get('input[name=firstName]').type("Farmer");
      cy.get('input[name=lastName]').type("John");
      cy.get('input[name=username]').type("farmusfresh@gmail.com");
      cy.get('input[name=password]').type("password");
      cy.get('#registerbutton').click();
      cy.contains('User already exists');
    });
  });


  describe('View Appointments as User', () => {
    it('Show\'s user\'s appointments', () => {
        cy.visit(`${baseUrlS3}/login`);
        cy.get('input[name=username]').type("farmusfresh@gmail.com");
        cy.get('input[name=password]').type("password");
        cy.contains('Log In').click();
        cy.contains('farmusfresh@gmail.com');
        cy.get('#viewButton').click();
        cy.contains('Mar 29, 2024, 5:00:00 PM');
    });
  });


  describe('Cancelling appointment past date', () => {
    it('Show\'s error message', () => {
        cy.visit(`${baseUrlS3}/login`);
        cy.get('input[name=username]').type("farmusfresh@gmail.com");
        cy.get('input[name=password]').type("password");
        cy.contains('Log In').click();
        cy.contains('farmusfresh@gmail.com');
        cy.get('#viewButton').click();
        cy.get('tr').eq(2).contains('Cancel').click();
        cy.contains('You cannot delete this appointment');
    });
  });

  describe('Cancelling appointment', () => {
    it('Show\'s Appointment Cancelled', () => {
        cy.visit(`${baseUrlS3}/login`);
        cy.get('input[name=username]').type("farmusfresh@gmail.com");
        cy.get('input[name=password]').type("password");
        cy.contains('Log In').click();
        cy.contains('farmusfresh@gmail.com');
        cy.get('#viewButton').click();
        cy.get('tr').eq(7).contains('Cancel').click();
        cy.get('#confirmDeletion').click();
        cy.get('#confirmButton').click();
    });
  });

