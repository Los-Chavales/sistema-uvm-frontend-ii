<script setup>
import { defineProps, ref, computed } from 'vue';
import { useEventsStore } from '@/stores/events';
import Modal_Message from '../modals/Modal_Message.vue';
import Submit_Button from '../buttons/Submit_Button.vue';



const props = defineProps({
    titleDay: String,
}) 


//función para desplegar el modal 
let stateMessageModal = ref(false);
const changeStateMessageModal = () => ( stateMessageModal.value = !stateMessageModal.value)

</script>

<template>

  <form class="formCreateEvent" @submit.prevent="putEvent">

    <div class="formCreateEvent_head">
      <h2 class="formCreateEvent_title">Crear Periodo</h2>
    </div>

    <div class="formCreateEvent_body">

      <div class="formCreateEvent_Containerselect">
        <select class="formCreateEvent_select">
          <option value="" disabled selected>Tipo de evento</option>
          <option class="formCreateEvent_option" value="Encuentro">Encuentro</option>
          <option class="formCreateEvent_option" value="Conferencia">Conferencia</option>
          <option class="formCreateEvent_option" value="Feria">Feria</option>
          <option class="formCreateEvent_option" value="corte de notas">Corte de notas</option>
          <option class="formCreateEvent_option" value="Feriado">Feriado</option>
        </select>
      </div>

      <input class="formCreateEvent_select--datetime" type="datetime-local">


      <input class="formCreateEvent_input" placeholder="Nombre corto" type="text">
      <input class="formCreateEvent_input" placeholder="Nombre largo" type="text">
      <textarea  class="formCreateEvent_textarea" placeholder="Descripción"></textarea>

      <Submit_Button @click="changeStateMessageModal" :message="'Actualizar'"/>
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