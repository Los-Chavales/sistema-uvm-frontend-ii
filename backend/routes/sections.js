var express = require('express');
var router = express.Router();
const Sections_Controller =  require('../controllers/sections_controllers')
const { checkLogin ,checkLoginProfesor, checkLoginDirector, checkRoot, checkDatetime, decodificar } = require('../auth/auth')

/* GET mostrar secciones */
router.get('/mostrar', function(req, res, next) {
  Sections_Controller.see_sections()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar secciones */
router.get('/mostrar/:nombre', function(req, res, next) {
  Sections_Controller.search_sections(req.params.nombre)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/*  Mostrar de una Sección todos los eventos y actividades planificados. 
    Incluyendo un encabezado indicando: 
    -trimestre
    -profesor
    -nombre de la materia. 
*/

/* GET mostrar por actividades */
router.get('/mostrar_actividades/:index_s/:index_m', function(req, res, next) {
  Sections_Controller.see_activities_sections(req.params.index_s, req.params.index_m)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});


/* GET mostrar por horarios */
router.get('/mostrar_horarios/:index_s/:index_m', function(req, res, next) {
  Sections_Controller.see_activities_schedules(req.params.index_s, req.params.index_m)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET mostrar por horarios */
router.get('/mostrar_materias', function(req, res, next) {
  Sections_Controller.see_sections_subjects()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});


/* POST registrar sección */
router.post('/registrar', checkLoginDirector, function (req, res, next) {
  Sections_Controller.register_section(req.body).then((result) => { 
    res.send(result.message)
  }).catch((error) => {
    res.status(error.code).send(error)
  /*   if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) } */
  })
});


/* PUT editar sección */
router.put('/actualizar/:index', checkLoginDirector, function (req, res, next) {
  Sections_Controller.update_section(req.params.index, req.body).then((results) => {
    if (results.message) { res.send(results.message) } else { res.send(results) }
  }).catch((error) => {
    res.status(error.code).send(error)
/*     if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) } */
  })
});


/* DELETE eliminar sección */
router.delete('/eliminar/:index', checkLoginDirector, function (req, res, next) { //Falta un eliminar para solo profesores con el director
  Sections_Controller.delete_section(req.params.index).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    if (error.code && error.menssage) { res.status(error.code).send(error.menssage) }
    else { res.status(500).send(error) }
  })
});


module.exports = router;