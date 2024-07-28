var express = require('express');
var router = express.Router();
const Users_Controller = require('../controllers/users_controllers')
const { checkLogin ,checkLoginProfesor, checkLoginDirector, checkRoot, checkDatetime, decodificar } = require('../auth/auth')

/* GET mostrar usuarios */
router.get('/mostrar', function(req, res, next) {
  Users_Controller.see_users()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET mostrar profesores */
router.get('/mostrar/profesores', function(req, res, next) {
  Users_Controller.see_users_teachers()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar usuarios */
router.get('/mostrar/:nombre', function(req, res, next) {
  Users_Controller.search_users(req.params.nombre)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});

/* GET buscar profesores */
router.get('/mostrar/profesor/:nombre', function(req, res, next) {
  Users_Controller.search_users_teachers(req.params.nombre)
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});


/* GET Mostrar la lista de profesores con las materias asociadas */
router.get('/profesor_materias', function(req, res, next) {
  Users_Controller.see_teachers_subjects()
  .then((results) => {
    console.log(results)
      res.send(results);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});


/* GET Mostrar la lista de profesores con sus materias y secciones asociadas */
router.get('/profesor_secciones', function(req, res, next) {
  Users_Controller.see_teachers_subjects_sections()
  .then((results) => {
      res.send(results.result);
  })
  .catch((error) => {
      res.status(error.code).send(error.message);
  }) 
});


/* POST registrar director */
router.post('/registrar/director', checkLoginDirector, function (req, res, next) {
  Users_Controller.register_user_director(req.body).then((result) => { 
    res.send(result.message)
  }).catch((error) => {
    res.status(error.code).send(error)
 /*    if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) } */
  })
});


/* POST registrar profesor */
router.post('/registrar/profesor', checkLoginDirector, function (req, res, next) {
  Users_Controller.register_user_teacher(req.body).then((result) => { 
    res.send(result.message)
  }).catch((error) => {
    res.status(error.code).send(error)
    /* if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) } */
  })
});


/* login de usuario */
router.post('/login', function (req, res, next) {
  Users_Controller.login(req.body).then((token) => {
    res.send(token)
  }).catch((error) => {
    if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) }
  })
});


/* PUT editar usuarios */
router.put('/actualizar/:index', checkLoginDirector, function (req, res, next) {
  Users_Controller.update_user(req.params.index, req.body).then((results) => {
    if (results.message) { res.send(results.message) } else { res.send(results) }
  }).catch((error) => {
    res.status(error.code).send(error)
/*     if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) } */
  })
});


/* PUT editar profesor */
router.put('/actualizar/profesor/:index', checkLoginDirector, function (req, res, next) {
  Users_Controller.update_user_teacher(req.params.index, req.body).then((results) => {
    if (results.message) { res.send(results.message) } else { res.send(results) }
  }).catch((error) => {
    res.status(error.code).send(error)
 /*    if (error.code && error.message) { res.status(error.code).send(error.message) }
    else { res.status(500).send(error) } */
  })
});



/* DELETE eliminar usuarios */
router.delete('/eliminar/:index', checkLoginDirector, function (req, res, next) { 
  Users_Controller.delete_user(req.params.index).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    if (error.code && error.menssage) { res.status(error.code).send(error.menssage) }
    else { res.status(500).send(error) }
  })
});

/* DELETE eliminar profesores */
router.delete('/eliminar/profesor/:index', checkLoginDirector, function (req, res, next) { 
  Users_Controller.delete_user_teacher(req.params.index).then((result) => {
    res.send(result.message)
  }).catch((error) => {
    if (error.code && error.menssage) { res.status(error.code).send(error.menssage) }
    else { res.status(500).send(error) }
  })
});

module.exports = router;
