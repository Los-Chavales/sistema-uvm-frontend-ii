import { defineStore } from "pinia";
import axios, { Axios } from "axios";

const API_URL_BASE = import.meta.env.VITE_API_BASE

export const useSchedulesStore = defineStore('schedules', {
    state: ()=> ({
      options: {
        schedules:[],
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
      getSchedules(state){
        return state.options.schedules
      },
      getFormResult(state) {
        return state.options.resultForm
      },
    },
    actions:{
      async searchSchedules(){
        try{
            const data = await axios.get(`${API_URL_BASE}/horarios/mostrar`)
            this.options.schedules = data.data
        }catch(error){
            console.log(error)
            this.options.schedules = []
        }
      },
      async postSchedules(token, schedule){
        const data = await axios.post(`${API_URL_BASE}/horarios/registrar`, schedule, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(response => {
          this.options.resultForm.statusErrorForm = false
          this.options.resultForm.messageForm = response.data
          this.searchSchedules();
        })
        .catch(err => {
          console.log(err)
          this.options.resultForm.statusErrorForm = true
          if(err.response.data.message === "Hay repetidos"){ 
            this.options.resultForm.messageForm = "Puede que exista un horario similar"
          }else{
            this.options.resultForm.messageForm = "Error al enviar"
          }        
        }); 
        
      },
      async updateSchedules(token, schedulesUpdate, id) {
        const data = await axios.put(`${API_URL_BASE}/horarios/actualizar/${id}`, schedulesUpdate, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(response => {
          this.options.resultForm.statusErrorForm = false
          this.options.resultForm.messageForm = response.data
          this.searchSchedules();
        })
        .catch(err => {
          console.log(err)
          this.options.resultForm.statusErrorForm = true
          if(err.response.data.message === "Hay repetidos"){ 
            this.options.resultForm.messageForm = "Puede que exista un horario similar"
          }else{
            this.options.resultForm.messageForm = "Error al actualizar"
          }  
        });
      },
      async deleteSchedules(id_schedule, token){
        try{
          await axios.delete(`${API_URL_BASE}/horarios/eliminar/${id_schedule}`,{
            headers:{
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(`eliminaste el horario:${id_schedule}`)
          this.searchSchedules();
        }
        catch (error){
          console.log(error)
          console.log(error.response.data)
        }
      },
    }
})