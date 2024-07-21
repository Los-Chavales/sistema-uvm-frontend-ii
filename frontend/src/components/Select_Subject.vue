<script setup>
import { onMounted, onUpdated, computed, ref } from 'vue';
import { useAssignedStore } from "@/stores/assigned";
import { useActivitiesStore } from '@/stores/activities';

const storeAssigned = useAssignedStore();
const storeActivities = useActivitiesStore(); 

let select_planification = ref(0);

let cookie = $cookies.get('auth')
onMounted(() => {
    if(cookie !== null){
      let idTeacher = cookie.id_usuario
      storeAssigned.searchAssignedOptions(idTeacher)
    }
})

const getAssignedList = computed(() => {
  return storeAssigned.getAssignedList;
});


const selectOption = () => {
    if(cookie !== null && select_planification.value !== 0){
      console.log("EN LA FUNCION")
      console.log(select_planification.value)
        let dateMoment = storeActivities.getDateMoment
        let idTeacher = cookie.id_usuario
        storeAssigned.searchAssignedOne(idTeacher, select_planification.value)
        .then(() => {
          storeActivities.searchActivitiesMonthsIdAssigned(dateMoment.yearMoment, dateMoment.monthMoment);
          storeActivities.searchAllActivities()
        })
        .catch(() => {
          console.error('Error al actualizar Assingend');
        })
        
        
    }
}


</script>

<template>
    <div v-if="getAssignedList.length > 0">
      <select v-model="select_planification">
        <option value=0 disabled selected>Escoger Planificación</option>
        <option v-for="(assigned) in getAssignedList" :value=assigned.id_asignado>{{ assigned.nombre_materia }} {{ assigned.nombre_seccion }}</option>
      </select>
      <buttton style="background-color: white; color:black;" @click="selectOption" >Ver</buttton>
    </div>
</template>