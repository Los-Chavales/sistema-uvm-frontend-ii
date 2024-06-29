<script setup>
  import { defineProps, ref,  onMounted, computed } from 'vue'
  import { useActivitiesStore } from '@/stores/activities';
  import { useEventsStore } from '@/stores/events';
  import Edit_Button from './buttons/Edit_Button.vue';
  import Delete_Button from './buttons/Delete_Button.vue';

  const props = defineProps({
    day: String,
    seeActivities: Boolean,
    isEditor: Boolean,
  })

  /* Store de actividades */

  let storeActivities = useActivitiesStore();

  const getActivities = computed(() => {
      return storeActivities.getActivities;
  });

  const getErrorActivities = computed(() => {
      return storeActivities.getError;
  });

  onMounted(() => {
    storeActivities.searchActivities('2024-05-27'); //!!!!!!!!!!!Cambiar la fecha
  });



  /* Store de eventos */

  let storeEvents = useEventsStore();

  const getEvents = computed(() => {
      return storeEvents.getEvents;
  });

  const getErrorEvents = computed(() => {
      return storeEvents.getError;
  });

  onMounted(() => {
    storeEvents.searchEvents('2024-06-07'); //!!!!!!!!!!!Cambiar la fecha
  });


  /* Mostrar solo la hora en los detalles de cada actividad */

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
/* 
  let seeActivities = true;
  let isEditor = true   */

  //let seeActivities = false;
  //let isEditor = false

</script>

<template>
  <div @click="changeState" class="cell">
    {{ props.day }}
  </div>

  <div class="container_modal" v-show="state">

    <div class="modal">

      <div class="modal_head">
        <div class="container_button">
          <button @click="changeState" class="modal_cerrar">cerrar X</button>
        </div>
        <h2 class="modal_title" >{{ props.day }} de mayo de 2024</h2>
      </div>

      <div class="modal_body">

        <!-- Parte de mostrar actividades -->

        <div class="modal_part" v-show="seeActivities">
          <div class="part_container">
            <h3 class="part_title title_activities">Actividades</h3>
            
              <!-- En caso de no tener nada -->

            <div class="container_details" v-if="getErrorActivities.statusError">
              <p class="part_p p--activity">{{ getErrorActivities.message }}</p>
            </div>

             <!-- En caso de si tener actividades -->

            <div v-else class="container_details" v-for="(activity, index) in getActivities"  v-bind:key="index">
              <button class="button_create button--white"  v-show="isEditor">Crear actividad</button>
              <p class="part_p p--activity">{{ change_date_format(activity.fecha_actividad) }} {{ activity.nombre_actividad }} {{ activity.descripcion }}</p>
            
              <div class="box_buttons" v-show="isEditor">
                <Edit_Button />
                <Delete_Button />
              </div>
            </div>

          </div>
        </div>


        <!-- Parte de mostrar eventos -->

        <div class="modal_part">
          <div class="part_container">
            <h3 class="part_title title_events">Eventos</h3>

            <!-- En caso de no tener nada -->

            <div class="container_details" v-if="getErrorEvents.statusError">
              <p class="part_p p--event">{{ getErrorEvents.message }}</p>
            </div>

            <!-- En caso de si tener eventos -->

            <div v-else class="container_details" v-for="(event, index) in getEvents"  v-bind:key="index">
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

  .cell{
    width: 100%;
    height: 100%;
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
    width: 17em;
    height: 35em;
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
    text-align: start;
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
    text-align: start;
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
    text-align: start;
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
      height: 32em;
    } 
  }

  
  @media (max-width: 344px) and (max-height: 882px) {
    .modal{
      width: 16em;
      height: 40em;
    } 
  }


  @media (min-width: 768px) {
    .modal{
      width: 37em; 
      height: 35em;
  /*     height: 735px; */
    }

    .modal_body{
      flex-direction: row; 
    } 

  }

  
  @media (max-width: 1024px) and (max-height: 600px) {
    .modal{
      width: auto; 
      height: 28em;
    } 
  }

  
  @media (min-width: 1280px) {    
    .modal{
      height: 35em;
    } 

    .modal_part{
      width: 25em; 
    } 
  }


</style>