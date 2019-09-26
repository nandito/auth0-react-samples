/// <reference types="Cypress" />

describe('Profile', () => {
  before(() => {
    cy.log('CYPRESS ENV')
    cy.log(Cypress.env())
    cy.log('PROCESS ENV')
    cy.log(process.env)
    // to make sure user is logged out
    cy.request(Cypress.env('CYPRESS_AUTH0_LOGOUT_URL'));
  });

  it('should show user info', () => {
    cy.visit('/');
    cy.get('#qsLoginBtn')
      .should('be.visible')
      .click()
      .location('host').should('contain', 'auth0.com');

    cy.get('#1-email')
      .type(Cypress.env('CYPRESS_AUTH0_USER_EMAIL'));

    cy.get('.auth0-lock-input-show-password .auth0-lock-input')
      .type(Cypress.env('CYPRESS_AUTH0_USER_PASS'));

    cy.get('.auth0-lock-submit')
      .click();

    cy.get('#profileDropDown')
      .should('be.visible')
      .click()
      .get('#qsLogoutBtn')
      .click('left');

    cy.get('#qsLoginBtn')
      .should('be.visible');
  });
});
