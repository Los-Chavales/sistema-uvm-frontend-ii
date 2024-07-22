<script setup>
import { defineProps, ref, onMounted, computed } from 'vue';
import { usePeriodsStore } from '@/stores/periods';
import Edit_Button from '../buttons/Edit_Button.vue';
import Delete_Button from '../buttons/Delete_Button.vue';
import Modal_Form from './Modal_Form.vue';
import FormCreate_Period from '../forms/FormCreate_Period.vue';

const props = defineProps({
  day: String,
  date: String,
  seeActivities: Boolean,
  isEditor: Boolean,
  state: Boolean,
  close: Function,
})


//Hay que hacer una función de abrir y cerrar para cada modal

let stateFormActivity = ref(false);
const changeStateModalFormActivity = () => (stateFormActivity.value = !stateFormActivity.value)


const storePeriods = usePeriodsStore();
storePeriods.searchPeriods();


const getPeriods = (() => {
  let getPeriodsList = storePeriods.getPeriodsDetails;
  //console.log('a', getPeriodsList)
  return getPeriodsList;
});

const getPeriodsNow = computed(() => {
  let getPeriodsList = storePeriods.getPeriodCurrent;
  console.log('b', getPeriodsList,getPeriodsList[0])
  return getPeriodsList;
});

</script>

<template>

  <div class="container_modal" v-show="state">

    <div class="modal">

      <div class="modal_head">
        <div class="container_button">
          <button @click="close" class="modal_cerrar">cerrar X</button>
        </div>
        <h2 class="modal_title">Periodos</h2>
      </div>

      <div class="modal_body">

        <!-- Parte de mostrar activos -->

        <div class="modal_part">
          <div class="part_container">
            <h3 class="part_title title_activities">Periodo Actual</h3>
            <button class="button_create button--white" @click="changeStateModalFormActivity" v-show="isEditor">Crear
              periodo</button>

            <Modal_Form @closeModalForm="changeStateModalFormActivity" v-show="stateFormActivity"
              :titleDay="title_modal" :formCreatePeriod="true" />

            <!-- En caso de no tener nada -->

            <div class="container_details" v-if="getPeriodsNow.length === 0">
              <p class="part_p title_activities" >No se ha definido un periodo</p>
            </div>

            <div v-else class="container_details" v-for="(period) in getPeriodsNow" :key="period.id">
              <h4 class="part_titleH4">{{ period.nombre_corto }}</h4>
            <!--
                estado
              :
              "activo"
              fecha_cierre
              :
              "2024-08-07T04:00:00.000Z"
              fecha_inicio
              :
              "2024-05-06T04:00:00.000Z"
              id_periodo
              :
              1
              nombre_periodo
              :
              "2024B"
              -->
              
              <p class="part_p p--event">{{ period.nombre_periodo }} 
                <span class="hour">Fecha inicio: {{
                new Date(period.fecha_inicio).toLocaleDateString() }}</span>
                <span class="hour">Fecha cierre: {{
                new Date(period.fecha_cierre).toLocaleDateString() }}</span>
                </p>
                

              <div class="box_buttons" v-show="isEditor">
                <Edit_Button :dateWeek="props.date" :titleDay="title_modal" :formDire="false" :formTeacher="true"
                  :weekNumber="props.weekNumber" :eventID="period.id_periodo" :dataEdit="{
                    idSemana: period.idSemana,
                    fecha_especial: period.fecha_especial,
                    nombre_corto: period.nombre_corto,
                    nombre_largo: period.nombre_largo,
                    descripcion: period.descripcion,
                    tipo_fecha: period.tipo_fecha,
                  }" :renderForm="'event'" />

                <Delete_Button :Eventos="period.id_fecha_especial" :dateWeek="props.date" />
              </div>
            </div>

          </div>
        </div>


        <!-- Parte de mostrar todos -->

        <div class="modal_part">
          <div class="part_container">
            <h3 class="part_title title_events">Periodos Registrados</h3>



            <!-- En caso de no tener nada -->

            <div class="container_details" v-if="getPeriods().length === 0">
              <p class="part_p p--activity">No hay periodos registrados</p>
            </div>

            <!-- En caso de si tener periodos -->

            <div v-else class="container_details" v-for="(period) in getPeriods()" :key="period.id">
              <h4 class="part_titleH4">{{ period.nombre_corto }}</h4>
            <!--
                estado
              :
              "activo"
              fecha_cierre
              :
              "2024-08-07T04:00:00.000Z"
              fecha_inicio
              :
              "2024-05-06T04:00:00.000Z"
              id_periodo
              :
              1
              nombre_periodo
              :
              "2024B"
              -->
              
              <p class="part_p p--event">{{ period.nombre_periodo }} 
                <span class="hour">Fecha inicio: {{
                new Date(period.fecha_inicio).toLocaleDateString() }}</span>
                <span class="hour">Fecha cierre: {{
                new Date(period.fecha_cierre).toLocaleDateString() }}</span>
                </p>
                

              <div class="box_buttons" v-show="isEditor">
                <Edit_Button :dateWeek="props.date" :titleDay="title_modal" :formDire="false" :formTeacher="true"
                  :weekNumber="props.weekNumber" :eventID="period.id_periodo" :dataEdit="{
                    idSemana: period.idSemana,
                    fecha_especial: period.fecha_especial,
                    nombre_corto: period.nombre_corto,
                    nombre_largo: period.nombre_largo,
                    descripcion: period.descripcion,
                    tipo_fecha: period.tipo_fecha,
                  }" :renderForm="'event'" />

                <Delete_Button :Eventos="period.id_fecha_especial" :dateWeek="props.date" />
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.cell {
  width: 100%;
  height: 100%;
  padding-top: 5px;
  align-content: baseline;
}

.planning {
  align-content: center;
  font-size: 11px;
  line-height: 11px;
  padding-top: 0px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
}

.textEvent {
  color: $secondary_color;
}

.textAct {
  color: black;
}


/* Estructura del modal */

.container_modal {
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

.modal_head {
  width: -webkit-fill-available;
}

.modal {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: $color4;
  /*   width: 17em;
  height: 35em; */
  /*width: 93%;*/
  height: 95%;
  padding: 15px 30px 30px 30px;
  border-radius: 15px;
}

.container_button {
  display: flex;
  flex-direction: row-reverse;
}

.modal_cerrar {
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

.modal_cerrar:hover {
  cursor: pointer;
  background-color: $secondary_color;
  border-radius: 5px;
}

.modal_title {
  color: #FFF;
  font-family: Poppins;
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: start;
}

/* Contenedor de las partes del modal */

.modal_body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Contenedor de las secciones blancas modal */

.modal_part {
  background-color: #FFF;
  border-radius: 7px;
  margin: 10px;
  /*width: 100%;*/
  height: 100%;
  overflow: auto;
}


.part_container {
  padding: 14px 18px;
  width: 75vw;
}

/* información del contenido, titulos, parrafos... */

.part_title {
  font-family: Poppins;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: start;
}

.title_activities {
  color: #000
}

.title_events {
  color: $secondary_color;
}

/* Detalles de la información */

.container_details {
  margin: 15px 0;
  background-color: #e7e2e2;
  border-radius: 7px;
  overflow-wrap: anywhere;
}

.button_create {
  border-radius: 5px;
  border: 1px solid #000;
  padding: 0px;
  color: $color5;
  text-align: center;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.part_titleH4 {
  margin-top: 10px;
  text-align: start;
  color: #000;
  font-family: Poppins;
  font-weight: 700;
  font-size: 20px;
}

.part_p {
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: start;
  padding: 5px 0;
}

.p--activity {
  color: #000;
}


.p--event {
  color: $secondary_color;
}

.hour {
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
}

.box_buttons {
  display: flex;
  flex-direction: row;
}

@media (min-width: 768px) and (max-width: 991px) {
  .containerFrontPage {
    height: 620px;
  }
}

@media (min-width: 780px) {
  .part_container {
    width: 41vw;
    /*width: auto;*/
    /*height: 60%;*/
  }

  .modal_body {
    flex-direction: row;
  }
}


@media (min-width: 1024px) {
  /*.part_container {
    /*width: 85%;
    /*width: auto;
    height: 41vw;
  }*/
}
</style>