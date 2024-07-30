<script setup>
import DashTable from '@/components/DashMain/DashTable.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useSchedulesStore } from '@/stores/Dash_Stores/schedules';
import { buttonStateStore } from '@/stores/buttonState';
import Modal_assigned_schedules from '@/components/modals/Modal_assigned_schedules.vue';
import CreateSchedule from '@/components/DashMain/Create-Schedule.vue';
import EditSchedule from '@/components/DashMain/Edit-Schedule.vue';

const buttonState = buttonStateStore()
const buttonChange = buttonState.changeState

let schedulesStore = useSchedulesStore();

const getSchedules = computed(() => {
  return schedulesStore.getSchedules;
})

onMounted(() => {
  schedulesStore.searchSchedules();
})

let scheduleID = ref('');
let detachSchedule = ref('')

function idListener(dato) {
  if (dato) {
    console.log(dato)
    scheduleID.value = dato
    let temp = schedulesStore.options.schedules.filter((schedule) => scheduleID.value == schedule.id_horario);
    detachSchedule.value = temp[0]
    //console.log(detachSchedule.value)
  }

}

</script>

<template>
    <div class="topDiv">
        <div>
            <h1>Fechas Académicas</h1>
            <p>Periodo actual: 2024B</p>
        </div>
        <div class="optionPeriod">
            <Entity_Button message="Periodos" :onClick="changeState" />
        </div>
    </div>

  <DashTable @takenID="idListener" :tableHead="['Dia de la Semana', 'Hora de Entrada', 'Hora de Salida']"
    :forBody="['dia_semana', 'hora_inicio', 'hora_final']" :options="true" :forTable="getSchedules"
    mainButton="Añadir horario" h1Title="Gestión de horarios" h3Title="Aquí puedes crear y gestionar horarios"
    :toChangeState="buttonChange" :lessOptions="true" :assignedOptionsSchedules="true" :typeGestion="'schedule'">
  </DashTable>

  <CreateSchedule :toChangeState="buttonChange" :state="buttonState.bState" />
  <Modal_assigned_schedules :toChangeState="buttonChange" :state="buttonState.M2State" />
  <EditSchedule v-if="detachSchedule" :scheduleDetail="detachSchedule" :toChangeState="buttonChange"
    :state="buttonState.eState" />
  <!--   <EditSchedule :toChangeState="buttonChange" :state="buttonState.eState" /> -->

</template>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

h1 {
    color: $color7;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.58);
    font-family: Ubuntu;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

p {
    color: $color7;
    text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.74);
    font-family: Ubuntu;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.topDiv {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 3%;
}

.optionPeriod {
    padding: 2px;
    background-color: $color1;
    border-radius: 10px;
}
</style>