const connection = require('../config/conexionMySql');
const Response = require('./response')
const { validate_activities } = require('./validations')

class Activities_Model{
  see_activities(){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `actividades`', function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen actividades registradas', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  search_activities_name(name){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `actividades` WHERE `nombre_actividad` =  ?', name, function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen actividades registradas', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  search_activities_date(date){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `actividades` WHERE `fecha_actividad` =  ?', date, function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen actividades registradas', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }


  see_activities_planning(id_subject, id_section){
    return new Promise((resolve, reject) => {
      connection.query('SELECT `nombre_materia`, `nombre_seccion` ,`nombre_actividad`,`numero_semana` FROM `asignados` JOIN `materias` JOIN `secciones` JOIN `actividades` JOIN `semanas` WHERE idMateria = ? && id_materia = ? && idSeccion = ? && id_seccion = ? && id_asignado = idAsignados && idNumeroSemana = id_semana', [id_subject, id_subject, id_section, id_section], function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen actividades registradas', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  next_two_weeks_activities(date){
    return new Promise((resolve, reject) => {
     /*  console.log("fecha entrante")
      console.log(date)
 */
      let date_next_two_weeks = new Date(date)
      date_next_two_weeks = new Date(date_next_two_weeks.setDate(date_next_two_weeks.getDate() + 14))
      let date_format = date_next_two_weeks.toISOString() 

    /*   console.log("fecha siguiente")
      console.log(date_format)
 */
      connection.query('SELECT * FROM `actividades` WHERE `fecha_actividad` between  ? and ?', [date, date_format], function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen actividades para las próximas dos semanas', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  register_activities(register){
    return new Promise((resolve, reject) => {
      if (validate_activities(register, reject) !== true) return;
      connection.query('INSERT INTO `actividades`  SET ?', register, function (error, results, fields) {
          if (error) {
              if (error.errno == 1048) reject(new Response(400, "No ingresó ningún dato en: " + error.sqlMessage.substring(7).replace(' cannot be null', '')));
              reject(error);
              console.error("Error SQL: ", error.sqlMessage);
          }
          if (results) {
              resolve(new Response(200, "Registro exitoso", results));
          }
      })
    })
  }

  update_activities(id, update){
    return new Promise((resolve, reject) => {
      if (validate_activities(update, reject) !== true) return;
      connection.query('UPDATE `actividades` SET ? WHERE `id_actividad` = ?', [update, id], function (err, rows, fields) {
        if (err) {
          if (err.errno == 1048) reject("No ingresó ningún dato en: " + err.sqlMessage.substring(7).replace(' cannot be null', ''));
          reject(new Response(500, err, err));
        } else {
          if (rows.affectedRows < 1) {
            console.error('La materia "' + id + '" no existe');
            reject(new Response(404, 'No existe ninguna actividad con el ID indicado: ' + id, rows))
          } else if (rows.changedRows > 0) {
            resolve(new Response(200, "Se ha actualizado exitosamente", rows));
          } else {
            reject(new Response(200, 'No se modificó la actividad "' + id + '", debido a que los datos ingresados son iguales.', rows));
          }
        }
      })
    })
  }

  delete_activities(id){
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM `actividades` WHERE `id_actividad` = ?', id, function (err, rows, fields) {
          if (err) {
              reject(new Respuesta(500, err, err))
          } else {
              if (rows.affectedRows > 0) {
                  resolve(new Response(200, "Se ha eliminado exitosamente", rows));
              } else {
                  reject(new Response(404, 'No se eliminó la actividad "' + id + '". Es posible de que ya no exista.', rows));
              }
          }
      })
    })
  }

}

module.exports = new Activities_Model();