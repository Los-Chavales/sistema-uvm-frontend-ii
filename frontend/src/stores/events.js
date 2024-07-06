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
  /*   getEventsDetails(state) {
      //return state.options.events = []
      return state.options.events = [
        {
          date: "2024-05-27",
          eventsList:[
            {
              "id_fecha_especial": 6,
              "idSemana": 2,
              "fecha_especial": "2024-05-07T08:00:00.000Z",
              "nombre_corto": "PROBANDO",
              "nombre_largo": "feria de proyectos",
              "descripcion": "defensa de proyectos en varias materias",
              "tipo_fecha": "Feria",
              "idPeriodo": 1
            },
            {
              "id_fecha_especial": 7,
              "idSemana": 2,
              "fecha_especial": "2024-05-07T12:00:00.000Z",
              "nombre_corto": "PROBANDO",
              "nombre_largo": "feria de proyectos",
              "descripcion": "defensa de proyectos en varias materias",
              "tipo_fecha": "Feria",
              "idPeriodo": 1
            },
            {
              "id_fecha_especial": 8,
              "idSemana": 2,
              "fecha_especial": "2024-05-07T09:00:00.000Z",
              "nombre_corto": "PROBANDO",
              "nombre_largo": "feria de proyectos",
              "descripcion": "defensa de proyectos en varias materias",
              "tipo_fecha": "Feria",
              "idPeriodo": 1
            },
            {
              "id_fecha_especial": 9,
              "idSemana": 2,
              "fecha_especial": "2024-05-07T09:00:00.000Z",
              "nombre_corto": "nueva",
              "nombre_largo": "feria de proyectos",
              "descripcion": "defensa de proyectos en varias materias",
              "tipo_fecha": "Feria",
              "idPeriodo": 1
            },
            {
              "id_fecha_especial": 10,
              "idSemana": 2,
              "fecha_especial": "2024-05-07T09:00:00.000Z",
              "nombre_corto": "nueva",
              "nombre_largo": "NEW",
              "descripcion": "defensa de proyectos en varias materias",
              "tipo_fecha": "Feria",
              "idPeriodo": 1
            }
          ]
        },
        {
          date: "2024-06-07",
          eventsList:[
            {
              "id_fecha_especial": 1,
              "idSemana": 2,
              "fecha_especial": "2024-06-07T04:00:00.000Z",
              "nombre_corto": "corte de nota",
              "nombre_largo": "primer corte de notas",
              "descripcion": "Entrega de notas",
              "tipo_fecha": "corte de notas",
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
    async deleteEvents(id_fecha_especial,token) {//Eliminar evento recibe el id de la fecha especial y el token que se genera al hacer el login
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
