<script setup>
import { onMounted, onUpdated, defineProps } from 'vue';
import Modal_Events from '../components/modals/Modal_Events.vue';
import { useEventsStore } from '@/stores/events';
import { useActivitiesStore } from '@/stores/activities';
import {changeMonth, calMonth, weeks, year, month, period, months} from '../common/calendarFunctios'

const props = defineProps({
    seeActivities: Boolean,
    seeEvents: Boolean,
    isEditor: Boolean, 
})

//Llamar a la store de eventos
let storeEvents = useEventsStore();

//Llamar a la store de actividades
let storeActivities = useActivitiesStore();

//Llamar a las sotres

onMounted(() => {
    //storeActivities.searchActivitiesMonths(year.value, month.value);
    storeActivities.searchActivitiesMonthsIdAssigned(year.value, month.value);
    //storeEvents.searchEventsMonths(year.value, month.value);
    storeEvents.searchEventsMonthsIdAssignedPublic(year.value, month.value);
})

onUpdated(() => {
    //storeActivities.searchActivitiesMonths(year.value, month.value);
    storeActivities.searchActivitiesMonthsIdAssigned(year.value, month.value);
    storeEvents.searchEventsMonthsIdAssignedPublic(year.value, month.value);
    //storeEvents.searchEventsMonths(year.value, month.value);
})

</script>

<template>
    <div class="calendarConteiner">
    <div id="monthly" class="calendar">
        <div class="month">
            <h2>{{ months[month] + ' ' + year }}</h2>
            <div class="arrows">
                <span class="arrow" @click="changeMonth('-')">
                    <i class="fa-solid fa-circle-chevron-left"></i>
                </span>
                <span class="arrow" @click="changeMonth('+')">
                    <i class="fa-solid fa-circle-chevron-right"></i>
                </span>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>N°</th>
                    <th>D</th>
                    <th>L</th>
                    <th>M</th>
                    <th>M</th>
                    <th>J</th>
                    <th>V</th>
                    <th>S</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(week, i) in weeks" :key="`${month}-${i}`">
                    <td class="tdNumber">{{ week.number }}</td>
                    <td v-for="(day, ind) in week.days" :key="`${i}-${ind}`" :id="`${i}-${day}`">
                        <Modal_Events 
                            :day="day" 
                            :date="new Date(year, calMonth(day, month, i, weeks), day)"
                            :seeActivities="props.seeActivities" 
                            :seeEvents="props.seeEvents" 
                            :isEditor="props.isEditor" 
                            :weekNumber="week.number" 
                        />
                    </td>
                </tr>
                <!--seeActivities: muestra el bloque de actividades  isEditor: muestra las opciones de editar-->
            </tbody>
        </table>
    </div>
</div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.calendar {
    border: 1px solid #88C426;
    /*max-width: 800px;*/
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
    /*font-weight: bold;
    /*color: black;*/
    margin: 2% 5%;
    user-select: none;
}

.calendarConteiner{
    min-height: 100vh;
    margin-left: 40px;
}

.month {
    display: flex;
    /*width: 933px;
    height: 33.823px;*/
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    background: $color4;
    color: $color7
        /*font-size: 80px;
    letter-spacing: 1px;
    color: black;
    border: 3px solid blue;*/
}

.month h2 {
    font-size: 21px;
}

table,
th,
td {
    width: 100%;
    table-layout: fixed;
    text-align: center;
    font-size: 18px;
    border-collapse: collapse;
    border: 1px solid $color4;
    font-family: Poppins;
    height: 62px;
    align-content: center;

    th {
        background: $color3;
        color: white;
        font-family: Poppins;
        font-weight: bold;
        /*align-content: center;*/
    }

    td {
        background: $color7;
        color: $color5;
        /*padding-top: 5px;*/
    }

    td:hover {
        background: $color5;
        color: $color7;
        cursor: pointer;
    }
}

.tdNumber {
    background: $color1;
    /*align-content: center;*/
    padding-top: 0px;
    font-weight: 600;
}

.arrows {
    display: flex;
    //width: 56px;
    //height: 24px;
    //justify-content: center;
    align-items: flex-start;
    gap: 9px;
}

.arrow:hover {
    cursor: pointer;
}
</style>