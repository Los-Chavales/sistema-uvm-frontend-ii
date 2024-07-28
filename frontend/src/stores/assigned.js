import { defineStore } from 'pinia'
import { useActivitiesStore } from './activities'
import { useEventsStore } from './events';
let storeActivities = useActivitiesStore();
let storeEvents = useEventsStore();
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
      resultForm: {
        statusErrorForm: false,
        messageForm: '',
        listDetails: []
      }
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
    getIdAssigned(state) {
      return state.options.id_asignado
    },
    getFormResult(state) {
      return state.options.resultForm
    },
    getEditState(state) {
      return state.options.editState
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
        storeEvents.obtainIdAssigned(this.options.id_asignado)
        //this.searchActivitiesIdAssigned(this.options.yearMoment, this.options.id_asignado)
      }
      catch (error) {
        this.options.editState = false
        this.options.error.statusError = true
        this.options.error.message = error.response.data
        this.options.assigned = []
      } 
    },
    async postAssigned(token, register){
      console.log("En LA STORE")
      await axios.post(`${API_URL_BASE}/asignados/registrar`, register, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log("RESPUESTA en la store se Asignados")
        console.log(response.data)
        if(response.data === "Hay repetidos"){
          this.options.resultForm.statusErrorForm = false
          this.options.resultForm.messageForm = "Puede que ya haya alguna asignación similar"
        }else{
          this.options.resultForm.statusErrorForm = false
          this.options.resultForm.messageForm = "Asignación exitosa"
        }
      })
      .catch(err => {
        console.log("ERROR")
        console.log(err)
        this.options.resultForm.statusErrorForm = true
        this.options.resultForm.messageForm = "Error al enviar"
      }); 
      
    },
  },
})
