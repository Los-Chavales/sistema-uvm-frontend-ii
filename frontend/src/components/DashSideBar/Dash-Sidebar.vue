<script setup>
import { computed, onMounted, onUpdated } from 'vue';
import { to_toggle, toggle, sbWidth } from './sidebar-state';
import { ref } from 'vue';
import { userStore } from '@/stores/Dash_Stores/users';
import Logout_Button from '../buttons/Logout_Button.vue';
import SidebarLink from '@/components/DashSideBar/sidebar-links.vue'
let usr_name = ref('Admin')

const storeUser = userStore();

storeUser.userOnlineData($cookies.get('auth'))

const getUserOnlineRol = computed(() => {
  return storeUser.getUserOnlineRol;
});

</script>

<template>
    <div class="sidebar" :style="{ width: sbWidth }">
        <span class="header-side">
            <div class="img-container" v-if="!to_toggle">
                <img class="user-img" src="../../assets/img/png/admin.png" alt="">
                <h2 class="user-welcome">Hola, {{ usr_name }}</h2>
            </div>
        </span>
        <div class="sidebar-user-img"></div>
        <SidebarLink to="/" icon="fas fa-gauge">General</SidebarLink>
        <SidebarLink to="/admin-dsh/profesores" icon="fas fa-user-tie">Profesores</SidebarLink>
        <SidebarLink to="/admin-dsh/materias" icon="fas fa-book">Materias</SidebarLink>

        <SidebarLink v-if="getUserOnlineRol === 'director'" to="/admin-dsh/calendario" icon="fa-solid fa-calendar">Eventos</SidebarLink>
        <SidebarLink v-else-if="getUserOnlineRol === 'profesor'" to="/admin-dsh/planificaciones" icon="fa-solid fa-calendar">Eventos</SidebarLink>
        <SidebarLink  to="/calendario" icon="fa-solid fa-calendar">Calendario</SidebarLink>

        <SidebarLink to="/admin-dsh/secciones" icon="fas fa-chalkboard-user">Secciones</SidebarLink>
        <SidebarLink to="/login" icon="fa-solid fa-user">Cambiar Cuenta</SidebarLink>
        <SidebarLink to="/" icon="fa-solid fa-arrow-right-from-bracket" @click="logout"></SidebarLink>
        

        <Logout_Button />

        <span class="collapse-icn" :class="{ 'rotate-arrow': to_toggle }" @click="toggle">
            <i class="fa-solid fa-arrow-left"></i>
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.sidebar {
    /*Background and text color*/
    background-color: #fff;
    color: #000;

    /*Position settings */
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;

    /*transitions */
    transition: 0.1s ease;

    display: flex;
    flex-direction: column;
    -webkit-box-shadow: 3px 0px 20px -4px rgba(0, 0, 0, 0.52);
    -moz-box-shadow: 3px 0px 20px -4px rgba(0, 0, 0, 0.52);
    box-shadow: 3px 0px 20px -4px rgba(0, 0, 0, 0.52);

    .sidebar-user-img {}

    .collapse-icn {
        position: absolute;
        bottom: 0;
        padding: 0.5em;

        transition: 0.2s linear;
    }

    .rotate-arrow {
        transform: rotate(180deg);
        transition: 0.2s linear;
    }

    .header-side {
        background-color: $color4;
        width: auto;
        height: 155px;
        margin-bottom: 10px;

        .img-container {
            text-align: center;
            margin-top: 20px;
            user-select: none;

            .user-img {
                max-width: 65px;
                border-radius: 50%;
                outline: 1px solid $color4;
                filter: drop-shadow(0px 2px 12px #ffffff);
            }

            h2 {
                font-size: 20px;
                font-family: Poppins;
                color: #fff;
                user-select: none;
            }
        }

    }

}
</style>