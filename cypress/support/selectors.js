Cypress.Commands.add('getByTarget', (selector, ...args) => {
  return cy.get(`[cypress-target=${selector}]`, ...args)
})

Cypress.Commands.add('getByName', (selector, ...args) => {
  return cy.get(`[name='${selector}']`, ...args)
})
