const Activities_Model = require('../models/activities_models');
const Periods_Model = require('../models/periods_models')
const Response = require('../models/response');

class ActivitiesMonths {
  constructor(activitiesQuantity, date) {
    this.activitiesQuantity = activitiesQuantity
    this.date = date;
    this.activitiesList = [];
  }
}

class Activities_Controller {
  see_activities() {
    return new Promise((resolve, reject) => {
      Activities_Model.see_activities().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  search_activities_id(id) {
    return new Promise((resolve, reject) => {
      Activities_Model.search_activities_id(id).then((res) => { resolve(res) }).catch((error) => { reject(error); })
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
    let dateStart = new Date(date.year, date.month, 1);
    let dateFinish = new Date(dateStart.getFullYear(), dateStart.getMonth() + 1, 1);
    return new Promise((resolve, reject) => {
      Activities_Model.search_activities_month(dateStart, dateFinish)
        .then((res) => {
          const arrActivities = res.message;
          //console.log(arrActivities)
          if (!Array.isArray(arrActivities) || !arrActivities.length > 0) return reject(new Response(500, 'Error array', res));


          let datesMonth = []
          for (const date of arrActivities) {
            let dateActivity = date.fecha_actividad.toISOString();// Obtener el valor de la propiedad fecha_actividad y convertir en String
            dateActivity = dateActivity.split('T')[0]// Extraer solo la fecha (sin la hora)
            datesMonth.push(dateActivity)
          }
          datesMonth = datesMonth.filter(function (item, index, array) {
            return array.indexOf(item) === index;
          })

          let daysMonthList = []

          for (let i = 0; i < datesMonth.length; i++) {
            let listActivities = []
            let activitiesCounter = 0
            for (let j = 0; j < arrActivities.length; j++) {
              let dateActivityFormat = arrActivities[j].fecha_actividad.toISOString();// Obtener el valor de la propiedad fecha_actividad y convertir en String
              dateActivityFormat = dateActivityFormat.split('T')[0]
              if (datesMonth[i] === dateActivityFormat) {
                listActivities.push(arrActivities[j])
                activitiesCounter++
              }
            }
            let daysMonth = new ActivitiesMonths(activitiesCounter,datesMonth[i])
            daysMonth.activitiesList = listActivities
            daysMonthList.push(daysMonth)
          }


          resolve(new Response(200, `Hay ${arrActivities.length} actividades`, daysMonthList));
        })
        .catch((error) => { reject(error); })
    })
  }

  search_activities_month_ByAssigned(date, idAssigned) {
    let dateStart = new Date(date.year, date.month, 1);
    let dateFinish = new Date(dateStart.getFullYear(), dateStart.getMonth() + 1, 1);
    return new Promise((resolve, reject) => {
      Activities_Model.search_activities_month_ByAssigned(dateStart, dateFinish, idAssigned)
      .then((res) => { 
        const arrActivities = res.message;
        //console.log(arrActivities)
        if (!Array.isArray(arrActivities) || !arrActivities.length > 0) return reject(new Response(500, 'Error array', res));


        let datesMonth = []
        for (const date of arrActivities) {
          let dateActivity = date.fecha_actividad.toISOString();// Obtener el valor de la propiedad fecha_actividad y convertir en String
          dateActivity = dateActivity.split('T')[0]// Extraer solo la fecha (sin la hora)
          datesMonth.push(dateActivity)
        }
        datesMonth = datesMonth.filter(function (item, index, array) {
          return array.indexOf(item) === index;
        })

        let daysMonthList = []

        for (let i = 0; i < datesMonth.length; i++) {
          let listActivities = []
          let activitiesCounter = 0
          for (let j = 0; j < arrActivities.length; j++) {
            let dateActivityFormat = arrActivities[j].fecha_actividad.toISOString();// Obtener el valor de la propiedad fecha_actividad y convertir en String
            dateActivityFormat = dateActivityFormat.split('T')[0]
            if (datesMonth[i] === dateActivityFormat) {
              listActivities.push(arrActivities[j])
              activitiesCounter++
            }
          }
          let daysMonth = new ActivitiesMonths(activitiesCounter, datesMonth[i])
          daysMonth.activitiesList = listActivities
          daysMonthList.push(daysMonth)
        }
        
        resolve(new Response(200, `Hay ${arrActivities.length} actividades`, daysMonthList));

      }).catch((error) => { reject(error); })
    })
  }

  search_activities_Assigned(idAssigned) {
    return new Promise((resolve, reject) => {
      Activities_Model.search_activities_Assigned(idAssigned).then((res) => { resolve(res) }).catch((error) => { reject(error); })
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
      let weekDay = register.fecha_actividad
      weekDay = new Date(weekDay)
      weekDay = weekDay.toLocaleDateString('en-CA', { year: 'numeric', month: 'numeric', day: 'numeric' })
      
      Periods_Model.search_periods_range(weekDay).then((res) => {

        Activities_Model.register_activities(register).then((res) => {
          resolve(res)
        }).catch((error) => { reject(error) })

      }).catch((error) => { reject(error); })
    })
  }

  update_activities(id, update) {
    return new Promise((resolve, reject) => {
      let weekDay = update.fecha_actividad
      weekDay = new Date(weekDay)
      weekDay = weekDay.toLocaleDateString('en-CA', { year: 'numeric', month: 'numeric', day: 'numeric' })

      Periods_Model.search_periods_range(weekDay).then((res) => {

        Activities_Model.update_activities(id, update).then((res) => { 
          resolve(res) 
        }).catch((error) => { reject(error) })

      }).catch((error) => { reject(error); })

    })
  }

  delete_activities(id) {
    return new Promise((resolve, reject) => {
      Activities_Model.delete_activities(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }
}

module.exports = new Activities_Controller();