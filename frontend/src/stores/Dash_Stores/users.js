import { defineStore } from "pinia";
import axios, { Axios } from "axios";

const API = 'http://localhost:4000/usuarios/'

export const userStore = defineStore('userStore', {
    state: ()=> ({
        users:[]
        
    }),
    getters: { 
        getUser(state){
            return state.users
        }
    },
    actions:{
      async getProfessors(){
        try{
            const Rdata = await axios.get(`${API}mostrar`)
            console.log(Rdata.data)
            this.users = Rdata.data
        }catch(error){
            console.log(error)
        }
      } 
    }
})