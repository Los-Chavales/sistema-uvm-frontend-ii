<script setup>
import { useRouter } from 'vue-router';
import { userStore } from '@/stores/Dash_Stores/users';
import { to_toggle } from '../DashSideBar/sidebar-state';
const router = useRouter();

const storeUser = userStore();

const logout = () => {
  $cookies.remove("auth")
  storeUser.userOnlineData($cookies.get('auth'))
  router.replace({ path: '/' })
} 

</script>

<template>
  <span v-if="to_toggle">
    <slot />
  </span>
  <button v-else class="logout_button" @click="logout"> <i class="fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesión</button>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.logout_button{
  border: none;
  display:flex;
  align-items:center;
  cursor:pointer;
  position: relative;
  user-select: none;
  margin: 0.2em 0;
  padding: 10px;
  color: #000;
  background-color: $color6;
  height: 50px;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
}

.logout_button:hover{
  background-color: $color4;
  color: #fff;
}

.fa-arrow-right-from-bracket{
  font-size: 25px;
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}

</style>