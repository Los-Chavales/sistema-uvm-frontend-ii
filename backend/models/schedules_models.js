const connection = require('../config/conexionMySql');
const Response = require('./response')
const { validate_schedules } = require('./validations')

class Schedules_Model{
  see_schedules(){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `horarios`', function (error, results, fields) {
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
  search_schedules(id){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `horarios` WHERE `id_horario` = ?', id, function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen horarios con ese id registrados', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }
  register_schedules(register){
    return new Promise((resolve, reject) => {
      if (validate_schedules(register, reject) !== true) return;
      connection.query('INSERT INTO `horarios` SET ?', register, function (error, results, fields) {
          if (error) {
              if (error.errno == 1048) reject(new Response(400, "No ingresó ningún dato en: " + error.sqlMessage.substring(7).replace(' cannot be null', '')));
              reject(new Response(500, error, error));
          }
          if (results) {
              resolve(new Response(200, "Registro exitoso", results));
          }
      })
    })
  }
  update_schedules(id, update){
    return new Promise((resolve, reject) => { 
      if (validate_schedules(update, reject) !== true) return;
      connection.query('UPDATE `horarios` SET ? WHERE `id_horario`= ?', [update, id], function (err, rows, fields) {
        if (err) {
          if (err.errno == 1048) reject("No ingresó ningún dato en: " + err.sqlMessage.substring(7).replace(' cannot be null', ''));
          reject(new Response(500, err, err));
        } else {
          if (rows.affectedRows < 1) {
            console.error('La materia "' + id + '" no existe');
            reject(new Response(404, 'No existe ningún horario con el ID indicado: ' + id, rows))
          } else if (rows.changedRows > 0) {
            resolve(new Response(200, "Se ha actualizado exitosamente", rows));
          } else {
            reject(new Response(200, 'No se modificó el horario "' + id + '", debido a que los datos ingresados son iguales.', rows));
          }
        }
      })
    })
  }
  delete_schedules(id){
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM `horarios` WHERE `id_horario`= ?', id, function (err, rows, fields) {
          if (err) {
              reject(new Respuesta(500, err, err))
          } else {
              if (rows.affectedRows > 0) {
                  resolve(new Response(200, "Se ha eliminado exitosamente", rows));
              } else {
                  reject(new Response(404, 'No se eliminó el horario "' + id + '". Es posible de que ya no exista.', rows));
              }
          }
      })
    })
  }
}

module.exports = new Schedules_Model();