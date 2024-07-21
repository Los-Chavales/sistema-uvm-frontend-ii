import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from "axios"
const API_URL_BASE = import.meta.env.VITE_API_BASE

export const useActivitiesStore = defineStore("activities", {
  state: () => ({
    options: {
      activities: [],
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
    getActivities(state) {
      return state.options.activities
    },
    getActivitiesDetails(state) {
      return state.options.activities
    },
    getError(state) {
      return state.options.error
    },
    getFormResult(state) {
      return state.options.resultForm
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
        /*console.log(error)
        console.log(error.response.data) */
        this.options.error.statusError = true
        this.options.error.message = error.response.data
        this.options.activities = []
      }
    },
    async searchActivitiesMonths(year, month) {
      try {
   /*      console.log("En la store de actividades")
        console.log(year)
        console.log(month) */
        const data = await axios.get(`${API_URL_BASE}/actividades/mostrar/mes/${year}/${month}`)
        this.options.activities = data.data
        this.options.error.statusError = false
      }
      catch (error) {
        console.log(error)
        this.options.activities = []
        //console.log(error.response.data) 
        /*this.options.error.statusError = true
        this.options.error.message = error.response.data */
      }
    },
    async postActivities(token, activity, year, month){
      const json = JSON.stringify({ 
        idNumeroSemana: activity.idNumeroSemana, 
        nombre_actividad: activity.nombre_actividad,
        descripcion: activity.descripcion,
        fecha_actividad: activity.fecha_actividad
      });
      const data = await axios.post(`${API_URL_BASE}/actividades/registrar`, json, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.options.resultForm.statusErrorForm = false
        this.options.resultForm.messageForm = response.data
        this.options.resultForm.listDetails = []
        this.searchActivitiesMonths(year, month)
      })
      .catch(err => {
        if(Array.isArray(err.response.data)){
          this.options.resultForm.statusErrorForm = true
          this.options.resultForm.messageForm = err.response.data[0]
          this.options.resultForm.listDetails = []
        }else{
          this.options.resultForm.statusErrorForm = true
          this.options.resultForm.messageForm = err.response.data.message
          this.options.resultForm.listDetails = err.response.data.result
        }
      });
      
    },
    async updateActivity(token, activityUpdate, id_actividad, year, month) {
      const json = JSON.stringify({ 
        fecha_actividad: activityUpdate.fecha_actividad,
        nombre_actividad: activityUpdate.nombre_actividad,
        descripcion: activityUpdate.descripcion,
      });
      console.log(" Actualizando Actividades ")
      console.log(token)
      const data = await axios.put(`${API_URL_BASE}/actividades/actualizar/${id_actividad}`, json, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.options.resultForm.statusErrorForm = false
        this.options.resultForm.messageForm = response.data
        this.options.resultForm.listDetails = []
        this.searchActivitiesMonths(year, month) //Volver a mostrar los datos
        console.log(`se actualizó la actividad:${id_actividad}`)
      })
      .catch(err => {
        this.options.resultForm.statusErrorForm = true
        this.options.resultForm.messageForm = err.response.data.message
        this.options.resultForm.listDetails = err.response.data.result
      });
    },
    async deleteActivities(id_actividad,token, year, month) {//Eliminar actividades recibe el id de la actividad y el token que se genera al hacer el login
      try{
        /*console.log("HOLAAAA es la STORE")
        console.log(token)*/
        await axios.delete(`${API_URL_BASE}/actividades/eliminar/${id_actividad}`,{
          headers:{
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(`eliminaste la actividad:${id_actividad}`)
        this.searchActivitiesMonths(year, month)
      }
      catch (error){
        console.log(error)
        console.log(error.response.data)
      }
      

    }
  },
})
