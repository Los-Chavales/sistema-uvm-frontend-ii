<script setup>
import Planner from "../common/Planner.vue";
import Entity_Button from "../components/buttons/Entity_Button.vue";
</script>

<template>
    <div class="topDiv">
        <div>
            <h1>Gestión de Eventos</h1>
            <p>Aquí puedes crear y visualisar los eventos</p>
        </div>
        <div class="optionPeriod">
            <Entity_Button message="Periodos"/>
        </div>
    </div>
    <Planner />
</template>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

h1 {
    color: #FFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.58);
    font-family: Ubuntu;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

p {
    color: #FFF;
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