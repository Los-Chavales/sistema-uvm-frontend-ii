describe('Test Home', () => {
  it('visitar home', () => { //Pasos de cada instrucción
    cy.visit('/')
    cy.contains('h1', 'UVM Planification System') //comprobando que la página tenga esto
  })
  
})
