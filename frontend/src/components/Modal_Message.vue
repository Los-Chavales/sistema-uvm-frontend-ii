<script setup>
import { ref, computed } from 'vue';
import { useEventsStore } from '@/stores/events';

let storeEvents = useEventsStore();

const getErrorEvents = computed(() => {
  return storeEvents.getErrorForm;
}); 
 

//const getErrorEvents = storeEvents.getErrorForm;

// función para desplegar el modal 
let stateMessageModal = ref(getErrorEvents.statusErrorForm)
const changeStateMessageModal = () => ( stateMessageModal.value = !stateMessageModal.value)

let messageShow = getErrorEvents.messageForm

console.log("Dentro del modal del mensage")
console.log(stateMessageModal.value)
console.log(messageShow) 
 
</script>

<template>
  <div class="container_modal" v-show="stateMessageModal">
    <div class="modalMessage">

      <div class="modal_head">
        <div class="container_button">
          <button @click="changeStateMessageModal" class="modal_cerrar">cerrar X</button>
        </div>
      </div>

      <div class="modalMessage_part">
        <p style="color:black">{{ messageShow }}</p> 
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

</style>