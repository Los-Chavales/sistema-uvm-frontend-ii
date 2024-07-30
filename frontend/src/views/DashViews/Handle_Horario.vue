<script setup>
  import DashTable from '@/components/DashMain/DashTable.vue';
  import { computed, onMounted, ref } from 'vue';
  import { useSchedulesStore } from '@/stores/Dash_Stores/schedules';
  import { buttonStateStore } from '@/stores/buttonState';
  import Modal_assigned_schedules from '@/components/modals/Modal_assigned_schedules.vue';
  import CreateSchedule from '@/components/DashMain/Create-Schedule.vue';
  import EditSchedule from '@/components/DashMain/Edit-Schedule.vue';

  const buttonState = buttonStateStore()
  const buttonChange  = buttonState.changeState

  let schedulesStore = useSchedulesStore();

  const getSchedules = computed(() => {
    return schedulesStore.getSchedules;
  })    

  onMounted(() => {
    schedulesStore.searchSchedules();
  })

  let scheduleID = ref('');
  let detachSchedule = ref('')

  function idListener( dato ){
    if ( dato ){
      scheduleID.value = dato
      detachSchedule.value =  schedulesStore.options.schedules.filter( (schedule) => scheduleID.value == schedule.id_horario );
    }
        
  }  
 
  

</script>

<template>

  <DashTable
    @takenID="idListener"
    :tableHead="['Dia de la Semana','Hora de Entrada','Hora de Salida']"
    :forBody="['dia_semana','hora_inicio','hora_final']"
    :options="true"
    :forTable="getSchedules" 
    mainButton="Añadir horario"
    h1Title="Gestión de horarios"
    h3Title="Aquí puedes crear y gestionar horarios"
    :toChangeState="buttonChange"
    :lessOptions="true"
    :assignedOptionsSchedules="true"
    :typeGestion="'schedule'"
    >
  </DashTable>

  <CreateSchedule :toChangeState="buttonChange" :state="buttonState.bState"/>
  <Modal_assigned_schedules :toChangeState="buttonChange" :state="buttonState.M2State" />
  <EditSchedule v-if="detachSchedule" :scheduleDetail="detachSchedule" :toChangeState="buttonChange" :state="buttonState.eState" />
<!--   <EditSchedule :toChangeState="buttonChange" :state="buttonState.eState" /> -->

</template>

<style lang="scss">
    @import url('@/assets/scss/variables.scss');
</style>