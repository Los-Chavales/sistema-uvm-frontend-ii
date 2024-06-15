const connection = require('../config/conexionMySql');
const Response = require('./response')

class Subjects_Model{
  see_subjects(){
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `materias`', function (error, results, fields) {
          if (error) {
              reject(new Response(500, error, error));
          } else {
              if (results.length == 0) {
                  reject(new Response(404, 'No existen materias registradas', results));
              } else {
                  resolve(new Response(200, results, results));
              }
          };
      });
    })
  }

  register_subject(register){
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO `materias` SET ?', register, function (error, results, fields) {
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

  update_subject(id, update){
    return new Promise((resolve, reject) => {
      connection.query('UPDATE `materias` SET ? WHERE `id_materia` = ?', [update, id], function (err, rows, fields) {
        if (err) {
          if (err.errno == 1048) reject("No ingresó nungún dato en: " + err.sqlMessage.substring(7).replace(' cannot be null', ''));
          reject(new Response(500, err, err));
        } else {
          if (rows.affectedRows < 1) {
            console.error('La materia "' + id + '" no existe');
            reject(new Response(404, 'No existe ninguna materia con el ID indicado: ' + id, rows))
          } else if (rows.changedRows > 0) {
            resolve(new Response(200, "Se ha actualizado exitosamente", rows));
          } else {
            reject(new Response(200, 'No se modificó la materia "' + id + '", debido a que los datos ingresados son iguales.', rows));
          }
        }
      })
    })
  }

  delete_subject(id){
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM `materias` WHERE `id_materia` =  ?', id, function (err, rows, fields) {
          if (err) {
              reject(new Respuesta(500, err, err))
          } else {
              if (rows.affectedRows > 0) {
                  resolve(new Response(200, "Se ha eliminado exitosamente", rows));
              } else {
                  reject(new Response(404, 'No se eliminó la materia "' + id + '". Es posible de que ya no exista.', rows));
              }
          }
      })
    })
  }

  delete_subject_teacher(id_subject, id_teacher){ //Para el formulario de materias
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM `asignados` WHERE idMateria = ? && `idProfesor` = ?', [id_subject, id_teacher], function (err, rows, fields) {
          if (err) {
              reject(new Respuesta(500, err, err))
          } else {
              if (rows.affectedRows > 0) {
                  resolve(new Response(200, "Se ha eliminado exitosamente", rows));
              } else {
                  reject(new Response(404, 'No se eliminó la relación materia-profesor"' + id_subject + " " +  id_teacher + '". Es posible de que ya no exista.', rows));
              }
          }
      })
    })
  }

  delete_teacher_subject(id_teacher, id_subject){ //Para el formulario del profesor
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM `asignados` WHERE `idProfesor` = ? && idMateria = ?', [id_teacher, id_subject], function (err, rows, fields) {
          if (err) {
              reject(new Respuesta(500, err, err))
          } else {
              if (rows.affectedRows > 0) {
                  resolve(new Response(200, "Se ha eliminado exitosamente", rows));
              } else {
                  reject(new Response(404, 'No se eliminó la relación profesor-materia"' + id_teacher + " " + id_subject + '". Es posible de que ya no exista.', rows));
              }
          }
      })
    })
  }
}

module.exports = new Subjects_Model();