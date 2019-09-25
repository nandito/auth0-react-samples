import config from "../../../src/auth_config.json";

/// <reference types="Cypress" />

describe('Profile', () => {
  before(() => {
    // to make sure user is logged out
    cy.request(config.auth0LogoutUrl);
  });

  it('should show user info', () => {
    cy.visit('/');
    cy.get('#qsLoginBtn')
      .should('be.visible')
      .click()
      .location('host').should('contain', 'auth0.com');

    cy.get('#1-email')
      .type(config.auth0UserEmail);

    cy.get('.auth0-lock-input-show-password .auth0-lock-input')
      .type(config.auth0UserPassword);

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
