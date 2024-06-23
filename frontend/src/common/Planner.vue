<script setup>

</script>

<template>
    <div class="calender">
        <div class="month">
            <h2>Mayo 2024</h2>
            <div><p>botones</p></div>
        </div>
        <table>
            <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>The</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
            </tr>
            <tr>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
            </tr>
            <tr>
                <td>13</td>
                <td>14</td>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
                <td>19</td>
            </tr>
            <tr>
                <td>20</td>
                <td>21</td>
                <td>22</td>
                <td>23</td>
                <td>24</td>
                <td>25</td>
                <td>26</td>
            </tr>
            <tr>
                <td>27</td>
                <td>28</td>
                <td>29</td>
                <td>30</td>
                <td>31</td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.calender {
    border: 1px solid #88C426;
    /*max-width: 800px;*/
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
    /*font-weight: bold;
    /*color: black;*/
    margin: 10% 10%;
}

.month {
    @import "@/assets/scss/variables.scss";
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
    font-size: 27px;
    border-collapse: collapse;
    border: 5px solid black;
    font-family: Elaphant;
}

tr,
th,
td {
    padding: 15px;
}

th {
    background: #009900;
    color: white;
    font-family: arial black;
}

td {
    background: #00264d;
    color: yellow;
}

td:hover {
    background: green;
}
</style>