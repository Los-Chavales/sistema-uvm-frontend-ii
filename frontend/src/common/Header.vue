<script setup>
import { RouterLink, RouterView } from 'vue-router'

/* iconos */

import BurguerMenu from '@/assets/icons/BurguerMenu.vue';
import Calendar from '@/assets/icons/Calendar.vue';
import Folder from '@/assets/icons/Folder.vue';
import House from '@/assets/icons/House.vue';
import User from '@/assets/icons/User.vue';

/* función para desplegar el menú */
import { defineComponent, ref } from 'vue'
let state = ref(false);
  const changeState = () =>{
    if(state.value){
      state.value = false
    } else{
      state.value = true
    }
  }

</script>

<template>
  <header class="header">
    <div class="container">
      <img alt="UVM logo" class="container__logo" src="@/assets/img/svg/logo_uvm.svg" />
    </div>

    <!--Menú desplegable-->
    <div class="header__container--responsive">
      <div class="menu_container--responsive"  @click="changeState">
        <div class="conainer__menu__ico"><BurguerMenu /></div>
        <nav class="header__container__nav--responsive" v-show="state">
          <ul class="ul__links--responsive"> 
            <li class="ul__links__li--responsive"><House /><RouterLink to="/">Inicio</RouterLink></li>
            <li class="ul__links__li--responsive"><Calendar /><RouterLink to="/calendario">Calendario</RouterLink></li>
            <li class="ul__links__li--responsive"><Folder /><a href="#">Planificaciones</a></li>
            <li class="ul__links__li--responsive"><User /><a href="#">Login</a></li>
          </ul>
        </nav>
      </div>
    </div>

    <!--Nav normal-->
    <div class="header__container">
      <nav class="header__container__nav">
        <ul class="ul__links">
          <li class="ul__links__li"><RouterLink class="a__color5" to="/">Inicio</RouterLink></li>
          <li class="ul__links__li"><RouterLink class="a__color5" to="/calendario">Calendario</RouterLink></li>
          <li class="ul__links__li"><a class="a__color5" href="#">Planificaciones</a></li>
          <li class="ul__links__li"><a class="button--white a__color5" href="#">Login</a></li>
        </ul>
      </nav>
    </div>

  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
   @import "@/assets/scss/variables.scss";


  .header{
    border-bottom: 1px solid #FFF;
    background: rgba(255, 255, 255, 0.40);
    height: 79px;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0 55px 0 16px;
  }

  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .header__container{
    display: none;
  }

  .conainer__menu__ico{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }

  .menu_container--responsive{
    width: 55px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #FFF;
    background: rgba(255, 255, 255, 0.40);
  } 

  .header__container__nav--responsive{
    position: absolute;
    background-color: #FFF;
    width: 340px;
    height: 570px; /* se le quita el alto en caso de quererlo sin tanto sobrante */
    margin-top: 14px;
    margin-left: -17px;
    z-index: 10;
  } 

  .ul__links--responsive{
    padding: 0;
    margin-left: 0;
    list-style: none;
  }


  .ul__links__li--responsive{
    height: 86px;
    padding: 30px 30px 30px 22px;
  }

  .ul__links__li--responsive a{
    text-decoration: none;
    color: #000;
    font-family: Poppins;/* falta colocar poppins */
    font-size: 30px;
    font-style: normal;
    font-weight: 275;
    line-height: normal;
    margin: 0 0 0 15px;
  }
    
@media (min-width: 768px) {
    .header{
      padding: 5px 30px;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }

    .container{
      justify-content: flex-start;
      width: 100%;
    }


    .header__container--responsive{
      display: none;
    } 

    .header__container{
      display: flex;
      flex-direction: row;
    }

    .ul__links{
      padding: 0;
      display: flex;
      flex-direction: row;
      list-style: none;
      align-items: center;
    }

    .ul__links__li{
      text-decoration: none;
      margin: 15px;
    }

    
    .ul__links__li a{
      text-decoration: none;
    }

    .a__color5{
      color: $color5;
      text-align: center;
      font-family: Poppins;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .a__color5:hover{
      color: $secondary_color;
    }
  }

@media (min-width: 992px) { 
}

@media (min-width: 1024px) {


} 

</style>
