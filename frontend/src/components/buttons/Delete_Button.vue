<script setup>
  import {  defineProps, ref } from 'vue';
  import Delete from '@/assets/icons/Delete.vue';
  import Modal_Confirm from '../modals/Modal_Confirm.vue';

  const props = defineProps({
    Actividades:Number,
    Eventos:Number,
    dateWeek: Date,
    idData:Number,
    typeDelete:String
  })


  let state = ref(false);
  const changeState = () => ( state.value = !state.value )
</script>

<template>
    <button @click="changeState" class="button--delete"><Delete /></button>
    <Modal_Confirm v-show="state" @close="changeState" 
      :actD="Actividades" :evnD="Eventos"  
      :dateWeek="props.dateWeek" 
      :idData="props.idData"
      :typeDelete="props.typeDelete"
      :state="state"
    /> 

</template>


<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";

  .button--delete{
    border-radius: 5px;
    background: #D74526;
    border: none;
    display: flex;
    width: 30px;
    height: 30px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    margin: 2px;
    float: right;
  }

  .button--delete:hover{
    background-color: $secondary_color;
    cursor: pointer;
  }

</style>