const Events_Model = require('../models/events_models');
const Periods_Model = require('../models/periods_models')
const Response = require('../models/response');
const { search_active } = require('./periods_controllers');

class EventsMonths {
  constructor(eventsQuantity, date) {
    this.eventsQuantity = eventsQuantity;
    this.date = date;
    this.eventsList = [];
  }
}

class Events_Controller {
  see_events() {
    return new Promise((resolve, reject) => {
      Events_Model.see_events().then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  search_events_id(id) {
    return new Promise((resolve, reject) => {
      Events_Model.search_events_id(id).then((res) => { resolve(res) }).catch((error) => { reject(error); })
    })
  }

  async search_events_academic(types) {
    let periodActive = 0
    try {
      periodActive = await search_active()
      periodActive = periodActive.result.id_periodo
    } catch (error) {
      //console.log('hola', error)
      return reject(error)
    }
    //console.log(periodActive)
    return new Promise((resolve, reject) => {
      if (!Array.isArray(types)) return reject(new Response(400, 'Error: no es array', types))
      Events_Model.search_events_academics(types, periodActive).then((res) => { resolve(res) }).catch((error) => { reject(error); })
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
    let dateFinish = new Date(dateStart.getFullYear(), dateStart.getMonth() + 1, 1);
    return new Promise((resolve, reject) => {
      Events_Model.search_events_month(dateStart, dateFinish)
        .then((res) => {
          const arrEvents = res.message;
          //console.log(arrEvents)
          if (!Array.isArray(arrEvents) || !arrEvents.length > 0) return reject(new Response(500, 'Error array', res));

          let datesMonth = []
          for (const date of arrEvents) {
            let dateEvent = date.fecha_especial.toISOString();// Obtener el valor de la propiedad fecha_especial y convertir en String
            dateEvent = dateEvent.split('T')[0]// Extraer solo la fecha (sin la hora)
            datesMonth.push(dateEvent)
          }
          datesMonth = datesMonth.filter(function (item, index, array) {
            return array.indexOf(item) === index;
          })

          let daysMonthList = []

          for (let i = 0; i < datesMonth.length; i++) {
            let listEvents = []
            let eventsCounter = 0
            for (let j = 0; j < arrEvents.length; j++) {
              let dateEventFormat = arrEvents[j].fecha_especial.toISOString();// Obtener el valor de la propiedad fecha_especial y convertir en String
              dateEventFormat = dateEventFormat.split('T')[0]
              if (datesMonth[i] === dateEventFormat) {
                listEvents.push(arrEvents[j])
                eventsCounter++
              }
            }
            let daysMonth = new EventsMonths(eventsCounter, datesMonth[i])
            daysMonth.eventsList = listEvents
            daysMonthList.push(daysMonth)
          }

          resolve(new Response(200, `Hay ${arrEvents.length} eventos`, daysMonthList));
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
      let weekDay = register.fecha_especial
      weekDay = new Date(weekDay)
      weekDay = weekDay.toLocaleDateString('en-CA', { year: 'numeric', month: 'numeric', day: 'numeric' })

      Periods_Model.search_periods_range(weekDay).then((res) => {

        Events_Model.register_events(register).then((res) => {
          resolve(res)
        }).catch((error) => { reject(error) })

      }).catch((error) => { reject(error); })

    })
  }

  update_events(id, update) {
    return new Promise((resolve, reject) => {
      let weekDay = update.fecha_especial
      weekDay = new Date(weekDay)
      weekDay = weekDay.toLocaleDateString('en-CA', { year: 'numeric', month: 'numeric', day: 'numeric' })

      Periods_Model.search_periods_range(weekDay).then((res) => {

        Events_Model.update_events(id, update).then((res) => {
          resolve(res)
        }).catch((error) => { reject(error) })


      }).catch((error) => { reject(error); })

    })
  }

  delete_events(id) {
    return new Promise((resolve, reject) => {
      Events_Model.delete_events(id).then((res) => { resolve(res) }).catch((error) => { reject(error) })
    })
  }
}

module.exports = new Events_Controller();