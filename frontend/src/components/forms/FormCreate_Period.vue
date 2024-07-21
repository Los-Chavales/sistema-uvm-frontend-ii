<script setup>
import { defineProps, ref, computed } from 'vue';
import { usePeriodsStore } from '@/stores/periods';
import Modal_Message from '../modals/Modal_Message.vue';
import Submit_Button from '../buttons/Submit_Button.vue';



const props = defineProps({
  titleDay: String,
})

class CreatePeriod {
  constructor(nombre_periodo, fecha_inicio, fecha_cierre, estado) {
    this.nombre_periodo = nombre_periodo,
    this.fecha_inicio = fecha_inicio,
    this.fecha_cierre = fecha_cierre,
    this.estado = estado
  }
  get valNull() {
    if (!(this.nombre_periodo) || !(this.fecha_inicio) || !(this.fecha_cierre) || !(this.estado)) {
      console.log('nada')
      return "nada"
    }
  }
}

let nombre_periodo = ref('');
let fecha_inicio = ref();
let fecha_cierre = ref();
let estado = ref('')
let n_semanas = ref(0);


let storePeriods = usePeriodsStore();

const addPeriod = computed(() => {
  let periodCreate = new CreatePeriod(nombre_periodo.value, fecha_inicio.value, fecha_cierre.value, estado.value)
  console.log(periodCreate)
  if (periodCreate.valNull === 'nada') return alert('Debe ingresar datos');
  let cookie = $cookies.get('auth')
  if (cookie !== null) {
    let token = cookie.token;
    const periodCreate = new CreatePeriod(nombre_periodo.value, fecha_inicio.value, fecha_cierre.value, estado.value)
    if (periodCreate.valNull === 'nada') return alert('Debe ingresar datos');
    storePeriods.postPeriods(token, periodCreate);
  }
  changeStateMessageModal()
});

//función para desplegar el modal 
let stateMessageModal = ref(false);
const changeStateMessageModal = () => (stateMessageModal.value = !stateMessageModal.value)

</script>

<template>

  <form class="formCreateEvent" @submit.prevent="addPeriod">

    <div class="formCreateEvent_head">
      <h2 class="formCreateEvent_title">Agregar Periodo</h2>
    </div>

    <div class="formCreateEvent_body">
      <input class="formCreateEvent_input" placeholder="Nombre" type="text" v-model="nombre_periodo" required>

      <label for="f-1" class="formCreateEvent_title--h3">Fecha de inicio</label>
      <input class="formCreateEvent_select--date" id="f-1" type="date" v-model="fecha_inicio" required>

      <label for="f-2" class="formCreateEvent_title--h3">Fecha de cierre</label>
      <input class="formCreateEvent_select--date" id="f-2" type="date" v-model="fecha_cierre" required>

      <p class="formCreateEvent_nSem">Número de semanas: {{ n_semanas }}</p>

      <select class="formCreateEvent_select" v-model="estado">
          <option value="" disabled selected>Estado del periodo</option>
          <option class="formCreateEvent_option" value="activo">Activo</option>
          <option class="formCreateEvent_option" value="inactivo">Inactivo</option>
      </select>

      <Submit_Button :message="'Añadir'" />
    </div>

  </form>

  <Modal_Message v-show="stateMessageModal" @closeModalMessage="changeStateMessageModal" :typeMessage="'event'" />

</template>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.formCreateEvent {
  height: 75vh;
  width: 68vw;
  display: flex;
  flex-direction: column;
  padding: 22px 10px;
}

.formCreateEvent_head {
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

.formCreateEvent_title {
  color: #000;
  text-align: center;
  font-family: Poppins;
  font-size: 35px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.formCreateEvent_title--h3 {
  color: #000;
  text-align: center;
  font-family: Poppins;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.formCreateEvent_select {
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

.formCreateEvent_select--datetime {
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

.formCreateEvent_select--date {
  //width: 215px;
  //width: 240px;
  margin: 0 0 15px 0;
  border: 1px solid $color5;
  background: #FFF;

  color: #000;
  font-family: Poppins;
  font-size: 18px;
  outline: none;

  cursor: pointer;
}

.formCreateEvent_input {
  display: flex;
  width: 100%;
  height: 50px;
  padding: 10px;
  margin: 0 0 15px 0;
  justify-content: center;
  align-items: center;
  text-align: center;
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

.formCreateEvent_input::placeholder {
  color: #000;
  text-align: center;
  font-family: "Inria Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 10px;
}

.formCreateEvent_textarea {
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

.formCreateEvent_textarea::placeholder {
  color: #000;
  text-align: center;
  font-family: "Inria Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.formCreateActivity_containerLabel {
  margin: 0 0 25px 0;
}

.formCreateActivity_label {
  color: #000;
  font-family: "Inria Sans";
  font-size: 24px;
  font-weight: 400;
}

.formCreateEvent_nSem {
  margin-bottom: 20px;
  color: #000;
  text-align: center;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

@media (min-width: 414px) {
  .formCreateEvent_select--datetime {
    //width: 260px;
    font-size: 20px;
  }
}

/* Tablet */
@media (min-width: 500px) {
  .formCreateEvent {
    /*height: 590px;*/
    width: 360px;
  }
}

/*Desktop*/
@media (min-width: 1000px) and (min-height: 666px) {
  .formCreateEvent {
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

  .formCreateEvent_textarea {
    height: 100px;
    font-size: 16px;
  }
}

//Pantallas grandes
@media (min-width: 1440px) {
  .formCreateEvent {
    width: 380px;
  }
}

@media (min-height: 850px) {
  .formCreateEvent {
    height: 72vh;
    max-height: 710px;
  }

  .formCreateEvent_textarea {
    height: 170px;
    font-size: 20px;
  }
}
</style>