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


describe('test planificacion', () => { 

  it('verificar que sea un profesor el que esta ingresando y permitirle entrar', () => {
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


    //cy.contains('option', 'Frontend II VI').click()
    cy.get('.select__planification').select('Frontend II VI') 
    cy.get('.search__button').click() 
    cy.get('.fa-circle-chevron-left').click() 
    
    //cy.visit('/admin-dsh/planificaciones')

    // Esperar a que los datos se almacenen en la store
    cy.wait(2000); // Ajusta el tiempo según sea necesario para que los datos se carguen

    // Acceder a la store de Pinia y comprobar los datos
    cy.window().then((win) => {
      const eventsState = win.getStoreState(); // Llama a la función para obtener el estado
      // Registrar los datos en la consola
      console.log('Datos en la store:', eventsState.events);
      // Puedes agregar una afirmación simple para verificar que los datos existen

      expect(eventsState.events).to.exist
    });

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