<!--
获得captcha的组件
@captchaInfo： 父组件传入的props。
    captchaImgWidth:px
    captchaImgHeight:px
    captchaURL: 获得captcha的服务器端的url
    refreshIcon:'refresh',//空：无刷新icon；否则显示
    captchaImgId: 必须存在如果在父组件中多次使用此组件，需要为每个captcha子组件设置单独的id，否则所有captcha将使用第一个子组件的id
    getAfterMounted: boolean，是否在mounted之后，就自动获得captcha，默认yes

@method：
    refresh：重新获得captcha
@event
    genCaptchaSuccess:captcha图片生成成功
    genCaptchaFail:captcha图片生成失败


example
        captchaInfo:{
          captchaImgWidth:80, //px。事先确定好长宽，以便刷新时，如果有refreshIcon存在，此icon位置不会变化
          captchaImgHeight:33,
          refreshIcon:'refresh',//空：无刷新icon；否则显示
          captchaImgId:'email',//防止多个子组件的img的id重复
          captchaURL:'/user/captcha',
        },
-->

<style scoped>
</style>
<template>


  <!--<div class="flex-flow-column-nowrap align-content-flex-start">-->
  <div class="flex-flow-column-nowrap align-content-flex-start">
    <div class="flex-flow-row-nowrap align-items-center">

      <div >
        <img  v-if="false===spinInfo.show" alt="单击刷新" title="单击刷新"
              :id="innerCaptchaImgId" :src="captchaImgDataURL" :style="{width:this.captchaInfo.captchaImgWidth+'px',height:this.captchaInfo.captchaImgHeight+'px'}"
              @load="captchaLoaded"  @click="getCaptchaImg_async"/>
        <self-spin :spin-info="spinInfo"></self-spin>
      </div>

      <span @click="getCaptchaImg_async">
        <Icon v-if="showRefreshIconFlag" :type="this.captchaInfo.refreshIcon" size="24" title="换一张" />
      </span>
    </div>
    <div style="width:104px">
      <p class="color-error" style="text-align:left" :style="{display: captchaImgErrorMsg===''? 'none':''}">{{captchaImgErrorMsg}}</p>
    </div>
  </div>

  <!--如果在一个页面多处使用此组件，则需要区分id，否则永远获得第一个子组件的id-->

</template>
<script>
    /******************************/
    /**        子组件           **/
    /******************************/
    import selfSpin from '../spin'
    /******************************/
    /**         3rd              **/
    /******************************/
    // import {inf} from 'awesomeprint'
    /******************************/
    /**    common function       **/
    /******************************/
    import {getPosPara} from '../../../function/componentsHelper'
    import {sendRequestGetResult_async} from '../../../function/network'
    import * as handleResult from '../../../function/handleResult'
    // import {showErrorInModal} from '../../function/showErrorResult'
    import {urlConfiguration} from '../../../constant/url/url'

    export default {
      components:{selfSpin},
      props: {'captchaInfo':{type:Object}},
      mounted(){
          if(undefined===this.captchaInfo.getAfterMounted || true===this.captchaInfo.getAfterMounted){
            this.getCaptchaImg_async()
          }
      },
      methods: {
// test(){
//   alert('test')
// },
        captchaLoaded(){
          // inf('captchaLoaded in')
          let imgPosPara=getPosPara(this.dom.captchaImg)
// inf('imgPosPara',imgPosPara)
          //图片成功获得
          if(imgPosPara['width']>0 && imgPosPara['height']>0){
            let posMember=['width','height']
            for(let singlePosMember of posMember){
              this.dom.captchaImg.style[singlePosMember]=imgPosPara[singlePosMember]+'px'
            }
            this.captchaImgLoadedFlag=true
            this.$emit('genCaptchaSuccess')
          }
        },
        getCaptchaImg_async(){
          // inf('getCaptchaImg_async in')
          let that=this
          this.spinInfo.show=true
          sendRequestGetResult_async({urlOption:urlConfiguration.standAlone.captcha}).then(function (response) {
            that.dealCorrectCaptchaResult(response)
            that.spinInfo.show=false
          },function (err) {
            // console.log('getCaptchaImg_async err in')
            // console.log(err)
            // console.log(err.data)
            // inf(',sg',msg)
            that.spinInfo.show=false
            //转换错误信息
            if(err.status && err.status===504){
              err.data='无法连接服务器，请稍后重试'
            }
            return handleResult.commonHandlerForErrorResult({that:that,response:err,showType:'modal'})

          })

        },
        async dealCorrectCaptchaResult(result){
          // inf('dealCorrectCaptchaResult in')
          this.captchaImgLoadedFlag=false
          if(result.rc===0){
            this.captchaImgHideFlag=false
            this.captchaImgDataURL=result.msg
            this.captchaImgErrorMsg=''
          }else{
            // 前一次POST未设session，需要重发来获得captcha
            // inf('resend')
            // inf('result',result)
            if(result.rc===60050){

              await this.getCaptchaImg_async()
            }
            else{
              //只有出错才会见错误信息传递给父组件
              this.captchaImgErrorMsg=result.msg
              // that.$emit('genCaptchaFail',result.msg)
            }
          }
        },
      },
      computed:{
        dom(){
          return {
            captchaImg:document.getElementById(this.innerCaptchaImgId)
          }
        },
        hiddenStyle(){
          return {
            captchaImg:this.captchaImgHideFlag ? 'hidden':''
          }
        },
        innerCaptchaImgId(){
          return 'captcha'+this.captchaInfo.captchaImgId
        },
        showRefreshIconFlag(){
          // this.captchaImgLoadedFlag &&
          return  ''!==this.captchaInfo.refreshIcon //&& null!==refreshIcon && undefined!==refreshIcon
        }
      },
      data() {
          return {
            captchaImgLoadedFlag:false,//图片是否load成功
            captchaImgHideFlag:true,
            captchaImgDataURL:'',
            captchaImgErrorMsg:'',

            spinInfo:{
              msg:'获取中...',
              show:true,
            },
          }
      },
    }
</script>
