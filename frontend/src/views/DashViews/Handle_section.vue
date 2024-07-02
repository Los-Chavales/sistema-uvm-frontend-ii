<script setup>
    import { sectionStore } from '@/stores/Dash_Stores/sections'
    import { computed, onMounted } from 'vue';
    import DashTable from '@/components/DashMain/DashTable.vue';
    const store  = sectionStore();
    const getSection = computed(() => {
        return store.sections;
        
    })
    
    const section = computed(() => {
        return store.sections
    })
    onMounted(() => {
        store.getSections();
    })

</script>

<template>
    <DashTable
    :tableHead="['Nombre','Modalidad','Materias']"
    :forBody="['nombre_seccion','modalidad','id_seccion']"
    :options="true"
    :forTable="section"
    mainButton="Añadir seccion"
    h1Title="Gestión de secciones"
    h3Title="Aquí puedes crear y gestionar secciones"
    >
    </DashTable>
</template>

<style lang="scss">
    @import url('@/assets/scss/variables.scss');
</style>