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
        //console.log(error.response.data) 
        /*this.options.error.statusError = true
        this.options.error.message = error.response.data */
      }
    },
    async postActivities(token, activity){
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
    async deleteActivies(id_actividad) {
      try {
        const data = await axios.delete(`${API_URL_BASE}/actividades/eliminar/${id_actividad}`);

        console.log(`eliminar actividad:${id_actividad}`)
      }
      catch (error) {
        console.log(error)
        console.log(error.response.data)
      }

    }
  },
})