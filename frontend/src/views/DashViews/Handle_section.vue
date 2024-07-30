<script setup>
    import { sectionStore } from '@/stores/Dash_Stores/sections'
    import { computed, onMounted, ref } from 'vue';
    import { buttonStateStore} from '@/stores/buttonState';
    import DashTable from '@/components/DashMain/DashTable.vue';
    import CreateSection from '@/components/DashMain/Create-Section.vue'
    import EditSection from '@/components/DashMain/Edit-Section.vue'
    let sectionID = ref('');
    let detachSection = ref('')
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

    function idListener( dato ){
        if ( dato ){
            console.log(dato)
            sectionID.value = dato
            detachSection.value =  store.sections.filter( (seccion) => sectionID.value == seccion.nombre_seccion );    
        }
        console.log(detachSection.value)   
    }

</script>

<template>
    <DashTable
    @takenID="idListener"
    :tableHead="['Nombre','Modalidad','Materias']"
    :forBody="['nombre_seccion','modalidad','id_seccion']"
    :options="true"
    :forTable="section"
    mainButton="Añadir seccion"
    h1Title="Gestión de Secciones"
    h3Title="Aquí puedes crear y gestionar secciones"
    :toChangeState="buttonChange"
    :lessOptions="true"
     :typeGestion="''"
    >
    </DashTable>
    <CreateSection  :toChangeState="buttonChange" :state="buttonState.bState" />
    <EditSection v-if="detachSection"  :forEdit='detachSection' :toChangeState="buttonChange" :state="buttonState.eState" />
    

</template>

<style lang="scss">
    @import url('@/assets/scss/variables.scss');
</style>