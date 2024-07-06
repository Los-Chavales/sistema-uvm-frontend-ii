import { defineStore } from 'pinia'
import axios from "axios"
const API_URL_BASE = import.meta.env.VITE_API_BASE

export const useActivitiesStore = defineStore("activities", {
  state: () => ({
    options: {
      activities: [],
      error: {
        statusError: false,
        message: ''
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
    /*   getActivitiesDetails(state) {
        //return state.options.activities = []
        return state.options.activities = [
          {
            date: "2024-05-27",
            activitiesList: [
              {
                "id_actividad": 1,
                "idNumeroSemana": 1,
                "nombre_actividad": "Evaluación presencial",
                "descripcion": "Evaluación sobre cifras significativas precisión y exactitud",
                "fecha_actividad": "2024-05-27T04:00:00.000Z",
                "idAsignados": 2,
                "idPeriodo": 1
              },
              {
                "id_actividad": 3,
                "idNumeroSemana": 1,
                "nombre_actividad": "forochat",
                "descripcion": "debate sobre programación reactiva",
                "fecha_actividad": "2024-05-27T04:00:00.000Z",
                "idAsignados": 1,
                "idPeriodo": 1
              }
            ]
          },
          {
            date: "2024-06-05",
            activitiesList: [
              {
                "id_actividad": 4,
                "idNumeroSemana": 1,
                "nombre_actividad": "Programación Reactiva",
                "descripcion": "Conectar un backend a una aplicación hecha en React",
                "fecha_actividad": "2024-06-05T04:00:00.000Z",
                "idAsignados": 5,
                "idPeriodo": 1
              }
            ]
          },
          {
            date: "2024-06-07",
            activitiesList: [
              {
                "id_actividad": 2,
                "idNumeroSemana": 2,
                "nombre_actividad": "Entregables UX UI",
                "descripcion": "Entrega de la documentación UX UI",
                "fecha_actividad": "2024-06-07T04:00:00.000Z",
                "idAsignados": 1,
                "idPeriodo": 1
              }
            ]
          }
        ] 
      }, */
    getError(state) {
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
    async deleteActivities(id_actividad,token) {//Eliminar actividades recibe el id de la actividad y el token que se genera al hacer el login
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
