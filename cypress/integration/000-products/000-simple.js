import {
  shopAdminIndexPath,
  shopAdminProductsNewPath,
  shopAdminProductsEditPath,
} from '@lib/paths'

it('Create a simple product', () => {
  cy.loginAsShop()

  cy.getByTarget('new-product').click()
  cy.getByTarget('new-product-normal').click()
  cy.url().should('match', new RegExp(shopAdminProductsNewPath))

  cy.get('.Label__auto-generate-jan-code')
    .eq(0)
    .click()
    .parents('.AdminForm__chart-details__wrapper')
    .should('not.have.class', 'AdminForm__chart-details__wrapper--disabled')

  cy.getByName('title')
    .invoke('val')
    .then((productTitle) => {
      cy.get('.AdminForm__product-properties__col .Input')
        .invoke('val')
        .then((productStock) => {
          cy.getByTarget('create-product').click()
          cy.url().should('match', new RegExp(shopAdminIndexPath))

          cy.contains(productTitle)
            .parents('.Table__tr')
            .find(
              '.Table__td__product-properties .Table__td__product-properties__row'
            )
            .should('have.length', 1)
            .find('.Table__td__product-properties__col')
            .eq(0)
            .should('be.empty')
            .parent()
            .find('.Table__td__product-properties__col')
            .eq(1)
            .contains(`0 / ${productStock}`)

          cy.contains(productTitle).click()

          cy.url().should('match', new RegExp(shopAdminProductsEditPath('.*')))

          cy.getByTarget('delete-product').click()
          cy.on('window:confirm', () => true)
          cy.url().should('match', new RegExp(shopAdminIndexPath))

          cy.contains(productTitle).should('not.exist')
        })
    })
})
