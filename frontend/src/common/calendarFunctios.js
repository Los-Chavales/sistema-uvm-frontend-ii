import { computed, onMounted, ref, watch } from 'vue';
import { usePeriodsStore } from '@/stores/periods';

//Para generar los días del mes, agrupados en semanas
function genDaysWeek(Year = 0, Month = 0, semS = 0, semF = 0) {
    //Si no se especifica, usar el mes y año actual
    //console.debug(Year, Month)
    if (!Year) {
        const today = upToday();
        if (!(Month ^ Month === 0) || !(Year && Month)) { Month = today[1]; month.value = today[1] };
        Year = today[0];
        year.value = today[0];
        //console.debug('en IF', Year, Month);
    }
    //Obtener el rango de días del mes indicado
    const firstDay = new Date(Year, Month, 1);
    const firstDate = firstDay.getDate();
    const lastDay = new Date(Year, Month + 1, 0);
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
        sem1[dw] = new Date(Year, Month, sem1[dw]).getDate();
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
//Cambiar el mes de los días en v-for
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
    return [today.getFullYear(), today.getMonth()]
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

let storePeriods = usePeriodsStore();

const year = ref(0);
const month = ref(0);
const period = ref([0, undefined]);
const update = computed(() => {
    let weekCalendar = genDaysWeek(year.value, month.value, period.value[0], period.value[1]);
    console.info('ACTUALIZANDO',year.value, month.value, period.value, weekCalendar);
    return weekCalendar
})


const weeks = update;

watch(weeks, (newState) => {
    console.log('observando', newState, newState.length > 0)
    if (newState && newState.length > 0) {
        console.log('entro')
        
        setTimeout(() => {
            period.value[0] = getPeriod(year.value, month.value + 1);
        }, 40);
    }
});


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
    //Cambiar numero de semana
    period.value[0] = getPeriod(year.value, month.value + 1);
}


//Para obtener las semanas según el periodo
function getPeriod(year, month) {
    storePeriods.weeksPeriods();
    let numWeeksPeriod = storePeriods.getPeriodWeeks;
    let numOne = numWeeksPeriod[`${year}-${month}`];
    console.debug('cambió', numWeeksPeriod, numOne);
    return numOne;
}

export { changeMonth, calMonth, weeks, year, month, period, months, calWeeks }