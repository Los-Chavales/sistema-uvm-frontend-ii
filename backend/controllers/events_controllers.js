const Events_Model = require('../models/events_models');
const Response = require('../models/response');

class Events_Controller {
  see_events() {
    return new Promise((resolve, reject) => {
      Events_Model.see_events().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  search_events_name(name) {
    return new Promise((resolve, reject) => {
      Events_Model.search_events_name(name).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  search_events_date(date) {
    return new Promise((resolve, reject) => {
      Events_Model.search_events_date(date).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  search_events_month(date) {//{year: 2024, month: 5}
    let dateStart = new Date(date.year, date.month, 1);
    let dateFinish = new Date(date.year, date.month + 1, 1);
    return new Promise((resolve, reject) => {
      Events_Model.search_events_month(dateStart, dateFinish)
        .then((res) => {
          const arrEvents = res.message;
          //console.log(arrEvents)
          if (!Array.isArray(arrEvents) || !arrEvents.length > 0) return reject(new Response(500, 'Error array', res));

          // Para agrupar los eventos con fechas comunes
          const daysMonth = {};
          for (const event of arrEvents) {
            //console.log(event);
            let dateEvent = event.fecha_especial.toISOString();// Obtener el valor de la propiedad fecha_especial y convertir en String
            dateEvent = dateEvent.split('T')[0]// Extraer solo la fecha (sin la hora)
            if (!daysMonth[dateEvent]) {// Comprobar si ya existe un array para esa fecha_especial
              daysMonth[dateEvent] = [];// Si no existe, crear un nuevo array
            }
            daysMonth[dateEvent].push(event);// Agregar el objeto al array correspondiente
          }

          resolve(new Response(200, `Hay ${arrEvents.length} eventos`, daysMonth));
        })
        .catch((error) => { reject(error); })
    })
  }

  see_events_planning() {
    return new Promise((resolve, reject) => {
      Events_Model.see_events_planning().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  see_events_schedules(id_subject, id_section) {  //Para mostrar por los horarios
    return new Promise((resolve, reject) => {
      Events_Model.see_events_schedules(id_subject, id_section).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  next_two_weeks_events(date) {
    return new Promise((resolve, reject) => {
      Events_Model.next_two_weeks_events(date).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  register_events(register) {
    return new Promise((resolve, reject) => {
      Events_Model.register_events(register).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }

  update_events(id, update) {
    return new Promise((resolve, reject) => {
      Events_Model.update_events(id, update).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }

  delete_events(id) {
    return new Promise((resolve, reject) => {
      Events_Model.delete_events(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }
}

module.exports = new Events_Controller();