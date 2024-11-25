const baseUrlS5 = Cypress.env('baseUrlLocal');

describe('Check Kitty Page', () => {
  it('Shows all the cats', () => {
    cy.visit(`${baseUrlS5}`);
    cy.contains("Kaiji");
    cy.contains("Kaido");
    cy.wait(300);
  });
});

describe('Check Kitty Page', () => {
  it('Disabled Filter works', () => {
    cy.visit(`${baseUrlS5}`);
    cy.contains("Kaiji");
    cy.get('#disabledFilter').click();
    cy.wait(500);
    cy.contains('.alert-radio-label', 'Disabled Only').click();
    cy.wait(300);
    cy.contains('OK').click();
    cy.contains("Kaido");
    cy.contains("Kaiji").should('not.exist');

    cy.wait(300);
    cy.get('#disabledFilter').click();
    cy.wait(500);
    cy.contains('.alert-radio-label', 'Not Disabled').click();
    cy.wait(300);
    cy.contains('OK').click();
    cy.contains("Kaiji");
    cy.contains("Garibaldi");
  });
});

describe('Check Kitty Page', () => {
  it('Filter is/isnt adoptable', () => {
    cy.visit(`${baseUrlS5}`);
    cy.contains("Kaiji");
    cy.get('#adoptableFilter').click();
    cy.wait(500);
    cy.contains('.alert-radio-label', 'Adoptable Only').click();
    cy.contains('OK').click();
    cy.contains("Kaido");
    cy.contains("Garibaldi");

    cy.wait(300);
    cy.get('#adoptableFilter').click();
    cy.wait(500);
    cy.contains('.alert-radio-label', 'Not Adoptable').click();
    cy.contains('OK').click();
    cy.contains("Kaiji");
  });
});

describe('Check Kitty Page', () => {
  it('Filter colour', () => {
    cy.visit(`${baseUrlS5}`);
    cy.contains("Kaiji");
    cy.get('#colourFilter').click();
    cy.wait(500);
    cy.contains('.alert-radio-label', 'Orange').click();
    cy.wait(300);
    cy.contains('OK').click();
    cy.contains("Kaido");
    cy.contains("Kaiji");

    cy.wait(300);
    cy.get('#colourFilter').click();
    cy.wait(500);
    cy.contains('.alert-radio-label', 'Brown').click();
    cy.contains('OK').click();
    cy.contains("Garibaldi");
  });
});

describe('Check Kitty Page', () => {
  it('ADMIN-UPDATE', () => {
    cy.visit(`${baseUrlS5}/login`);
    cy.get('input[name=username]').type("admin@gmail.com");
    cy.get('input[name=password]').type("password");
    cy.contains('Log In').click();
    cy.wait(300);
    cy.contains("Kaiji").click();
    cy.wait(300);
    cy.get('#name').clear().type('KaijiNEW');
    cy.contains("Save Changes").click();
    cy.wait(2000);
    cy.contains('KaijiNEW')

    cy.contains("KaijiNEW").click();
    cy.wait(300);
    cy.get('#name').clear().type('Kaiji');
    cy.contains("Save Changes").click();
    cy.wait(2000);
    cy.contains('Kaiji')
  });
});

describe('Check Kitty Page', () => {
  it('ADMIN-ADD', () => {
    cy.visit(`${baseUrlS5}/login`);
    cy.get('input[name=username]').type("admin@gmail.com");
    cy.get('input[name=password]').type("password");
    cy.contains('Log In').click();
    cy.wait(300);

    cy.contains('Add Kitty').click();

    cy.get('#name').clear().type('Whiskers');
    cy.get('#colour').select('Black');
    cy.get('#birthday').clear().type('2019-11-03'); 
    cy.get('#desc').clear().type("He's a good cat looking for a home with another kitty to play with"); 
    cy.get('#disabled').check({ force: true });
    cy.get('#adoptable').check({ force: true }); 

    // Submit the form
    cy.get('.submit-button')
      .click();
    cy.wait(4000);
  });
});

describe('Check Kitty Page', () => {
  it('ADMIN-DEL', () => {
    cy.visit(`${baseUrlS5}/login`);
    cy.get('input[name=username]').type("admin@gmail.com");
    cy.get('input[name=password]').type("password");
    cy.contains('Log In').click();
    cy.wait(300);

    cy.contains('Whiskers').click();
    // Submit the form
    cy.get('.delete-button')
      .click();
    cy.get('#confirm').click();
    cy.get('.delete-button')
    .click();
    cy.wait(300);
    cy.contains('Whiskers').should('not.exist');
  });
});

