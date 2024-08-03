let correo = "direccion_ingenieria@gmail.com";
let clave = "root12345";

describe('test calendario', () => {
  it('Verificar el funcionamiento del Nav', () => {
    cy.visit('/login')
    //Rellenar con datos registrados
    cy.get('#correo').type(correo)
    cy.get('#clave').type(clave)
    cy.get('.form-submit').click() //Enviar
    cy.url().should('eq', 'http://localhost:3000/calendario') //si tiene éxito llega al calendario

    //Revisar si está abierto
    cy.get('span.header-side')
      .find('div.img-container')
      .should('exist');

    cy.get('a[href*="/admin-dsh/secciones"]').click() //Hacer click en nav
    cy.url().should('eq', 'http://localhost:3000/admin-dsh/secciones') //si tiene éxito llega a la página
  })
  
}) 