<script setup>
/* import { RouterLink, RouterView } from 'vue-router' */
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import Dashboard from "./views/Dashboard.vue";
import DashHeader from "./components/Dash-Header.vue";
import { sbWidth } from "./components/DashSideBar/sidebar-state";
import { RouterView } from "vue-router";

let rol = 'admin'
</script>

<template>
  <div 
  class="usr-content"
  v-if="rol=='public'"
  >
    <Header />
      <div class="content">
        <RouterView />

      </div>
    <Footer/>
  </div>
  <div v-else  class="admin-content">
    <DashHeader/>

    <Dashboard/>
    <div class="content" :style=" { 'margin-left:': sbWidth }">
      <RouterView />
    </div>
     <Footer/>
  </div>
  
</template>

<style lang="scss" scoped>

 .content{
/*   min-height: 100vh; */
  min-height: 100%;
  margin-left: 45px;
 }

 body{
  position: relative;
  height: 100vh;
}

</style>
