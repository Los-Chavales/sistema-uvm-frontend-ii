<script setup>
import { computed, ref, onMounted } from 'vue';
import Modal_Events from '@/components/Modal_Events.vue';
import { useEventsStore } from '@/stores/events';
import { useActivitiesStore } from '@/stores/activities';


//Llamar a la store de eventos
let storeEvents = useEventsStore();

const callStoreEvents = (yearDate, monthDate) => {
    storeEvents.searchEventsMonths(yearDate, monthDate)
}

//Llamar a la store de actividades
let storeActivities = useActivitiesStore();

const callStoreActivities = (yearDate, monthDate) => {
    storeActivities.searchActivitiesMonths(yearDate, monthDate)
}

//Para generar los días del mes, agrupados en semanas
function genDaysWeek(year = 0, month = 0, semS = 0, semF = 0) {
    //Si no se especifica, usar el mes y año actual
    if (!(year && month)) {
        const today = upToday();
        year = today[0];
        month = today[1];
    }
    //Obtener el rango de días del mes indicado
    const firstDay = new Date(year, month, 1);
    const firstDate = firstDay.getDate();
    const lastDay = new Date(year, month + 1, 0);
    const lastDate = lastDay.getDate();
    //const preDay = new Date(year, month, 0);
    const weeks = [
        { number: semS, days: [] },
    ]
    //Generar la primera semana
    const sem1 = weeks[0].days;
    sem1[firstDay.getDay()] = firstDate;//Ubicar el primer día del mes
    //Rellenar el resto de los días
    completeDays(firstDate, firstDay.getDay(), sem1);
    for (let dw = 0; dw < sem1.length; dw++) {
        sem1[dw] = new Date(year, month, sem1[dw]).getDate();
    }
    //Generar el resto de las semanas
    let weeksGen = weeks;
    let indSF = semF;
    if (semF == 0) indSF = calWeeks(firstDay, lastDay, lastDay.getDay());
    for (let index = 1; index < indSF + 1; index++) {
        let indexAux = index + semS;
        weeksGen[index] = {};
        weeksGen[index].number = indexAux;

        let aux = weeksGen[index - 1]['days'][6] + 1;
        let daysAux = [];
        for (let index = aux; index < aux + 7; index++) {
            let auxDay = index
            if (index > lastDate) auxDay = index - lastDate;
            daysAux.push(auxDay);
        }
        weeksGen[index].days = daysAux;
    }
    //console.log(weeksGen)

    //Llamar a las sotres
    callStoreEvents(year, month)
    callStoreActivities(year, month)
    return weeksGen;
}
//Para completar los días de la primera semana
function completeDays(day, weekDay, week = [], c = 0) {
    //console.debug(weekDay, day, week, c);
    c = c + 1;
    if (c > 14) return "Se excedió";
    if (!Array.isArray(week) || (!day && day !== 0) || (!weekDay && weekDay !== 0)) return 'e1'
    if (weekDay > 6 || weekDay < 0) return 'e2'
    if (week[0] && week.length == 7) return week

    let newWDm = weekDay - 1;
    let newDm = day - 1;
    let newWDM = weekDay + 1;
    let newDM = day + 1;

    if (weekDay > 0 && !week[newWDm]) {
        //console.warn('restar');
        week[newWDm] = newDm;
        completeDays(newDm, newWDm, week, c);
    };
    if (weekDay < 6 && !week[newWDM]) {
        //console.warn('sumar');
        week[newWDM] = newDM;
        completeDays(newDM, newWDM, week, c);
    }
    return
}
//Calcular número de semanas
function calWeeks(fDay = new Date(), lDay = new Date(), startWeek = 0) {
    const daysDifference = (lDay - fDay) / (1000 * 3600 * 24);
    const numWeeks = Math.ceil((daysDifference + fDay.getDay() - startWeek) / 7);
    console.debug('Numero de semanas', numWeeks);
    return numWeeks;
}
//Cambiar de mes en v-for
function calMonth(d, m, w, arr) {
    if (w === 0 && d > 25) {
        //console.log(d, m, w,'restar')
        return m - 1;
    } else if (w + 1 == arr.length && d < 7) {
        //console.log(d, m, w,'sumar')
        return m + 1;
    } else {
        //console.log(d, m, w,'igual')
        return m;
    }
}
//Actualizar varibles con el día actual
function upToday() {
    const today = new Date();
    year.value = today.getFullYear();
    month.value = today.getMonth();
    return [year.value, month.value]
}
function upTRef(value = 0, type = '') {
    const today = new Date();
    if (type === 'year') {
        return value ? value : today.getFullYear();
    }
    if (type === 'month') {
        return value ? value : today.getMonth();
    }
    return 0
}

//Meses
const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
]

const year = ref(upTRef(0, 'year'));//2024 por 0
const month = ref(upTRef(0, 'month'));//4 por 0
const period = ref([0, undefined]);

const update = computed(() => {
    let weekCalendar = genDaysWeek(year.value, month.value, period.value[0], period.value[1]);
    console.info(year.value, month.value, period.value, weekCalendar);
    return weekCalendar
})

const weeks = update;


//Para cambiar entre meses
function changeMonth(option) {
    //console.log('Inicio', month.value, year.value)
    if (option === '+') {
        if (month.value >= 11) {
            month.value = -1;
            year.value++;
        }
        month.value++;
    } else if (option === '-') {
        if (month.value <= 0) {
            month.value = 12;
            year.value--;
        }
        month.value--;
    }
    //console.log('Final', month.value, year.value)
}

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
                        <Modal_Events :description="'Frontend II: 1era Evaluación'"
                            :date="new Date(year, calMonth(day, month, i, weeks), day)" :seeActivities="true"
                            :isEditor="false" :isPlannig="true" :isEvent="false" />
                    </td>
                </tr>
                <tr>
                    <td v-for="(day, ind) in week.days" :key="`${i}-${ind}-events`" :id="`${i}-${day}-events`">
                        <Modal_Events :description="'Verificación Classroom'"
                            :date="new Date(year, calMonth(day, month, i, weeks), day)" :seeActivities="true"
                            :isEditor="false" :isPlannig="true" :isEvent="true" />
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