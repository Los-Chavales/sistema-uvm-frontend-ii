<script setup>
    import { mapActions, mapState } from 'pinia';
    import { userStore } from '@/stores/Dash_Stores/users'
    import { computed, onMounted } from 'vue';
    import DashTable from '@/components/DashMain/DashTable.vue';
    const store  = userStore();
    const getProfessors = computed(() => {
        return store.getUser;
        
    })
    console.log(getProfessors.value)
    
    const users = computed(() => {
        return store.users
    })
    console.log(users.value)
    onMounted(() => {
        store.getProfessors();
    })

</script>

<template>
    <DashTable
    :tableHead="['Profesor','Correo','Rol']"
    :forBody="['nombre','correo','tipo_rol']"
    :options="true"
    :forTable="users"
    mainButton="Añadir profesor"
    h1Title="Gestión de Profesores"
    h3Title="Aquí puedes crear y gestionar profesores"
    >
    </DashTable>
</template>

<style lang="scss">
    @import url('@/assets/scss/variables.scss');
</style>