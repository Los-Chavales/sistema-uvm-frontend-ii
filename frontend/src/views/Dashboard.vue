<script setup>
    import DashHeader from '@/components/Dash-Header.vue';
    import DashSidebar from '../components/DashSideBar/Dash-Sidebar.vue';
</script>

<template>
    <div class="topDivTest">
        <div class="titulosTest">
            <h1>Vista de Test</h1>
            <p>Aquí puede ir cualquier cosa</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

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

.topDivTest {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 3%;
    padding-bottom: 50vh;
}


.titulosTest {
    margin-left: 22vw;
}
</style>