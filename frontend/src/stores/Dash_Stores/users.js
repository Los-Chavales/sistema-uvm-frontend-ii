import { defineStore } from "pinia";
import axios, { Axios } from "axios";

const API_URL_BASE = import.meta.env.VITE_API_BASE
const API = 'http://localhost:4000/usuarios'

export const userStore = defineStore('userStore', {
    state: ()=> ({
        users:[],
        usersProfessors:[],
        userSubjects:[],
        /* Usuario en linea */
        userOnline: {
           rol_usuario: "" 
        }    
    }),
    getters: { 
        getUser(state){
            return state.users
        },
        getUserProfessors(state){
            return state.usersProfessors
        },
        getUserSubjects(state){
            return state.userSubjects
        },
        /* Usuario en linea */
        getUserOnlineRol(state){
            return state.userOnline.rol_usuario
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
      async getOnlyProfessors(){
        try{
            const Rdata = await axios.get(`${API_URL_BASE}/usuarios/mostrar/profesores`)
            console.log(Rdata.data)
            this.usersProfessors = Rdata.data
        }catch(error){
            console.log(error)
            this.usersProfessors = []
        }
      },
      /* Usuario en linea */
       userOnlineData(cookieData){
        if(cookieData !== null){
            this.userOnline.rol_usuario = cookieData.rol_usuario
        }else{
            this.userOnline.rol_usuario = ""
        }
      },
      async getProfessors_Subjects(){
        try{
            const Rdata = await axios.get(`${API}/profesor_materias`)
            this.userSubjects = Rdata.data
        }catch(error){
            console.log(error)
        }
      },
      async addNewProfessor(userdata, token){
                const json = JSON.stringify({
                    id_usuario: Number(userdata.id_usuario),
                    nombre: userdata.nombre,
                    apellido: userdata.apellido,
                    correo: userdata.correo,
                    foto_perfil: userdata.foto_perfil,
                    clave: userdata.clave
                    
            });
            console.log(json)
                console.log('token in users Pinia => ' +token)
                 await axios.post(`${API}/registrar/profesor`, json,{
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                      },
                      
                })
                .then(function (response) {
                    console.log(response)
                    this.getProfessors();
                })

      },
      async editProfessor(userdata, token, cedula_original){
        console.log(userdata)
        const id = cedula_original
        const json = JSON.stringify({
            id_usuario: Number(userdata.cedula),
            nombre: userdata.nombre,
            apellido: userdata.apellido,
            correo: userdata.correo,
            
        });
        console.log(json)
            console.log('token in users Pinia => ' +token)
            await axios.put(`${API}/actualizar/profesor/${id}`, json,{
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                
            })
            .then(function (response) {
                console.log(response)
                this.getProfessors();
            })

      },
      async deleteProfessor(idProfessor, token) {
        try {
          await axios.delete(`${API}/eliminar/profesor/${idProfessor}`,
            {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
          );
          this.getProfessors();
          console.log(`eliminar profesor:${idProfessor}`)
        }
        catch (error) {
          console.log(error)
          console.log(error.response.data)
        }
  
      }
    }
})