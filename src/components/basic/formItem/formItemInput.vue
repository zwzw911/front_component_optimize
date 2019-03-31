<!--
inputCheckInfo: //由于iview的限制，必须整体出入，然后根据fieldName选择。无需rule，rule直接在Form中设置
  inputValue:数组
  inputAttribute:数组
  inputTempData:数组

fieldName:字符，从inputCheckInfo中选择合适的

inputAppearanceSetting://对input外观的设置
  icon: 数组，对每个需要设置icon的字段，设置一个icon字符；如果没有设置（undefined），或者是null或者''，则忽略图标
  iconColor: icon颜色
  editable:boolean。确定是否采用类inputUnEditAble，实现input无边框和readonly的效果
  isPassword:boolean

inputGlobalAppearanceSetting:
  ifUpdate: boolean，判断是否需要为inputValue保存一个副本，以便检查是否值发生了变化
  showStarForRequire:boolean, //字段为require，是否显示红色*
  inputSize:除了iview预定义的，还可以使用h1～h6定义大小
  labelSize: h1~h6
  //labelWidth:40,  //undefined为0，不显示label. Form中设置

inputActionSetting://对input某些行为做设置
  uniqueCheckOption：如果要进行unique的检测，对应的url和method


@event:
  onFocus:每个input需要触发此事件给父组件，无返回值
  onBlur:每个input需要触发此事件给父组件，无返回值
  onChange:每个input输入发生变化是触发。为了性能考虑，uniqueCheck不再此事件中发生
-->
<style scoped>

</style>
<template>
  <FormItem  :prop="fieldName" :key="fieldName"
             :class="[inputGlobalAppearanceSetting.showStarForRequire && inputCheckInfo.inputAttribute[fieldName].required ? '':'noStarForRequire' ,
                                  undefined===inputGlobalAppearanceSetting.labelSize ? '':inputGlobalAppearanceSetting.labelSize,
                                  undefined===inputGlobalAppearanceSetting.inputSize ? '':inputGlobalAppearanceSetting.inputSize,]"
             :error="inputCheckInfo.inputTempData[fieldName]['validResult']"
             class=" "
             :label="inputCheckInfo.inputAttribute[fieldName]['label']"
  >

    <Input
      @on-focus="onFocus()"
      @on-blur="onBlur_async();"
      @on-change="onChange_async()"
      :type="(undefined==inputAppearanceSetting[fieldName].isPassword || false===inputAppearanceSetting[fieldName].isPassword) ? 'text':'password'"

      v-model="inputCheckInfo.inputValue[fieldName]"
      :placeholder="inputCheckInfo.inputAttribute[fieldName]['placeHolder'][0]"
      :class="[inputAppearanceSetting[fieldName].editable ? '':'inputUnEditAble inputDisabled']"
      :readonly="!inputAppearanceSetting[fieldName].editable"
    >
      <span slot="prepend"  style="border-left: 0px" v-if="undefined!==inputAppearanceSetting[fieldName].icon ">
        <Icon :type="inputAppearanceSetting[fieldName].icon" size="20" :color="inputAppearanceSetting[fieldName].iconColor"></Icon>
      </span>
    </Input>

  </FormItem>
</template>
<script>


  /******************************/
  /**         3rd              **/
  /******************************/
import xss from 'xss'
  /******************************/
  /**    common function       **/
  /******************************/
  import {sendRequestGetResult_async} from '../../../function/network'
  import * as misc from '../../../function/misc'
  import * as formItemHelper from '../../formItemHelper'
  /******************************/
  /**     common constant     **/
  /******************************/
  import {InputAttributeFieldName,InputTempDataFieldName,ValidatePart} from '../../../constant/enum/nonValueEnum'
  // import {extraAttributeFieldName,RichTextEditor} from '../../../constant/enum/keyEnum'



  export default {
    // components:{selfCaptcha},
    props: {
      inputCheckInfo:{type:Object},
      inputAppearanceSetting:{type:Object},
      inputGlobalAppearanceSetting:{type:Object},
      inputActionSetting:{type:Object},
      fieldName:{type:String},
      // formRefName:{type:String}
      },
    watch: {

    },
    created() {
        //1. 判断是否需要备份数据，以便检查是否发生了变化
        if(true===this.inputGlobalAppearanceSetting.ifUpdate){
          this.inputValueBkup=misc.objectDeepCopy(this.inputCheckInfo.inputValue[this.fieldName])
        }
    },
    async mounted(){
      //如果是update，需要验证从server获得的数据是否合格，并且把结果存储起来，以便父组件直接判断
      if(true===this.inputGlobalAppearanceSetting.ifUpdate){
        await formItemHelper.validateSingleFieldValueAndStoreValidResult_async({that:this})
      }
    },
    methods: {


      /************************/
      /****  判断返回结果  ***/
      /************************/

      onFocus(){
        //1. 检查验证结果，验证失败（validResult不为空和null），则删除inputValue.
        //不要自动删除，也许用户只想在原来的基础上进行修改
/*        //实现了自动清空错误输入的功能
        if(null !== this.inputCheckInfo.inputTempData[this.fieldName][InputTempDataFieldName.VALID_RESULT]
          && '' !== this.inputCheckInfo.inputTempData[this.fieldName][InputTempDataFieldName.VALID_RESULT]){
          this.inputCheckInfo.inputValue[this.fieldName]=''
        }*/

        //2. 检查inputValue，如果是空字符，或者null，说明需要设置ph
        if(null === this.inputCheckInfo.inputValue[this.fieldName]
          || '' === this.inputCheckInfo.inputValue[this.fieldName]){
          this.inputCheckInfo.inputAttribute[this.fieldName][InputAttributeFieldName.PLACE_HOLDER]=this.inputCheckInfo.inputAttribute[this.fieldName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }
        this.$emit('onFocus')
      },
      async onBlur_async(){
        await formItemHelper.validateSingleFieldValueAndStoreValidResult_async({that:this})
        if(undefined!==this.inputActionSetting[this.fieldName]['uniqueCheckOption']){
          await formItemHelper.validateUnique_async({inputCheckInfo:this.inputCheckInfo,inputActionSetting:this.inputActionSetting,fieldName:this.fieldName})
        }
        this.$emit('onBlur')
        /*this.$parent.validateField(this.fieldName, (validResult) => {
          this.inputCheckInfo.inputTempData[this.fieldName][InputTempDataFieldName.VALID_RESULT] = validResult
          //输入验证通过，到server进行unique验证（如果有）
          if(undefined!==this.inputActionSetting[this.fieldName]['uniqueCheckOption']){
            formItemHelper.validateUnique_async({inputCheckInfo:this.inputCheckInfo,inputActionSetting:this.inputActionSetting,fieldName:this.fieldName})
          }
          this.$emit('onBlur')
        })*/

      },
      async onChange_async(){
        //1. 检查inputValue，如果是空字符，或者null，说明需要设置ph
        if(null === this.inputCheckInfo.inputValue[this.fieldName]
          || '' === this.inputCheckInfo.inputValue[this.fieldName]){
          this.inputCheckInfo.inputAttribute[this.fieldName][InputAttributeFieldName.PLACE_HOLDER]=this.inputCheckInfo.inputAttribute[this.fieldName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }
        //2. 验证输入（即使空）
        await formItemHelper.validateSingleFieldValueAndStoreValidResult_async({that:this})
        this.$emit('onChange')
/*        this.$parent.validateField(this.fieldName, (validResult) => {
          this.inputCheckInfo.inputTempData[this.fieldName][InputTempDataFieldName.VALID_RESULT] = validResult
          //输入验证通过，到server进行unique验证（如果有）
          //为了性能考虑，unique检查，只有在onBlur才进行检测
/!*          if(undefined!==this.inputActionSetting['uniqueCheckOption']){
            this.validateUnique_async()
          }*!/
          this.$emit('onChange')
        })*/

      },
      /*********************/
      /****  validate  ****/
      /*********************/
      //字段的unique检测
      //不知道为啥，props,data和computed中的数据，不能放在promise的then中使用，如果要做设置，只能通过参数传递



      xssCheck(){
        let fieldName=this.fieldName
        let inputValue=this.inputCheckInfo.inputValue[this.fieldName]


      },


    },
    computed: {},
    data() {
      // this.setTriggerOfInput(this.editable)
      return {
        // fieldRequired:null,//当前field是否required
        inputValueBkup:null,//如果ifUpdate为true，这需要用到这个变量，进行比较，判断是否输入发生了变化

        // newButtonDisable:false,//达到上限，为false（是否显示，通过editable控制）

        //采用style，优先级覆盖iview
        // buttonDisableStyle:this.$store.state.style.button.primary.disable,

        // classVertical:'flex-flow-column-nowrap justify-content-flex-start align-items-flex-start align-content-flex-start',
        // classHorizontal:'flex-flow-row-nowrap justify-content-flex-start align-items-flex-start align-content-flex-start',



        // ref:this.formItemInfo.captchaInfo.captchaImgId,

        //存储原始数据
        // inputOriginalValue:{},
        //如果是textarea，可能需要存储对应的editor实例
        // inputValueEditor:{},
      }
    },
  }
</script>
