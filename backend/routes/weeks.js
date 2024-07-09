var express = require('express');
var router = express.Router();
const Weeks_Controller = require('../controllers/weeks_controllers')
const { checkLogin ,checkLoginProfesor, checkLoginDirector, checkRoot, checkDatetime, decodificar } = require('../auth/auth')


/* GET mostrar semanas */
router.get('/mostrar', function(req, res, next) {
  Weeks_Controller.see_weeks()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar semanas */
router.get('/mostrar/:numero/:fecha', function(req, res, next) {
  Weeks_Controller.search_weeks(req.params.numero, req.params.fecha)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar semanas por una fecha */
router.get('/mostrar/:fecha', function(req, res, next) {
  Weeks_Controller.search_weeksByDate(req.params.fecha)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* POST registrar semanas */
router.post('/registrar', checkLoginDirector, function (req, res, next) {
  Weeks_Controller.register_week(req.body).then((result) => { 
    res.send(result.message)
  }).catch((error) => {
    res.status(error.code).send(error)
  /*   if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) } */
  })
});


/* PUT editar semanas */
router.put('/actualizar/:index', checkLoginDirector, function (req, res, next) {
  Weeks_Controller.update_week(req.params.index, req.body).then((results) => {
    if (results.message) { res.send(results.message) } else { res.send(results) }
  }).catch((error) => {
    res.status(error.code).send(error)
/*     if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) } */
  })
});

/* DELETE eliminar semana */
router.delete('/eliminar/:index', checkLoginDirector, function (req, res, next) { //Falta un eliminar para solo profesores con el director
  Weeks_Controller.delete_week(req.params.index).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    if (error.code && error.menssage) { res.status(error.code).send(error.menssage) }
    else { res.status(500).send(error) }
  })
});


module.exports = router;