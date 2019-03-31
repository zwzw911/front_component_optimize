<style scoped>
/*  .spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }*/
  .left{fill:url(#left);}
  .right{fill:url(#right);}
  .top{fill:#2b85e4;}
  @keyframes load{ 0%{transform:rotate(0)} 100%{transform:rotate(-360deg)} } #load{animation:load 1s linear infinite; transform-origin:center center; }
</style>
<template>
  <Spin :style=computedSpinInfo.style>
    <!--<Icon type="ios-loading" size=24 class="spin-icon-load" style="height:100%"></Icon>-->
    <!--<svg class="circular" viewBox="25 25 50 50">-->
      <!--<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>-->
    <!--</svg>-->
    <div     class="flex-flow-row-wrap justify-content-center align-content-center"    >
      <!--<div>-->
        <svg  :width=computedSpinInfo.fontSize+computedSpinInfo.inc :height=computedSpinInfo.fontSize+computedSpinInfo.inc viewBox="0 0 200 200" >
          <g id="load">
            <linearGradient id="right" gradientUnits="userSpaceOnUse" x1="150" y1="20" x2="150" y2="180">
              <stop offset="0" style="stop-color:#2b85e4"/>
              <stop offset="1" style="stop-color:#9DBFE4"/>
              <!--蓝到浅蓝渐变-->
            </linearGradient>
            <path class="right" d="M100,0v20c44.1,0,80,35.9,80,80c0,44.1-35.9,80-80,80v20c55.2,0,100-44.8,100-100S155.2,0,100,0z"/>
            <!--右半圆环-->
            <linearGradient id="left" gradientUnits="userSpaceOnUse" x1="50" y1="0" x2="50" y2="180">
              <stop offset="0" style="stop-color:#2d8cf0"/>
              <stop offset="1" style="stop-color:#9DBFE4"/><!--浅蓝到白色渐变-->
            </linearGradient>
            <path class="left" d="M20,100c0-44.1,35.9-80,80-80V0C44.8,0,0,44.8,0,100s44.8,100,100,100v-20C55.9,180,20,144.1,20,100z"/><!--左半圆环--> <circle class="top" cx="100" cy="10" r="10"/>
          </g>
        </svg>
      <!--</div>-->


      <span v-if="spinInfo.position===undefined || spinInfo.position==='h'" class="marginL2" :style="{'font-size':computedSpinInfo.fontSize+'px'}  ">{{spinInfo.msg}}</span>
    <!--<span v-if="spinInfo.position===undefined || spinInfo.position==='h'" style="font-size:24px;height:24px; text-align: center;font-type:'Microsoft YaHei';  ">{{spinInfo.msg}}</span>-->
      <span v-if="spinInfo.position==='v'">{{spinInfo.msg}}</span>
    </div>

  </Spin>
</template>
<script>
  /******************************/
  /**         3rd              **/
  /******************************/
  // import {inf} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  // import {sendRequestGetResult_async,setUpdateValue} from '../../function/network'
  // import {showErrorInModal} from '../../function/showErrorResult'
  import {objectDeepCopy,genNeedInput} from '../../function/misc'
  export default {
    props:{'spinInfo':{type:Object}},//{msg:,position:V/H,show:false/true,fontSize}
    methods:{
    },
    computed:{
      computedSpinInfo(){
        let spinInfo=objectDeepCopy(this.spinInfo)
        //如果没有设置大小，则取默认值
        spinInfo.fontSize=spinInfo.fontSize||14
        //根据字体的大小，设置spin的增加值（以便尽量使文字居中）
        spinInfo.inc=Math.ceil(spinInfo.fontSize/4)
        //根据show（boolean值），产生对应的css style
        spinInfo.show=spinInfo.show || false
        if(false===spinInfo.show){
          spinInfo.style='display:none'
        }else{
          spinInfo.style=''
        }
        // inf('generate spinInfo',spinInfo)
        return spinInfo
        // this.spinInfo.fontSize=this.spinInfo.fontSize||18
      },
    },
    data(){
      return {

      }
    }
  }
</script>
