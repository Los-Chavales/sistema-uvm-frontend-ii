const Activities_Model = require('../models/activities_models');
const Response = require('../models/response');

class Activities_Controller {
  see_activities() {
    return new Promise((resolve, reject) => {
      Activities_Model.see_activities().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  search_activities_name(name) {
    return new Promise((resolve, reject) => {
      Activities_Model.search_activities_name(name).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  search_activities_date(date) {
    return new Promise((resolve, reject) => {
      Activities_Model.search_activities_date(date).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  search_activities_month(date) {//{year: 2024, month: 5}
    console.log("controlador", date)
    let dateStart = new Date(date.year, date.month, 1);
    let dateFinish = new Date(date.year, date.month + 1, 1);
    return new Promise((resolve, reject) => {
      Activities_Model.search_activities_month(dateStart, dateFinish)
        .then((res) => {
          const arrActivities = res.message;
          //console.log(arrActivities)
          if (!Array.isArray(arrActivities) || !arrActivities.length > 0) return reject(new Response(500, 'Error array', res));

          // Para agrupar las actividades con fechas comunes
          const daysMonth = {};
          for (const activity of arrActivities) {
            let dateActivity = activity.fecha_actividad.toISOString();// Obtener el valor de la propiedad fecha_actividad y convertir en String
            dateActivity = dateActivity.split('T')[0]// Extraer solo la fecha (sin la hora)
            if (!daysMonth[dateActivity]) {// Comprobar si ya existe un array para esa fecha_actividad
              daysMonth[dateActivity] = [];// Si no existe, crear un nuevo array
            }
            daysMonth[dateActivity].push(activity);// Agregar el objeto al array correspondiente
          }

          resolve(new Response(200, `Hay ${arrActivities.length} actividades`, daysMonth));
        })
        .catch((error) => { reject(error); })
    })
  }

  see_activities_planning(id_subject, id_section) {
    return new Promise((resolve, reject) => {
      Activities_Model.see_activities_planning(id_subject, id_section).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  next_two_weeks_activities(date) {
    return new Promise((resolve, reject) => {
      Activities_Model.next_two_weeks_activities(date).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  register_activities(register) {
    return new Promise((resolve, reject) => {
      Activities_Model.register_activities(register).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }

  update_activities(id, update) {
    return new Promise((resolve, reject) => {
      Activities_Model.update_activities(id, update).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }

  delete_activities(id) {
    return new Promise((resolve, reject) => {
      Activities_Model.delete_activities(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }
}

module.exports = new Activities_Controller();