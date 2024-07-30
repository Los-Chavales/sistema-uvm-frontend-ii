<script setup>
import Delete_Button from '../buttons/Delete_ButtonMore.vue';
import Delete_ButtonClassic from '../buttons/Delete_Button.vue';
import Edit_Button from '../buttons/Edit_Button.vue';
import Show from '../buttons/Show.vue';
import { buttonStateStore } from '@/stores/buttonState';
import { ref, defineEmits } from 'vue';
    const mainButtonFuction = buttonStateStore()
    const buttonState = mainButtonFuction.changeState;
    const buttonStateAssigned = buttonStateStore()
    const buttonChangeAssigned  = buttonStateAssigned.changeState

    const props = defineProps({
        tableHead:{
            type: Array,
            required: true
        },
        options:{
            type: Boolean
        },
        forBody:{
            type: Array,
            require:true
        },
        forTable:{
            type:Object,
            required: true
        },
        mainButton:{
            type: String,
            required:true
        },
        h1Title:{
            type: String,
            required: true
        },
        h3Title:{
            type: String,
            required: true
        },
        toChangeState: {
            type: Function,
            required: true
        },
        lessOptions: {
            type: Boolean,
            required: false
        },
        assignedOptions: {
            type: Boolean,
            required: false
        },
        assignedOptionsSchedules: {
            type: Boolean,
            required: false
        },
        typeGestion: {
            type: String,
            required: false
        }
    })

    const emit = defineEmits(['takenID'])

    const takenID = ( usr_ID ) =>{
        emit('takenID', usr_ID )
    }

</script>

<template>
  <div class="gestorContainer">
        <span class="gestorContainer-text">
            <div class="gestorContainer__h">
                <h1>{{ props.h1Title }}</h1>
                <h3>{{ props.h3Title }}</h3>  
            </div>
        <button class="button--white button" @click="buttonState('create')">{{props.mainButton}}</button>
        <div v-if="assignedOptions" class="butonsAssignedContainer">
            <button class="button--white button" @click="buttonChangeAssigned('manage')">Asignar</button>
            <button class="button--white button" @click="buttonChangeAssigned('manage2')">Desasignar</button>
        </div>
        <button v-if="assignedOptionsSchedules" class="button--white button" @click="buttonChangeAssigned('manage2')">Asignar Horario</button>

        </span>
        <div class="gestorContainer__handleTable">
            <table>
                <tr class="table-head">
                    <th class="table-head-th" v-for="( item, index ) in props.tableHead" :key="index">{{item}}</th>
                    <th class="table-head-th options" v-if="props.options">Opciones</th>
                </tr>
                <tbody>
                    <tr class="tr-body" v-for="( element, index ) in props.forTable" :key="index">
                        
                    <td v-for="( item, index ) in props.forBody" :key="index">{{ element[item] }}</td>
                    <td v-if=" props.options && props.typeGestion === ''"><Show v-if="!lessOptions" @click="takenID( element.nombre)" :change="toChangeState"/><Edit_Button @click="takenID(element.nombre)" :change="buttonState"/><Delete_Button /></td>
                    <td v-else-if=" props.options && props.typeGestion === 'schedule' ">
                        <Edit_Button @click="takenID(element.id_horario)" :change="buttonState"/>
                        <Delete_ButtonClassic 
                            :idData="element.id_horario",
                            :typeDelete="'schedule'"
                        />
                    </td>
                    <td v-else-if=" props.options && props.typeGestion === 'subject' ">
                        <Edit_Button @click="takenID(element.id_materia)" :change="buttonState"/>
                        <Delete_ButtonClassic 
                            :idData="element.id_materia",
                            :typeDelete="'subject'"
                        />
                    </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "@/assets/scss/variables.scss";

    .gestorContainer{
        margin: 0 auto;
        width: 1000px;
        min-height: 100vh;  
    }
    .gestorContainer-text{
        display: flex;
    }

    .gestorContainer__h{
        align-content:flex-start ;
    }
    .gestorContainer__handleTable{
        margin-top: 40px;
        border-radius: 12px;
        background-color:rgba(255, 255, 255, .40);
        -webkit-box-shadow: 0px 27px 36px -15px rgba(0,0,0,0.61);
        -moz-box-shadow: 0px 27px 36px -15px rgba(0,0,0,0.61);
        box-shadow: 0px 27px 36px -15px rgba(0,0,0,0.61);
        padding: 10px;
        width: auto;
    }

    h1 {
    color: #FFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.58);
    font-family: Ubuntu;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-top: 43px;
    
}

    h3 {
    color: #FFF;
    text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.74);
    font-family: Ubuntu;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-top:5px;

}

    table{
        color: #fff;
        font-size: 12px;
        text-align: left;
        /*font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;*/
        font-family:Inter;
        background-color: $color4;
        outline: 1px solid black;
        border-radius: 7px;
        border-spacing: inherit;
    }

    .table-head-th{
        border-left: 1px solid #5B5B5B;
        padding: 10px;
        width: 290px;
        height: 36px;
        font-weight: 600;

    }

    td{
        padding-left: 10px;
        color:$color5;
        background-color: #fff;
        border-left: 1px solid $color5;
        font-weight: 400;
    }
    .options{
        width: 120px;
    }

    .button{
        margin-top:81px;
        margin-left:160px;
        font-weight: 600;
    }

    /* Del botón de asignados */
    .butonsAssignedContainer{
        display: flex;
        flex-direction: row;
    }
    .butonsAssignedContainer button{
        margin-left: 15px;
    }
</style>