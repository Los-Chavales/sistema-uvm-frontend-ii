var express = require('express');
var router = express.Router();
const Assigned_Controller = require('../controllers/assigned_controllers')
const { checkLogin ,checkLoginProfesor, checkLoginDirector, checkRoot, checkDatetime, decodificar } = require('../auth/auth')


/* GET buscar todos los asignados */
router.get('/mostrar', function(req, res, next) {
  Assigned_Controller.see_assigned()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar todos los asignados de un profesor */
router.get('/mostrar/:id', function(req, res, next) {
  Assigned_Controller.see_options_assigned(req.params.id)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar todos los asignados de un profesor por una sección y materia especifica */
router.get('/mostrar/:idTeacher/:idAssigned', function(req, res, next) {
  Assigned_Controller.see_specific_assigned(req.params.idTeacher, req.params.idAssigned)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar todos los asignados sin horario */
router.get('/sinHorarios', function(req, res, next) {
  Assigned_Controller.search_no_schedules()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* POST asignar */
router.post('/registrar', checkLoginDirector, function(req, res, next) {
  Assigned_Controller.register_assigned(req.body)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* PATCH para solo asignar un horario */
router.patch('/asignarHorario', checkLoginDirector, function(req, res, next) {
  Assigned_Controller.update_assigned_schedules(req.body.idAssigned, req.body.idSchedule)
  .then((results) => {
      res.send(results.message);
  })
  .catch((error) => {
    res.status(error.code).send(error)
  }) 
});

/* DELETE eliminar asignado */
router.delete('/eliminar/:index', checkLoginDirector, function (req, res, next) { //Falta un eliminar para solo profesores con el director
  Assigned_Controller.delete_schedules(req.params.index).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    if (error.code && error.menssage) { res.status(error.code).send(error.menssage) }
    else { res.status(500).send(error) }
  })
});


module.exports = router;