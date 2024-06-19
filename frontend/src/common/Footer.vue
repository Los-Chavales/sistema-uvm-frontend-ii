<script setup>
    import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
     
    <footer className="footer">
      <div className="footer_info">
        <a className="a-footer" href="https://github.com/Los-Chavales/frontend-proyecto" target="_blank">Repositorio Github</a>
        <address className="address-footer">
          <p>
            © 
            <a className="a-footer" href="https://github.com/DarthNeo03" target="_blank">JSGC, </a>
            <a className="a-footer" href="https://github.com/PaolaMarcano" target="_blank">PVMS, </a> 
            <a className="a-footer" href="https://github.com/Crisangelly" target="_blank">CVHF, </a>
            <a className="a-footer" href="https://github.com/teranMoises"  target="_blank">MATR </a> 
          </p>
        </address>
      </div>
    </footer>
    
    
</template>

<style lang="scss" scoped>
   @import "@/assets/scss/variables.scss";

    .footer{
    margin-top: auto;
    margin-top: auto;
    height: 85px;
    width: 100%;
    }

    .footer_info{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 85px;
    width: 100%;
    overflow:visible;
    }

    .a-footer{
        text-decoration: none;
        text-align: center;
        font-family: "Inria Sans";
        font-style: normal;
        font-weight: 800;
        line-height: normal;
    }

    .a-footer, .address-footer{
    color: white;
    font-size: 20px;
    overflow:visible;
    font-weight: 800;
  }
  
  .a-footer:hover{
    color:$color5;
    cursor: pointer;
  }
  
  


</style>