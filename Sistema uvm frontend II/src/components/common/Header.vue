<script setup>
import { RouterLink, RouterView } from 'vue-router'

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
      <img alt="UVM logo" class="container__logo" src="@/assets/logo_uvm.svg" />
    </div>

    <div class="header__container--responsive">
      <div class="menu_container--responsive"  @click="changeState">
        <nav class="header__container__nav--responsive" v-show="state">
          <ul class="ul__links--responsive"> 
            <li class="ul__links__li--responsive"><RouterLink to="/">Inicio</RouterLink></li>
            <li class="ul__links__li--responsive"><RouterLink to="/about">About</RouterLink></li>
          </ul>
        </nav>
      </div>
    </div>

    
    <div class="header__container">
      <nav class="header__container__nav">
        <ul class="ul__links">
          <li class="ul__links__li"><RouterLink to="/">Inicio</RouterLink></li>
          <li class="ul__links__li"><RouterLink to="/about">About</RouterLink></li>
        </ul>
      </nav>
    </div>

  </header>

  <RouterView />
</template>

<style scoped>
  .header{
/*     background-color: fuchsia; */
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
    justify-content: center;
    width: 100%;
  }

  .container__logo{
    /* margin: 5px ;*/ /* en la versión desktop y tablet darle más margin a los lados y mantener ese arriba y abajo */
 /*    padding: 0 55px 0 0; */
  }

  .header__container{
    display: none;
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
    margin-top: 64px;
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
    padding: 30px;
  }

  .ul__links__li--responsive a{
    text-decoration: none;
    color: #000;
    font-family: Poppins;/* falta colocar poppins */
    font-size: 30px;
    font-style: normal;
    font-weight: 275;
    line-height: normal;
  }
    
@media (min-width: 768px) {
    *{
      background-color: aqua;
    }

    .header__container--responsive{
      display: none;
    } 

    .header__container{
      display: flex;
    }

    .header{
      flex-direction: row;
      align-items: flex-start;
    }


  }

@media (min-width: 992px) {
   *{
      background-color: greenyellow;
    } 
  }

  @media (min-width: 1024px) {
  *{
      background-color: blueviolet;
    } 

} 

</style>
