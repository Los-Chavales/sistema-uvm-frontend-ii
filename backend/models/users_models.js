const connection = require('../config/conexionMySql');
const Response = require('./response')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const result = require('dotenv').config();

class Users_Model {
  see_users(){
    return new Promise((resolve, reject) => {
      connection.query('SELECT `id_usuario` AS `cedula`, `correo`, `nombre`, `apellido`, `tipo_rol`, `foto_perfil` FROM `usuarios` JOIN `roles` WHERE `idROL` = `id_rol`', function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen usuarios registrados', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  see_users_teachers(){
    return new Promise((resolve, reject) => {
      connection.query('SELECT `id_usuario` AS `cedula`, `correo`, `nombre`, `apellido`, `foto_perfil` FROM `usuarios` WHERE `idRol` = 3', function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen usuarios registrados', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }


  search_users(name){
    return new Promise((resolve, reject) => {
      connection.query('SELECT `id_usuario` AS `cedula`, `correo`, `nombre`, `apellido`, `tipo_rol`, `foto_perfil` FROM `usuarios` JOIN `roles` WHERE `nombre` = ? && `idRol` = `id_rol`', name, function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen usuarios con ese nombre registrados', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  search_users_teachers(name){
    return new Promise((resolve, reject) => {
      connection.query('SELECT `id_usuario` AS `cedula`, `correo`, `nombre`, `apellido`, `tipo_rol`, `foto_perfil` FROM `usuarios` JOIN `roles` WHERE `nombre` = ? && `idRol` = `id_rol` && `tipo_rol` = "profesor"', name, function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen profesores con ese nombre registrados', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  see_teachers_subjects(){
    return new Promise((resolve, reject) => {
        connection.query('SELECT `nombre`, `apellido` , `nombre_materia` FROM `asignados` JOIN `usuarios` JOIN `materias` WHERE idProfesor = id_usuario && idMateria = id_materia', function (error, results, fields) {
            if (error) {
                reject(new Response(500, error, error));
            } else {
                if (results.length == 0) {
                    reject(new Response(404, 'No existen materias y profesores vinculados', results));
                } else {
                    resolve(new Response(200, results, results));
                }
            };
        });
    })
  }

  see_teachers_subjects_sections(){
    return new Promise((resolve, reject) => {
        connection.query('SELECT `nombre`, `apellido` , `nombre_materia`, `nombre_seccion` FROM `asignados` JOIN `usuarios` JOIN `materias` JOIN `secciones` WHERE idProfesor = id_usuario && idMateria = id_materia && idSeccion = id_seccion', function (error, results, fields) {
            if (error) {
                reject(new Response(500, error, error));
            } else {
                if (results.length == 0) {
                    reject(new Response(404, 'No existen materias, profesores, y secciones vinculados', results));
                } else {
                    resolve(new Response(200, results, results));
                }
            };
        });
    })
  }

  register_user_director(register) {
    return new Promise((resolve, reject) => {
        //if (nuevo.rol_user) delete nuevo.rol_user; 
        register.idRol = 2;
      if (!register.clave) reject("Ingrese una contraseña válida");
        register.clave = bcrypt.hashSync(register.clave, saltRounds);
        //console.log("clave: ", nuevo.clave_usuario)
        connection.query('INSERT INTO usuarios SET ?', register, function (error, results, fields) {
            if (error) {
                if (error.errno == 1062) reject(new Response(400, "La cédula '" + register.id_usuario + "' ya existe"));
                if (error.errno == 1048) reject(new Response(400, "No ingresó nungún dato en: " + error.sqlMessage.substring(7).replace(' cannot be null', '')));
                reject(error);
                console.error("Error SQL: ", error.sqlMessage);
            }
            if (results) {
                resolve(new Response(200, "Registro exitoso", results));
            }
        })
    })
  } 

  register_user_teacher(register) {
    return new Promise((resolve, reject) => {
        //if (nuevo.rol_user) delete nuevo.rol_user; 
        register.idRol = 3;
      if (!register.clave) reject("Ingrese una contraseña válida");
        register.clave = bcrypt.hashSync(register.clave, saltRounds);
        //console.log("clave: ", register.clave)
        connection.query('INSERT INTO usuarios SET ?', register, function (error, results, fields) {
            if (error) {
                if (error.errno == 1062) reject(new Response(400, "La cédula '" + register.id_usuario + "' ya existe"));
                if (error.errno == 1048) reject(new Response(400, "No ingresó nungún dato en: " + error.sqlMessage.substring(7).replace(' cannot be null', '')));
                reject(error);
                console.error("Error SQL: ", error.sqlMessage);
            }
            if (results) {
                resolve(new Response(200, "Registro exitoso", results));
            }
        })
    })
  }  

  login(user) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `usuarios` JOIN `roles` WHERE correo = ? && id_rol = idRol', user.correo, function (error, results, fields) {
            if (error) { reject(error); return };
            if (results[0]) { 
                console.log('Login de usuario:', results);
                    if (bcrypt.compareSync(user.clave, results[0].clave)) {
                        //Roles
                        let rol = '3'
                        if (results[0].idRol) rol = results[0].tipo_rol;

                        var token = jwt.sign({ nombre: results[0].nombre, id: results[0].id_usuario, rol: rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
                        console.log(token);
                        //results[1] = token;
                        let retorna = { id_usuario: results[0].id_usuario, nombre_usuario: results[0].nombre, rol_usuario: results[0].tipo_rol, token: token }
                        resolve(retorna);
                    } else {
                        console.log('Clave errada');
                        reject('Clave errada');
                    }
            } else {
                console.log('Usuario no existe');
                reject('No existe ningún usuario con el correo indicado: ' + user.correo);
            }
        })
    })
  }

  update_user(id, update) {
    return new Promise((resolve, reject) => {
        update.clave = bcrypt.hashSync(update.clave, saltRounds);
        if (update.idRol) {  
            reject(new Response(400, 'No puedes cambiarte de rol a ti mismo'))
        } else {
            connection.query('UPDATE `usuarios` SET ? WHERE `id_usuario` = ?', [update, id], function (err, rows, fields) {
                if (err) {
                    if (err.errno == 1048) reject("No ingresó nungún dato en: " + err.sqlMessage.substring(7).replace(' cannot be null', ''));
                    reject(new Response(500, err, err));
                } else {
                    if (rows.affectedRows < 1) {
                        console.error('El usuario "' + id + '" no existe');
                        reject(new Response(404, 'No existe ningún usuario con el ID indicado: ' + id, rows))
                    } else if (rows.changedRows > 0) {
                        resolve(new Response(200, "Se ha actualizado exitosamente", rows));
                    } else {
                        reject(new Response(200, 'No se modificó el usuario "' + id + '", debido a que los datos ingresados son iguales.', rows));
                    }
                }
            })
        }
    })
  } 

  update_user_teacher(id, update) { // actualizar solo un profesor
    return new Promise((resolve, reject) => {
        update.clave = bcrypt.hashSync(update.clave, saltRounds);
        if (update.idRol) {  
            reject(new Response(400, 'No puedes cambiarte de rol a ti mismo'))
        } else {
            connection.query('UPDATE `usuarios` SET ? WHERE `id_usuario` = ? && `idRol` = 3', [update, id], function (err, rows, fields) {
                if (err) {
                    if (err.errno == 1048) reject("No ingresó nungún dato en: " + err.sqlMessage.substring(7).replace(' cannot be null', ''));
                    reject(new Response(500, err, err));
                } else {
                    if (rows.affectedRows < 1) {
                        console.error('El usuario "' + id + '" no existe');
                        reject(new Response(404, 'No existe ningún usuario con el ID indicado: ' + id, rows))
                    } else if (rows.changedRows > 0) {
                        resolve(new Response(200, "Se ha actualizado exitosamente", rows));
                    } else {
                        reject(new Response(200, 'No se modificó el usuario "' + id + '", debido a que los datos ingresados son iguales.', rows));
                    }
                }
            })
        }
    })
  } 

  delete_user(id) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM `usuarios` WHERE `id_usuario` = ?', id, function (err, rows, fields) {
            if (err) {
                reject(new Respuesta(500, err, err))
            } else {
                if (rows.affectedRows > 0) {
                    resolve(new Response(200, "Se ha eliminado exitosamente", rows));
                } else {
                    reject(new Response(404, 'No se eliminó el usuario "' + id + '". Es posible de que ya no exista.', rows));
                }
            }
        })
    })
   }

   delete_user_teacher(id) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM `usuarios` WHERE `id_usuario` = ? && `idRol` = 3', id, function (err, rows, fields) {
            if (err) {
                reject(new Respuesta(500, err, err))
            } else {
                if (rows.affectedRows > 0) {
                    resolve(new Response(200, "Se ha eliminado exitosamente", rows));
                } else {
                    reject(new Response(404, 'No se eliminó el usuario "' + id + '". Es posible de que ya no exista.', rows));
                }
            }
        })
    })
   }
}

module.exports = new Users_Model();