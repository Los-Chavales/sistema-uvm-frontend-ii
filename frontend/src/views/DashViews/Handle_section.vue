<script setup>
    import { sectionStore } from '@/stores/Dash_Stores/sections'
    import { computed, onMounted } from 'vue';
    import { buttonStateStore } from '@/stores/buttonState';
    import DashTable from '@/components/DashMain/DashTable.vue';
    import CreateSection from '@/components/DashMain/Create-Section.vue'
    import EditSection from '@/components/DashMain/Edit-Section.vue'

    const buttonState = buttonStateStore()
    const buttonChange  = buttonState.changeState
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
    :toChangeState="buttonChange"

    >
    </DashTable>
    <CreateSection :toChangeState="buttonChange" :state="buttonState.bState" />
    <EditSection :toChangeState="buttonChange" :state="buttonState.eState" />

</template>

<style lang="scss">
    @import url('@/assets/scss/variables.scss');
</style>