import { defineStore } from 'pinia'
import axios from "axios"

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
          const data = await axios.get(`http://localhost:4000/eventos/mostrar/fecha/${date}`)
            console.log(data.data)
            this.options.events = data.data
          }
          catch (error) {
            console.log(error)
            console.log(error.response.data)
            this.options.error.statusError = true
            this.options.error.message = error.response.data
        }
      },
      async deleteEvents(id){
        console.log(`eliminar evento:${id}`)
      }
    },
})