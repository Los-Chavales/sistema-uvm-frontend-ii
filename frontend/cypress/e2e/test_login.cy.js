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


describe('test login', () => {
  it('el usuario no puede acceder a una ruta autenticada sin login', () => {
    cy.visit('/admin-dsh/calendario')
    cy.wait(2000);
    cy.url().should('eq', 'http://localhost:3000/login')
  }) 
  it('el profesor esta intentando entrar', () => {
    cy.visit('/login')
    //Rellenar con datos registrados
    cy.get('#correo').type("roberto@gmail.com")
    cy.get('#clave').type("profe12345")
    cy.get('.form-submit').click() //Enviar
    
    realizarLogin("roberto@gmail.com", "profe12345") //Hacer una petición post con esos datos

    cy.url().should('eq', 'http://localhost:3000/calendario') //si tiene éxito llega al calendario

    //¿Se renderiza el nav del profesor?
    cy.contains('a', 'Planificaciones')
    cy.contains('a', 'Calendario')

  }) 
  it('el director esta intentando entrar', () => {
    cy.visit('/login')
    //Rellenar con datos registrados
    cy.get('#correo').type("direccion_ingenieria@gmail.com")
    cy.get('#clave').type("root12345")
    cy.get('.form-submit').click() //Enviar
    
    realizarLogin("direccion_ingenieria@gmail.com", "root12345") //Hacer una petición post con esos datos

    cy.url().should('eq', 'http://localhost:3000/calendario') //si tiene éxito llega al calendario

    //¿Se renderiza el nav del profesor?
    cy.contains('a', 'Profesores')
    cy.contains('a', 'Materias')
    cy.contains('a', 'Fechas')
    cy.contains('a', 'Eventos')
    cy.contains('a', 'Calendario')
    cy.contains('a', 'Secciones')
    cy.contains('a', 'Horarios')

  }) 
  it('el usuario ingresado no es el correcto', () => {
    cy.visit('/login') //ir a login
    //Rellenar con datos no registrados
    cy.get('#correo').type("paula@gmail.com") //Hacer una petición post con esos datos
    cy.get('#clave').type("54321")
    cy.get('.form-submit').click() //Enviar

    realizarLogin("paula@gmail.com", "54321")
    
    cy.contains('li', '*No existe ningún usuario con el correo indicado: paula@gmail.com*') //comprobando que la página tenga esto
    cy.url().should('eq', 'http://localhost:3000/login') //Si no existe el usuario la ruta actual debe ser equivalente a la de login
  })   
}) 