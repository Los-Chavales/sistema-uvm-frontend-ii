import { defineStore } from 'pinia'
import axios from "axios"
const API_URL_BASE = import.meta.env.VITE_API_BASE

export const usePeriodsStore = defineStore("periods", {
  state: () => ({
    options: {
      periods: [],
      currentPeriod: [],
      period: [],
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
    getPeriod(state) {
      return state.options.period
    },
    getPeriodsDetails(state) {
      return state.options.periods
    },
    getPeriodCurrent(state) {
      return state.options.currentPeriod
    },
    getError(state) {
      return state.options.error
    },
    getFormResult(state) {
      return state.options.resultForm
    }
  },
  actions: {
    async searchPeriods() {
      try {
        const data = await axios.get(`${API_URL_BASE}/periodos/mostrar`)
        console.log(data.data)
        this.options.periods = data.data
        this.options.error.statusError = false
        this.searchPeriodsCurrent();
      }
      catch (error) {
        console.log(error)
        console.log(error.response.data)
        this.options.error.statusError = true
        this.options.error.message = error.response.data
        this.options.periods = []
      }
    },
    async searchPeriodsCurrent() {
      try {
        const data = await axios.post(`${API_URL_BASE}/periodos/mostrar/filtrar`, {
          name: "estado",
          value: "activo"
        });
        this.options.currentPeriod = data.data;
        this.options.error.statusError = false;
      }
      catch (error) {
        console.log(error)
        this.options.currentPeriod = [];
      }
    },
    async searchPeriodsName(name) {
      try {
        const data = await axios.get(`${API_URL_BASE}/periodos/mostrar/id/${name}`)
        this.options.period = data.data
        this.options.error.statusError = false
      }
      catch (error) {
        console.log(error)
        this.options.period = []
      }
    },
    async postPeriods(token, period) {
      console.log(period);
      const json = JSON.stringify({
        fecha_inicio: period.fecha_inicio,
        fecha_cierre: period.fecha_cierre,
        nombre_periodo: period.nombre_periodo,
        estado: period.estado,
      });
      await axios.post(`${API_URL_BASE}/periodos/registrar`, json, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log(response.data);
          this.options.resultForm.statusErrorForm = false
          this.options.resultForm.messageForm = response.data
          this.options.resultForm.listDetails = []
          this.searchPeriods() //Volver a mostrar los datos
        })
        .catch(err => {
          this.options.resultForm.statusErrorForm = true
          this.options.resultForm.messageForm = err.response.data.message
          this.options.resultForm.listDetails = err.response.data.result
        });

    },
    async updatePeriods(token, periodUpdate, id) {
      const json = JSON.stringify({
        fecha_inicio: periodUpdate.fecha_inicio,
        fecha_cierre: periodUpdate.fecha_cierre,
        nombre_periodo: periodUpdate.nombre_periodo,
        estado: periodUpdate.estado,
      });
      await axios.put(`${API_URL_BASE}/periodos/actualizar/${id}`, json, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          this.options.resultForm.statusErrorForm = false
          this.options.resultForm.messageForm = response.data
          this.options.resultForm.listDetails = []
          this.searchPeriods() //Volver a mostrar los datos
        })
        .catch(err => {
          this.options.resultForm.statusErrorForm = true
          this.options.resultForm.messageForm = err.response.data.message
          this.options.resultForm.listDetails = err.response.data.result
        });
    },
    async deletePeriods(id_fecha_especial, token) {//Eliminar periodo recibe el id de la fecha especial y el token que se genera al hacer el login
      try {
        await axios.delete(`${API_URL_BASE}/periodos/eliminar/${id_fecha_especial}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(`exito has eliminado el evento:${id_fecha_especial}`)
        this.searchPeriods() //Volver a mostrar los datos
      }
      catch (error) {
        console.log(error)
        console.log(error.response.data)
      }
    }
  },
})
