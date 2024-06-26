const Events_Model = require('../models/events_models');

class Events_Controller{
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