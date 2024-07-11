import { defineStore } from 'pinia'
import axios from "axios"
const API_URL_BASE = import.meta.env.VITE_API_BASE

export const useEventsStore = defineStore("events", {
  state: () => ({
    options: {
      events: [],
      event:[],
      error: {
        statusError: false,
        message: ''
      },
      resultForm: {
        statusErrorForm: false,
        messageForm: '',
        listDetails: []
      }
    }
  }),
  getters: {
    getEvents(state) {
      return state.options.events
    },
    getEvent(state) {
      return state.options.event
    },
    getEventsDetails(state) {
      return state.options.events 
    },
    getError(state) {
      return state.options.error
    },
    getFormResult(state) {
      return state.options.resultForm
    }
  },
  actions: {
    async searchEvents(date) {
      try {
        const data = await axios.get(`${API_URL_BASE}/eventos/mostrar/fecha/${date}`)
        console.log(data.data)
        this.options.events = data.data
        this.options.error.statusError = false
      }
      catch (error) {
        console.log(error)
        console.log(error.response.data) 
        this.options.error.statusError = true
        this.options.error.message = error.response.data
      }
    },
    async searchEventsMonths(year, month) {
      try {
       const data = await axios.get(`${API_URL_BASE}/eventos/mostrar/mes/${year}/${month}`)
       this.options.events = data.data
       this.options.error.statusError = false
      }
      catch (error) {
        console.log(error)
      }
    },
    async searchEventsID(id){
      try {
        const data = await axios.get(`${API_URL_BASE}/eventos/mostrar/id/${id}`)
        this.options.event = data.data
        this.options.error.statusError = false
      }
      catch (error) {
        console.log(error)
      } 
    },
    async postEvents(token, event, year, month){
      const json = JSON.stringify({ 
        idSemana: event.idSemana, 
        fecha_especial: event.fecha_especial,
        nombre_corto: event.nombre_corto,
        nombre_largo: event.nombre_largo,
        descripcion: event.descripcion,
        tipo_fecha: event.tipo_fecha
      });
      const data = await axios.post(`${API_URL_BASE}/eventos/registrar`, json, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        //console.log(response.data);
        this.options.resultForm.statusErrorForm = false
        this.options.resultForm.messageForm = response.data
        this.options.resultForm.listDetails = []
        this.searchEventsMonths(year, month) //Volver a mostrar los datos
      })
      .catch(err => {
        this.options.resultForm.statusErrorForm = true
        this.options.resultForm.messageForm = err.response.data.message
        this.options.resultForm.listDetails = err.response.data.result
      });
      
    },
    async updateEvents(token, eventUpdate, id) {
      const json = JSON.stringify({ 
        fecha_especial: eventUpdate.fecha_especial,
        nombre_corto: eventUpdate.nombre_corto,
        nombre_largo: eventUpdate.nombre_largo,
        descripcion: eventUpdate.descripcion,
        tipo_fecha: eventUpdate.tipo_fecha
      });
      const data = await axios.put(`${API_URL_BASE}/eventos/actualizar/${id}`, json, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.options.resultForm.statusErrorForm = false
        this.options.resultForm.messageForm = response.data
        this.options.resultForm.listDetails = []
      })
      .catch(err => {
        this.options.resultForm.statusErrorForm = true
        this.options.resultForm.messageForm = err.response.data.message
        this.options.resultForm.listDetails = err.response.data.result
      });
    },
    async deleteEvents(id_fecha_especial,token) {//Eliminar evento recibe el id de la fecha especial y el token que se genera al hacer el login
      try{
        await axios.delete(`${API_URL_BASE}/eventos/eliminar/${id_fecha_especial}`,{
          headers:{
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(`exito has eliminado el evento:${id_fecha_especial}`)
      }
      catch (error){
        console.log(error)
        console.log(error.response.data)
      }
    }
  },
})
