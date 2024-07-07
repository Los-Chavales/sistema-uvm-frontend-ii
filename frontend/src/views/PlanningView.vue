<script setup>
import { ref } from "vue";
import Calendar_Weekly from "../components/Calendar_Weekly.vue";
import Entity_Button from "../components/buttons/Entity_Button.vue";

/* función para desplegar el modal */
//let state = ref(false);
const changeState = () => alert("Holaaa. Aun faltan cosas por hacer")
</script>

<template>
    <div class="topDiv">
        <div>
            <h1>Periodo Académico 2024</h1>
            <p>Sección: VI</p>
        </div>
        <div>
            <ul>
                <li><b>Trimestre:</b> VI</li>
                <li><b>Profesor:</b> Roberto Di Michele</li>
                <li><b>Materia:</b> Frontend II</li>
            </ul>
        </div>
        <div class="optionPeriod">
            <Entity_Button message="Descargar Planificación" :onClick="changeState" />
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