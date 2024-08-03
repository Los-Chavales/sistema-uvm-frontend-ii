let correo = "direccion_ingenieria@gmail.com";
let clave = "root12345";

describe('test calendario', () => {
  it('verificar que sea un profesor el que esta ingresando y permitirle entrar', () => {
    cy.visit('/login')
    //Rellenar con datos registrados
    cy.get('#correo').type(correo)
    cy.get('#clave').type(clave)
    cy.get('.form-submit').click() //Enviar
    cy.url().should('eq', 'http://localhost:3000/calendario') //si tiene éxito llega al calendario

    cy.wait(1500); // Esperar antes de oprimir el nav

    cy.visit('/admin-dsh/calendario')
    
    

    
  })
  
}) 