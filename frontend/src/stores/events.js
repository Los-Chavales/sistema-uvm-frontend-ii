import { defineStore } from 'pinia'
import axios from "axios"
const API_URL_BASE = import.meta.env.VITE_API_BASE

export const useEventsStore = defineStore("events", {
  state: () => ({
    options: {
      events: [],
      error: {
        statusError: false,
        message: ''
      }
    }
  }),
  getters: {
    getEvents(state) {
      return state.options.events
    },
    getEventsDetails(state) {
      return state.options.events 
    },
    getError(state) {
      return state.options.error
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
/*        console.log("En la store")
       console.log(year)
       console.log(month) */
       const data = await axios.get(`${API_URL_BASE}/eventos/mostrar/mes/${year}/${month}`)
       this.options.events = data.data
       this.options.error.statusError = false
      }
      catch (error) {
        console.log(error)
        //console.log(error.response.data) 
    /*     this.options.error.statusError = true
        this.options.error.message = error.response.data */
      }
    },
    async postEvents(token, event){
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
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
      
    },
    async deleteEvents(id) {
      console.log(`eliminar evento:${id}`)
    }
  },
})