const connection = require('../config/conexionMySql');
const Response = require('./response')
const { validate_weeks } = require('./validations')
 
class Weeks_Model{
  see_weeks(){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `semanas`', function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen semanas registradas', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }
  search_weeks(number, date){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `semanas` WHERE `numero_semana` = ? AND ? BETWEEN `fecha_inicio` AND `fecha_cierre`', [number,date] , function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'Esta semana no forma parte del periodo académico', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }
  search_weeksByDate(date){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `semanas` WHERE ? BETWEEN `fecha_inicio` AND `fecha_cierre`', date , function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'Esta semana no forma parte del periodo académico', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }
  register_week(register){
    return new Promise((resolve, reject) => {
      if (validate_weeks(register, reject) !== true) return;
      connection.query('INSERT INTO `semanas` SET ?', register, function (error, results, fields) {
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

  update_week(id, update){
    return new Promise((resolve, reject) => { 
      if (validate_weeks(update, reject) !== true) return;
      connection.query('UPDATE `semanas` SET ? WHERE `id_semana` = ?', [update, id], function (err, rows, fields) {
        if (err) {
          if (err.errno == 1048) reject("No ingresó ningún dato en: " + err.sqlMessage.substring(7).replace(' cannot be null', ''));
          reject(new Response(500, err, err));
        } else {
          if (rows.affectedRows < 1) {
            console.error('La materia "' + id + '" no existe');
            reject(new Response(404, 'No existe ninguna semana con el ID indicado: ' + id, rows))
          } else if (rows.changedRows > 0) {
            resolve(new Response(200, "Se ha actualizado exitosamente", rows));
          } else {
            reject(new Response(200, 'No se modificó la semana "' + id + '", debido a que los datos ingresados son iguales.', rows));
          }
        }
      })
    })
  }
  delete_week(id){
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM `semanas` WHERE `id_semana` = ?', id, function (err, rows, fields) {
          if (err) {
              reject(new Respuesta(500, err, err))
          } else {
              if (rows.affectedRows > 0) {
                  resolve(new Response(200, "Se ha eliminado exitosamente", rows));
              } else {
                  reject(new Response(404, 'No se eliminó la semana "' + id + '". Es posible de que ya no exista.', rows));
              }
          }
      })
    })
  }
}

module.exports = new Weeks_Model();