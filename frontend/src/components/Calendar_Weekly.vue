<script setup>
import { onMounted, onUpdated, computed, toRaw } from 'vue';
import Modal_Events from '../components/modals/Modal_Events.vue';
import { useEventsStore } from '@/stores/events';
import { useActivitiesStore } from '@/stores/activities';
import { useAssignedStore } from '@/stores/assigned';
import {changeMonth, calMonth, weeks, year, month, period, months} from '../common/calendarFunctios'

//Llamar a la store de eventos
let storeEvents = useEventsStore();

//Llamar a la store de actividades
let storeActivities = useActivitiesStore(); 

let storeAssigned = useAssignedStore();

const getEditState = computed(() => {
  return storeAssigned.getEditState;
});


//Llamar a las sotres

onMounted(() => {
    storeActivities.searchActivitiesMonthsIdAssigned(year.value, month.value);
    storeEvents.searchEventsMonthsIdAssigned(year.value, month.value);
    //storeEvents.searchEventsMonths(year.value, month.value);
})

onUpdated(() => {
    storeActivities.searchActivitiesMonthsIdAssigned(year.value, month.value);
    storeEvents.searchEventsMonthsIdAssigned(year.value, month.value);
    //storeEvents.searchEventsMonths(year.value, month.value);
})

</script>

<template>
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

            <tbody v-for="(week, i) in weeks" :key="`${month}-${i}`">
                <tr>
                    <td class="tdNumber" rowspan="2">{{ week.number }}</td>
                    <td v-for="(day, ind) in week.days" :key="`${i}-${ind}-acts`" :id="`${i}-${day}-acts`">
                        <Modal_Events 
                            :day="day" 
                            :description="'Frontend II: 1era Evaluación'"
                            :date="new Date(year, calMonth(day, month, i, weeks), day)" 
                            :seeActivities="true"
                            :seeEvents="false" 
                            :isEditor="getEditState" 
                            :isPlannig="true" 
                            :isEvent="false" 
                            :weekNumber="week.number" 
                        />
                    </td>
                </tr>
                <tr>
                    <td v-for="(day, ind) in week.days" :key="`${i}-${ind}-events`" :id="`${i}-${day}-events`">
                        <Modal_Events 
                            :day="day" 
                            :description="'Verificación Classroom'"
                            :date="new Date(year, calMonth(day, month, i, weeks), day)" 
                            :seeActivities="false"
                            :seeEvents="true" 
                            :isEditor="getEditState" 
                            :isPlannig="true" 
                            :isEvent="true" 
                            :weekNumber="week.number" 
                        />
                    </td>
                </tr>
            </tbody>
        </table>
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
    overflow: hidden;

    th {
        background: $color3;
        color: $color7;
        font-weight: bold;
    }

    td {
        background: $color7;
        color: $color5;
        height: 40px;
    }

    td:hover {
        background: $color5;
        color: $color7;
        cursor: pointer;
    }
}

.tdNumber {
    background: $color1;
    font-weight: 600;
    padding-top: 0px;
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