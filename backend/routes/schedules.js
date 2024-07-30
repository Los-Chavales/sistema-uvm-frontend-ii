var express = require('express');
var router = express.Router();
const Schedules_Controller = require('../controllers/schedules_controllers')
const { checkLogin ,checkLoginProfesor, checkLoginDirector, checkRoot, checkDatetime, decodificar } = require('../auth/auth')


/* GET mostrar horarios */
router.get('/mostrar', function(req, res, next) {
  Schedules_Controller.see_schedules()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar horarios */
router.get('/mostrar/:id', function(req, res, next) {
  Schedules_Controller.search_schedules(req.params.id)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* POST registrar horarios */
router.post('/registrar', checkLoginDirector, function (req, res, next) {
  Schedules_Controller.register_schedules(req.body).then((result) => { 
    res.send(result.message)
  }).catch((error) => {
    res.status(error.code).send(error)
  })
});

/* PUT editar horarios */
router.put('/actualizar/:index', checkLoginDirector, function (req, res, next) {
  Schedules_Controller.update_schedules(req.params.index, req.body).then((results) => {
    if (results.message) { res.send(results.message) } else { res.send(results) }
  }).catch((error) => {
    res.status(error.code).send(error)
  })
});


/* DELETE eliminar horarios */
router.delete('/eliminar/:index', checkLoginDirector, function (req, res, next) { //Falta un eliminar para solo profesores con el director
  Schedules_Controller.delete_schedules(req.params.index).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    if (error.code && error.menssage) { res.status(error.code).send(error.menssage) }
    else { res.status(500).send(error) }
  })
});



module.exports = router;