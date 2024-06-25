var express = require('express');
var router = express.Router();
const Periods_Controller = require('../controllers/periods_controllers')
const { checkLogin ,checkLoginProfesor, checkLoginDirector, checkRoot, checkDatetime, decodificar } = require('../auth/auth')


/* GET mostrar peridos */
router.get('/mostrar', function(req, res, next) {
  Periods_Controller.see_periods()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar peridos  */
router.get('/mostrar/:nombre', function(req, res, next) {
  Periods_Controller.search_periods(req.params.nombre)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
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