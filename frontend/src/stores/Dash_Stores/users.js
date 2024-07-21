import { defineStore } from "pinia";
import axios, { Axios } from "axios";

const API = 'http://localhost:4000/usuarios'

export const userStore = defineStore('userStore', {
    state: ()=> ({
        users:[],
        userSubjects:[]
        
    }),
    getters: { 
        getUser(state){
            return state.users
        },
        getUserSubjects(state){
            return state.userSubjects
        }
    },
    actions:{
      async getProfessors(){
        try{
            const Rdata = await axios.get(`${API}/mostrar/`)
            console.log(Rdata.data)
            this.users = Rdata.data
        }catch(error){
            console.log(error)
        }
      },
      async getProfessors_Subjects(){
        try{
            const Rdata = await axios.get(`${API}/profesor_materias`)
            this.userSubjects = Rdata.data
        }catch(error){
            console.log(error)
        }
      } 
    }
})