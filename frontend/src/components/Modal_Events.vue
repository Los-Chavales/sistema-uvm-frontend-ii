<script setup>
  import { defineComponent, ref } from 'vue'
  import Edit_Button from './buttons/Edit_Button.vue';
  import Delete_Button from './buttons/Delete_Button.vue';

  let activities_examples = [
    {
      id_actividad: 1,
      idNumeroSemana: 1,
      nombre_actividad: "Evaluación presencial",
      descripcion: "Evaluación sobre cifras significativas precisión y exactitud",
      fecha_actividad: "2024-05-27T04:55:0.000Z",
      idAsignados: 2,
      idPeriodo: 1
    },
    {
      id_actividad: 3,
      idNumeroSemana: 1,
      nombre_actividad: "forochat",
      descripcion: "debate sobre programación reactiva",
      fecha_actividad: "2024-05-27T14:00:00.000Z",
      idAsignados: 1,
      idPeriodo: 1
    },
    {
      id_actividad: 4,
      idNumeroSemana: 1,
      nombre_actividad: "Programación Reactiva",
      descripcion: "Conectar un backend a una aplicación hecha en React",
      fecha_actividad: "2024-06-05T15:30:00.000Z",
      idAsignados: 5,
      idPeriodo: 1
    },
    {
      id_actividad: 2,
      idNumeroSemana: 2,
      nombre_actividad: "Entregables UX UI",
      descripcion: "Entrega de la documentación UX UI",
      fecha_actividad: "2024-06-07T04:00:00.000Z",
      idAsignados: 1,
      idPeriodo: 1
    },
    {
      id_actividad: 1,
      idNumeroSemana: 1,
      nombre_actividad: "Evaluación presencial",
      descripcion: "Evaluación sobre cifras significativas precisión y exactitud",
      fecha_actividad: "2024-05-27T04:00:00.000Z",
      idAsignados: 2,
      idPeriodo: 1
    },
    {
      id_actividad: 3,
      idNumeroSemana: 1,
      nombre_actividad: "forochat",
      descripcion: "debate sobre programación reactiva",
      fecha_actividad: "2024-05-27T04:00:00.000Z",
      idAsignados: 1,
      idPeriodo: 1
    },
    {
      id_actividad: 4,
      idNumeroSemana: 1,
      nombre_actividad: "Programación Reactiva",
      descripcion: "Conectar un backend a una aplicación hecha en React",
      fecha_actividad: "2024-06-05T04:00:00.000Z",
      idAsignados: 5,
      idPeriodo: 1
    },
    {
      id_actividad: 2,
      idNumeroSemana: 2,
      nombre_actividad: "Entregables UX UI",
      descripcion: "Entrega de la documentación UX UI",
      fecha_actividad: "2024-06-07T04:00:00.000Z",
      idAsignados: 1,
      idPeriodo: 1
    }
  ]

  let events_examples = [
    {
      id_fecha_especial: 6,
      idSemana: 1,
      fecha_especial: "2024-05-27T04:30:00.000Z",
      nombre_corto: "algo",
      nombre_largo: "también algo",
      descripcion: "otro",
      tipo_fecha: "otro",
      idPeriodo: 1
    },
    {
      id_fecha_especial: 1,
      idSemana: 2,
      fecha_especial: "2024-06-07T05:00:00.000Z",
      nombre_corto: "corte de nota",
      nombre_largo: "primer corte de notas",
      descripcion: "Entrega de notas",
      tipo_fecha: "corte de notas",
      idPeriodo: 1
    }
  ]

  function change_date_format( property ) {
      property = property.split("T")
      console.log(property)
      let hour = property[1].split(".000Z")
      hour = hour[0]
      console.log(hour)
      property = hour 
      return property
  }

  /* función para desplegar el modal */
let state = ref(false);
  const changeState = () =>{
    if(state.value){
      state.value = false
    } else{
      state.value = true
    }
  }

  /* Verificar si mostrar ciertas cosas o no 
    
    Calendario normal 
      activar: seeActivities
      desactivar: isEditor

    Calendario director:
      activar: seeActivities
      activar: isEditor

    Calendario profesor:
      desactivar: seeActivities
      activar: isEditor
  
  */

  let seeActivities = true;
  let isEditor = true  

  //let seeActivities = false;
  //let isEditor = false

</script>

<template>
  <div @click="changeState" class="celda_simulada">

  </div>

  <div class="container_modal" v-show="state">

    <div class="modal">

      <div class="modal_head">
        <div class="container_button">
          <button @click="changeState" class="modal_cerrar">cerrar X</button>
        </div>
        <h2 class="modal_title" >1 de mayo de 2024</h2>
      </div>

      <div class="modal_body">

        <div class="modal_part" v-show="seeActivities">
          <div class="part_container">
            <h3 class="part_title title_activities">Actividades</h3>
            <div class="container_details" v-for="(activity, index) in activities_examples"  v-bind:key="index">
              <button class="button_create button--white"  v-show="isEditor">Crear actividad</button>
              <p class="part_p p--activity">{{ change_date_format(activity.fecha_actividad) }} {{ activity.nombre_actividad }} {{ activity.descripcion }}</p>
              <div class="box_buttons" v-show="isEditor">
                <Edit_Button />
                <Delete_Button />
              </div>
            </div>
          </div>
        </div>


        <div class="modal_part">
          <div class="part_container">
            <h3 class="part_title title_events">Eventos</h3>
            <div class="container_details" v-for="(event, index) in events_examples"  v-bind:key="index">
              <button class="button_create button--white"  v-show="isEditor">Crear evento</button>
              <p class="part_p p--event">{{ change_date_format(event.fecha_especial) }} {{ event.nombre_largo }} {{ event.descripcion }}</p>
              <div class="box_buttons" v-show="isEditor">
                <Edit_Button />
                <Delete_Button />
              </div>
            </div>
          </div>
        </div> 

      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";

  .celda_simulada{
    background-color: #fff;
    height: 80px;
    width: 60px;
  }

  .celda_simulada:hover{
    background-color: greenyellow;
  }




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
  }

  .modal_head{
    width: 100%;
  }

  .modal{
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: $color4;
    width: 20em;
    height: 43em;
/*     height: 795px; */
    padding: 15px 30px 30px 30px;
    border-radius: 15px;
  }

  .container_button{
    display: flex;
    flex-direction: row-reverse;
  }

  .modal_cerrar{
    background: none;
    border: none;
    color: #FFF;
    text-align: center;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration-line: underline;
  }
  .modal_cerrar:hover{
    cursor: pointer;
    background-color: $secondary_color;
    border-radius: 5px;
  }

  .modal_title{
    color: #FFF;
    font-family: Poppins;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
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
    width: 100%;
    height: 100%;
    overflow: auto;
  }


  .part_container{
    padding: 14px 18px;
  }

  /* información del contenido, titulos, parrafos... */

  .part_title{
    font-family: Poppins;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .title_activities{
    color: #000
  }

  .title_events{
    color: $secondary_color;
  }

  /* Detalles de la información */

  .container_details{
    margin: 15px 0 ;
    background-color: #e7e2e2;
    border-radius: 7px;
  }

  .button_create{
    border-radius: 5px;
    border: 1px solid #000;
    padding: 0px;
    color: $color5;
    text-align: center;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .part_p{
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .p--activity{
    color: #000;
  }

  
  .p--event{
    color: $secondary_color;
  }

  .box_buttons{
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 375px) and (max-height: 667px) {
    .modal{
      height: 40em;
    } 
  }

  @media (min-width: 768px) {
    .modal{
      width: auto; 
      height: 43em;
  /*     height: 735px; */
    }

    .modal_body{
      flex-direction: row; 
    } 

    .modal_part{
      height: 100%;
      width: 19em; 
    } 
  }

  
  @media (max-width: 1024px) and (max-height: 600px) {
    .modal{
      width: auto; 
      height: 35em;
    } 
  }

  
  @media (min-width: 1280px) {    

    .modal_part{
      width: 25em; 
    } 
  }


</style>