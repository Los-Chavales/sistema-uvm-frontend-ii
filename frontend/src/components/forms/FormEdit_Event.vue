<script setup>
import { defineProps, ref, computed } from 'vue';
import { useEventsStore } from '@/stores/events';
import { userStore } from '@/stores/Dash_Stores/users';
import Modal_Message from '../modals/Modal_Message.vue';
import Submit_Button from '../buttons/Submit_Button.vue';

const storeUser = userStore();

let rol_online = storeUser.getUserOnlineRol;

 class UpdateEvent {
  constructor(fecha_especial, nombre_corto, nombre_largo, descripcion, tipo_fecha) {
      this.fecha_especial = fecha_especial,
      this.nombre_corto = nombre_corto,
      this.nombre_largo = nombre_largo,
      this.descripcion = descripcion,
      this.tipo_fecha = tipo_fecha
  }
}

const props = defineProps({
    dateWeek: Date,
    titleDay: String,
    formDire: Boolean,
    formTeacher: Boolean,
    weekNumber: Number,
    eventID: Number,
    dataEdit: Object
}) 

let prop = props.dateWeek
let title_from_teacher = prop.toLocaleDateString('es-ES', { weekday: 'long' })

let dateTemp = new Date(props.dataEdit.fecha_especial);
let date = new Date(dateTemp.getTime() - (dateTemp.getTimezoneOffset() * 60000)).toISOString();
date = date.split('.000Z');
date = date[0]; 


let idEvent = props.eventID;
let tipo_fecha = ref(props.dataEdit.tipo_fecha); 
let nombre_corto = ref(props.dataEdit.nombre_corto); 
let nombre_largo = ref(props.dataEdit.nombre_largo); 
let descripcion = ref(props.dataEdit.descripcion);  
let fecha_especial = ref(date)


let storeEvents = useEventsStore();

const putEvent = computed(() => {
  let cookie = $cookies.get('auth')
  if(cookie !== null){
    let token = cookie.token
    let year = prop.getFullYear();
    let month = prop.getMonth();
    const eventUpdate = new UpdateEvent(fecha_especial.value, nombre_corto.value, nombre_largo.value, descripcion.value, tipo_fecha.value)
    storeEvents.updateEvents(token, eventUpdate, idEvent, year, month)
  }
  changeStateMessageModal()
});

//función para desplegar el modal 
let stateMessageModal = ref(false);
const changeStateMessageModal = () => ( stateMessageModal.value = !stateMessageModal.value)

</script>

<template>

  <form class="formCreateEvent" @submit.prevent="putEvent">

    <div class="formCreateEvent_head">
      <h2 class="formCreateEvent_title">Editar Evento</h2>
      <h3 class="formCreateEvent_title--h3" v-if="formDire">{{ props.titleDay }}</h3>
      <h3 class="formCreateEvent_title--h3" v-else-if="formTeacher">Semana {{ props.weekNumber }} {{ title_from_teacher }}</h3>
    </div>

    <div class="formCreateEvent_body">

      <div class="formCreateEvent_Containerselect">
        <select class="formCreateEvent_select" v-model="tipo_fecha" required>
          <option value="" disabled selected>Tipo de evento</option>
          <option class="formCreateEvent_option" value="Encuentro">Encuentro</option>
          <option class="formCreateEvent_option" value="Conferencia">Conferencia</option>
          <option v-if="rol_online === 'director'" class="formCreateEvent_option" value="Feria">Feria</option>
          <option v-if="rol_online === 'director'" class="formCreateEvent_option" value="corte de notas">Corte de notas</option>
          <option v-if="rol_online === 'director'" class="formCreateEvent_option" value="Feriado">Feriado</option>
          <option v-if="rol_online === 'director'" class="formCreateEvent_option" value="Entregables">Entregables</option>
          <option v-if="rol_online === 'director'" class="formCreateEvent_option" value="Otros">Otros</option>
        </select>
      </div>

      <input class="formCreateEvent_select--datetime" type="datetime-local" v-model="fecha_especial" required>


      <input class="formCreateEvent_input" placeholder="Nombre corto" type="text"  v-model="nombre_corto" required>
      <input class="formCreateEvent_input" placeholder="Nombre largo" type="text" v-model="nombre_largo" required>
      <textarea  class="formCreateEvent_textarea" placeholder="Descripción" v-model="descripcion" required></textarea>

      <Submit_Button :message="'Actualizar'"/>
    </div>

  </form>

  <Modal_Message 
    v-show="stateMessageModal" 
    @closeModalMessage="changeStateMessageModal"
    :typeMessage="'event'" 
  />

</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";

  .formCreateEvent{
    height: 75vh;
    width: 68vw;
    display: flex;
    flex-direction: column;
    padding: 22px 10px;
  }
  
  .formCreateEvent_head{
    margin: 0 0 15px 0;
  } 
 
  .formCreateEvent_body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: inherit;
      /*row-gap: 6px;*/
    }

  .formCreateEvent_title{
    color: #000;
    text-align: center;
    font-family: Poppins;
    font-size: 35px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .formCreateEvent_title--h3{
    color: #000;
    text-align: center;
    font-family: Poppins;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .formCreateEvent_select{
    width: 100%;
    margin: 0 0 25px 0;
    border: 1px solid $color5;
    background: #FFF;

    color: #000;
    font-family: Poppins;
    font-size: 20px;
    outline: none;

    cursor: pointer;
  }

  .formCreateEvent_select--datetime{
    //width: 215px;
    width: 240px;
    margin: 0 0 25px 0;
    border: 1px solid $color5;
    background: #FFF;

    color: #000;
    font-family: Poppins;
    font-size: 18px;
    outline: none;

    cursor: pointer;
  }

  .formCreateEvent_input{
    display: flex;
    width: 100%;
    height: 50px;
    padding: 10px;
    margin: 0 0 15px 0;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 10px;
    border: none;
    border-top: 3px solid $color4;
    outline: none;
    background: rgba(158, 158, 158, 0.30);

    color: #000;
    font-family: "Inria Sans";
    font-size: 20px;
    font-style: normal;
  }

  .formCreateEvent_input::placeholder{
    color: #000;
    text-align: center;
    font-family: "Inria Sans";
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 10px;
  }

  .formCreateEvent_textarea{
    resize: none;
    display: flex;
    width: 100%;
    height: 80px;
    min-height: 60px;
    padding: 10px;
    margin: 0 0 25px 0;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: none;
    border-top: 3px solid $color4;
    background: rgba(158, 158, 158, 0.30);
    outline: none;

    color: #000;
    font-family: "Inria Sans";
    font-size: 14px;
    font-style: normal;
  }

  .formCreateEvent_textarea::placeholder{
    color: #000;
    text-align: center;
    font-family: "Inria Sans";
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .formCreateActivity_containerLabel{
    margin: 0 0 25px 0;
  }

  .formCreateActivity_label{
    color: #000;
    font-family: "Inria Sans";
    font-size: 24px;
    font-weight: 400;
  }

  @media (min-width: 414px) {
    .formCreateEvent_select--datetime{
      width: 260px;
      font-size: 20px;
    }
  }

  /* Tablet */
  @media (min-width: 500px) {
    .formCreateEvent{
      /*height: 590px;*/
      width: 360px;
    }
  }

  /*Desktop*/
  @media (min-width: 1000px) and (min-height: 666px) {
    .formCreateEvent{
      height: 80vh;
      max-height: 645px;
      width: 360px;
    }
    
    .formCreateEvent_head, 
    .formCreateEvent_select,
    .formCreateEvent_input,
    .formCreateEvent_textarea,
    .formCreateActivity_containerLabel {
      margin: 0 0 0px 0;
    }
    .formCreateEvent_textarea{
      height: 100px;
      font-size: 16px;
    }
  }

  //Pantallas grandes
  @media (min-width: 1440px) {
    .formCreateEvent{
      width: 380px;
    }    
  }
  @media (min-height: 850px) {
    .formCreateEvent{
      height: 72vh;
      max-height: 710px;
    }
    .formCreateEvent_textarea{
      height: 170px;
      font-size: 20px;
    }
  }


</style>