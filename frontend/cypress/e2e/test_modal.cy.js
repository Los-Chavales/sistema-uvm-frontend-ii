function realizarLogin(correo, clave) {
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/usuarios/login',
    body: {
      correo,
      clave
    }
  })
    .then((response) => {
      cy.log(response)
      expect(response.status).to.eq(200);
    });
}

describe('test modal', () => {
  it('abrir un modal', () => {
    cy.visit('/admin-dsh/planificaciones')
    //Rellenar con datos registrados
    cy.get('#correo').type("roberto@gmail.com")
    cy.get('#clave').type("profe12345")
    cy.get('.form-submit').click() //Enviar

    realizarLogin("roberto@gmail.com", "profe12345") //Hacer una petición post con esos datos

    cy.url().should('eq', 'http://localhost:3000/calendario') //si tiene éxito llega al calendario

    //Pasa el login y se dirige al calendario (donde lo redirige la función por defecto)

    cy.visit('/calendario')
    cy.contains('a', 'Planificaciones').click()
    
    cy.url().should('eq', 'http://localhost:3000/admin-dsh/planificaciones')
    cy.contains('h1', 'Periodo Académico 2024') //comprobando que la página tenga esto
    cy.contains('b', 'Trimestre:') //comprobando que la página tenga esto
    cy.contains('b', 'Profesor:') //comprobando que la página tenga esto
    cy.contains('b', 'Materia:') //comprobando que la página tenga esto

    cy.get('.select__planification').select('Frontend II VI') 
    cy.get('.search__button').click() 
    cy.get('.fa-circle-chevron-left').click() 

    cy.get('#0-6-acts').click()
    cy.get('.container_modal').should('be.visible') //comprobando que la página tenga esto

    cy.wait(2000);

    cy.get('#0-6-acts').contains('button', 'cerrar X').should('be.visible')
    cy.get('#0-6-acts').contains('button', 'cerrar X').click()

  })
})