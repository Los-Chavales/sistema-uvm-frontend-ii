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
            this.options.error.statusError = false
          }
          catch (error) {
   /*          console.log(error)
            console.log(error.response.data) */
            this.options.error.statusError = true
            this.options.error.message = error.response.data
        }
      },
      async deleteEvents(id_fecha_especial,token){//Eliminar evento recibe el id de la fecha especial y el token que se genera al hacer el login
        try{
          /*console.log("HOLAAAA es la STORE DE EVENTOOS")
          console.log(token)*/
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