<script setup>
import { defineProps, defineModel, ref, computed } from 'vue';
import { useActivitiesStore } from '@/stores/activities';
import Modal_Message from '../Modal_Message.vue';

class UpdateActivity {
  constructor(tipo_dia, fecha_actividad,nombre_actividad, descripcion) {
      this.tipo_dia = tipo_dia,
      this.fecha_actividad = fecha_actividad,
      this.nombre_actividad = nombre_actividad,
      this.descripcion = descripcion 
  }
}

const props = defineProps({
    dateWeek: Date,
    titleDay: String,
    formTeacher: Boolean,
    weekNumber: Number,
    dayData: Object,
    activityID: Number,
    dataEdit: Object
})

let prop = props.dateWeek
let title_from_teacher = prop.toLocaleDateString('es-ES', { weekday: 'long' })

let tipo_dia = ref(props.dataEdit.tipo_dia); 
let nombre_actividad = ref(props.dataEdit.nombre_actividad); 
let descripcion = ref(props.dataEdit.descripcion);  
let fecha_actividad = ref(date)
let idActivity = props.activityID;

let storeActivities = useActivitiesStore();

const putActivity = computed(() => {
  let cookie = $cookies.get('auth')
  if(cookie !== null){
    let token = cookie.token
    const activityUpdate = new UpdateActivity(tipo_dia.value,nombre_actividad.value, descripcion.value, fecha_actividad.value)
    storeActivities.updateActivity(token, activityUpdate, idActivity)
  } else {
    console.log("no hay cookies")
  }
});

//función para desplegar el modal 
let stateMessageModal = ref(false);
const changeStateMessageModal = () => ( stateMessageModal.value = !stateMessageModal.value)

</script>

<template>
    <form class="formCreateActivity" @submit.prevent="putActivity">

        <div class="formCreateActivity_head">
          <h2 class="formCreateActivity_title">Editar Actividad</h2>
          <h3 class="formCreateActivity_title--h3" v-show="formTeacher">Semana {{ props.weekNumber }} {{ title_from_teacher }}</h3>
        </div>
       
        <div class="formCreateActivity_body">
            <div class="formEditActivity_Containerselect">

                <select class="formCreateEvent_select" v-model="tipo_dia">
                  <option value="" disabled selected>Día de la semana</option>
                  <option class="formCreateEvent_option" value="Lunes">Lunes</option>
                  <option class="formCreateEvent_option" value="Martes">Martes</option>
                  <option class="formCreateEvent_option" value="Miércoles">Miércoles</option>
                  <option class="formCreateEvent_option" value="Jueves">Jueves</option>
                  <option class="formCreateEvent_option" value="Viernes">Viernes</option>
                  <option class="formCreateEvent_option" value="Sábado">Sábado</option>
                  <option class="formCreateEvent_option" value="Domingo">Domingo</option>
                </select>

            </div>

              <input class="formCreateEvent_select--datetime" type="datetime-local" v-model="fecha_actividad">

          <input class="formCreateActivity_input" placeholder="Nombre Corto" type="text"  v-model="nombre_actividad">

          <textarea  class="formCreateActivity_textarea" placeholder="Descripción"  v-model="descripcion"></textarea>
          
          <input class="formCreateActivity_input--submit" type="submit" value="Añadir" @click="changeStateMessageModal" />
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
  margin: 0 0 25px 0;
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