<script setup>
import Entity_Button from "@/components/buttons/Entity_Button.vue";
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
</script>

<template>
    <div class="topDiv">
        <div>
            <h1>Fechas de Corte</h1>
            <p>Periodo actual: 2024B</p>
        </div>
        <div class="optionPeriod">
            <Entity_Button message="Periodos" :onClick="changeState" />
        </div>
    </div>


    <DashTable @takenID="idListener" :tableHead="['Profesor', 'Correo', 'Rol']" :forBody="['nombre', 'correo', 'tipo_rol']"
        :options="true" :forTable="users" mainButton="Añadir profesor" h1Title="Gestión de Profesores"
        h3Title="Aquí puedes crear y gestionar profesores" :toChangeState="buttonChange" :lessOptions="false" />

    <CreateProfessor :toChangeState="buttonChange" :state="buttonState.bState" />
    <Modal_assigned :toChangeState="buttonChange" :state="buttonState.MState" />
    <EditProfessor v-if="detachUser" :userDetail="detachUser" :toChangeState="buttonChange"
        :state="buttonState.eState" />
    <SeeProfessor v-if="detachUser" :userDetail="detachUser" :userSub="userSubjects" :toChangeState="buttonChange"
        :state="buttonState.dState" />



</template>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

h1 {
    color: $color7;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.58);
    font-family: Ubuntu;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

p {
    color: $color7;
    text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.74);
    font-family: Ubuntu;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.topDiv {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 3%;
}

.optionPeriod {
    padding: 2px;
    background-color: $color1;
    border-radius: 10px;
}
</style>