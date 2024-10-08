import { defineStore } from 'pinia'
import axios from "axios"
const API_URL_BASE = import.meta.env.VITE_API_BASE

export const useEventsStore = defineStore("events", {
  state: () => ({
    options: {
      events: [],
      eventsDownload: [],
      event: [],
      eventsTable: [],
      typesEventsT: ['Entregables', 'corte de notas'],
      id_asignado: 0,
      rol_online: "",
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
    getEventsDownload(state) {
      return state.options.eventsDownload
    },
    getEvent(state) {
      return state.options.event
    },
    getEventsDetails(state) {
      return state.options.events
    },
    getEventsTable(state) {
      return state.options.eventsTable
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
    async searchEventsMonthsIdAssigned(year, month, rolUser) {
      this.options.rol_online = rolUser
      this.options.dateMoment.yearMoment = year
      this.options.dateMoment.monthMoment = month
      let idAssignedMoment = this.options.id_asignado
      try {
        const data = await axios.get(`${API_URL_BASE}/eventos/mostrar/mes/${year}/${month}/${idAssignedMoment}`)
        this.options.events = data.data
        this.options.error.statusError = false
      }
      catch (error) {
        console.log(error)
        this.options.events = []
      }
    },
    async searchEventsMonthsIdAssignedPublic(year, month) {
      this.options.dateMoment.yearMoment = year
      this.options.dateMoment.monthMoment = month
      let idAssignedMoment = this.options.id_asignado
      try {
        const data = await axios.get(`${API_URL_BASE}/eventos/mostrar/mes/${year}/${month}/${idAssignedMoment}`)
        this.options.events = data.data
        this.options.error.statusError = false
      }
      catch (error) {
        console.log(error)
        this.options.events = []
      }
    },
    async searchAllEvents() {
      try {
        //const data = await axios.get(`${API_URL_BASE}/eventos/mostrar`)
        const data = await axios.get(`${API_URL_BASE}/eventos/mostrar/asignados/${this.options.id_asignado}`)

        let header = ["Fecha", "Nombre", "Descripción", "Tipo de Evento"];
        let eventsList = [header]
        if (data.data.length > 0) {
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].tipo_fecha !== "corte de notas" && data.data[i].tipo_fecha !== "Feriado") {
              let date = new Date(data.data[i].fecha_especial)
              date = date.toLocaleDateString('es-ES')
              eventsList.push([
                date,
                data.data[i].nombre_largo,
                data.data[i].descripcion,
                data.data[i].tipo_fecha
              ])
            }
          }
        }

        this.options.eventsDownload = eventsList
        this.options.error.statusError = false
      }
      catch (error) {
        this.options.error.statusError = true
        this.options.error.message = error.response.data
        this.options.eventsDownload = []
      }
    },
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
        this.options.events = []
      }
    },
    async searchEventsMonths(year, month) {
      this.options.rol_online = ""
      try {
        const data = await axios.get(`${API_URL_BASE}/eventos/mostrar/mes/${year}/${month}`)
        this.options.events = data.data
        this.options.error.statusError = false
      }
      catch (error) {
        console.log(error)
        this.options.events = []
      }
    },
    async searchEventsTable() {
      //let typesSearch = ['Entregables', 'fecha de corte'];
      let typesDate = this.options.typesEventsT.toString();
      try {
        const data = await axios.get(`${API_URL_BASE}/eventos/mostrar/tipo`, {
          params: {
            types: typesDate
          }
        })
        //console.log(data.data);
        this.options.eventsTable = data.data
        this.options.error.statusError = false
        this.formatDate()
      }
      catch (error) {
        console.log(error)
        this.options.eventsTable = []
      }
    },
    formatDate () {
      let datos = this.options.eventsTable
      for (const evento of datos) {
        let temp = new Date(evento.fecha_especial)
        evento.fecha_especial = temp.toLocaleString()
      }
    },
    async searchEventsID(id) {
      try {
        const data = await axios.get(`${API_URL_BASE}/eventos/mostrar/id/${id}`)
        this.options.event = data.data
        this.options.error.statusError = false
      }
      catch (error) {
        console.log(error)
        this.options.event = []
      }
    },
    async postEvents(token, event, year, month, rolUser) {
      let json;
      if (rolUser === "director") {
        json = JSON.stringify({
          idSemana: event.idSemana,
          fecha_especial: event.fecha_especial,
          nombre_corto: event.nombre_corto,
          nombre_largo: event.nombre_largo,
          descripcion: event.descripcion,
          tipo_fecha: event.tipo_fecha,
          idPeriodo: event.idPeriodo
        });
      } else if (rolUser === "profesor") {
        json = JSON.stringify({
          idSemana: event.idSemana,
          fecha_especial: event.fecha_especial,
          nombre_corto: event.nombre_corto,
          nombre_largo: event.nombre_largo,
          descripcion: event.descripcion,
          tipo_fecha: event.tipo_fecha,
          idPeriodo: event.idPeriodo,
          idAsignados: this.options.id_asignado,
        });
      }
      const data = await axios.post(`${API_URL_BASE}/eventos/registrar`, json, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        //console.log(response.data);
        this.options.resultForm.statusErrorForm = false
        this.options.resultForm.messageForm = response.data
        this.options.resultForm.listDetails = []
        if (this.options.rol_online === "profesor") {
          this.searchEventsMonthsIdAssigned(year, month, this.options.rol_online)
        } else {
          //this.searchEventsMonths(year, month)  //Volver a mostrar los datos 
          this.searchEventsMonthsIdAssignedPublic(year, month);
        }
        this.searchAllEvents()
      })
        .catch(err => {
          this.options.resultForm.statusErrorForm = true
          this.options.resultForm.messageForm = err.response.data.message
          this.options.resultForm.listDetails = err.response.data.result
        });

    },
    async updateEvents(token, eventUpdate, id, year, month) {
      const json = JSON.stringify({
        fecha_especial: eventUpdate.fecha_especial,
        nombre_corto: eventUpdate.nombre_corto,
        nombre_largo: eventUpdate.nombre_largo,
        descripcion: eventUpdate.descripcion,
        tipo_fecha: eventUpdate.tipo_fecha
      });
      const data = await axios.put(`${API_URL_BASE}/eventos/actualizar/${id}`, json, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.options.resultForm.statusErrorForm = false
        this.options.resultForm.messageForm = response.data
        this.options.resultForm.listDetails = []
        if (this.options.rol_online === "profesor") {
          this.searchEventsMonthsIdAssigned(year, month, this.options.rol_online)
        } else {
          //this.searchEventsMonths(year, month)  //Volver a mostrar los datos 
          this.searchEventsMonthsIdAssignedPublic(year, month);
        }
        this.searchAllEvents()
      })
        .catch(err => {
          this.options.resultForm.statusErrorForm = true
          this.options.resultForm.messageForm = err.response.data.message
          this.options.resultForm.listDetails = err.response.data.result
        });
    },
    async deleteEvents(id_fecha_especial, token, year, month) {//Eliminar evento recibe el id de la fecha especial y el token que se genera al hacer el login
      try {
        await axios.delete(`${API_URL_BASE}/eventos/eliminar/${id_fecha_especial}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(`exito has eliminado el evento:${id_fecha_especial}`)
        if (this.options.rol_online === "profesor") {
          this.searchEventsMonthsIdAssigned(year, month, this.options.rol_online)
        } else {
          //this.searchEventsMonths(year, month)  //Volver a mostrar los datos 
          this.searchEventsMonthsIdAssignedPublic(year, month);
        }
        this.searchAllEvents()
      }
      catch (error) {
        console.log(error)
        console.log(error.response.data)
      }
    },
    async deleteEventsOnly(id_fecha_especial, token) {//Eliminar evento para la tabla
      try {
        await axios.delete(`${API_URL_BASE}/eventos/eliminar/${id_fecha_especial}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(`exito has eliminado el evento:${id_fecha_especial}`)
        this.searchEventsTable()
      }
      catch (error) {
        console.log(error)
        console.log(error.response.data)
      }
    }
  },
})
