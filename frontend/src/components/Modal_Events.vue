<script setup>
  import { defineProps, ref,  onMounted, computed } from 'vue';
  import { useActivitiesStore } from '@/stores/activities';
  import { useEventsStore } from '@/stores/events';
  import Edit_Button from './buttons/Edit_Button.vue';
  import Delete_Button from './buttons/Delete_Button.vue';

  const props = defineProps({
    day: Number,
    date: Date,
    seeActivities: Boolean,
    isEditor: Boolean,
  })
  
  let prop = props.date
  let title_modal = prop.toLocaleDateString('es-ES', {  year: 'numeric', month: 'long', day: 'numeric'})
  let searchFormat =  prop.toLocaleDateString('en-CA', {  year: 'numeric', month: 'numeric', day: 'numeric'})

  /* Store de actividades */

  let storeActivities = useActivitiesStore();

  const getActivities = computed(() => {
    let getActivitiesList = storeActivities.getActivitiesDetails;
    if(getActivitiesList.length !== 0){
    getActivitiesList = getActivitiesList.find(({ date }) => date ===  searchFormat)
  
    if(getActivitiesList !== undefined){
      getActivitiesList = getActivitiesList.activitiesList
    }else{
      getActivitiesList = []
    }
  }
    return getActivitiesList;
  });


  /* Store de eventos */

  let storeEvents = useEventsStore();
  

  //let getEvents = storeEvents.getEventsDetails;

  const getEvents = computed(() => {
    let getEventsList = storeEvents.getEventsDetails
    if(getEventsList.length !== 0){
    getEventsList = getEventsList.find(({ date }) => date ===  searchFormat)
  
    if(getEventsList !== undefined){
      getEventsList = getEventsList.eventsList
    }else{
      getEventsList = []
    }
  }
    return getEventsList;
  });

  /* Mostrar solo la hora en los detalles de cada actividad */

  function change_date_format( property ) {
    if(property !== undefined){
      property = property.split("T")
      let hour = property[1].split(".000Z")
      hour = hour[0]
      property = hour 
      return property
    }
  }
 
  /* función para desplegar el modal */
  let state = ref(false);
  const changeState = () => ( state.value = !state.value )

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
        <h2 class="modal_title" >{{ title_modal }}</h2>
      </div>

      <div class="modal_body">

        <!-- Parte de mostrar actividades -->

        <div class="modal_part" v-show="seeActivities">
          <div class="part_container">
            <h3 class="part_title title_activities">Actividades</h3>
            
              <!-- En caso de no tener nada -->

            <div class="container_details" v-if="getActivities.length === 0">
              <p class="part_p p--activity">No hay nada para hoy</p>
            </div>

             <!-- En caso de si tener actividades -->

            <div v-else class="container_details" v-for="(activity) in getActivities" :key="activity.id_actividad">
              <button class="button_create button--white"  v-show="isEditor">Crear actividad</button>
              <p class="part_p p--activity" >{{ change_date_format(activity.fecha_actividad) }} {{ activity.nombre_actividad }} {{ activity.descripcion }}</p>
            
              <div class="box_buttons" v-show="isEditor">
                <Edit_Button />
                <Delete_Button 
                  :idDelete="activity.id_actividad"
                 />
              </div>
            </div>

          </div>
        </div>


        <!-- Parte de mostrar eventos -->

        <div class="modal_part">
          <div class="part_container">
            <h3 class="part_title title_events">Eventos</h3>

            <!-- En caso de no tener nada -->

            <div class="container_details" v-if="getEvents.length === 0">
              <p class="part_p p--activity">No hay nada para hoy</p>
            </div>

            <!-- En caso de si tener eventos -->

            <div v-else class="container_details" v-for="(event) in getEvents" :key="event.id_fecha_especial">
              <button class="button_create button--white"  v-show="isEditor">Crear evento</button>
              <p class="part_p p--event">{{ change_date_format(event.fecha_especial) }} {{ event.nombre_largo }} {{ event.descripcion }}</p>
              
              <div class="box_buttons" v-show="isEditor">
                <Edit_Button />
                <Delete_Button 
                  :idDelete="event.id_fecha_especial"
                />
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

    padding: 0 2%;
  }

  .modal_head{
    width: 100%;
  }

  .modal{
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: $color4;
  /*   width: 17em;
    height: 35em; */
    width: 80%;
    height: 95%; 
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
    padding: 5px 0;
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

  @media (min-width: 768px) {
    .modal{
/*       width: 95%;  */
      width: auto;
      height: 60%;

    }

    .modal_body{
      flex-direction: row; 
    } 
  }

  
  @media (min-width: 1024px) { 
    .modal{
  /*     width: 85%;  */
      width: auto;
      height: 90%;
    } 
    .part_title{
      min-width: 225px;
    }
  }


</style>