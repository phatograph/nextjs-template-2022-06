import './selectors'

import {
  loginShopPath,
  shopAdminIndexPath,
  loginBuyerPath,
  buyerAdminIndexPath,
  loginSuperAdminPath,
  superAdminIndexPath,
} from '@lib/paths'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAsShop', (options = {}) => {
  const {index = 0} = options

  cy.visit(loginShopPath)

  cy.getByName('email').type(Cypress.env('shopAdmins')?.[index]?.email)
  cy.getByName('password').type(Cypress.env('shopAdmins')?.[index]?.password, {
    log: false,
  })

  cy.get('.Button').click()
  cy.url().should('match', new RegExp(shopAdminIndexPath))
})

Cypress.Commands.add('loginAsBuyer', (options = {}) => {
  const {index = 0} = options

  cy.visit(loginBuyerPath)

  cy.getByName('email').type(Cypress.env('buyers')?.[index]?.email)
  cy.getByName('password').type(Cypress.env('buyers')?.[index]?.password, {
    log: false,
  })
  cy.getByTarget('buyer-login').click()
  cy.url().should('match', new RegExp(buyerAdminIndexPath))
})

Cypress.Commands.add('logoutAsShop', () => {
  cy.get('.Nav__handle').click()

  cy.get('.Nav__menu__body__a--red').click()
})

Cypress.Commands.add('loginAsSuperAdmin', (options = {}) => {
  const {index = 0} = options

  cy.visit(loginSuperAdminPath)

  cy.getByName('email').type(Cypress.env('superAdmins')?.[index]?.email)
  cy.getByName('password').type(Cypress.env('superAdmins')?.[index]?.password, {
    log: false,
  })

  cy.get('.Button').click()
  cy.url().should('match', new RegExp(superAdminIndexPath))
})

Cypress.Commands.add('logoutAsBuyer', () => {
  cy.get('.Nav__handle').click()

  cy.get('.Nav__menu__body__a--red').click()
})
