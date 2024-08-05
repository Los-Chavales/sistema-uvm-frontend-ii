import { defineStore } from "pinia";
import axios, { Axios } from "axios";

const API_URL_BASE = import.meta.env.VITE_API_BASE
const API = 'http://localhost:4000/secciones/'
const APISections = '/secciones/'

export const sectionStore = defineStore('sectionStore', {
    state: ()=> ({
        sections:[],
        resultForm: {
            statusErrorForm: false,
            messageForm: '',
            listDetails: []
        }
        
    }),
    getters: { 
        readSections(state){
            return state.sections
        },
        getFormResult(state) {
          return state.resultForm
        },
    },
    actions:{
      async getSections(){
        try{
            const Rdata = await axios.get(`${API_URL_BASE}${APISections}mostrar`)
            this.sections = Rdata.data
        }catch(error){
            console.log(error)
            this.sections = []
        }
      },
      async sendSection(dataU, token){
        const json = JSON.stringify({
            nombre_seccion : dataU.nombre_seccion,
            modalidad: dataU.modalidad,
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
      async deleteSection(id_section, token){
        try{
          await axios.delete(`${API_URL_BASE}/secciones/eliminar/${id_section}`,{
            headers:{
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(`eliminaste la seccion:${id_section}`)
          this.getSections()
        }
        catch (error){
          console.log(error)
          console.log(error.response.data)
        }
      },
      async editSectionStore(userdata, token){
        console.log(userdata)
        const id = Number(userdata.id_seccion)
        const json = JSON.stringify({
          nombre_seccion: userdata.nombre_seccion,
            modalidad: userdata.modalidad,
        });
        console.log(json)
            console.log('token in users Pinia => ' +token)
            await axios.put(`${API}actualizar/${id}`, json,{
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                
            })
            .then((response) => {
                this.resultForm.statusErrorForm = false
                if(response.data === "Se ha actualizado exitosamente"){
                  this.resultForm.messageForm = response.data
                }else{
                  this.resultForm.messageForm = response.data.message
                }
            })
            .catch((error) => {
              this.resultForm.statusErrorForm = true
              this.resultForm.messageForm = error.response.data.message
            })

      },
    }
})