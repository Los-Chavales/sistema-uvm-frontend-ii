var express = require('express');
var router = express.Router();
const Assigned_Controller = require('../controllers/assigned_controllers')

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

module.exports = router;