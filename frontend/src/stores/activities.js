import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from "axios"
const API_URL_BASE = import.meta.env.VITE_API_BASE

export const useActivitiesStore = defineStore("activities", {
  state: () => ({
    options: {
      activities: [],
      activitiesDownload: [],
      id_asignado: 0,
      dateMoment: {
        yearMoment: "",
        monthMoment: "",
      },
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
    getActivitiesDownload(state) {
      return state.options.activitiesDownload
    },
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
    },
    getDateMoment(state) {
      return state.options.dateMoment
    }
  },
  actions: {
    async obtainIdAssigned(idAssigned) {
      this.options.id_asignado = idAssigned
    },
    async searchActivitiesMonthsIdAssigned(year, month) {
      this.options.dateMoment.yearMoment = year
      this.options.dateMoment.monthMoment = month
      let idAssignedMoment = this.options.id_asignado
      try {
        const data = await axios.get(`${API_URL_BASE}/actividades/mostrar/mes/${year}/${month}/${idAssignedMoment}`)
        this.options.activities = data.data
        this.options.error.statusError = false
      }
      catch (error) {
        console.log(error)
        this.options.activities = []
      }
    }, 
/*     async searchAllActivities() {
      try {
        //const data = await axios.get(`${API_URL_BASE}/actividades/mostrar`)
        const data = await axios.get(`${API_URL_BASE}/actividades/mostrar/asignados/${this.options.id_asignado}`)

        let header = ["Fecha", "Nombre Actividad", "Descripción"];
        let activitiesList = [header]

        if(data.data.length > 0) {
          for (let i = 0; i < data.data.length; i++) {
            let date = new Date(data.data[i].fecha_actividad) 
            date = date.toLocaleDateString('es-ES')
            activitiesList.push([
              date, 
              data.data[i].nombre_actividad, 
              data.data[i].descripcion
            ])
          }
        }

        this.options.activitiesDownload = activitiesList
        this.options.error.statusError = false
      }
      catch (error) {
        this.options.error.statusError = true
        this.options.error.message = error.response.data
        this.options.activitiesDownload = []
      }
    }, */
    async searchActivities(date) {
      try {
        const data = await axios.get(`${API_URL_BASE}/actividades/mostrar/fecha/${date}`)
        console.log(data.data)
        this.options.activities = data.data
        this.options.error.statusError = false
      }
      catch (error) {
        this.options.error.statusError = true
        this.options.error.message = error.response.data
        this.options.activities = []
      }
    },
    async searchActivitiesMonths(year, month) {
      try {
        const data = await axios.get(`${API_URL_BASE}/actividades/mostrar/mes/${year}/${month}`)
        console.log("DATA")
        console.log(data.data)
        this.options.activities = data.data
        this.options.error.statusError = false
      }
      catch (error) {
        console.log(error)
        this.options.activities = []
      }
    },
    async postActivities(token, activity, year, month){
      const json = JSON.stringify({ 
        idNumeroSemana: activity.idNumeroSemana, 
        nombre_actividad: activity.nombre_actividad,
        descripcion: activity.descripcion,
        fecha_actividad: activity.fecha_actividad,
        idAsignados: this.options.id_asignado,
        idPeriodo: activity.idPeriodo
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
        //this.searchActivitiesMonths(year, month)
        this.searchActivitiesMonthsIdAssigned(year, month)
        //this.searchAllActivities()
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
        //this.searchActivitiesMonths(year, month) //Volver a mostrar los datos
        this.searchActivitiesMonthsIdAssigned(year, month)
        //this.searchAllActivities()
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
        //this.searchActivitiesMonths(year, month)
        this.searchActivitiesMonthsIdAssigned(year, month)
        //this.searchAllActivities()
      }
      catch (error){
        console.log(error)
        console.log(error.response.data)
      }
      

    }
  },
})
