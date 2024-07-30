<script setup>
import DashTable from '@/components/DashMain/DashTable.vue';
import { computed, onMounted, ref, watch } from 'vue';

import { useSchedulesStore } from '@/stores/Dash_Stores/schedules';
import { usePeriodsStore } from '@/stores/periods';
import { useEventsStore } from '@/stores/events';

import { buttonStateStore } from '@/stores/buttonState';

import Modal_assigned_schedules from '@/components/modals/Modal_assigned_schedules.vue';
import CreateSchedule from '@/components/DashMain/Create-Schedule.vue';
import Modal_Period from '@/components/modals/Modal_Period.vue';
import EditSchedule from '@/components/DashMain/Edit-Schedule.vue';

import Entity_Button from '@/components/buttons/Entity_Button.vue';



const buttonState = buttonStateStore()
const buttonChange = buttonState.changeState

let schedulesStore = useSchedulesStore();
const eventsStore = useEventsStore();
const periodStore = usePeriodsStore()

const getDate = computed(() => {
    return eventsStore.getEventsTable;
})

const getPeriod = computed(() => {
    return periodStore.getPeriodCurrent;
})

onMounted(() => {
    schedulesStore.searchSchedules();
    eventsStore.searchEventsTable();
    periodStore.searchPeriodsCurrent();
})

let eventID = ref('');
let detachEvent = ref('')

function idListener(dato) {
    if (dato) {
        console.log('busca',dato)
        eventID.value = dato
        let temp = eventsStore.options.eventsTable.filter((event) => eventID.value == event.id_fecha_especial)
        detachEvent.value = temp[0];
        console.log('encuentra',detachEvent.value);
    }
}


const periodNow = ref('')

watch(periodStore.$state, (newState) => {
    console.log('observando', newState.options.currentPeriod[0])
    if (newState.options.currentPeriod && newState.options.currentPeriod[0]) {
        periodNow.value = getPeriod.value[0]['nombre_periodo'];
    }
});

const modalP = () => {
    buttonChange('periodTable')
}
</script>

<template>
    

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
        :typeGestion="'academic'">
    </DashTable>

    <Entity_Button message="Periodos" :onClick="modalP" />

    <Modal_Period :state="buttonState.periodTable" :close="buttonChange" :seeActivities="true" :isEditor="true" :is-table="true"/>

    
    <Modal_assigned_schedules :toChangeState="buttonChange" :state="buttonState.M2State" />
    <EditSchedule v-if="detachEvent" :scheduleDetail="detachEvent" :toChangeState="buttonChange"
        :state="buttonState.eState" />

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