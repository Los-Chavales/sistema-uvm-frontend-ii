<script setup>
import Modal_Events from '@/components/Modal_Events.vue';
//Para generar los días del mes, agrupados en semanas
function genDaysWeek(year = 0, month = 0) {
    //Si no se especifica, usar el mes y año actual
    const today = new Date();
    if (!(year && month)) {
        year = today.getFullYear();
        month = today.getMonth();
    }
    //Obtener el rango de días del mes indicado
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0).getDate();
    //const preDay = new Date(year, month, 0);
    const weeks = [
        { number: 0, days: [] },
    ]
    //Generar la primera semana
    const sem1 = weeks[0].days;
    sem1[firstDay.getDay()] = firstDay.getDate();//Ubicar el primer día del mes
    //Rellenar el resto de los días
    completeDays(firstDay.getDate(), firstDay.getDay(), sem1);
    for (let dw = 0; dw < sem1.length; dw++) {
        sem1[dw] = new Date(year, month, sem1[dw]).getDate();
    }
    //Generar el resto de las semanas
    let weeksGen = weeks;
    for (let index = 1; index < 5; index++) {
        weeksGen[index] = {};
        weeksGen[index].number = index;

        let aux = weeksGen[index - 1]['days'][6] + 1;
        let daysAux = [];
        for (let index = aux; index < aux + 7; index++) {
            let auxDay = index
            if (index > lastDay) auxDay = index - lastDay;
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
    }
    if (weekDay < 6 && !week[newWDM]) {
        //console.warn('sumar');
        week[newWDM] = newDM;
        completeDays(newDM, newWDM, week, c);
    }
    return
}

//Esta era de prueba
/*function generatorDays() {
    let weeksGen = [
        { number: 0, days: [29, 30, 1, 2, 3, 4, 5] },
    ]
    for (let index = 1; index < 5; index++) {
        weeksGen[index] = {};
        weeksGen[index].number = index;

        let aux = weeksGen[index - 1]['days'][6] + 1;
        let daysAux = [];
        for (let index = aux; index < aux + 7; index++) {
            let auxDay = index
            if (index > 31) auxDay = index - 31;
            daysAux.push(auxDay);
        }
        weeksGen[index].days = daysAux;
    }
    //console.log(weeksGen)
    return weeksGen;
}*/
const weeks = genDaysWeek(2024,4);
console.log(weeks);

//Para desplegar la ventana modal
/* function openModal(idTD) {
    console.log("sem-día:", idTD)
} */
</script>

<template>
    <div id="monthly" class="calendar">
        <div class="month">
            <h2>Mayo 2024</h2>
            <div>
                <p>botones</p>
            </div>
        </div>
        <table>
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
            <tr v-for="(week, i) in weeks" :key="i">
                <td class="tdNumber">{{ week.number }}</td>
                <td v-for="(day, ind) in week.days" :key="`${i}-${ind}`" :id="`${i}-${day}`">
                    <!-- 
                           seeActivities: muestra el bloque de actividades  
                           isEditor: muestra las opciones de editar
                        -->
                    <Modal_Events :day="day" :seeActivities="true" :isEditor="false" />
                </td>
                <!--     <td v-for="(day, ind) in week.days" :key="`${i}-${ind}`" :id="`${i}-${day}`"
                    v-on:click="() => openModal(`${i}-${day}`)">{{ day }}</td>  -->
            </tr>
            <!--
            <tr>
                <td class="tdNumber">0</td>
                <td></td>
                <td></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
            </tr>
            <tr>
                <td class="tdNumber">1</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
            </tr>
            <tr>
                <td class="tdNumber">2</td>
                <td>13</td>
                <td>14</td>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
                <td>19</td>
            </tr>
            <tr>
                <td class="tdNumber">3</td>
                <td>20</td>
                <td>21</td>
                <td>22</td>
                <td>23</td>
                <td>24</td>
                <td>25</td>
                <td>26</td>
            </tr>
            <tr>
                <td class="tdNumber">4</td>
                <td>27</td>
                <td>28</td>
                <td>29</td>
                <td>30</td>
                <td>31</td>
                <td></td>
                <td></td>
            </tr>
            -->

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

table,
th,
td {
    width: 100%;
    table-layout: fixed;
    text-align: center;
    font-size: 20px;
    border-collapse: collapse;
    border: 1px solid $color4;
    font-family: Poppins;
    height: 62px;
    align-content: baseline;

    th {
        background: $color3;
        color: white;
        font-family: arial black;
        align-content: center;
    }

    td {
        background: $color7;
        color: $color5;
        padding-top: 5px;
    }

    td:hover {
        background: $color5;
        color: $color7;
        cursor: pointer;
    }
}

.tdNumber {
    background: $color1;
    align-content: center;
    padding-top: 0px;
}
</style>