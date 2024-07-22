import { defineStore } from "pinia";
import axios, { Axios } from "axios";

const API = 'http://localhost:4000/materias/'

export const subjectStore = defineStore('subjectStore', {
    state: ()=> ({
        subject:[]
        
    }),
    getters: { 
        readSubject(state){
            return state.subject
        }
    },
    actions:{
      async getSubject(){
        try{
            const Rdata = await axios.get(`${API}mostrar`)
            console.log(Rdata.data)
            this.subject = Rdata.data
        }catch(error){
            console.log(error)
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
                console.log(response)
            })
      }
    }
})