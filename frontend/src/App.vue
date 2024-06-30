<script setup>
/* import { RouterLink, RouterView } from 'vue-router' */
import Header from "./common/Header.vue"
import Footer from "./common/Footer.vue"
import Dashboard from "./views/Dashboard.vue";
import DashHeader from "./components/Dash-Header.vue";
import { sbWidth } from "./components/DashSideBar/sidebar-state";
import { RouterView } from "vue-router";

let rol = 'public'
</script>

<template>
  <div 
  class="usr-content"
  v-if="rol=='public'"
  >
    <Header />
      <div class="content">

      </div>
    <Footer/>
  </div>
  <div v-else  class="admin-content">
    <DashHeader/>

    <Dashboard/>
    <div class="content" :style=" { 'margin-left:': sbWidth
     }">
    </div>
     <Footer/>
  </div>
  
</template>

<style lang="scss" scoped>

 .content{
    min-height: 100vh;
/*   min-height: 100%; */
 }

 body{
  position: relative;
  height: 100vh;
}

</style>
