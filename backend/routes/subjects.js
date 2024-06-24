var express = require('express');
var router = express.Router();
const Subjects_Controller = require('../controllers/subjects_controller')
const { checkLogin ,checkLoginProfesor, checkLoginDirector, checkRoot, checkDatetime, decodificar } = require('../auth/auth')

/* GET mostrar materias */
router.get('/mostrar', function(req, res, next) {
  Subjects_Controller.see_subjects()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar materias */
router.get('/mostrar/:nombre', function(req, res, next) {
  Subjects_Controller.search_subject(req.params.nombre)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});


/* POST registrar materia */
router.post('/registrar', checkLoginDirector, function (req, res, next) {
  Subjects_Controller.register_subject(req.body).then((result) => { 
    res.send(result.message)
  }).catch((error) => {
    res.status(error.code).send(error)
   /*  if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) } */
  })
});

/* PUT editar materias */
router.put('/actualizar/:index', checkLoginDirector, function (req, res, next) {
  Subjects_Controller.update_subject(req.params.index, req.body).then((results) => {
    if (results.message) { res.send(results.message) } else { res.send(results) }
  }).catch((error) => {
    res.status(error.code).send(error)
/*     if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) } */
  })
});


/* DELETE eliminar materias */
router.delete('/eliminar/:index', checkLoginDirector, function (req, res, next) { //Falta un eliminar para solo profesores con el director
  Subjects_Controller.delete_subject(req.params.index).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    if (error.code && error.menssage) { res.status(error.code).send(error.menssage) }
    else { res.status(500).send(error) }
  })
});


/* Relación Materia Profesor */

/* DELETE eliminar relación materia-profesor */
router.delete('/eliminar_relacion/:index_s/:index_t', checkLoginDirector, function (req, res, next) { //Falta un eliminar para solo profesores con el director
  Subjects_Controller.delete_subject_teacher(req.params.index_s, req.params.index_t).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    if (error.code && error.menssage) { res.status(error.code).send(error.menssage) }
    else { res.status(500).send(error) }
  })
});

/* DELETE eliminar relación profesor-materia */
router.delete('/eliminar_relacion_p/:index_t/:index_s', checkLoginDirector, function (req, res, next) { //Falta un eliminar para solo profesores con el director
  Subjects_Controller.delete_teacher_subject(req.params.index_t, req.params.index_s).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    if (error.code && error.menssage) { res.status(error.code).send(error.menssage) }
    else { res.status(500).send(error) }
  })
});


module.exports = router;