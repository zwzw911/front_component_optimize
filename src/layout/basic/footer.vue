<!--<style scoped>
  .layout-copy{
    text-align: center;
    padding: 10px 0 ;
    color: red;
    height:40px;
    line-height: 40px;
  }
</style>-->

<template>
  <div class="height8  marginT4 flex-flow-row-nowrap justify-content-center align-items-center" style="border-top: 1px solid #0e0e0e">
    <span>2016-2018 &copy; iShare</span>
  </div>
<!--  <div class="height8 flex-flow-row-nowrap justify-content-center align-items-center" >
    <span>2016-{{year}} &copy; iShare</span>
</div>-->
</template>

<script>
  export default{
    // props:['footerInfo'],
    computed:{
      year(){
        return this.$store.state.footerInfo.year
      },
    },
  }
</script>
