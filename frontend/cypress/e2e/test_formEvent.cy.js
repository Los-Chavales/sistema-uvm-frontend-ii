let correo = "roberto@gmail.com";
let clave = "profe12345";
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
const changeNav = (action = '') => {
  cy.get('span.' + action).click();
}



describe('test formulario', () => {
  before(() => {
    // Realiza el login una vez antes de todas las pruebas
    cy.visit('/login');
    //Rellenar con datos registrados
    cy.get('#correo').type(correo)
    cy.get('#clave').type(clave)
    cy.get('.form-submit').click() //Enviar
    //si tiene éxito llega al calendario
    cy.url().should('eq', 'http://localhost:3000/calendario')
    changeNav('collapse-icn'); //Cerrar nav
    //guardar las cookies después del login
    cy.getCookies().then((cookies) => {
      cy.writeFile('cookies.json', cookies);
    });
  });


  beforeEach(() => {
    cy.readFile('cookies.json').then((cookies) => {
      cookies.forEach((cookie) => {
        cy.setCookie(cookie.name, cookie.value);
      });
    });

    //Pasa el login y se dirige al calendario (donde lo redirige la función por defecto)
    cy.visit('/calendario')
    cy.contains('a', 'Planificaciones').click()
        
    cy.url().should('eq', 'http://localhost:3000/admin-dsh/planificaciones')
    changeNav('collapse-icn'); //Cerrar nav
    cy.contains('h1', 'Periodo Académico 2024') //comprobando que la página tenga esto
    cy.contains('b', 'Trimestre:') //comprobando que la página tenga esto
    cy.contains('b', 'Profesor:') //comprobando que la página tenga esto
    cy.contains('b', 'Materia:') //comprobando que la página tenga esto
    
    cy.get('.select__planification').select('Frontend II VI') 
    cy.get('.search__button').click() 
  })

  it('Validacion del formulario', () => {
    //Escoger y llenar formulario
    cy.get('#0-3-events').click()
    cy.wait(2000)
    cy.get('#0-3-events').contains('button', 'Crear evento').click()
    cy.get('.formCreateEvent_select').select('Conferencia') 
    cy.get('input[placeholder="Nombre corto"]').type("Defensa de la actividad").should('have.attr', 'type', 'text')
    cy.get('input[placeholder="Nombre largo"]').type("Defensa de la actividad 3").should('have.attr', 'type', 'text');

    cy.get('textarea[placeholder="Descripción"]').type("Defensa online en telegram")
    .invoke('val') // Obtener el valor del textarea
    .then((text) => {
      // Verificar si el texto contiene solo letras, números y espacios
      expect(text).to.match(/^[a-zA-Z0-9\s]+$/);
    });

    cy.get('#timeActivity').type("03:00").should('have.attr', 'type', 'time');
    cy.get('.submitB').click() 
    cy.contains('h4', 'Registro exitoso') //comprobando que la página tenga esto
    cy.wait(1700)
    cy.get('.modalMessage').contains('button', 'cerrar X').click()
    cy.wait(500)
    cy.get('#modalE-0-3-CE').click()
    cy.wait(2500)
    cy.get('#modalE-0-3').click()
  })
  
  it('Validacion del formulario con un dato incorrecto', () => {
    //Escoger y llenar formulario
    cy.get('#0-3-events').click()
    cy.get('#0-3-events').contains('button', 'Crear evento').click()
    cy.get('.formCreateEvent_select').select('Conferencia') 
    cy.get('input[placeholder="Nombre corto"]').type("Defensa de la actividad").should('have.attr', 'type', 'text')
    cy.get('input[placeholder="Nombre largo"]').type("Defensa de la actividad 3").should('have.attr', 'type', 'text');

    cy.get('textarea[placeholder="Descripción"]').type("Defensa online en telegram")
    .invoke('val') // Obtener el valor del textarea
    .then((text) => {
      // Verificar si el texto contiene solo letras, números y espacios
      expect(text).to.match(/^[a-zA-Z0-9\s]+$/);
    });

    cy.get('#timeActivity').type("hola mundo").should('have.attr', 'type', 'time');
    cy.get('.submitB').click() 
    cy.contains('h4', 'Registro exitoso') //comprobando que la página tenga esto
  })
})