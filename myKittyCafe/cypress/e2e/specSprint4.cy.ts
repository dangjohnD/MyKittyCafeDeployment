const baseUrlS4 = Cypress.env('baseUrlLocal');
describe('Check paypal button/go back', () => {
  it('Popup for paypal shows/go back', () => {
    cy.visit(`${baseUrlS4}/booking`);
    cy.get('ion-input[name="persons"] input').type('2{enter}');

    cy.get('ion-datetime').click();
    cy.contains('9 am').click();
    cy.get('input[name=email]').type("farmusfresh@gmail.com");
    cy.get('input[name=firstName]').type("TesterJohn");
    cy.get('input[name=lastName').type("Dang");
    cy.get('input[name=phone]').type("1234562343");
    cy.contains('Next').click();
    
    cy.wait(3000);

    cy.contains('Back to Booking').click();
  });
});

describe('Add Limits', () => {
  it('Change Limit 9am to 8', () => {
    cy.visit(`${baseUrlS4}/login`);
    cy.get('input[name=username]').type("admin@gmail.com");
    cy.get('input[name=password]').type("password");
    cy.contains('Log In').click();
    cy.wait(100);
    cy.get('#adminBoard').click();
    cy.contains('Limit Appointments').click();

    cy.get('ion-datetime').click();
    cy.contains('9 am').click();

    cy.get('ion-select').click(); // Open the dropdown
    cy.wait(6000);
    cy.contains('Add Limit').click();
  });
});

describe('Cancelling appointment past date', () => {
  it('Show\'s error message', () => {
    cy.visit(`${baseUrlS4}/login`);
    cy.get('input[name=username]').type("admin@gmail.com");
    cy.get('input[name=password]').type("password");
    cy.contains('Log In').click();
    cy.get('#viewAllButton').click();
    cy.get('#startDate').type('2024-09-01');

    cy.get('#endDate').type('2024-10-31');
    cy.contains('Filter').click()
    cy.wait(1000)
    cy.contains('Filter').click()
    cy.get('tr').eq(10).contains('Cancel').click();
      cy.contains('You cannot delete this appointment');
  });
});

describe('Cancelling appointment', () => {
  it('Show\'s Appointment Cancelled', () => {
      cy.visit(`${baseUrlS4}/login`);
      cy.get('input[name=username]').type("admin@gmail.com");
      cy.get('input[name=password]').type("password");
      cy.contains('Log In').click();
      cy.get('#viewAllButton').click();
      cy.get('#startDate').type('2024-09-01');

      cy.get('#endDate').type('2024-10-31');
      cy.contains('Filter').click()
      cy.wait(1000)
      cy.contains('Filter').click()
      cy.get('tr').eq(15).contains('Cancel').click();
      cy.get('#confirmDeletion').click();
      cy.get('#confirmButton').click();
  });
});