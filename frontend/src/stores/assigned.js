import { defineStore } from 'pinia'
import { useActivitiesStore } from './activities'
let storeActivities = useActivitiesStore();
import axios from "axios"
const API_URL_BASE = import.meta.env.VITE_API_BASE

export const useAssignedStore = defineStore("assigned", {
  state: () => ({
    options: {
      assigned: [],
      optionList: [],
      subjectName: "",
      sectionName: "",
      editState: false,
      id_asignado: 0,
      error: {
        statusError: false,
        message: ''
      },
    }
  }),
  getters: {
    getAssigned(state) {
      return state.options.assigned
    },
    getAssignedList(state) {
      return state.options.optionList
    },
    getAssignedSubjectName(state) {
      return state.options.subjectName
    },
    getAssignedSectionName(state) {
      return state.options.sectionName
    },
    getIdAssigned(state) {
      return state.options.id_asignado
    },
  },
  actions: {
    async searchAssignedOptions(idTeacher) {
      try {
        const data = await axios.get(`${API_URL_BASE}/asignados/mostrar/${idTeacher}`)
        this.options.assigned = data.data
        this.options.optionList = data.data[0].asignados
        this.options.error.statusError = false
      }
      catch (error) {
        this.options.error.statusError = true
        this.options.error.message = error.response.data
        this.options.assigned = []
        this.options.optionList = []
      }
    },
    async searchAssignedOne(idTeacher, idAssigned) {
      try {
        const data = await axios.get(`${API_URL_BASE}/asignados/mostrar/${idTeacher}/${idAssigned}`)
        this.options.assigned = data.data
        this.options.subjectName = data.data[0].nombre_materia
        this.options.sectionName = data.data[0].nombre_seccion
        this.options.id_asignado = data.data[0].id_asignado
        this.options.error.statusError = false
        this.options.editState = true
        storeActivities.obtainIdAssigned(this.options.id_asignado)
        //this.searchActivitiesIdAssigned(this.options.yearMoment, this.options.id_asignado)
      }
      catch (error) {
        this.options.error.statusError = true
        this.options.error.message = error.response.data
        this.options.assigned = []
      } 
    },
  },
})
