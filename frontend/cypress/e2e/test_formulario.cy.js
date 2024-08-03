function ingresarUsuario(correo, clave) {
    cy.request('POST', 'http://localhost:4000/usuarios/login', { correo, clave}).then(
        (response) => {
            cy.log(response)
            expect(response.status).to.eq(200);
        }
    );
}

/*function ingresarProfesor(nombre, clave) {
    cy.request('POST', 'http://localhost:4000/usuarios/login', { nombre, apellido, correo, id_usuario}).then(
        (response) => {
            cy.log(response)
            expect(response.status).to.eq(200);
        }
    );
}*/
  
describe('test formulario', ()=> {

    it('el usuario ingresado es rol director', () => {
        cy.viewport(1280, 720);
        cy.visit('/login') //ir a login
        //Rellenar con datos de director
        cy.get('#correo').type("direccion_ingenieria@gmail.com")
        cy.get('#clave').type("root12345")
        cy.get('.form-submit').click() //Enviar

        ingresarUsuario("direccion_ingenieria@gmail.com", "root12345")//Hacer una petición post con esos datos
        
        cy.wait(100)
        cy.url().should('eq', 'http://localhost:3000/login') //si tiene éxito llega a gestión de profesores
        cy.contains('a', 'Profesores').click()
       /* cy.visit('/admin-dsh/profesores')*/
        cy.wait(4000);
        cy.get('.button').eq(0).click();
        cy.get('#nombre').type("Germán Del Valle")
        cy.get('#apellido').type("Herrera Rodríguez")
        cy.get('#correo').type("germanh@gmail.com")
        cy.get('#cedula').type("30954258")
        cy.get('.form-submit').click() //Enviar
        cy.contains('button', 'cerrar X').click()
    })
   

   

    
})