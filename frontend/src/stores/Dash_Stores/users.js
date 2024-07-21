import { defineStore } from "pinia";
import axios, { Axios } from "axios";

const API = 'http://localhost:4000/usuarios/'

export const userStore = defineStore('userStore', {
    state: ()=> ({
        users:[],
        /* Usuario en linea */
        userOnline: {
           rol_usuario: "" 
        }
    }),
    getters: { 
        getUser(state){
            return state.users
        },
        /* Usuario en linea */
        getUserOnlineRol(state){
            console.log("EN GET USER")
            console.log(state.userOnline.rol_usuario)
            return state.userOnline.rol_usuario
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
        },

        /* Usuario en linea */
        userOnlineData(cookieData){
            if(cookieData !== null){
                this.userOnline.rol_usuario = cookieData.rol_usuario
            }
        } 
    }
})