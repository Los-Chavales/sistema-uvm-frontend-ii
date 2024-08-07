var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var usersRouter = require('./routes/users');
var subjectsRouter = require('./routes/subjects');
var sectionsRouter = require('./routes/sections');
var eventsRouter = require('./routes/events');
var activitiesRouter = require('./routes/activities');
var schedulesRouter = require('./routes/schedules');
var periodsRouter = require('./routes/periods');
var assignedRouter = require('./routes/assigned');


var app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/usuarios', usersRouter);
app.use('/materias', subjectsRouter);
app.use('/secciones', sectionsRouter);
app.use('/eventos', eventsRouter);
app.use('/actividades', activitiesRouter);
app.use('/horarios', schedulesRouter);
app.use('/periodos', periodsRouter);
app.use('/asignados', assignedRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error')
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin:*'); // Allow all origins
  res.header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE'); // Allow specific HTTP methods
  res.header('Acess-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


module.exports = app;
