import { defineStore } from 'pinia'
import axios from "axios"

export const useActivitiesStore = defineStore("activities", {
    state: () => ({
      options: {
        activities: [],
        error:{
          statusError: false,
          message: ''
        }
      }
    }),
    getters: {
        getActivities(state){
          return state.options.activities
        },
        getError(state){
          return state.options.error
        }
    },
    actions: {
      async searchActivities(date) {
        try {
          const data = await axios.get(`http://localhost:4000/actividades/mostrar/fecha/${date}`)
            console.log(data.data)
            this.options.activities = data.data
          }
          catch (error) {
            console.log(error)
            console.log(error.response.data)
            this.options.error.statusError = true
            this.options.error.message = error.response.data
        }
      }
    },
})