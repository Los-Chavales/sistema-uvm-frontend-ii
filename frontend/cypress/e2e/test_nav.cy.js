let correo = "direccion_ingenieria@gmail.com";
let clave = "root12345";

const valNav = (be = '') => {
  cy.get('span.header-side')
    .find('div.img-container')
    .should(be);
}

const changeNav = (action = '') => {
  cy.get('span.' + action).click();
}

describe('test calendario', () => {
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
    // Visita la página principal (vacía) antes de cada prueba
    cy.visit('/admin-dsh/');
  });

  it('Comprobar que el nav abre y cierra', () => {
    //Revisar si está abierto
    valNav('exist');
    cy.wait(750);

    //Cerrar y verificar
    changeNav('collapse-icn'); //Cerrar nav
    valNav('not.exist'); //Revisar si está cerrado
    cy.wait(1500);

    //Abrir y verificar
    changeNav('rotate-arrow'); //Abrir nav
    valNav('exist'); //Revisar si está abierto
    cy.wait(1500);
  })


  it('Comprobar que el nav redirige a Secciones', () => {
    //Revisar si está abierto
    valNav('exist');

    cy.get('a[href*="/admin-dsh/secciones"]').click() //Hacer click en nav
    cy.url().should('eq', 'http://localhost:3000/admin-dsh/secciones') //si tiene éxito llega a la página
    changeNav('collapse-icn'); //Cerrar nav
  })

}) 