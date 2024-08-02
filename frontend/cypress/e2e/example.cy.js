// https://on.cypress.io/api

describe('My First Test', () => {
  it('visits the app root url', () => { //Pasos de cada instrucción
    cy.visit('/')
    cy.contains('h1', 'UVM Planification System') //comprobando que la página tenga esto
  })
})
