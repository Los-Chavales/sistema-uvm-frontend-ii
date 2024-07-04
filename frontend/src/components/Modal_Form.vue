<script setup>
import Form_Activity from './forms/Form_Activity.vue';

</script>

<template >

<div class="container_modalForm">
  <div class="modalForm">

    <div class="modalForm_head">
      <div class="container_button">
        <button @click="$emit('closeModalForm')" class="modalForm_cerrar">cerrar X</button>
      </div>
    </div>

    <div class="modalForm_body">

      <div class="modalForm_part">
  
        <!-- Aquí van los forms -->
         <Form_Activity />

      </div>

     <!--  <div class="modalForm_part">
      </div> -->

    </div>

  </div>

</div>

</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  
  /* Estructura del modal */

  .container_modalForm{
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

  .modalForm{
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: $color4;
    padding: 15px;
    border-radius: 15px;
    //width: 86%;
    height: 95%; 
    box-sizing: border-box;
  }


  /* Botón de cerrar */

  .modalForm_head{
    width: 100%;
  }

  .container_button{
    display: flex;
    flex-direction: row-reverse;
  }

  .modalForm_cerrar{
    background: none;
    border: none;
    color: #FFF;
    text-align: center;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration-line: underline;
  }
  
  .modalForm_cerrar:hover{
    cursor: pointer;
    background-color: $secondary_color;
    border-radius: 5px;
  }

    /* Contenedor de las partes del modal */

  .modalForm_body{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
   /* Contenedor de las secciones blancas modal */

   .modalForm_part{
    background-color: #FFF;
    border-radius: 7px;
    margin: 10px;
    // width: 100%;
    padding: 12px;
    width: 75vw;
    height: 100%;
    overflow: auto;
  }

  @media (min-width: 768px) {
    .modalForm{
      height: 70vh; 
    }

    .modalForm_head{
      margin-bottom: 5px;
    }
    .modalForm_body{
      flex-direction: row;
    }
    .modalForm_part{
      width: 41vw;
    }
  }


  
  @media (min-width: 1024px) {
    .modalForm{
      height: 95%; 
    }
  } 

  @media (min-width: 1024px) and (min-height: 1366px) {
    .modalForm{
      height: 70vh; 
    }
  }


  
</style>