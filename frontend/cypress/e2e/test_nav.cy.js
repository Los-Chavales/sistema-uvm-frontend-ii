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

const changePage = (url = '') => {
  cy.get(`a[href*="/admin-dsh/${url}"]`).click() //Hacer click en nav
    cy.url().should('eq', `http://localhost:3000/admin-dsh/${url}`) //si tiene éxito llega a la página
    changeNav('collapse-icn'); //Cerrar nav
  cy.wait(1000)
}

describe('test nav dashboard', () => {
  before(() => {
    // Realiza el login una vez antes de todas las pruebas
    cy.visit('/login');
    //Rellenar con datos registrados
    cy.get('#correo').type(correo)
    cy.get('#clave').type(clave)
    cy.get('.form-submit').click() //Enviar
    //si tiene éxito llega al calendario
    cy.url().should('eq', 'http://localhost:3000/calendario')
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

  it('Comprobar que el nav redirige a Eventos', () => {
    //Revisar si está abierto
    valNav('exist');

    changePage('calendario');
  })
  
  it('Comprobar que el nav redirige a Secciones', () => {
    //Revisar si está abierto
    valNav('exist');

    changePage('secciones');
  })

  it('Comprobar que el nav redirige a Fechas', () => {
    //Revisar si está abierto
    valNav('exist');

    changePage('fechas');
  })

  it('Comprobar que el nav redirige a Horarios', () => {
    //Revisar si está abierto
    valNav('exist');

    changePage('horarios');
  })

  it('Comprobar que el nav no se redirige a ninguna página', () => {
    //Revisar si está abierto
    valNav('exist');

    changePage('x');
  })

  it('Comprobar que el nav cierra sesión', () => {
    //Revisar si está abierto
    valNav('exist');

    cy.get('.logout_button').click() //Hacer click en Cerrar Sesión
    cy.url().should('eq', 'http://localhost:3000/') //si tiene éxito sale a la página principal
  })
}) 