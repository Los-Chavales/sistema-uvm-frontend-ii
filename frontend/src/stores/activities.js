import { defineStore } from 'pinia'
import axios from "axios"
const API_URL_BASE = import.meta.env.VITE_API_BASE

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
          const data = await axios.get(`${API_URL_BASE}/actividades/mostrar/fecha/${date}`)
            console.log(data.data)
            this.options.activities = data.data
            this.options.error.statusError = false
          }
          catch (error) {
/*             console.log(error)
            console.log(error.response.data) */
            this.options.error.statusError = true
            this.options.error.message = error.response.data
        }
      },
      async deleteActivities(id_actividad,token){//Eliminar actividades recibe el id de la actividad y el token que se genera al hacer el login
        try{
          /*console.log("HOLAAAA es la STORE")
          console.log(token)*/
          await axios.delete(`${API_URL_BASE}/actividades/eliminar/${id_actividad}`,{
            headers:{
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(`eliminaste la actividad:${id_actividad}`)
        }
        catch (error){
          console.log(error)
          console.log(error.response.data)
        }
      }
    },
})