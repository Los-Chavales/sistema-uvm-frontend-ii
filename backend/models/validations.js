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

function validate_events(event, decline) {
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

module.exports = { validate_users, validate_sections, validate_subjects, validate_events, validate_activities };