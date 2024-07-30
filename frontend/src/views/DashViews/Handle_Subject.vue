<script setup>
    import { subjectStore } from '@/stores/Dash_Stores/subject'
    import { computed, onMounted, ref } from 'vue';
    import DashTable from '@/components/DashMain/DashTable.vue';
    import { buttonStateStore } from '@/stores/buttonState';
    import CreateSubject from '@/components/DashMain/Create-Subject.vue';
    import EditSubject from '@/components/DashMain/Edit-Subject.vue';

    const buttonState = buttonStateStore()
    const buttonChange  = buttonState.changeState
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

    let subjectID = ref('');
    let detachSubject = ref('')

    function idListener(dato) {
        if (dato) {
            console.log(dato)
            subjectID.value = dato
            let temp = store.subject.filter((subject) => subjectID.value == subject.id_materia);
            detachSubject.value = temp[0]
        }
    }

</script>

<template>
    <DashTable
    @takenID="idListener"
    :tableHead="['Nombre materia','Descripción']"
    :forBody="['nombre_materia','descripcion']"
    :options="true"
    :forTable="subject"
    mainButton="Añadir materia"
    h1Title="Gestión de Materias"
    h3Title="Aquí puedes crear y gestionar materias"
    :toChangeState="buttonChange"
    :lessOptions="true"
    :typeGestion="'subject'"
    >
    </DashTable>

    <CreateSubject :toChangeState="buttonChange" :state="buttonState.bState" />
    <EditSubject v-if="detachSubject" :scheduleDetail="detachSubject" :toChangeState="buttonChange" :state="buttonState.eState" /> 

</template>

<style lang="scss">
    @import url('@/assets/scss/variables.scss');
</style>