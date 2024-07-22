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
                })

      },
      async editProfessor(userdata, token){
        const id = userdata.id_usuario
        const json = JSON.stringify({
            id_usuario: Number(userdata.id_usuario),
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
            })

      },
      async deleteProfessor(idProfessor, token) {
        console.log(idProfessor)
        try {
          await axios.delete(`${API}/eliminar/profesor/${idProfessor}`,
            {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
          );
  
          console.log(`eliminar profesor:${idProfessor}`)
        }
        catch (error) {
          console.log(error)
          console.log(error.response.data)
        }
  
      }
    }
})