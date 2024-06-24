var express = require('express');
var router = express.Router();
const Events_Controller = require('../controllers/events_controlles')
const { checkLogin ,checkLoginProfesor, checkLoginDirector, checkRoot, checkDatetime, decodificar } = require('../auth/auth')

/* GET mostrar eventos */
router.get('/mostrar', function(req, res, next) {
  Events_Controller.see_events()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar eventos por nombre*/
router.get('/mostrar/nombre/:nombre', function(req, res, next) {
  Events_Controller.search_events_name(req.params.nombre)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar eventos por fecha */
router.get('/mostrar/fecha/:fecha', function(req, res, next) {
  Events_Controller.search_events_date(req.params.fecha)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET mostrar eventos para la planificación */
router.get('/mostrar_planificacion', function(req, res, next) {
  Events_Controller.see_events_planning()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET mostrar horarios para la planificación */
router.get('/mostrar_horarios/:index_subject/:index_section', function(req, res, next) {
  Events_Controller.see_events_schedules(req.params.index_subject, req.params.index_section)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET mostrar eventos durante las próximas dos semanas desde la fecha consultada */
router.get('/mostrar_proximos_eventos/:date', function(req, res, next) {
  Events_Controller.next_two_weeks_events(req.params.date)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});


/* POST registrar eventos */
router.post('/registrar', checkLogin, function (req, res, next) {
  Events_Controller.register_events(req.body).then((result) => { 
    res.send(result.message)
  }).catch((error) => {
    if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) }
  })
});

/* PUT editar evento */
router.put('/actualizar/:index', checkLogin, function (req, res, next) {
  Events_Controller.update_events(req.params.index, req.body).then((results) => {
    if (results.message) { res.send(results.message) } else { res.send(results) }
  }).catch((error) => {
    if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) }
  })
});


/* DELETE eliminar evento */
router.delete('/eliminar/:index', checkLogin, function (req, res, next) { //Falta un eliminar para solo profesores con el director
  Events_Controller.delete_events(req.params.index).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    if (error.code && error.menssage) { res.status(error.code).send(error.menssage) }
    else { res.status(500).send(error) }
  })
});


module.exports = router;