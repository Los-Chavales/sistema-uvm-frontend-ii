import { defineStore } from "pinia";
import axios, { Axios } from "axios";

const API = 'http://localhost:4000/secciones/'

export const sectionStore = defineStore('sectionStore', {
    state: ()=> ({
        sections:[]
        
    }),
    getters: { 
        readSections(state){
            return state.sections
        }
    },
    actions:{
      async getSections(){
        try{
            const Rdata = await axios.get(`${API}mostrar`)
            this.sections = Rdata.data
        }catch(error){
            console.log(error)
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
                console.log(response)
            })
      }
    }
})