const connection = require('../config/conexionMySql');
const Response = require('./response')
const { validate_periods } = require('./validations')

class Periods_Model{
  see_periods(){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `periodos`', function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen periodos registrados', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }
  search_periods(name){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `periodos` WHERE `nombre_periodo` = ?', name, function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen periodos con ese nombre registrados', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }
  register_periods(register){
    return new Promise((resolve, reject) => {
      if (validate_periods(register, reject) !== true) return;
      connection.query('INSERT INTO `periodos` SET ?', register, function (error, results, fields) {
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
  update_periods(id, update){
    return new Promise((resolve, reject) => { 
      if (validate_periods(update, reject) !== true) return;
      connection.query('UPDATE `periodos` SET ? WHERE `id_periodo`= ?', [update, id], function (err, rows, fields) {
        if (err) {
          if (err.errno == 1048) reject("No ingresó ningún dato en: " + err.sqlMessage.substring(7).replace(' cannot be null', ''));
          reject(new Response(500, err, err));
        } else {
          if (rows.affectedRows < 1) {
            console.error('La materia "' + id + '" no existe');
            reject(new Response(404, 'No existe ningún periodo con el ID indicado: ' + id, rows))
          } else if (rows.changedRows > 0) {
            resolve(new Response(200, "Se ha actualizado exitosamente", rows));
          } else {
            reject(new Response(200, 'No se modificó el periodo "' + id + '", debido a que los datos ingresados son iguales.', rows));
          }
        }
      })
    })
  }
  delete_periods(id){
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM `periodos` WHERE `id_periodo`= ?', id, function (err, rows, fields) {
          if (err) {
              reject(new Respuesta(500, err, err))
          } else {
              if (rows.affectedRows > 0) {
                  resolve(new Response(200, "Se ha eliminado exitosamente", rows));
              } else {
                  reject(new Response(404, 'No se eliminó el periodo "' + id + '". Es posible de que ya no exista.', rows));
              }
          }
      })
    })
  }
}

module.exports = new Periods_Model();