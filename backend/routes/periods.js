var express = require('express');
var router = express.Router();
const Periods_Controller = require('../controllers/periods_controllers')
const { checkLogin, checkLoginProfesor, checkLoginDirector, checkRoot, checkDatetime, decodificar } = require('../auth/auth')


/* GET mostrar periodos */
router.get('/mostrar', function (req, res, next) {
  Periods_Controller.see_periods()
    .then((results) => {
      res.send(results.result);
    })
    .catch((error) => {
      res.status(error.code).send(error.message);
    })
});

/* GET buscar periodos  */
router.get('/mostrar/:nombre', function (req, res, next) {
  Periods_Controller.search_periods(req.params.nombre)
    .then((results) => {
      res.send(results.result);
    })
    .catch((error) => {
      res.status(error.code).send(error.message);
    })
});

/* GET buscar periodos por parámetros */
router.post('/mostrar/filtrar', function (req, res, next) {
  Periods_Controller.search_by(req.body.name, req.body.value)
    .then((results) => {
      res.send(results.result);
    })
    .catch((error) => {
      console.log(error)
      if (error.code && error.message) { res.status(error.code).send(error.message) }
      else { res.status(500).send(error) }
      //res.status(error.code).send(error.message);
    })
});

/* GET obtener número de semana en periodos activos */
router.get('/consultar/semanas', function (req, res, next) {
  Periods_Controller.see_weeks()
    .then((results) => {
      //console.log('results r',results);
      res.send(results.result);
    })
    .catch((error) => {
      //console.log('error r',error);
      if (error.code && error.message) { res.status(error.code).send(error.message) }
      else { res.status(500).send(error) }
      //res.status(error.code).send(error.message);
    })
});

/* POST registrar peridos  */
router.post('/registrar', checkLoginDirector, function (req, res, next) {
  Periods_Controller.register_periods(req.body).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    res.status(error.code).send(error)
    /*   if (error.code && error.message) { res.status(error.code).send(error.message) }
      else { res.status(500).send(error) } */
  })
});

/* POST registrar peridos y fechas a la vez */
router.post('/registrar_P&E', checkLoginDirector, function (req, res, next) {
  Periods_Controller.register_periods_and_dates(req.body).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    res.status(error.code).send(error)
    /*   if (error.code && error.message) { res.status(error.code).send(error.message) }
      else { res.status(500).send(error) } */
  })
});

/* PUT editar periodos */
router.put('/actualizar/:index', checkLoginDirector, function (req, res, next) {
  Periods_Controller.update_periods(req.params.index, req.body).then((results) => {
    if (results.message) { res.send(results.message) } else { res.send(results) }
  }).catch((error) => {
    res.status(error.code).send(error)
    /*     if (error.code && error.message) { res.status(error.code).send(error.message) }
        else { res.status(500).send(error) } */
  })
});


/* DELETE eliminar periodos */
router.delete('/eliminar/:index', checkLoginDirector, function (req, res, next) { //Falta un eliminar para solo profesores con el director
  Periods_Controller.delete_periods(req.params.index).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    if (error.code && error.menssage) { res.status(error.code).send(error.menssage) }
    else { res.status(500).send(error) }
  })
});


module.exports = router;