<!--
只包含了input相关的元素

onblur/onchange会emit event，带1个结果，是否可以自行login操作（inputValue都OK）
-->
<style scoped>
</style>

<template>
  <div class="">

    <div>

            <!--:label-width="80"-->
      <div class="flex-flow-row-nowrap justify-content-flex-start  marginV2">
        <p style="" class="color-red h5">
          <span>{{globalErrorResultMsg}}</span>
          <span style="visibility:hidden">1</span>
        </p>
      </div>


      <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 "  label-position="right"
            :model="inputCheckInfo.inputValue" :rules="inputCheckInfo.rule"
            :label-width="labelWidth"
            @submit.native.prevent
      >
        <self-form-item-input
          :inputCheckInfo="inputCheckInfo" fieldName="name"
          :inputAppearanceSetting="inputAppearanceSetting"
          :inputGlobalAppearanceSetting="inputGlobalAppearanceSetting"
          :inputActionSetting="inputActionSetting"
          @onBlur="checkWholeStatus">
        </self-form-item-input>
        <self-form-item-input
          :inputCheckInfo="inputCheckInfo" fieldName="account"
          :inputAppearanceSetting="inputAppearanceSetting"
          :inputGlobalAppearanceSetting="inputGlobalAppearanceSetting"
          :inputActionSetting="inputActionSetting"
          @onBlur="checkWholeStatus">
        </self-form-item-input>
        <self-form-item-input
          :inputCheckInfo="inputCheckInfo" fieldName="password"
          :inputAppearanceSetting="inputAppearanceSetting"
          :inputGlobalAppearanceSetting="inputGlobalAppearanceSetting"
          :inputActionSetting="inputActionSetting"
          @onBlur="checkWholeStatus">
        </self-form-item-input>
        <!--:inputAppearanceSetting="inputAppearanceSetting"-->
        <self-form-item-captcha
            :inputCheckInfo="inputCheckInfo" fieldName="captcha"
            :captchaInfo="captchaInfo"
            :inputGlobalAppearanceSetting="inputGlobalAppearanceSetting"
            :inputActionSetting="inputActionSetting"
            @onBlur="checkWholeStatus">
        </self-form-item-captcha>
        <!--不影响是否可以执行-->
        <div class="flex-flow-row-nowrap justify-content-flex-start marginV1" :style="{'margin-left':labelWidth+'px'}">
          <Checkbox v-model="rememberMe" @on-change="">

          </Checkbox>
          <span>记住我</span>

        </div>

        <!--<FormItem class="">-->
          <Button long size="large"  type="primary" @click="sendLoginInfo()"
                   style="width:auto" :style="[wholeValidResult ? '':buttonDisableStyle,{'margin-left':labelWidth+'px'}]" :disabled="!wholeValidResult">登录</Button>
          <!--<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>-->
        <!--</FormItem>-->
      </Form>



    </div>
    <!--<Button @click="test_delete" long size="large" shape="circle" type="primary"></Button>-->
  </div>
</template>

<script>
  /******************************/
  /**         component       **/
  /******************************/
  import selfFormItemInput from '../basic/formItem/formItemInput'
  import selfFormItemCaptcha from '../basic/formItem/formItemCaptcha'
  /******************************/
  /**         3rd              **/
  /******************************/
  // import {inf,wrn,err} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  import {sendRequestGetResult_async} from '../../function/network'
  // import {showErrorInModal} from '../../function/showResult'
  import {objectDeepCopy,ifUserLogin,routeTo,genNeedInput} from '../../function/misc'

  import * as formItemHelper from '../formItemHelper'
  /******************************/
  /**     common constant     **/
  /******************************/
  import {InputAttributeFieldName,InputTempDataFieldName,ValidatePart} from '../../constant/enum/nonValueEnum'
  import {urlConfiguration} from '../../constant/url/url'
  import {style} from '../../constant/style'
  // import {mergeAdditionalField} from '../helperLib/componentsHelperLib'



  export default {
    components:{selfFormItemInput,selfFormItemCaptcha},
    //props:['loginConfig'], //{routeToLastOrMainPageAfterLoginSuccessful:Boolean}
    data(){
      // let loginInfo=componentInfo.loginInfo()
      return {
        /*      formItemInfo      */
        // formItemInfo:componentInfo.loginInfo(),
        inputCheckInfo:genNeedInput({collName:'user',allowFields:['name','account','password'],additionalFields:['captcha'],method:'create'}),
        inputAppearanceSetting:{
          'name':{
            icon:'md-person', //数组，对每个需要设置icon的字段，设置一个icon字符；如果没有设置（undefined），或者是null或者''，则忽略图标
            //iconColor:, //icon颜色
            editable:true,//boolean。确定是否采用类inputUnEditAble，实现input无边框和readonly的效果
            isPassword:false,
          },
          'account':{
            icon:"md-phone-portrait", //数组，对每个需要设置icon的字段，设置一个icon字符；如果没有设置（undefined），或者是null或者''，则忽略图标
            //iconColor:, //icon颜色
            editable:true,//boolean。确定是否采用类inputUnEditAble，实现input无边框和readonly的效果
            isPassword:false,
          },
          'password':{
            icon:'md-lock', //数组，对每个需要设置icon的字段，设置一个icon字符；如果没有设置（undefined），或者是null或者''，则忽略图标
            //iconColor:, //icon颜色
            editable:true,//boolean。确定是否采用类inputUnEditAble，实现input无边框和readonly的效果
            isPassword:true,
          }
        },
        inputGlobalAppearanceSetting:{
          ifUpdate: false, //判断是否需要为inputValue保存一个副本，以便检查是否值发生了变化
          showStarForRequire:true, //字段为require，是否显示红色*
        //inputSize:,//除了iview预定义的，还可以使用h1～h6定义大小
        //labelSize: ,//h1~h6
        },
        inputActionSetting:{
          'name':{
            uniqueCheckOption:undefined,
          },
          'account':{
            uniqueCheckOption:urlConfiguration.user.uniqueCheck,
          },
          'password':{
            uniqueCheckOption:undefined,
          }
        },

        captchaInfo:{
          captchaImgWidth:80, //px。事先确定好长宽，以便刷新时，如果有refreshIcon存在，此icon位置不会变化
          captchaImgHeight:33,
          refreshIcon:'refresh',//空：无刷新icon；否则显示
          captchaImgId:'login',//防止多个子组件的img的id重复
          captchaURL:urlConfiguration.standAlone.captcha,
          getAfterMounted:true,
        },


        // formItemInfo:this.loginConfig.formItemInfo,
        // validateFormItemResult:null, //存储forItem整体验证结果
        ref:{
          // formItem:{
          //   formItemForLogin:'formItemForLogin',
          // },
          // form:{
          //   formForLogin:'formForLogin',
          // },
        },
        /*        self      */
        globalErrorResultMsg:'',//全局错误信息
        wholeValidResult:false,//全局formItem检测信息，默认检测内有通过
        // buttonDisableStyle:this.$store.state.style.button.primary.disable,
        rememberMe:false, //记住用户名
        submitButtonDisable:true,
        buttonDisableStyle:style.button.primary.disable,
        labelWidth:60,
        // editable:true,
      }
    },
    created(){
      // if(undefined===this.loginConfig.createdAlreadyLoginRouteToLastOrMainPage || true===this.loginConfig.createdAlreadyLoginRouteToLastOrMainPage){
        //如果已经登录，直接跳转到首页
        if(true===ifUserLogin({that:this})){
          routeTo({that:this,path:'/'})
        }

      // }
      if(true===this.$cookies.isKey('rememberMe') && true===this.$cookies.isKey('account') ){
        this.inputCheckInfo.inputValue.account=this.$cookies.get('account')
        this.rememberMe=true
        this.inputCheckInfo.inputTempData.account[InputTempDataFieldName.VALID_RESULT]=''
      }
      // this.getCaptcha()

    },
    mounted(){
      //获得captcha
      // this.$refs.selfCaptcha.getCaptchaImg_async()
    },
    methods: {
      /********************************************/
      /**                   formItem             **/
      /********************************************/
      checkWholeStatus(){
        this.wholeValidResult=formItemHelper.checkWholeStatus({inputCheckInfo:this.inputCheckInfo})
      },
      //获得整体验证结果，并继续向上emit
      getAllItemValidatedResult(result){
// inf('change result',result)
        this.$emit('readyForLogin',result)
        // this.validateFormItemResult=result
        // this.checkSubmitButtonStatus()
      },



      resetGlobalMsg(){
        // inf('checkSubmitButtonStatus in')
        this.globalErrorResultMsg=''
      },

      /********************************************/
      /**                   axios                **/
      /********************************************/

      async sendLoginInfo(){
        //captcha需要从inputValue中剥离，放入CAPTCHA
        let captcha=this.inputCheckInfo.inputValue[ValidatePart.CAPTCHA]
        //不能直接删除，否则iview的验证会认为此字段的值不存在
        let tmpInputValue= objectDeepCopy(this.inputCheckInfo.inputValue)
        delete tmpInputValue[ValidatePart.CAPTCHA]
        let data={
          values: {
            // [ValidatePart.METHOD]: Method.MATCH,
            [ValidatePart.RECORD_INFO]: tmpInputValue,
            [ValidatePart.CAPTCHA]:captcha,
          }
        }
        let result=await sendRequestGetResult_async({urlOption:urlConfiguration.user.login,data:data})
        // =await this.sendLoginInfo()
        if(result.rc>0){
          // inf('result',result)
          // captcha错误显示在input下
          // let setCaptchaResult=this.$refs[this.ref.formItem.formItemForLogin].checkIfCaptchaErrAndShow({data:result.msg})
          //否则，显示在最顶上
/*          if(false===setCaptchaResult){
            let set99999Result=this.$refs[this.ref.formItem.formItemForLogin].checkIf99999ErrAndShow({data:result.msg})
            if(false===set99999Result){
              this.globalErrorResultMsg=result.msg
            }
          }*/

/*          if(undefined!==this.formItemInfo.captchaInfo){
            await this.$refs[this.ref.formItem.formItemForLogin].getCaptchaImg_async()
          }*/
        }else{
          /**   登录成功    **/
          this.globalErrorResultMsg=''
          //存储登录的用户信息到cookie（为了登录后在header上显示用户名，所以无论是否rememberMe，都要将用户名保存在cookie）（存储在global，刷新页面后，数据会重置）
          if(true===this.rememberMe){
            this.$cookies.set('account', this.inputCheckInfo.inputValue.account,'14d','/')
            this.$cookies.set('rememberMe', 1,'14d','/')
          }else{
            this.$cookies.set('account', this.inputCheckInfo.inputValue.account,'8h','/')
            this.$cookies.remove('rememberMe')
          }

          this.$cookies.set('loginDone','1','8h','/')
          // this.$store.commit('loginSuccessful',{userName:this.formItemInfo.inputValue.account})
          //返回上页
          if(true===this.loginConfig.routeToLastOrMainPageAfterLoginSuccessful){
            if(this.$router.length>0){
              // inf(this.$router[-1])
              this.$router.go(-1)
            }else{
              routeTo({that:this,path:'/'})
            }
          }


        }
      },


    },
    computed:{

    },

  }
</script>
