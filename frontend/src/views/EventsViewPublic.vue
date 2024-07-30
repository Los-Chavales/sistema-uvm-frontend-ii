<script setup>
import { ref } from "vue";
import Planner from "../components/Planner.vue";
import Modal_Period from "../components/modals/Modal_Period.vue";

let seeActivities = true;
let seeEvents = true;
let isEditor = false;

/* función para desplegar el modal */
let state = ref(false);
const changeState = () => (state.value = !state.value)
</script>

<template>
    <div class="topDiv">
        <div class="titulos">
            <h1>Gestión de Eventos</h1>
            <p>Aquí puedes crear y visualizar los eventos</p>
        </div>
    </div>
    <Modal_Period :state="state" :close="changeState" />
    <Planner 
      :seeActivities="seeActivities"
      :seeEvents="seeEvents"
      :isEditor= "isEditor"
    />
</template>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

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

.titulos{
    margin-left: 100px;
}
</style>