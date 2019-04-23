<!--
inputCheckInfo: //由于iview的限制，必须整体出入，然后根据fieldName选择。无需rule，rule直接在Form中设置
  inputValue:数组
  inputAttribute:数组
  inputTempData:数组

fieldName:字符，从inputCheckInfo中选择合适的

inputAppearanceSetting://对input外观的设置
  //icon: 数组，对每个需要设置icon的字段，设置一个icon字符；如果没有设置（undefined），或者是null或者''，则忽略图标
  //iconColor: icon颜色
  editable:boolean。确定是否采用类inputUnEditAble，实现input无边框和readonly的效果
  //isPassword:boolean
  autoSize:object or boolean //{minRows: 2,maxRows: 5}/true

inputGlobalAppearanceSetting:
  ifUpdate: boolean，判断是否需要为inputValue保存一个副本，以便检查是否值发生了变化
  showStarForRequire:boolean, //字段为require，是否显示红色*
  inputSize:除了iview预定义的，还可以使用h1～h6定义大小
  labelSize: h1~h6
  labelWidth:40,  //undefined为0，不显示label. Form中设置

inputActionSetting://对input某些行为做设置
  uniqueCheckOption：如果要进行unique的检测，对应的url和method
  richEditorType:wangEditor, //是否使用wangEditor

@event:
  onFocus:每个input需要触发此事件给父组件，无返回值
  onBlur:每个input需要触发此事件给父组件，无返回值
  onChange:每个input输入发生变化是触发。为了性能考虑，uniqueCheck不再此事件中发生
-->
<style scoped>

</style>
<template>
  <!--<div>-->
  <!--换行效果+初始文字靠左-->

    <FormItem  :prop="fieldName" :key="fieldName"

               :class="[inputGlobalAppearanceSetting.showStarForRequire ? '':'noStarForRequire' ,
                                  undefined===inputGlobalAppearanceSetting.inputLabelSize ? '':inputGlobalAppearanceSetting.inputLabelSize,
                                  undefined===inputGlobalAppearanceSetting.inputGlobalAppearanceSetting ? '':inputGlobalAppearanceSetting.inputSize,]"
               :error="inputCheckInfo.inputTempData[fieldName]['validResult']"
               class=" "
               :label="inputCheckInfo.inputAttribute[fieldName]['label']"
    >
      <!---->
      <!--如果使用了哦wangEditor，需要一个div，来生成界面，同时需要隐藏textarea，只用textarea作为傀儡-->
      <div  v-if="'wangEditor'===inputActionSetting[fieldName]['richEditorType']"
             :ref="fieldName" style="display: table;width:100%;text-align:left;"
            :class="[''!==inputCheckInfo.inputTempData[fieldName]['validResult'] && null!==inputCheckInfo.inputTempData[fieldName]['validResult'] ? 'wangEditor-error-border':'']">
        <!--实际操作的是wangEditor，只是把内容赋值给了textarea。所以要使用wangEditor的onchang/blur/focus-->
      </div>
      <!--:autosize="inputCheckInfo.inputAttribute[fieldName]['autoSize']"-->
      <Input
        @on-focus="onFocus();"
        @on-blur="onBlur_async()"
        @on-change="onChange_async()"
        type="textarea"
        :autosize="inputAppearanceSetting[fieldName].autoSize"
        v-show="undefined===inputActionSetting[fieldName]['richEditorType'] && 'wangEditor'!==inputActionSetting[fieldName]['richEditorType']"
        v-model="inputCheckInfo.inputValue[fieldName]"
        :placeholder="inputCheckInfo.inputAttribute[fieldName]['placeHolder'][0]"
        :class="[inputAppearanceSetting[fieldName].editable ? '':'inputUnEditAble inputDisabled', 'title'===inputCheckInfo.inputAttribute[fieldName]['inputSize'] ? 'inputTitle':'']"
        :readonly="!inputAppearanceSetting[fieldName].editable "
      >
      <span slot="prepend"  style="border-left: 0px" v-if="undefined!==inputAppearanceSetting[fieldName].icon ">
          <Icon :type="inputAppearanceSetting[fieldName].icon" size="20" :color="inputAppearanceSetting[fieldName].iconColor"></Icon>
        </span>
      </Input>

  </FormItem>
  </template>
<script>
  /******************************/
  /**         component       **/
  /******************************/
  // import selfCaptcha from './cpatcha'
  /******************************/
  /**         3rd              **/
  /******************************/
  // import {inf} from 'awesomeprint'
  import WE from 'wangeditor'
  import {wangEditorConfiguration} from "../../../constant/configuration/wangEditorConfiguration";
  /******************************/
  /**    common function       **/
  /******************************/
  import {sendRequestGetResult_async} from '../../../function/network'
  import * as misc from '../../../function/misc'
  import * as handleResult from '../../../function/handleResult'
  import * as formItemHelper from '../../formItemHelper'

  /******************************/
  /**     common constant     **/
  /******************************/
  import {InputAttributeFieldName,InputTempDataFieldName,ValidatePart,RichTextEditor} from '../../../constant/enum/nonValueEnum'




  export default {
    components:{},
    props: {
      inputCheckInfo:{type:Object},
      inputAppearanceSetting:{type:Object},
      inputGlobalAppearanceSetting:{type:Object},
      inputActionSetting:{type:Object},
      fieldName:{type:String},
      // editable:{type:Boolean,default:true},
      // formRefName:{type:String}
      },
    watch: {
/*      editable (curVal, oldVal) {
        // inf('new editable value',curVal)
        this.setTriggerOfInput(curVal)
        // if(false===curVal){
        //   this.$parent.resetFields()
        // }
      },*/
    },
    created(){
      //1. 判断是否需要备份数据，以便检查是否发生了变化
      if(true===this.inputGlobalAppearanceSetting.ifUpdate){
        this.inputValueBkup=misc.objectDeepCopy(this.inputCheckInfo.inputValue[this.fieldName])
      }
    },
    async mounted() {
      let richEditorType=this.inputActionSetting[this.fieldName].richEditorType
      let placeHolder
      switch (richEditorType){
        case RichTextEditor.WANG_EDITOR:
          this.editor = new WE(this.$refs[this.fieldName])
          Object.assign(this.editor.customConfig, wangEditorConfiguration)

          placeHolder=this.inputCheckInfo.inputAttribute[this.fieldName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
          /** 因为wangEditor最终会把数据赋值给input(textarea)，所以除了赋值操作，其他的检测等操作都由textarea的事件处理 **/
/*          this.editor.customConfig.onchange = (html) => {
// console.log('change html',html)
            this.setContentToInputValue(html)
          }*/

          this.editor.customConfig.onchange=this.wangEditorOnChange_async
          this.editor.customConfig.onfocus =this.wangEditorOnFocus
          this.editor.customConfig.onblur = this.wangEditorOnBlur_async
          // console.log('wang before create')
          this.editor.create()
          this.editor.txt.html(this.inputCheckInfo.inputValue[this.fieldName])
      }

      //如果是update，需要验证从server获得的数据是否合格，并且把结果存储起来，以便父组件直接判断
      if(true===this.inputGlobalAppearanceSetting.ifUpdate){
        await formItemHelper.validateSingleFieldValueAndStoreValidResult_async({that:this})
      }
    },
    methods: {

      /**   wangEditor  **/
      /**   wangEditor不能通过赋值给inputValue来触发textarea的change事件，必须通过代码手工触发  **/
      async wangEditorOnChange_async(html){
        // console.log('html',html)
        this.setContentToInputValue(html)
        await this.onChange_async()
      },
      wangEditorOnFocus(html){
        // console.log('html',html)
        // this.setContentToInputValue(html)
        this.onFocus()
      },
      async wangEditorOnBlur_async(html){
        // console.log('html',html)
        this.setContentToInputValue(html)
        await this.onBlur_async()
      },
      //content:字段内容
        //将wangEditor的内容赋值给inputValue
      setContentToInputValue(content){
        this.inputCheckInfo.inputValue[this.fieldName] = content
      },
      onFocus(){
        // alert('native on focus in')
        //1. 检查验证结果，验证失败（validResult不为空和null），则删除inputValue.
        //不要自动删除，也许用户只想在原来的基础上进行修改
        /*        //实现了自动清空错误输入的功能
                if(null !== this.inputCheckInfo.inputTempData[this.fieldName][InputTempDataFieldName.VALID_RESULT]
                  && '' !== this.inputCheckInfo.inputTempData[this.fieldName][InputTempDataFieldName.VALID_RESULT]){
                  this.inputCheckInfo.inputValue[this.fieldName]=''
                }*/

        //2. onFocus，清空placeHolder(理论上应该是inputValue为空才设置placeHolder，但是判断也需要代码，干脆直接清空placeHolder)
        this.inputCheckInfo.inputAttribute[this.fieldName][InputAttributeFieldName.PLACE_HOLDER]=''

        this.$emit('onFocus')
      },
      async onBlur_async(){
        await formItemHelper.validateSingleFieldValueAndStoreValidResult_async({that:this})
        if(undefined!==this.inputActionSetting[this.fieldName]['uniqueCheckOption']){
          //this.validateUnique_async()
          await formItemHelper.validateUnique_async({inputCheckInfo:this.inputCheckInfo,inputActionSetting:this.inputActionSetting,fieldName:this.fieldName})
        }
        this.$emit('onBlur')
/*        this.$parent.validateField(this.fieldName, (validResult) => {
          this.inputCheckInfo.inputTempData[this.fieldName][InputTempDataFieldName.VALID_RESULT] = validResult
          //输入验证通过，到server进行unique验证（如果有）
          if(undefined!==this.inputActionSetting[this.fieldName]['uniqueCheckOption']){
            //this.validateUnique_async()
            formItemHelper.validateUnique_async({inputCheckInfo:this.inputCheckInfo,inputActionSetting:this.inputActionSetting,fieldName:this.fieldName})
          }
          this.$emit('onBlur')
        })*/

      },
      async onChange_async(){
        // console.log('native onchange in with async valid')
        //1. 检查inputValue，如果是空字符，或者null，说明需要设置ph
        formItemHelper.setPlaceHolderWhenInputValueNull({inputCheckInfo:this.inputCheckInfo,fieldName:this.fieldName})
/*        if(null === this.inputCheckInfo.inputValue[this.fieldName]
          || '' === this.inputCheckInfo.inputValue[this.fieldName]){
          this.inputCheckInfo.inputAttribute[this.fieldName][InputAttributeFieldName.PLACE_HOLDER]=this.inputCheckInfo.inputAttribute[this.fieldName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }*/
        //2. 验证输入（即使空）

        await formItemHelper.validateSingleFieldValueAndStoreValidResult_async({that:this})
        this.$emit('onChange')
        /*this.$parent.validateField(this.fieldName, (validResult) => {
          this.inputCheckInfo.inputTempData[this.fieldName][InputTempDataFieldName.VALID_RESULT] = validResult
          //输入验证通过，到server进行unique验证（如果有）
          //为了性能考虑，unique检查，只有在onBlur才进行检测
          /!*          if(undefined!==this.inputActionSetting['uniqueCheckOption']){
                      this.validateUnique_async()
                    }*!/
          this.$emit('onChange')
        })*/

      },
      //根据是否处于edit，相应的设置input的trigger。如果disable editable，那么去除blur；否则加上blur
      /*setTriggerOfInput(curVal){
        for(let singleFieldName in this.formItemInfo.rule){
          for(let idx in this.formItemInfo.rule[singleFieldName]){
            if(false===curVal){
              this.formItemInfo.rule[singleFieldName][idx]['trigger']=this.formItemInfo.rule[singleFieldName][idx]['trigger'].replace('blur','').replace(',','')
            }
            if(true===curVal){
              this.formItemInfo.rule[singleFieldName][idx]['trigger']+=',blur'
            }
          }
        }
      },*/
      /************************/
      /****    common      ***/
      /************************/
      //获得字段的required的定义，返回true/false(undefined 也被视为false)
      /*getFieldRequireDefinition({fieldName}){

        for(let fieldSingleRuleDefinition of this.formItemInfo.rule[fieldName]){
          if(undefined!==fieldSingleRuleDefinition['required']){
            return {'required':fieldSingleRuleDefinition['required'],'message':fieldSingleRuleDefinition['message']}
          }
        }

        //undefined 被视为false
        return {'required':false,'message':`${this.formItemInfo.inputAttribute[fieldName][InputAttributeFieldName.LABEL]}不能为空`}
      },*/
      /************************/
      /****   预处理数据    ***/
      /************************/
      //将传入数据保存为原始数据（载入已经更新数据之后），以便判断是否可以更新
/*      saveAsOriginData({valueFromDb,neededFields}){
        this.formItemInfo.inputOriginValue=misc.extractPartObject({sourceObj:valueFromDb,neededKeyNames:neededFields})
      },*/





      /************************/
      /****  placeHolder  ****/
      /***********************/
      //模拟safiri，点击input时，placeHolder内容消失
      /*focusInputPlaceHolderDisappear({keyName,idx}) {

          if (null === this.formItemInfo.inputValue[keyName] || '' === this.formItemInfo.inputValue[keyName]) {
            this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = ['']
          }


        // inf('after this.userInputValue[this.currentType]',this.inputAttribute[this.currentType][keyName][InputAttributeFieldName.PLACE_HOLDER])
      },*/

      //如果离开input时，inputValue为空，需要恢复placeholder内容
      /*blurInputPlaceHolderRestore({keyName,idx}) {

//         inf('blurInputPlaceHolderRestore idx',idx)
        let fieldAttribute=this.formItemInfo.inputAttribute[keyName]
        //如果是autoGen，直接在inputArrayTempData操作
        if(true===fieldAttribute[InputAttributeFieldName.AUTO_GEN]) {
          if (undefined === idx) {
            err(`for autoGen field ${keyName}, miss parameter idx`)
          } else {
            // inf('before valud reulst',this.formItemInfo.inputArrayTempData[keyName][idx][InputTempDataFieldName.VALID_RESULT])
            if (null === this.formItemInfo.inputValue[keyName][idx] || '' === this.formItemInfo.inputValue[keyName][idx] ) {
              this.formItemInfo.inputArrayAttribute[keyName][idx][InputAttributeFieldName.PLACE_HOLDER] = this.formItemInfo.inputArrayAttribute[keyName][idx][InputAttributeFieldName.PLACE_HOLDER_BKUP]
            }
          }
        }
        //non autoGen
        else{
          if (null === this.formItemInfo.inputValue[keyName] || '' === this.formItemInfo.inputValue[keyName]) {
            this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
            // this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
          }
        }

      },*/
      /*restorePlaceHolder({keyName,idx}){
        // inf('restorePlaceHolder in')
        let fieldAttribute=this.formItemInfo.inputAttribute[keyName]
        if(true===fieldAttribute[InputAttributeFieldName.AUTO_GEN]) {
          if (undefined === idx) {
            err(`for autoGen field ${keyName}, miss parameter idx`)
          }else{
            this.formItemInfo.inputArrayAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
          }

        }
        //non autoGen
        else{
          this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }

      },*/

      /*********************/
      /****  validate  ****/
      /*********************/


      /*//存储 单个input 的检测结果（null：为检测，非空字符：检测通过，空字符：检测通过）
      validSingleInputValueAndStoreResult({fieldName,idx}) {

          //普通字段
          this.$parent.validateField(fieldName, (validResult) => {
            // inf('fieldName',fieldName)
            // inf('validSingleInputValueAndStoreResult',validResult)
            // inf('validSingleInputValueAndStoreResult fieldName validate result',validResult)
            this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT] = validResult
            // this.checkIfAllItemValidatedResultPass()
            /!*          if(validResult===""){
                        this.$emit('validSingleInputValueAndStoreResult',validResult)
                      }*!/

            // inf('this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT]',this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT])
          })

        // inf('validSingleInputValueAndStoreResult fieldName done',fieldName)
      },*/




      xssCheck(){

      },


    },
    computed: {},
    data() {
      // this.setTriggerOfInput(this.editable)
      return {
        // wangEditorRef:'wangEditor',//+Math.random(),//wangEditor初始化，需要div的id（在vue中，用ref代替）
        // inputValueEditor:[],
        editor:undefined,
        inputValueBkup:null,
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
