<script setup>
import DashTable from '@/components/DashMain/DashTable.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useSchedulesStore } from '@/stores/Dash_Stores/schedules';
import { buttonStateStore } from '@/stores/buttonState';
import { useEventsStore } from '@/stores/events';
import Modal_assigned_schedules from '@/components/modals/Modal_assigned_schedules.vue';
import CreateSchedule from '@/components/DashMain/Create-Schedule.vue';
import EditSchedule from '@/components/DashMain/Edit-Schedule.vue';
import Entity_Button from '@/components/buttons/Entity_Button.vue';
import { usePeriodsStore } from '@/stores/periods';

const buttonState = buttonStateStore()
const buttonChange = buttonState.changeState

let schedulesStore = useSchedulesStore();
const dateStore = useEventsStore();
const periodStore = usePeriodsStore()

const getSchedules = computed(() => {
    return schedulesStore.getSchedules;
})

const getDate = computed(() => {
    return dateStore.getEventsTable;
})

const getPeriod = computed(() => {
    return periodStore.getPeriodCurrent;
})

onMounted(() => {
    schedulesStore.searchSchedules();
    dateStore.searchEventsTable(['Entregables', 'fecha de corte']);
    periodStore.searchPeriodsCurrent();
    setTimeout(() => {
        console.log(getPeriod.value[0]['nombre_periodo'])
    }, 3000);
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


const periodNow = ref('')

watch(periodStore.$state, (newState) => {
    console.log('observando', newState.options.currentPeriod[0])
    if (newState.options.currentPeriod && newState.options.currentPeriod[0]) {
        periodNow.value = getPeriod.value[0]['nombre_periodo'];
    }
});
</script>

<template>
    <!--
    <div class="topDiv">
        <div>
            <h1>Fechas Académicas</h1>
            <p>Periodo actual: 2024B</p>
        </div>
        <div class="optionPeriod">
            <Entity_Button message="Periodos" :onClick="changeState" />
        </div>
    </div>
    -->
    

    <DashTable 
        @takenID="idListener" 
        :tableHead="['Nombre', 'Tipo', 'Semana', 'Fecha']"
        :forBody="['nombre_largo', 'tipo_fecha', 'idSemana', 'fecha_especial']" 
        :options="true" :forTable="getDate"
            
        mainButton="Añadir Fecha" 
        h1Title="Fechas Académicas" 
        :h3Title="`Periodo actual: ${periodNow}`"

        :toChangeState="buttonChange" 
        :lessOptions="true" 
        :assignedOptionsSchedules="true" 
        :typeGestion="'schedule'">
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