<script setup>
    import { subjectStore } from '@/stores/Dash_Stores/subject'
    import { computed, onMounted } from 'vue';
    import DashTable from '@/components/DashMain/DashTable.vue';
    const store  = subjectStore();
    const getSubject = computed(() => {
        return store.subject;
        
    })
    
    const subject = computed(() => {
        return store.subject
    })
    onMounted(() => {
        store.getSubject();
    })

</script>

<template>
    <DashTable
    :tableHead="['Nombre materia','Descripción']"
    :forBody="['nombre_materia','descripcion']"
    :options="true"
    :forTable="subject"
    mainButton="Añadir materia"
    h1Title="Gestión de materias"
    h3Title="Aquí puedes crear y gestionar materias"
    >
    </DashTable>
</template>

<style lang="scss">
    @import url('@/assets/scss/variables.scss');
</style>