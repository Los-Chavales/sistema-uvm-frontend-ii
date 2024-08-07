var express = require('express');
var router = express.Router();
const Activities_Controller = require('../controllers/activities_controllers')
const { checkLogin ,checkLoginProfesor, checkLoginDirector, checkRoot, checkDatetime, decodificar } = require('../auth/auth')

/* GET mostrar actividades */
router.get('/mostrar', function(req, res, next) {
  Activities_Controller.see_activities()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar actividades por id*/
router.get('/mostrar/id/:id', function(req, res, next) {
  Activities_Controller.search_activities_id(req.params.id)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar actividades por nombre*/
router.get('/mostrar/nombre/:nombre', function(req, res, next) {
  Activities_Controller.search_activities_name(req.params.nombre)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar actividades por fecha */
router.get('/mostrar/fecha/:fecha', function(req, res, next) {
  Activities_Controller.search_activities_date(req.params.fecha)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar actividades por mes (YYYY-MM) */
router.get('/mostrar/mes/:year/:month', function (req, res, next) {
  Activities_Controller.search_activities_month(req.params) //{year: 2024, month: 5} month desde el 0 al 11
    .then((results) => {
      res.status(results.code).send(results.result);
    })
    .catch((error) => {
      //console.log(error);
      if (!error.code || !error.message) return res.status(500).send(error);
      res.status(error.code).send(error.message);
    })
});

/* GET buscar actividades por asignados */
router.get('/mostrar/mes/:year/:month/:idAssigned', function (req, res, next) {
  Activities_Controller.search_activities_month_ByAssigned(req.params, req.params.idAssigned) //{year: 2024, month: 5} month desde el 0 al 11
    .then((results) => {
      res.status(results.code).send(results.result);
    })
    .catch((error) => {
      //console.log(error);
      if (!error.code || !error.message) return res.status(500).send(error);
      res.status(error.code).send(error.message);
    })
});

/* GET buscar todas las actividades por asignados */
router.get('/mostrar/asignados/:idAssigned', function (req, res, next) {
  Activities_Controller.search_activities_Assigned(req.params.idAssigned) 
    .then((results) => {
      res.status(results.code).send(results.result);
    })
    .catch((error) => {
      //console.log(error);
      if (!error.code || !error.message) return res.status(500).send(error);
      res.status(error.code).send(error.message);
    })
});

/* GET mostrar actividades para la planificación */
router.get('/mostrar_planificacion/:index_subject/:index_section', function(req, res, next) {
  Activities_Controller.see_activities_planning(req.params.index_subject, req.params.index_section)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET mostrar actividades durante las próximas dos semanas desde la fecha consultada */
router.get('/mostrar_proximas_actividades/:date', function(req, res, next) {
  Activities_Controller.next_two_weeks_activities(req.params.date)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});


/* POST registrar actividades */
router.post('/registrar', checkLoginProfesor, function (req, res, next) {
  Activities_Controller.register_activities(req.body).then((result) => { 
    res.send(result.message)
  }).catch((error) => {
    res.status(error.code).send(error)
    /* if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) } */
  })
});

/* PUT editar actividad */
router.put('/actualizar/:index', checkLoginProfesor, function (req, res, next) {
  Activities_Controller.update_activities(req.params.index, req.body).then((results) => {
    res.send(results.message)
  }).catch((error) => {
    res.status(error.code).send(error)
/*     if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) } */
  })
});


/* DELETE eliminar actividad */
router.delete('/eliminar/:index', checkLoginProfesor, function (req, res, next) { //Falta un eliminar para solo profesores con el director
  Activities_Controller.delete_activities(req.params.index).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    if (error.code && error.menssage) { res.status(error.code).send(error.menssage) }
    else { res.status(500).send(error) }
  })
});


module.exports = router;