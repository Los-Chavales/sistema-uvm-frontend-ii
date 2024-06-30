const Response = require('./response')

function validate_users(user, decline, update) {
  const errors = [];
  if(!update){
    if(user.id_usuario === "" || user.id_usuario === undefined || isNaN(user.id_usuario)){
      errors.push("La cédula del usuario es requerida")
    }
  }
  if(user.correo === "" || user.correo === undefined){
    errors.push("El correo del usuario es requerido")
  }
  if(user.nombre === "" || user.nombre === undefined){
    errors.push("El nombre del usuario es requerido")
  }
  if(user.clave === "" || user.clave === undefined){
    errors.push("La clave del usuario es requerida")
  }
 
  if(errors.length !== 0){
    console.log(errors)
    return decline(new Response(415, "Uno o más datos son incorrectos", errors))
  }else{
    return true
  }
}

function validate_sections(section, decline) {
  const errors = [];
  if(section.nombre_seccion === "" || section.nombre_seccion === undefined){
    errors.push("El nombre de la sección es requerido")
  }
  if(section.modalidad === "" || section.modalidad === undefined){
    errors.push("La modalidad de la sección es requerida")
  }

  if(errors.length !== 0){
    console.log(errors)
    return decline(new Response(415, "Uno o más datos son incorrectos", errors))
  }else{
    return true
  }
}


function validate_subjects(subject, decline) {
  const errors = [];
  if(subject.nombre_materia === "" || subject.nombre_materia === undefined){
    errors.push("El nombre de la materia es requerido")
  }
  if(subject.trimestre === "" || subject.trimestre === undefined){
    errors.push("El trimestre de la materia es requerido")
  }
  if(subject.descripcion === "" || subject.descripcion === undefined){
    errors.push("La descripción de la materia es requerida")
  }
  if(subject.carrera === "" || subject.carrera === undefined){
    errors.push("La carrera a la que pertenece es requerida")
  }

  if(errors.length !== 0){
    console.log(errors)
    return decline(new Response(415, "Uno o más datos son incorrectos", errors))
  }else{
    return true
  }
}

function validate_events(event, decline, seeErrors) {
  const errors = [];
  if(event.fecha_especial === "" || event.fecha_especial === undefined || isNaN(Date.parse(event.fecha_especial))){
    errors.push("La fecha del evento es requerida")
  }
  if(event.nombre_corto === "" || event.nombre_corto === undefined){
    errors.push("El nombre corto del evento es requerido")
  }
  if(event.nombre_largo === "" || event.nombre_largo === undefined){
    errors.push("El nombre largo del evento es requerido")
  }
  if(event.descripcion === "" || event.descripcion === undefined){
    errors.push("La descripción del evento es requerido")
  }
  if(event.tipo_fecha === "" || event.tipo_fecha === undefined){
    errors.push("El tipo de fecha del evento es requerido")
  }
 
  if(errors.length !== 0){
    if(seeErrors) return errors;
    console.log(errors)
    return decline(new Response(415, "Uno o más datos son incorrectos", errors))
  }else{
    return true
  }
}

function validate_activities(activity, decline) {
  const errors = [];
  if(activity.fecha_actividad === "" || activity.fecha_actividad === undefined || isNaN(Date.parse(activity.fecha_actividad))){
    errors.push("La fecha del evento es requerida")
  }
  if(activity.nombre_actividad === "" || activity.nombre_actividad === undefined){
    errors.push("El nombre de la actividad es requerido")
  }
  if(activity.descripcion === "" || activity.descripcion === undefined){
    errors.push("La descripción de la actividad es requerida")
  }


  if(errors.length !== 0){
    console.log(errors)
    return decline(new Response(415, "Uno o más datos son incorrectos", errors))
  }else{
    return true
  }
}

function validate_weeks(week, decline) {
  const errors = [];
  if(week.fecha_inicio === "" || week.fecha_inicio === undefined || isNaN(Date.parse(week.fecha_inicio))){
    errors.push("La fecha del inicio de semana es requerida")
  }
  if(week.fecha_cierre === "" || week.fecha_cierre === undefined || isNaN(Date.parse(week.fecha_cierre))){
    errors.push("La fecha del cierre de semana es requerida")
  }
  if(week.numero_semana === "" || week.numero_semana === undefined || isNaN(week.numero_semana)){
    errors.push("El número de la semana es requerido")
  }

  if(errors.length !== 0){
    console.log(errors)
    return decline(new Response(415, "Uno o más datos son incorrectos", errors))
  }else{
    return true
  }
}


function validate_time(hours) {
  let verify = hours.split(":")
  let verify_numbers = 0
  for (let i = 0; i < verify.length; i++) {
    if(isNaN(verify[i])){
      verify_numbers++
    }
  }
  if(verify_numbers > 0){
    return true
  }else{
    return false
  }
}

function validate_schedules(schedules, decline) {
  const errors = [];
  if(schedules.hora_inicio === "" || schedules.hora_inicio === undefined){
    errors.push("La hora de inicio es requerida")
  }else{
    let verify_hoursI = validate_time(schedules.hora_inicio)
    if(verify_hoursI){
      errors.push("El formato de la hora de inicio esta mal")
    }
  } 
  if(schedules.hora_final === "" || schedules.hora_final === undefined){
    errors.push("La hora de inicio es requerida")
  }else{
    let verify_hoursI = validate_time(schedules.hora_final)
    if(verify_hoursI){
      errors.push("El formato de la hora final esta mal")
    }
  } 
  if(schedules.dia_semana === "" || schedules.dia_semana === undefined){
    errors.push("El nombre del dia de la semana es requerido")
  }

  if(errors.length !== 0){
    console.log(errors)
    return decline(new Response(415, "Uno o más datos son incorrectos", errors))
  }else{
    return true
  }
}

function validate_periods(period, decline, seeErrors) {
  const errors = [];
  if(period.fecha_inicio === "" || period.fecha_inicio === undefined || isNaN(Date.parse(period.fecha_inicio))){
    errors.push("La fecha del inicio es requerida")
  }
  if(period.fecha_cierre === "" || period.fecha_cierre === undefined || isNaN(Date.parse(period.fecha_cierre))){
    errors.push("La fecha del cierre es requerida")
  }
  if(period.nombre_periodo === "" || period.nombre_periodo === undefined){
    errors.push("El nombre del periodo es requerido")
  }
  if(period.estado === "" || period.estado === undefined){
    errors.push("El estado del periodo es requerido")
  }

  if(errors.length !== 0){
    if(seeErrors) return errors;
    console.log(errors)
    return decline(new Response(415, "Uno o más datos son incorrectos", errors))
  }else{
    return true
  }
}

module.exports = { validate_users, validate_sections, validate_subjects, validate_events, validate_activities, validate_weeks, validate_schedules, validate_periods };