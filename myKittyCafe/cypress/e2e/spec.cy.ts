describe('email validation', () => {
  it('passes',() => {
    cy.visit('http://localhost:8100/booking')
    cy.get('input[name=email]').type("badmail")
    cy.contains('Book Appointment').click();
    cy.contains('Please enter a valid email address.')
  })
})