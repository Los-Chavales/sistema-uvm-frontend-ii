<template>
   <div class="conteiner">
      <div class="login">
         <div class="login-conteiner">
            <div class="titulo">
               Login
            </div>
            <form v-on:submit.prevent="login">

               <input class="form-input" placeholder="Email" name="correo" type="email" v-model="correo" id="correo" />

               <input class="form-input" type="password" placeholder="Contraseña" name="clave" v-model="clave" id="clave">


               <input class="form-submit" type="submit" value="Ingresar" />

            </form>
            
            <!--<h3>{{correo}}</h3>>--> <!--Renderizar los datos del correo-->
            <!--<h3>{{clave}}</h3>>--> <!--Renderizar la contraseña-->

         </div>
         <div v-if="error.length>0">
                  <ul>
                     <li class="errores" v-for="error in error" >{{ error }}</li>
                  </ul>
               </div>

      </div>
       
   </div>
   
   
</template>

<style lang="scss" scoped>

@import "@/assets/scss/variables.scss";

.conteiner{
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 0;
   padding: 0;
   width: 100%;
   height: 100px;
   min-height: 100vh;
}

.login{
border-radius: 30px;
border: 1px solid #FFF;
background: rgba(255, 255, 255, 0.19);
backdrop-filter: blur(40px);
display: inline-flex;
height: 378px;
padding: 11px 29px;
flex-direction: column;
align-items: center;
gap: 34px;
flex-shrink: 0;
}

.titulo{
font-family: Poppins;
font-size: 40px;
font-weight: 600;
line-height: 60px;
text-align: center;
color: #FFF;
margin-bottom: 34px;
}

.form-input{
display: flex;
width: 331px;
padding: 13px;
color: #FFF;
font-size: 24px;
line-height: normal;
border-radius: 10px;
background: rgba(50, 157, 156, 0.30);
margin-bottom: 34px;
border:0;
border-top: 3px solid var(--Color4, #329D9C);
outline: none;
}

.form-input::placeholder{
color:#FFF;
font-family: "Inria Sans"; 
text-align: center;
justify-content: center;
align-items: center;
font-style: normal;
font-weight: 300;
}

.form-submit{
width: 331px;
height: 55px;
flex-shrink: 0;
border:0;
border-radius: 10px;
color: $color5;
font-family:"poppins";
font-size: 32px;
font-weight: 600;

}

.errores{
  color:crimson;
  font-family: poppins;
  list-style-type:none;
  text-align: center;
  margin-right: 40px;
  padding-top: 10px;
  
  
}

@media (min-width: 300px){ /*Mobile*/

.login{
border-radius: 30px;
border: 1px solid #FFF;
background: rgba(255, 255, 255, 0.19);
backdrop-filter: blur(40px);
display: inline-flex;
height: 378px;
padding: 11px 29px;
flex-direction: column;
align-items: center;
gap: 34px;
flex-shrink: 0;
margin-left: 1px;
}
}

@media (min-width: 700px){ /*Tablet*/

.login{
border-radius: 30px;
border: 1px solid #FFF;
background: rgba(255, 255, 255, 0.19);
backdrop-filter: blur(40px);
display: inline-flex;
height: 378px;
padding: 11px 29px;
flex-direction: column;
align-items: center;
gap: 34px;
flex-shrink: 0;
margin-left: 1px;
}

}



</style>

<script>
import axios from 'axios';

export default {
  data: () => ({
    correo: "",
    clave: "",
    error:[],
  }),
  methods: {
    async login () {

      console.log(this.correo)
      console.log(this.clave)

      let json = {
         "correo": this.correo,
         "clave": this.clave
      };
      
      axios.post('http://localhost:4000/usuarios/login',json)
      .then(data =>{
         console.log(data);
      });

      /*await this.axios.post('http://localhost:4000/usuarios/login',json)
      .then( function(res){
         if(res.data=== false){
            console.log('Usuario no existente')
         }else{
            localStorage.setItem(res.data.token)
         }
      })
      .catch(function(error){
         console.log(error);
      });*/
      

      this.error =[]

      if(this.correo && this.clave){
         return true;
         
      }
      if(!this.correo && !this.clave){
         this.error.push('*Ingrese los datos requeridos*')
      }else if (!this.correo){
         this.error.push('*Ingrese el correo*')
      }else{
         this.error.push('*Ingrese la clave*')
      }
    
      
      
      
   
    },  

  },

};

// MOSTRAR LOS USUARIOS EN LA BD (dentro de login())
      /*axios.get('http://localhost:4000/usuarios/mostrar')
      .then(data =>{
         console.log(data);
      })*/
</script>
