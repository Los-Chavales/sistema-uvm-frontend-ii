const connection = require('../config/conexionMySql');
const Response = require('./response')

class Events_Model{
  see_events(){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `fechas_especiales`', function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen eventos registrados', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  search_events_name(name){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `fechas_especiales` WHERE `nombre_corto` = ?', name, function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen eventos con ese nombre registrados', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  search_events_date(date){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `fechas_especiales` WHERE `fecha_especial` = ?', date, function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen eventos con esa fecha registrados', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }


  see_events_planning(){
    return new Promise((resolve, reject) => {
      connection.query('SELECT `nombre_corto`, `nombre_largo`, `numero_semana`, `fecha_especial` FROM `fechas_especiales` JOIN `semanas` WHERE idSemana = id_semana', function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen eventos registrados', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }
 
  see_events_schedules(id_subject, id_section){ //Para mostrar por los horarios
    return new Promise((resolve, reject) => {
      connection.query('SELECT `nombre_materia` ,`dia_semana`, `hora_inicio`, `hora_final` FROM `asignados` JOIN `secciones` JOIN `materias` JOIN `horarios` WHERE idMateria = ? && id_materia = ? && idSeccion = ? && id_seccion = ? && idHorario = id_horario', [id_subject, id_subject, id_section, id_section], function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen horarios registrados', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }


  register_events(register){
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO `fechas_especiales` SET ?', register, function (error, results, fields) {
          if (error) {
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

  update_events(id, update){
    return new Promise((resolve, reject) => {
      connection.query('UPDATE `fechas_especiales` SET ? WHERE `id_fecha_especial` = ?', [update, id], function (err, rows, fields) {
        if (err) {
          if (err.errno == 1048) reject("No ingresó nungún dato en: " + err.sqlMessage.substring(7).replace(' cannot be null', ''));
          reject(new Response(500, err, err));
        } else {
          if (rows.affectedRows < 1) {
            console.error('La materia "' + id + '" no existe');
            reject(new Response(404, 'No existe ningún evento con el ID indicado: ' + id, rows))
          } else if (rows.changedRows > 0) {
            resolve(new Response(200, "Se ha actualizado exitosamente", rows));
          } else {
            reject(new Response(200, 'No se modificó el evento "' + id + '", debido a que los datos ingresados son iguales.', rows));
          }
        }
      })
    })
  }

  delete_events(id){
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM `fechas_especiales` WHERE `id_fecha_especial` = ?', id, function (err, rows, fields) {
          if (err) {
              reject(new Respuesta(500, err, err))
          } else {
              if (rows.affectedRows > 0) {
                  resolve(new Response(200, "Se ha eliminado exitosamente", rows));
              } else {
                  reject(new Response(404, 'No se eliminó el evento "' + id + '". Es posible de que ya no exista.', rows));
              }
          }
      })
    })
  }
}

module.exports = new Events_Model();