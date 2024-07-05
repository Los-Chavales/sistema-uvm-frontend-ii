<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    dateWeek: Date,
    titleDay: String,
    formDire: Boolean,
    formTeacher: Boolean,
    weekNumber: Number,
})

let prop = props.dateWeek
let title_from_teacher = prop.toLocaleDateString('es-ES', { weekday: 'long' })


</script>

<template>
  <form class="formCreateActivity">

    <div class="formCreateActivity_head">
      <h2 class="formCreateActivity_title">Añadir Actividad</h2>
      <h3 class="formCreateActivity_title--h3" v-show="formTeacher">Semana {{ props.weekNumber }} {{ title_from_teacher }}</h3>
    </div>
   
    <div class="formCreateActivity_body">
      <input class="formCreateActivity_input" placeholder="Nombre" type="text">
      <textarea  class="formCreateActivity_textarea" placeholder="Descripción" ></textarea>
      <input class="formCreateActivity_input--submit" type="submit" value="Añadir" />
    </div>

  </form>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";

  .formCreateActivity{
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 22px 10px;
  }
  
  .formCreateActivity_head{
    margin: 0 0 25px 0;
  }

  .formCreateActivity_title{
    color: #000;
    text-align: center;
    font-family: Poppins;
    font-size: 35px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .formCreateActivity_title--h3{
    color: #000;
    text-align: center;
    font-family: Poppins;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .formCreateActivity_input{
    display: flex;
    width: 100%;
    height: 50px;
    padding: 10px;
    margin: 0 0 25px 0;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 10px;
    border: none;
    border-top: 3px solid $color4;
    outline: none;
    background: rgba(158, 158, 158, 0.30);

    color: #000;
    font-family: "Inria Sans";
    font-size: 20px;
    font-style: normal;
  }

  .formCreateActivity_input::placeholder{
    color: #000;
    text-align: center;
    font-family: "Inria Sans";
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 10px;
  }

  .formCreateActivity_textarea{
    resize: none;
    display: flex;
    width: 100%;
    height: 150px;
    padding: 10px;
    margin: 0 0 25px 0;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: none;
    border-top: 3px solid $color4;
    background: rgba(158, 158, 158, 0.30);
    outline: none;

    color: #000;
    font-family: "Inria Sans";
    font-size: 20px;
    font-style: normal;
  }

  .formCreateActivity_textarea::placeholder{
    color: #000;
    text-align: center;
    font-family: "Inria Sans";
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .formCreateActivity_input--submit{
    display: flex;
    padding: 6px 0px;
    width: 100%;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 10px;
    background: $color4;
    border: none;

    color: #FFF;
    text-align: center;
    font-family: Poppins;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal
  }

</style>