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
    cy.wait(2500); // Ajusta el tiempo según sea necesario para que los datos se carguen

    // Acceder a la store de Pinia y comprobar los datos
    cy.window().its('$store.events').then(eventsState => {
      let events = eventsState.options.events;
      // Registrar los datos en la consola
      console.log('Datos en la store:', events);

      // Verificar que el arreglo exista
      expect(events).to.exist;

      // Verificar que el arreglo no esté vacío
      expect(events).to.have.length.greaterThan(0);
    });

    cy.window().its('$store.activities').then(actsState => {
      let acts = actsState.options.activities;
      // Registrar los datos en la consola
      console.log('Datos en la store:', acts);

      // Verificar que el arreglo exista
      expect(acts).to.exist;

      // Verificar que el arreglo no esté vacío
      expect(acts).to.have.length.greaterThan(0);
    });
  })
}) 