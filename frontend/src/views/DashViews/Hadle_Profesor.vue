<script setup>
    import { userStore } from '@/stores/Dash_Stores/users'
    import { computed, onMounted, isProxy, toRaw, ref } from 'vue';
    import { buttonStateStore } from '@/stores/buttonState';
    import DashTable from '@/components/DashMain/DashTable.vue';
    import CreateProfessor from '@/components/DashMain/Create-Professor.vue';
    import SeeProfessor from '@/components/DashMain/See-Professor.vue';
    import EditProfessor from '@/components/DashMain/Edit-Professor.vue';
    import Modal_assigned from '@/components/modals/Modal_assigned.vue';

    const buttonState = buttonStateStore()
    const buttonChange  = buttonState.changeState

    const store  = userStore();
    let userID = ref('');
    let detachUser = ref('')
    let userSubjects = ''
    onMounted(() => {
        store.getProfessors();
        store.getProfessors_Subjects();
    })
    const users = computed(() => { return store.users.filter( ( user ) => user.tipo_rol !== 'director') })
    function idListener( dato ){
        if ( dato ){
            userID.value = dato
            detachUser.value =  store.users.filter( (user) => userID.value == user.nombre );    
            userSubjects =  store.userSubjects.filter( ( user ) => user.nombre == detachUser.value[0].nombre ) 
            console.log(`subject => `, userSubjects)

        }
        
    }console.log(userSubjects)
    // const deleteProfessor = () => {
    //     const token = $cookies.get('auth').token
    //     console.log(token)
    //     if (detachUser.value){
    //         let id_usr = detachUser.value[0].cedula;
    //     console.log(detachUser.value[0].cedula)
    //     store.deleteProfessor(id_usr, token)
    //     store.getProfessors();
    //     }
    // }
    
</script>

<template>
    <DashTable
    @takenID="idListener"
    :tableHead="['Profesor','Correo','Rol']"
    :forBody="['nombre','correo','tipo_rol']"
    :options="true"
    :forTable="users"
    mainButton="Añadir profesor"
    h1Title="Gestión de Profesores"
    h3Title="Aquí puedes crear y gestionar profesores"
    :toChangeState="buttonChange"
    :lessOptions="false"
    :assignedOptions="true"
    :typeGestion="'professor'"
    />

    <CreateProfessor :toChangeState="buttonChange" :state="buttonState.bState"/>
    <Modal_assigned :toChangeState="buttonChange" :state="buttonState.MState" />
    <EditProfessor v-if="detachUser" :userDetail="detachUser"  :toChangeState="buttonChange" :state="buttonState.eState" />
    <SeeProfessor v-if="detachUser" :userDetail="detachUser" :userSub="userSubjects" :toChangeState="buttonChange" :state="buttonState.dState"/>




</template>

<style lang="scss">
    @import url('@/assets/scss/variables.scss');
</style>