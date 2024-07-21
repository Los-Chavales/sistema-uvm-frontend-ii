<script setup>
  import { defineProps, ref,  defineEmits, computed } from 'vue';
  const props = defineProps({
    state: {
      type: Boolean,
      required: true
    },
    toChangeState: {
      type: Function,
      required: true
    },
    userSub:{
      type: Object,
      required: false
    },
    userDetail:{
      requided: false
    }
  })
  const changeState = props.toChangeState;
  const usrDetail = props.userDetail[0];
  let toggleV = ref(false)
  const toggle = computed (() => {
   toggleV.value =  !toggleV.value
    
  })
</script>

<template>

  <div class="container_modal" v-show="props.state">

    <div class="modal">

      <div class="modal_head">
        <div class="container_button">
          <button @click="changeState('details'), toggleV = false" class="modal_cerrar">cerrar X</button>
        </div>
      </div>

      <div class="modal_body">

        <!-- Parte de mostrar actividades -->
        <!-- En caso de no tener nada -->


        <div class="container_details" v-if="!props.userDetail">
          <p class="part_p p--activity">No hay nada para hoy</p>
        </div>
        <div class="modal_part usr_part" v-else >
          <div class="part_container">
            <div class="usr_info">
                <img src="@/assets/img/png/roberto.jpg" alt="" class="usr_img">
                <h2 class="usr_name">{{ props.userDetail[0].nombre }} {{ props.userDetail[0].apellido }}</h2>
                <p class="usr_email">{{ props.userDetail[0].correo }}</p>
                <p class="usr_carrera_title"><strong>Carreras</strong></p>
                <p class="usr_carrera">Carrera 1... Carerra 2...</p>
                
              </div>
          </div>
        </div>

        <div class="modal_part">
          <div class="part_container">

            <div class="materiasContainer">
              <div class="title">
                <div class="title_container">
                  <span class="icon_container">  
                  <i class="fa-solid fa-calendar"></i>
                    <h3 class="part_title subject_title">Materias</h3>
                </span>
                </div>
              </div>
                <span v-for="(subject, index) in userSub[0].materias"  class="subject_check" :key="index" ><span @click="toggle" :class=" toggleV ? 'toggle' : 'noToggle' "><i  class="fa-solid fa-v" ></i></span>
                <p class="subTitle">{{ subject.nombre_materia }} ({{ subject.seccion }})</p>
                <div class="description" v-show="toggleV">
                  <p class="desctiptionP">{{ subject.descripcion }}</p>
                </div>
                </span>
            </div>

          </div>
        </div>

      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";


  /* Estructura del modal */

  .container_modal{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.51);

    display: flex;
    justify-content: center;
    align-items: center; 

    padding: 0 2%;
  }

  .modal_head{
    width: -webkit-fill-available;
    margin-right: 10px;
    font-weight: 200;
  }

  .modal{
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: $color4;
    width: auto;
    height: 579px; 
    padding: 5px 15px 15px 15px;
    border-radius: 15px;
  }

  .container_button{
    display: flex;
    flex-direction: row-reverse;
    margin-bottom:3px;
  }

  .modal_cerrar{
    background: none;
    border: none;
    color: #FFF;
    text-align: center;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
  }
  .modal_cerrar:hover{
    cursor: pointer;
    background-color: $secondary_color;
    border-radius: 5px;
  }
 

  /* Contenedor del titulo del modal */

  .modal_body{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

   /* Contenedor de las secciones blancas modal */

  .modal_part{
    background-color: #FFF;
    border-radius: 7px;
    margin: 10px;
    height: 100%;
    overflow: auto;
    width: auto;
    min-width: 400px;
  }

  .usr_part{
    min-width: 350px;
  }

  .part_container{
    padding: 14px 18px;
    width: 400px;
  }

  /* información del contenido, titulos, parrafos... */

  .part_title{
    font-family: 'Poppins';
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    margin-bottom: 20px;
  }


.materiasContainer{
  display: flex;
  min-height: 390px;
  padding-bottom: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  background: rgba(158, 158, 158, 0.40);
  overflow-x: hidden;
  width: auto;
}

.title{
  
  display: flex;
  align-items: center;
  gap: 15px;
  align-self: stretch;
  background-color: $color4;
  height:49px;
    .subject_title{
    color: #FFF;
    font-family: Poppins;
    font-size: 23px;
    font-style: normal;
    font-weight: 300;
    float: right;
    margin-left: 15px;
    
    }

    .title_container{
      margin-top:15px ;
      margin-left:10px;
    }
    span{
      height: auto;
      font-size: 33px;
      color: #fff;
    }
}

.subject_check{
  background-color: #fff;
  gap: 15px;
  height:auto;
  max-width: 500px;
  min-width:500px ;
  transition: all 0.2s linear;
  color: #000;
  font-family: Poppins;
  font-size: 23px;
  font-style: normal;
  font-weight: 200;
  


  .noToggle{
    display: inline-block;
    color: $color4;
    transform: rotate(-90deg);
    transition: 0.2s linear;
    margin-left: 15px;
  }

  .toggle{
    display: inline-block;

    transform: rotate(0deg);
    transition: 0.2s linear;
    margin-left: 15px;
    color: $color4;


  }

  .subTitle{
    font-weight: 200;
    font-size: 25px ;
    width: 250px;
    margin-left:10px;
    top:50px;
    display: inline;
  }

  .desctiptionP{
    width: auto;
    font-size: 12px;
    margin-left: 30px;
    max-width:350px ;
    margin-top:5px;
    
  
}


}

.usr_info{
  font-family: 'Poppins';
  color :#000;
  h2{
    margin-top:10px;
  }
   p{
    margin-top:5px;
    font-weight: 200;
   }
    
  
  }

.usr_img{
    max-width: 335px;
    max-height: 322px;
    border: 1px solid #000;
    border-radius:8px;
  }




  @media (min-width: 768px) and (max-width: 991px) {
    .containerFrontPage {
      height: 620px;
    }
  }

  @media (min-width: 780px) {
    .part_container {
      /*width: auto;*/
      /*height: 60%;*/
    }

    .modal_body {
      flex-direction: row;
    }
  }


  @media (min-width: 1024px) {
    /*.part_container {
      /*width: 85%;
      /*width: auto;
      height: 41vw;
    }*/
  }


</style>