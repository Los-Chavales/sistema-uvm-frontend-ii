<script setup>
import { defineProps, ref, computed } from 'vue';
import { useEventsStore } from '@/stores/events';
import { useActivitiesStore } from '@/stores/activities';

const props = defineProps({
    typeMessage: String,
})


console.log(props.typeMessage)

let useStore;
let loginState;

let cookie = $cookies.get('auth')
if(cookie !== null){
    loginState = true
  } else {
    loginState = false
}

if(props.typeMessage === "event"){
  useStore = useEventsStore();
}else if(props.typeMessage === "activity"){
  useStore = useActivitiesStore();
}

const getFormResult = computed(() => {
  return useStore.getFormResult;
}); 


</script>

<template>
  <div class="container_modal">
    <div class="modalMessage">

      <div class="modal_head">
        <div class="container_button">
          <button class="modal_cerrar" @click="$emit('closeModalMessage')">cerrar X</button>
        </div>
      </div>

      <div class="modalMessage_part" v-if="loginState">
        <h4 class="modalMessage_h4" >{{ getFormResult.messageForm }}</h4>
        <ul class="modalMessage_p" v-if="getFormResult.listDetails.length > 0" v-for="(detail, i) in getFormResult.listDetails"  :key="i">
          <li>{{ detail }}</li>
        </ul>
      </div>

      <div class="modalMessage_part" v-else>
        <h4 class="modalMessage_h4" >Inicia Sesión</h4>
      </div>

    </div>
  </div>

</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";

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

  .modalMessage{
    background-color: $color4;
    width: 450px;
    padding: 15px;
    border-radius: 15px;
  }

  .modal_head{
    width: -webkit-fill-available;
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

  .modalMessage_part{
    background-color: #fff;
    border-radius: 15px;
    padding: 30px 20px;
  }

  .modalMessage_h4, .modalMessage_p{
    color: #000;
    font-family: Poppins;
    font-weight: 500;
    line-height: 1.8;
  }

  .modalMessage_h4{
    font-weight: 700;
    text-align: center;
    font-size: 25px;
  }

  .modalMessage_p{
    font-weight: 500;
    font-size: 18px;
    text-align: left;
  }

</style>