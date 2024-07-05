<script setup>
import { defineProps, ref, computed } from 'vue';
import { useEventsStore } from '@/stores/events';


class CreateEvent {
  constructor(idSemana, fecha_especial, nombre_corto, nombre_largo, descripcion, tipo_fecha) {
      this.idSemana = idSemana, 
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
})


let prop = props.dateWeek
let title_from_teacher = prop.toLocaleDateString('es-ES', { weekday: 'long' })

let tipo_fecha = ref('');
let nombre_corto = ref('');
let nombre_largo = ref('');
let descripcion = ref('');
let hora_evento = ref('');

let storeEvents = useEventsStore();

const postEvent = computed(() => {
  let cookie = $cookies.get('auth')
  if(cookie !== null){
    let token = cookie.token
    let fecha_especial = props.dateWeek.toLocaleDateString('en-CA', {  year: 'numeric', month: 'numeric', day: 'numeric'})
    fecha_especial= `${fecha_especial} ${hora_evento.value}:00`
    const eventCreate = new CreateEvent(props.weekNumber, fecha_especial, nombre_corto.value, nombre_largo.value, descripcion.value, tipo_fecha.value)
    storeEvents.postEvents(token, eventCreate)

  } else {
    console.log("no hay cookies")
  }
});

</script>

<template>
  <form class="formCreateEvent" @submit.prevent="postEvent">

    <div class="formCreateEvent_head">
      <h2 class="formCreateEvent_title">Añadir Evento</h2>
      <h3 class="formCreateEvent_title--h3" v-if="formDire">{{ props.titleDay }}</h3>
      <h3 class="formCreateEvent_title--h3" v-else-if="formTeacher">Semana {{ props.weekNumber }} {{ title_from_teacher }}</h3>
    </div>
   
    <div class="formCreateEvent_body">
      <div class="formCreateEvent_Containerselect">
        <select class="formCreateEvent_select" v-model="tipo_fecha">
          <option class="FormCreateEvent_select-hide" >Tipo de evento</option>
          <option class="formCreateEvent_option" value="Encuentro">Encuentro</option>
          <option class="formCreateEvent_option" value="Conferencia">Conferencia</option>
          <option class="formCreateEvent_option" value="Feria">Feria</option>
        </select>
      </div>
      <input class="formCreateEvent_input" placeholder="Nombre corto" type="text"  v-model="nombre_corto">
      <input class="formCreateEvent_input" placeholder="Nombre largo" type="text" v-model="nombre_largo">
      <textarea  class="formCreateEvent_textarea" placeholder="Descripción" v-model="descripcion"></textarea>
      <div class="formCreateActivity_containerLabel">
        <label class="formCreateActivity_label" for="timeActivity">
          Hora de la actividad:
          <input type="time" id="timeActivity" v-model="hora_evento">
        </label>
      </div>
      <input class="formCreateEvent_input--submit" type="submit" value="Añadir" />
    </div>

  </form>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";


  .formCreateEvent{
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 22px 10px;
  }
  
  .formCreateEvent_head{
    margin: 0 0 25px 0;
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
    display: flex;
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

  .FormCreateEvent_select-hide {
    display: none;  
  }


  .formCreateEvent_input{
    display: flex;
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

  .formCreateEvent_textarea::placeholder{
    color: #000;
    text-align: center;
    font-family: "Inria Sans";
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .formCreateEvent_input--submit{
    display: flex;
    padding: 6px 0px;
    //margin: 0 0 25px 0;
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

  .formCreateActivity_containerLabel{
    margin: 0 0 25px 0;
  }

  .formCreateActivity_label{
    color: #000;
    font-family: "Inria Sans";
    font-size: 24px;
    font-weight: 400;
  }

  @media (max-width: 375px) {
    .formCreateEvent_head{
      margin: 0 0 15px 0;
    }
    .formCreateEvent_title--h3{
      font-size: 20px;
    }
    .formCreateEvent_title{
      font-size: 30px;
    }
    .formCreateEvent_input{
      height: 45px;
      padding: 10px;
    }
    .formCreateEvent_select{
      margin: 0 0 15px 0;
    }
    .formCreateEvent_input{
      margin: 0 0 15px 0;
    }

  }
  @media (min-width: 1024px) and (max-height: 600px) {
    .formCreateEvent{
      height: 75vh;
      width: 28vw;
      padding: 0 10px;
    }
    .formCreateEvent_title{
      font-size: 1.5em;
    }
    .formCreateEvent_head{
      margin: 0 0 15px 0;
    }
    .formCreateEvent_select{
      margin: 0 0 15px 0;
    }
    .formCreateEvent_input{
      margin: 0 0 15px 0;
    }
    .formCreateEvent_textarea{
      margin: 0 0 15px 0;
      height: 30%;
    }


  }

  @media (min-width: 1280px) {
    .formCreateEvent{
      padding: 10px;
      width: 28vw;
    }
    .formCreateEvent_title{
      font-size: 1.5em;
    }
    .formCreateEvent_select{
      margin: 0 0 25px 0;
    }
    .formCreateEvent_input{
      margin: 0 0 25px 0;
    }
    .formCreateEvent_textarea{
      margin: 0 0 15px 0;
      height: 150px;
    }

    
  }


</style>