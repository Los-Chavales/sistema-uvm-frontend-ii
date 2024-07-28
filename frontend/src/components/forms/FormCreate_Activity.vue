<script setup>
import { defineProps, defineModel, ref, computed } from 'vue';
import { useActivitiesStore } from '@/stores/activities';
import { usePeriodsStore } from '@/stores/periods';
import Modal_Message from '../modals/Modal_Message.vue';
import Submit_Button from '../buttons/Submit_Button.vue';

class CreateActivity {
  constructor(idNumeroSemana, nombre_actividad, descripcion, fecha_actividad, idPeriodo) {
      this.idNumeroSemana = idNumeroSemana,
      this.nombre_actividad = nombre_actividad,
      this.descripcion = descripcion,
      this.fecha_actividad = fecha_actividad,
      this.idPeriodo = idPeriodo
  }
}

const props = defineProps({
    dateWeek: Date,
    titleDay: String,
    formDire: Boolean,
    formTeacher: Boolean,
    weekNumber: Number,
})

let prop = props.dateWeek
let title_from_teacher = prop.toLocaleDateString('es-ES', { weekday: 'long' })

let nombre = ref('');
let descripcion = ref('');
let hora_actividad = ref('00:00');



let storeActivities = useActivitiesStore();

const storePeriods = usePeriodsStore();

storePeriods.searchPeriodsCurrent();

const postActivity = computed(() => {
  let cookie = $cookies.get('auth')
  if(cookie !== null){
    let token = cookie.token
    let year = prop.getFullYear();
    let month = prop.getMonth();
    let fecha_actividad = props.dateWeek.toLocaleDateString('en-CA', {  year: 'numeric', month: 'numeric', day: 'numeric'})
    fecha_actividad = `${fecha_actividad} ${hora_actividad.value}:00`
    let periodMomentID = storePeriods.getPeriodCurrent
    const activityCreate = new CreateActivity(props.weekNumber, nombre.value, descripcion.value, fecha_actividad, periodMomentID[0].id_periodo)
    storeActivities.postActivities(token, activityCreate, year, month)
  }
  changeStateMessageModal()
});


//función para desplegar el modal 
let stateMessageModal = ref(false);
const changeStateMessageModal = () => ( stateMessageModal.value = !stateMessageModal.value)

</script>

<template>
  <form class="formCreateActivity" @submit.prevent="postActivity">

    <div class="formCreateActivity_head">
      <h2 class="formCreateActivity_title">Añadir Actividad</h2>
      <h3 class="formCreateActivity_title--h3" v-show="formTeacher">Semana {{ props.weekNumber }} {{ title_from_teacher }}</h3>
    </div>
   
    <div class="formCreateActivity_body">
      <input class="formCreateActivity_input" placeholder="Nombre" type="text"  v-model="nombre" required>
      <textarea  class="formCreateActivity_textarea" placeholder="Descripción"  v-model="descripcion" required></textarea>
      <div class="formCreateActivity_containerLabel">
        <label class="formCreateActivity_label" for="timeActivity">Hora de la actividad:</label>
        <input type="time" id="timeActivity" v-model="hora_actividad">
      </div>
      <Submit_Button :message="'Añadir'"/>
    </div>

  </form>

  <Modal_Message 
    v-show="stateMessageModal" 
    @closeModalMessage="changeStateMessageModal"
    :typeMessage="'activity'" 
  />

</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";

  .formCreateActivity{
    //height: 100%;
    //height: 478px;
    width: 68vw;
    //height: 75vh;
    display: flex;
    flex-direction: column;
    padding: 22px 10px;
  }
  
  .formCreateActivity_head{
    margin: 0 0 15px 0;
  }

  .formCreateActivity_title{
    color: #000;
    text-align: center;
    font-family: Poppins;
    font-size: 35px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .formCreateActivity_title--h3{
    color: #000;
    text-align: center;
    font-family: Poppins;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .formCreateActivity_input{
    display: flex;
    width: 100%;
    height: 50px;
    padding: 10px;
    margin: 0 0 25px 0;
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

  .formCreateActivity_input::placeholder{
    color: #000;
    text-align: center;
    font-family: "Inria Sans";
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 10px;
  }

  .formCreateActivity_textarea{
    resize: none;
    display: flex;
    width: 100%;
    height: 150px;
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
    font-size: 20px;
    font-style: normal;
  }

  .formCreateActivity_textarea::placeholder{
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

  .formCreateActivity_input--submit{
    display: flex;
    padding: 6px 0px;
    width: 100%;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 10px;
    background: $color4;
    border: none;

    color: #FFF;
    text-align: center;
    font-family: Poppins;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
  }

    /* Tablet */
  @media (min-width: 500px){
    .formCreateActivity{
      //height: 590px;
      width: 320px;
    }
    .formCreateActivity_head, 
    .formCreateActivity_input,
    .formCreateActivity_textarea,
    .formCreateActivity_containerLabel{
      margin: 0 0 15px 0;
    }
  }


  @media (max-width: 375px) {
    .formCreateActivity{
      height: 70vh;
      width: 68vw;
    }
    .formCreateActivity_input--submit{
      margin: 0 0 25px 0;
    }
  }


</style>