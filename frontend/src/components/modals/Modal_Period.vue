<script setup>
import { defineProps, ref, onMounted, computed } from 'vue';
import { useActivitiesStore } from '@/stores/activities';
import { useEventsStore } from '@/stores/events';
import Edit_Button from '../buttons/Edit_Button.vue';
import Delete_Button from '../buttons/Delete_Button.vue';

const props = defineProps({
  day: String,
  date: String,
  seeActivities: Boolean,
  isEditor: Boolean,
  state: Boolean,
  close: Function,
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
  console.log(props.date)
  storeActivities.searchActivities('2024-05-27'); //Ejemplo props.date
});

const deleteActivity = storeActivities.deleteActivies;


/* Store de eventos */

let storeEvents = useEventsStore();

const getEvents = computed(() => {
  return storeEvents.getEvents;
});

const getErrorEvents = computed(() => {
  return storeEvents.getError;
});

onMounted(() => {
  storeEvents.searchEvents(props.date); //Ejemplo '2024-06-07'
});

const deleteEvent = storeEvents.deleteEvents;

/* Mostrar solo la hora en los detalles de cada actividad */

function change_date_format(property) {
  if(property !== undefined){
    property = property.split("T")
    /*      console.log(property) */
    let hour = property[1].split(".000Z")
    hour = hour[0]
    /*    console.log(hour) */
    property = hour
    return property
  }
}


</script>

<template>
 
  <div class="container_modal" v-show="state">

    <div class="modal">

      <div class="modal_head">
        <div class="container_button">
          <button @click="close" class="modal_cerrar">cerrar X</button>
        </div>
        <h2 class="modal_title">Periodos</h2>
      </div>

      <div class="modal_body">

         <!-- Parte de mostrar actividades -->

         <div class="modal_part">
          <div class="part_container">
            <h3 class="part_title title_activities">Agregar Periodos</h3>
            <button class="button_create button--white" @click="changeStateModalFormActivity" v-show="isEditor">Crear actividad</button>
              
              <Modal_Form 
                @closeModalForm="changeStateModalFormActivity" 
                v-show="stateFormActivity" 
                :dateWeek="props.date"
                :titleDay="title_modal"
                :formDire="false"
                :formTeacher="true"
                :weekNumber="props.weekNumber"
                :formCreateActivity="stateFormActivity"
              />

            <!-- En caso de no tener nada -->

            <div class="container_details" v-if="getActivities.length === 0">
              <p class="part_p p--activity">No hay nada para hoy</p>
            </div>

            <!-- En caso de si tener actividades -->

            <div v-else class="container_details" v-for="(activity) in getActivities" :key="activity.id_actividad">
              <h4 class="part_titleH4">{{ activity.nombre_actividad }} </h4>
              <p class="part_p p--activity">{{ activity.descripcion }} <span class="hour">{{
                  change_date_format(activity.fecha_actividad) }} </span></p>

              <div class="box_buttons" v-show="isEditor">
                <Edit_Button
                  :dateWeek="props.date"
                  :titleDay="title_modal"
                  :formDire="false"
                  :formTeacher="true"
                  :weekNumber="props.weekNumber"
                  :activityID="activity.id_actividad"
                  :dataEdit="{
                    idSemana: activity.idSemana,
                    fecha_actividad: activity.fecha_actividad,
                    nombre_actividad: activity.nombre_actividad,
                    descripcion: activity.descripcion,
                    tipo_dia: activity.tipo_dia,
                  }"
                  :renderForm="'activity'"
                />
                <Delete_Button 
                  :Actividades="activity.id_actividad"
                  :dateWeek="props.date"
                 /> <!--:idDelete="activity.id_actividad"-->
              </div>
            </div>

          </div>
        </div>


        <!-- Parte de mostrar eventos -->

        <div class="modal_part">
          <div class="part_container">
            <h3 class="part_title title_events">Eventos</h3>
            
             
             <Modal_Form 
               @closeModalForm="changeStateModalFormEvent" 
               v-show="stateFormEvent" 
               :dateWeek="props.date"
               :titleDay="title_modal"
               :formDire="false"
               :formTeacher="true"
               :weekNumber="props.weekNumber"
               :formCreateEvent="stateFormEvent"
             />

            <!-- En caso de no tener nada -->

            <div class="container_details" v-if="getEvents.length === 0">
              <p class="part_p p--activity">No hay nada para hoy</p>
            </div>

            <!-- En caso de si tener eventos -->

            <div v-else class="container_details" v-for="(event) in getEvents" :key="event.id_fecha_especial">
              <h4 class="part_titleH4">{{ event.nombre_largo }}</h4>
              <p class="part_p p--event">{{ event.descripcion }} <span class="hour">{{
                change_date_format(event.fecha_especial) }}</span></p>

              <div class="box_buttons" v-show="isEditor">
                <Edit_Button  
                  :dateWeek="props.date"
                  :titleDay="title_modal"
                  :formDire="false"
                  :formTeacher="true"
                  :weekNumber="props.weekNumber"
                  :eventID="event.id_fecha_especial"
                  :dataEdit="{
                    idSemana: event.idSemana,
                    fecha_especial: event.fecha_especial,
                    nombre_corto: event.nombre_corto,
                    nombre_largo: event.nombre_largo,
                    descripcion: event.descripcion,
                    tipo_fecha: event.tipo_fecha,
                  }"
                  :renderForm="'event'"
                />

                <Delete_Button 
                  :Eventos="event.id_fecha_especial"
                  :dateWeek="props.date"
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

.cell {
  width: 100%;
  height: 100%;
  padding-top: 5px;
  align-content: baseline;
}

.planning {
  align-content: center;
  font-size: 11px;
  line-height: 11px;
  padding-top: 0px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
}

.textEvent {
  color: $secondary_color;
}

.textAct {
  color: black;
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
  width: -webkit-fill-available;
}

.modal{
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: $color4;
/*   width: 17em;
  height: 35em; */
  /*width: 93%;*/
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

/* Contenedor de las partes del modal */

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
  /*width: 100%;*/
  height: 100%;
  overflow: auto;
}


.part_container{
  padding: 14px 18px;
  width: 75vw;
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
  overflow-wrap: anywhere;
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

.part_titleH4{
  margin-top: 10px;
  text-align: start;
  color: #000;
  font-family: Poppins;
  font-weight: 700;
  font-size: 20px;
}

.part_p{
  font-family: Poppins;
  font-size: 18px;
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

.hour{
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
}

.box_buttons{
  display: flex;
  flex-direction: row;
}

@media (min-width: 768px) and (max-width: 991px) {
  .containerFrontPage {
    height: 620px;
  }
}

@media (min-width: 780px) {
  .part_container {
    width: 41vw;
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