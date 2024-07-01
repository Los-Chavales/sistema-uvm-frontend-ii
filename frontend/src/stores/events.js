import { defineStore } from 'pinia'
import axios from "axios"
const API_URL_BASE = import.meta.env.VITE_API_BASE

export const useEventsStore = defineStore("events", {
    state: () => ({
      options: {
        events: [],
        error:{
          statusError: false,
          message: ''
        }
      }
    }),
    getters: {
        getEvents(state){
          return state.options.events
        },
        getError(state){
          return state.options.error
        }
    },
    actions: {
      async searchEvents(date) {
        try {
            const data = await axios.get(`${API_URL_BASE}/eventos/mostrar/fecha/${date}`)
            console.log(data.data)
            this.options.events = data.data
          }
          catch (error) {
   /*          console.log(error)
            console.log(error.response.data) */
            this.options.error.statusError = true
            this.options.error.message = error.response.data
        }
      },
      async deleteEvents(id){
        console.log(`eliminar evento:${id}`)
      }
    },
})