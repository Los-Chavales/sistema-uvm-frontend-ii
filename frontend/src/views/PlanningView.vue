<script setup>
import { onMounted, onUpdated, computed, ref } from 'vue';
import Calendar_Weekly from "../components/Calendar_Weekly.vue";
import Entity_Button from "../components/buttons/Entity_Button.vue";
import  {downloadPlanification} from '../common/downloadPlanification'
import { useAssignedStore } from "@/stores/assigned";
import Select_Subject from '../components/Select_Subject.vue'

const donwload = () => downloadPlanification()

const storeAssigned = useAssignedStore();

const getAssigned = computed(() => {
  return storeAssigned.getAssigned;
});

const getAssignedSubjectName = computed(() => {
  return storeAssigned.getAssignedSubjectName;
});

const getAssignedSectionName = computed(() => {
  return storeAssigned.getAssignedSectionName;
});


</script>

<template>
    <div class="topDiv">
        <div>
            <h1>Periodo Académico 2024</h1>
            <p v-if="getAssignedSectionName !== '' ">Sección: {{ getAssignedSectionName }}</p>
        </div>
        <div>
            <ul v-if="getAssigned.length > 0">
                <li><b>Trimestre:</b>VI</li>
                <li><b>Profesor:</b>{{ getAssigned[0].nombre }} {{ getAssigned[0].apellido }}</li>
                <li><b>Materia:</b>{{ getAssignedSubjectName }}</li>
            </ul>
        </div>
        <Select_Subject />
        <div class="optionPeriod">
            <Entity_Button message="Descargar Planificación"  @click="donwload" />
        </div>
    </div>
    <Calendar_Weekly />
</template>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

h1 {
    color: $color5;
    font-family: Poppins;
    font-size: 35px;
    font-style: normal;
    font-weight: 600;
    line-height: 45px;
}

p {
    color: $color7;
    font-family: Poppins;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 35px;
}

ul {
    list-style: none;
    padding: 2px 0px;
    color: $color5;
    font-family: "Inria Sans";
    font-size: 20px;
    font-style: normal;
    line-height: normal;
}

.topDiv {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 3%;
    gap: 2.5%;
}

.optionPeriod {
    padding: 2px;
    background-color: $color1;
    border-radius: 10px;
}

.button--white {
    font-size: 20px;
    width: 140px;
    height: 60px;
}
</style>