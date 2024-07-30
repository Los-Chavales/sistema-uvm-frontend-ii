<script setup>
import { defineProps, computed, ref } from 'vue';
import { useAssignedStore } from '@/stores/assigned';
import Delete_Button from '../buttons/Delete_Button.vue';
import Modal_Message from './Modal_Message.vue';

let storeAssigned = useAssignedStore();

storeAssigned.searchAssigned();

const getAssigned = computed(() => {
  return storeAssigned.getAssignedAll
})

const props = defineProps({
    state: {
      type: Boolean,
      required: true
    },
    toChangeState: {
      type: Function,
      required: true
    },
})

const changeState = props.toChangeState

//función para desplegar el modal 
let stateMessageModal = ref(false);
const changeStateMessageModal = () => ( stateMessageModal.value = !stateMessageModal.value)

</script>

<template>
<div class="container_modalForm" v-show="props.state">
  <div class="modalForm">

    <div class="modalForm_head">
      <div class="container_button">
        <button @click="changeState('manage2')" class="modalForm_cerrar">cerrar X</button>
      </div>
    </div>

    <div class="modalForm_body">

      <form class="modalForm_part" @submit.prevent>

        <div class="container_buttons">

          <div class="materiasContainer">
                <div class="title">
                  <div class="title_container">
                    <span class="icon_container">  
                    <i class="fa-solid fa-calendar"></i>
                      <h3 class="part_title subject_title">Quitar Asignado</h3>
                  </span>
                  </div>
                </div>

                <span v-if="getAssigned.length > 0" v-for="assigned in getAssigned" :key="assigned.id_asignado" class="subject_check">
                  <div>
                    <Delete_Button 
                      :idData="assigned.id_asignado",
                      :typeDelete="'assigned'"
                    />
                  </div>
                  {{ assigned.nombre }} 
                  {{ assigned.apellido }}
                  {{ assigned.nombre_materia }}
                  ({{ assigned.nombre_seccion }})
                </span>
      
          </div>

        </div>
      </form>
    </div>

  </div>

</div>

  <Modal_Message 
      v-show="stateMessageModal" 
      @closeModalMessage="changeStateMessageModal"
      :typeMessage="'assigned'" 
  />

</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";

    /* Estructura del modal */

    .container_modalForm{
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

  .modalForm{
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: $color4;
    padding: 15px;
    border-radius: 15px;
    //width: 86%;
    //height: 95%; 
    box-sizing: border-box;
  }

  /* Botón de cerrar */

  .modalForm_head{
    width: 100%;
  }

  .container_button{
    display: flex;
    flex-direction: row-reverse;
  }

  .modalForm_cerrar{
    background: none;
    border: none;
    color: #FFF;
    text-align: center;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    text-decoration-line: underline;
    line-height: 20px;
   /*  margin-right: -12px; */
    margin: -5px -5px 1px 1px;
  }
  
  .modalForm_cerrar:hover{
    cursor: pointer;
    background-color: $secondary_color;
    border-radius: 5px;
  }

  /* Contenedor de las partes del modal */

  .modalForm_body{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

   /* Contenedor de las secciones blancas modal */
  .container_buttons{
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
  }

  .modalForm_part{
    background-color: #FFF;
    border-radius: 7px;
    margin: 10px;
    padding: 12px;
    height: 100%;
    overflow: auto;
  }


  /* Contenedores de los checks */
  .materiasContainer{
    display: flex;
/*     min-height: 400px; */
    height: 400px;
    width: 290px;
    padding-bottom: 30px;
    flex-direction: column;
    align-items: flex-start; 
    align-self: stretch;
    background: rgba(158, 158, 158, 0.40);
    margin: 0 5px 0;
    overflow: auto;
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
    //margin: 0 15px 0;
    }
    .title_container{
/*       margin-top:15px ;
      margin-left:10px; */
      margin-left:10px; 
      margin-top: 20px;
    }
    span{
      height: auto;
      font-size: 33px;
      color: #fff;
    }
  }

  .part_title{
    font-family: Poppins;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    margin-bottom: 20px;
  }

  .subject_check{
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 15px;
  align-self: stretch;
/*   height:49px; */

  color: #000;
  font-family: Poppins;
/*   font-size: 23px; */
  font-size: 20px;
  font-style: normal;
  font-weight: 300;

  padding: 5px 0;
  overflow-wrap: anywhere;

  input{
    width: 30px;
    height: 30px;
    margin-left: 10px;
    accent-color:#329D9C;
  }

}


@media (max-width: 1000px) {
  .container_buttons{
    height: 500px;
    width: 350px;
    flex-direction: column;
    background: rgba(158, 158, 158, 0.40);
    overflow: auto;
  }

  .materiasContainer{
    width: 100%;
    margin: 0;
    padding: 0;
    height: auto;
    display: block;
    overflow: visible;
  }
}

</style>