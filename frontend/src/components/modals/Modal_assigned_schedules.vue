<script setup>
import { defineProps, computed, ref } from 'vue';
import { useAssignedStore } from '@/stores/assigned';
import { useSchedulesStore } from '@/stores/Dash_Stores/schedules';
import Submit_Button from '../buttons/Submit_Button.vue';
import Modal_Message from './Modal_Message.vue';

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

  let storeAssigned = useAssignedStore();

  storeAssigned.searchNoSchedules()

  const getAssigned = computed(() => {
    return storeAssigned.getAssigned
  })

  let storeSchedules = useSchedulesStore();

  storeSchedules.searchSchedules()

  const getSchedules = computed(() => {
    return storeSchedules.getSchedules
  })

  let radioProfessorValue = ref("")
  let radioScheduleValue = ref("")

  const createAssigned = computed(() => {
    let cookie = $cookies.get('auth')
    if(cookie !== null  && radioProfessorValue.value !== "" && radioScheduleValue.value !== ""){
      let token = cookie.token;
      storeAssigned.assignedSchedule(token,
        {
          idAssigned: radioProfessorValue.value,
          idSchedule: radioScheduleValue.value
        }
      )
    }else{
      storeAssigned.options.resultForm.messageForm = "Faltan datos por asignar"
    }
    radioProfessorValue.value = ""
    radioScheduleValue.value = ""
    changeStateMessageModal()
  })

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

      <form class="modalForm_part" @submit.prevent="createAssigned">

        <div class="container_buttons">

          <div class="materiasContainer">
            <input type="radio" name="dropdownS" id="btn-dropdownS1" class="btn-dropdownS">
                <label for="btn-dropdownS1" class="title">
                  <div class="title_container">
                    <span class="icon_container">  
                    <i class="fa-solid fa-calendar"></i>
                      <h3 class="part_title subject_title">Disponibles</h3>
                  </span>
                  </div>
                </label>

                <span v-if="getAssigned.length > 0" v-for="assigned in getAssigned" :key="assigned.id_asignado" class="subject_check">
                  <input type='radio' v-model="radioProfessorValue" name="radioProfessor" :value=assigned.id_asignado>
                  {{ assigned.nombre }} 
                  {{ assigned.apellido }}
                  {{ assigned.nombre_materia }}
                  ({{ assigned.nombre_seccion }})
                </span>

          </div>

          <div class="materiasContainer">
            <input type="radio" name="dropdownS" id="btn-dropdownS2" class="btn-dropdownS">
                <label for="btn-dropdownS2" class="title">
                  <div class="title_container">
                    <span class="icon_container">  
                    <i class="fa-solid fa-calendar"></i>
                      <h3 class="part_title subject_title">Horarios</h3>
                  </span>
                  </div>
                </label>

                <span v-if="getSchedules.length > 0" v-for="schedule in getSchedules" :key="schedule.id_horario" class="subject_check">
                  <input type='radio' v-model="radioScheduleValue" name="radioHorarios" :value=schedule.id_horario>
                  {{ schedule.dia_semana }}
                  {{ schedule.hora_inicio }} - {{ schedule.hora_final }}
                </span>

          </div>

        </div>
        <Submit_Button :message="'Asignar'"/>
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
    width: 280px;
    padding-bottom: 30px;
    flex-direction: column;
    align-items: flex-start; 
    gap: 30px;
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

.btn-dropdownS{
    display: none;
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

  //Lo que lo hace desplegable
  .materiasContainer .subject_check{
    padding: 0px;
    max-height: 0px;
    overflow: hidden;
    transition: all 300ms ease;
  }
  .btn-dropdownS:checked ~ .subject_check{
      max-height: 600px;
      padding: 15px 0px;
  }
}

</style>