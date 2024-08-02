describe('test planificacion', () => { 

  it('el usuario ingresado no es el correcto', () => {
    cy.visit('/login') //ir a login
    //Rellenar con datos no registrados
    cy.get('#correo').type("paula@gmail.com")
    cy.get('#clave').type("54321")
    cy.get('.form-submit').click() //Enviar
    cy.url().should('eq', 'http://localhost:3000/login') //Si no existe el usuario la ruta actual debe ser equivalente a la de login
  })

  it('verificar que sea un profesor el que esta ingresando y permitirle entrar', () => {
    cy.visit('/admin-dsh/planificaciones')
    //Rellenar con datos registrados
    cy.get('#correo').type("roberto@gmail.com")
    cy.get('#clave').type("profe12345")
    cy.get('.form-submit').click() //Enviar

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

  })
}) 