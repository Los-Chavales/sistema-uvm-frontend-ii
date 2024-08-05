import { defineStore } from "pinia";
import axios, { Axios } from "axios";

const API_URL_BASE = import.meta.env.VITE_API_BASE
const API = 'http://localhost:4000/materias/'
const APISubjects = '/materias/'

export const subjectStore = defineStore('subjectStore', {
    state: ()=> ({
        subject:[],
        error: {
            statusError: false,
            message: ''
        },
        resultForm: {
            statusErrorForm: false,
            messageForm: '',
            listDetails: []
        }        
        
    }),
    getters: { 
        readSubject(state){
            return state.subject
        },
        getFormResult(state) {
            return state.resultForm
        },
    },
    actions:{
      async getSubject(){
        try{
            const Rdata = await axios.get(`${API_URL_BASE}${APISubjects}mostrar`)
            console.log(Rdata.data)
            this.subject = Rdata.data
        }catch(error){
            console.log(error)
            this.subject = []
        }
      },
      async sendSubject(dataU, token){
        const json = JSON.stringify({
            nombre_materia : dataU.subName,
            descripcion : dataU.subDescription,
            trimestre: dataU.trimestre,
            carrera:dataU.carrera
        })
        console.log(json)
            await axios.post(`${API}registrar`,json, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            .then( (response) => {
              this.resultForm.statusErrorForm = false
              this.resultForm.messageForm = response.data
            })
            .catch((error) => {
              this.resultForm.statusErrorForm = true
              this.resultForm.messageForm = error.response.data.message
            })            
      },
      async updateSubject(token, subjectUpdate, id) {
        const data = await axios.put(`${API_URL_BASE}/materias/actualizar/${id}`, subjectUpdate, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(response => {
          this.resultForm.statusErrorForm = false
          if(response.data === "Se ha actualizado exitosamente"){
            this.resultForm.messageForm = response.data
          }else{
            this.resultForm.messageForm = response.data.message
          }
          this.getSubject();
        })
        .catch(err => {
          this.resultForm.statusErrorForm = true
          this.resultForm.messageForm = "Error al actualizar" 
        });
      },
      async deleteSubject(id_subject, token){
        try{
          await axios.delete(`${API_URL_BASE}/materias/eliminar/${id_subject}`,{
            headers:{
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(`eliminaste la materia: ${id_subject}`)
          this.getSubject();
        }
        catch (error){
          console.log(error)
          console.log(error.response.data)
        }
      },
    }
})