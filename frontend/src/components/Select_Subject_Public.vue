<script setup>
import { onMounted, onUpdated, computed, ref } from 'vue';
import { useAssignedStore } from "@/stores/assigned";
import { useEventsStore } from '@/stores/events';
import { useActivitiesStore } from '@/stores/activities';

const storeAssigned = useAssignedStore();
const storeActivities = useActivitiesStore(); 
const storeEvents = useEventsStore();

let select_planification = ref(0);

onMounted(() => {
    storeEvents.options.id_asignado = 0
    storeActivities.options.id_asignado = 0
    storeAssigned.searchAssigned()
})

const getAssignedList = computed(() => {
  return storeAssigned.getAssignedAll;
});


const selectOption = () => {
  if(select_planification.value !== 0){
      let dateMoment = storeActivities.getDateMoment
      let dateMomentEvent = storeEvents.getDateMoment
      storeAssigned.searchAssignedOnePublic(select_planification.value)
      .then(() => {
          storeActivities.searchActivitiesMonthsIdAssigned(dateMoment.yearMoment, dateMoment.monthMoment);
          storeEvents.searchEventsMonthsIdAssignedPublic(dateMomentEvent.yearMoment, dateMomentEvent.monthMoment);
      })
      .catch(() => {
        console.error('Error al actualizar Assingend');
      }) 
    }
}


</script>

<template>
    <div v-if="getAssignedList.length > 0" class="containet__select">
      <select v-model="select_planification"  class="select__planification">
        <option value=0 disabled selected>Escoger Planificación</option>
        <option v-for="(assigned) in getAssignedList" :value=assigned.id_asignado>{{ assigned.nombre_materia }} {{ assigned.nombre_seccion }}</option>
      </select>
      <buttton class="search__button" @click="selectOption" ><i class="fa-solid fa-magnifying-glass ico__search"></i></buttton>
    </div>
</template>

<style lang="scss" scoped>
   @import "@/assets/scss/variables.scss";

  .containet__select{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 35px 5px 10px;
  }
  .select__planification{
    display: flex;
    width: 300px;
    height: 35px;
    align-items: center;
    gap: 14px;
    flex-shrink: 0;
    color: #000;
    font-family: Poppins;
    font-size: 18px;
    font-weight: 300;
  }

  .search__button{
    margin-left: 5px;
    width: 40px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
  }

  .ico__search{
    color: #000;
    width: 40px;
    height: 25px;
  }

  @media (max-width: 700px){ /*Mobile*/
    /* .containet__select{
      margin: 15px 5px;
    } */
    .select__planification{
      width: 230px;
    }
  }

</style>