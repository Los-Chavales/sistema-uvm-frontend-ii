<script setup>
    import {  defineProps, ref } from 'vue';
    import { useActivitiesStore } from '@/stores/activities';

    let storeActivities = useActivitiesStore();

    const props = defineProps({
      idD: String,

      
    })


</script>


<template>
  <div class="container_modal">
    <div class="modalConfirm">
      <div class="modalConfirm_part">
        <h3 class="modalConfirm_title">¿Está seguro de que quiere eliminarlo? {{ props.idD }}</h3>
        <div class="modalConfirm_buttons">
          <button class="button_confirm button--white" >Si</button>
          <button  class="button_confirm button--white" @click="$emit('close')">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  .container_modal{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.51);

    display: flex;
    justify-content: center;
    align-items: center; 

    padding: 0 2%;
  }

  .modalConfirm{
    background-color: $color4;
    width: 450px;
    padding: 15px;
    border-radius: 15px;
  }

  .modalConfirm_part{
    background-color: #fff;
    border-radius: 15px;
    padding: 30px 20px;
  }
  .modalConfirm_title{
    color: #000;
    font-family: Poppins;
    font-size: 25px;
    font-weight: 700;
    text-align: center;
    line-height: 1.8;
    
  }

  .modalConfirm_buttons{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    box-sizing: border-box;
  } 

  .button_confirm{
    margin: 10px;
    font-size: 20px;
    border: none;
    width: 30px;
    border: solid 2px $color5;
  }
</style>