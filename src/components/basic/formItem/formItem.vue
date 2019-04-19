<!--
formItemInfo:
  rule
  inputValue:
  inputAttribute:
  inputTempData:
  icon: 数组，对每个需要设置icon的字段，设置一个icon字符；如果没有设置（undefined），或者是null或者''，则忽略图标
  iconColor: 字符
  unique：数组，指定对应字段，如果要进行unique的检测，对应的url

  labelWidth:40,  //undefined为0，不显示label
  editable:boolean。确定是否采用类inputUnEditAble，实现input无边框和readonly的效果
  showStarForRequire:boolean, //字段为require，是否显示红色*

  captchaInfo:子组件captcha需要的参数

@event:
  onFocus:每个input需要触发此事件给父组件，无返回值
  onBlur:每个input需要触发此事件给父组件，无返回值
  validateAllItemResult: 每个input blur时触发，告知父组件是否所有字段的input都合格了，boolean
-->
<style scoped>

</style>
<template>
  <div>
    <template v-for="(v,k) in formItemInfo.inputValue">
      <!--captcha-->
      <template v-if="k=='captcha'">
        <div class="flex-flow-row-nowrap align-items-flex-start align-content-center justify-content-space-between flex-grow-1">
          <FormItem  prop="captcha"   class=" marginR3" :error="formItemInfo.inputTempData['captcha']['validResult']"
                     :class="[formItemInfo.showStarForRequire ? '':'noStarForRequire' ,
                        undefined===formItemInfo.inputLabelSize ? '':formItemInfo.inputLabelSize,
                        undefined===formItemInfo.inputSize ? '':formItemInfo.inputSize,]"
                     :label="formItemInfo.inputAttribute[k]['label']"
          >
            <Input
              @on-focus="focusInputPlaceHolderDisappear({keyName:'captcha'});onFocus()"
              @on-blur="blurInputPlaceHolderRestore({keyName:'captcha'});validSingleInputValueAndStoreResult({fieldName:'captcha'});checkIfAllItemValidatedResultPass();onBlur();"
              @on-change="validSingleInputValueAndStoreResult({fieldName:'captcha'});checkIfAllItemValidatedResultPass();"
              :type="formItemInfo.inputAttribute['captcha']['inputType']" v-model="formItemInfo.inputValue['captcha']" :placeholder="formItemInfo.inputAttribute['captcha']['placeHolder'][0]"
            >
            </Input>

          </FormItem>
          <selfCaptcha :ref="formItemInfo.captchaInfo.captchaImgId" class="radius1" :captchaInfo="formItemInfo.captchaInfo" @genCaptchaSuccess="genCaptchaSuccess" ></selfCaptcha>
        </div>
      </template>

      <!--non captcha-->
      <template v-else>
        <!--autogen-->
        <template v-if="undefined!==formItemInfo.inputAttribute[k].autoGen && true===formItemInfo.inputAttribute[k].autoGen">
          <!--根据labelWidth决定是 垂直还是水平排列（lebel+input/icon）-->
          <div :class="[ formItemInfo.labelWidth===undefined  ? classVertical: classHorizontal]">
            <div :class="[formItemInfo.showStarForRequire ? '':'noStarForRequire' ,
                          undefined===formItemInfo.inputLabelSize ? '':formItemInfo.inputLabelSize,
                          undefined===formItemInfo.inputSize ? '':formItemInfo.inputSize,]"
                 class="ivu-form-item-required">
              <!--v-if="formItemInfo.inputValue[k]===null || formItemInfo.inputValue[k].length===0"-->
              <label
                class="ivu-form-item-label"
                :class="[ undefined===formItemInfo.inputLabelSize ? '':formItemInfo.inputLabelSize]"
                :style="{width: undefined===formItemInfo.labelWidth ? '':formItemInfo.labelWidth+'px'}"
              >
                {{formItemInfo.inputAttribute[k].label}}
              </label>
            </div>
            <div :class="[ formItemInfo.inputArrangeMode==='v'  ? classVertical: classHorizontal]" >
              <FormItem v-for="(ele,idx) in formItemInfo.inputValue[k]"
                        :prop="k+'.'+idx"
                        :key="idx"
                        :error="formItemInfo.inputArrayTempData[k][idx]['validResult']"
                        :rules="formItemInfo.rule[k]"
                        :class="[formItemInfo.showStarForRequire ? '':'noStarForRequire' ,
                          idx>0 && formItemInfo.inputArrangeMode==='h' ? 'inputLabel-hidden':'',

                          undefined===formItemInfo.inputLabelSize ? '':formItemInfo.inputLabelSize,
                          undefined===formItemInfo.inputSize ? '':formItemInfo.inputSize,
                          ]"
                        class="autoGenAnchorToDeleteMarginLeft marginR4"
              >


                <Input
                  @on-focus="focusInputPlaceHolderDisappear({keyName:k,idx:idx});dismissError({keyName:k,idx:idx});onFocus()"
                  @on-blur="blurInputPlaceHolderRestore({keyName:k,idx:idx});validateDuplicate({keyName:k,idx:idx});validSingleInputValueAndStoreResult({fieldName:k,idx:idx});setAutoGenButtonStatusByCheckValidatedResult({keyName:k});checkIfAllItemValidatedResultPass();ifAnyFieldValueChanged({keyName:k});onBlur({k:k,idx:idx});xssCheck({keyName:k,idx:idx});"
                  @on-change="validateDuplicate({keyName:k,idx:idx});validSingleInputValueAndStoreResult({fieldName:k,idx:idx});setAutoGenButtonStatusByCheckValidatedResult({keyName:k});checkIfAllItemValidatedResultPass();ifAnyFieldValueChanged({keyName:k});xssCheck({keyName:k,idx:idx})"

                  :type="formItemInfo.inputAttribute[k]['inputType']" :autosize="formItemInfo.inputAttribute[k]['autoSize']"
                  v-model="formItemInfo.inputValue[k][idx]" :placeholder="formItemInfo.inputArrayAttribute[k][idx]['placeHolder'][0]"
                  :style="{width: formItemInfo.inputWidth+'px'}"
                  :class="[editable ? '':'inputUnEditAble']"
                  :readonly="!editable"
                >

                  <!--:class="[editable ? '':'inputUnEditAble', 'title'===inputAttribute[idx]['inputSize'] ? 'inputTitle':'']" :readonly="!editable"-->
                  <span slot="prepend"  style="border-left: 0px" v-if="undefined!==formItemInfo.icon  && null!==formItemInfo.icon && ''!==formItemInfo.icon">
                          <Icon :type="formItemInfo.icon" size="20" :color="formItemInfo.iconColor"></Icon>
                        </span>
                  <span slot="append" style="" :style="{visibility: editable ? 'visible':'hidden'}" class="cursorPointer"
                        v-if="editable===true"
                        @click="removeItem({keyName:k,idx:idx});validateAllItemResult">
                          <Icon type="md-remove-circle" size="18"  color="#aaaaaa" title="移除"></Icon>
                        </span>
                </Input>
              </FormItem>

              <!--:style="formItemInfo.addItemButtonDisable[k] ? buttonDisableStyle:''"-->
              <Icon type="md-add-circle"

                    :disabled="formItemInfo.addItemButtonDisable[k]"
                    :class="[{hidden:!editable},undefined===formItemInfo.inputLabelSize ? '':formItemInfo.inputLabelSize.replace('inputLabelH','h'),formItemInfo.addItemButtonDisable[k] ? 'color-grey':'color-primary cursor-pointer']"
                    @click="addItem({keyName:k});checkIfAllItemValidatedResultPass()"
              >
                添加
              </Icon>
              <span v-if="null!==formItemInfo.inputTempData[k]['validResult'] || ''!==formItemInfo.inputTempData[k]['validResult']" class="color-error marginL2">
                {{formItemInfo.inputTempData[k]['validResult']}}
              </span>
            </div>
          </div>
        </template>





        <template v-else>
          <template v-if="undefined!==formItemInfo.inputAttribute[k]['enum'] || 'select'===formItemInfo.inputAttribute[k]['inputType']">
            <!--  formItem也设置width，否则原始width为100%，会导致select居中显示-->
            <FormItem  :prop="k" :key="k"
                       :class="[formItemInfo.showStarForRequire ? '':'noStarForRequire' ,
                              undefined===formItemInfo.inputLabelSize ? '':formItemInfo.inputLabelSize,
                              undefined===formItemInfo.inputSize ? '':formItemInfo.inputSize,]"
                       :error="formItemInfo.inputTempData[k]['validResult']"
                       class=" "
                       :label="formItemInfo.inputAttribute[k]['label']"
                       :style="undefined!==formItemInfo.inputAttribute[k]['width'] ? 'width:'+formItemInfo.inputAttribute[k]['width'] +'px':''"
            >
              <Select
                v-model="formItemInfo.inputValue[k]"
                :placeholder="formItemInfo.inputAttribute[k]['placeHolder'][0]"
                :style="undefined!==formItemInfo.inputAttribute[k]['width'] ? 'width:'+formItemInfo.inputAttribute[k]['width'] +'px':''"
                @on-change="checkIfAllItemValidatedResultPass();ifAnyFieldValueChanged({keyName:k})"
              >
                <Option v-for="(enumValue,enumKey) in formItemInfo.inputAttribute[k]['enumValue']" :value="enumKey" :key="enumKey">{{enumValue}}</Option>
              </Select>
            </FormItem>
          </template>
          <template v-else>
              <FormItem  :prop="k" :key="k"
                         :class="[formItemInfo.showStarForRequire ? '':'noStarForRequire' ,
                                  undefined===formItemInfo.inputLabelSize ? '':formItemInfo.inputLabelSize,
                                  undefined===formItemInfo.inputSize ? '':formItemInfo.inputSize,]"
                         :error="formItemInfo.inputTempData[k]['validResult']"
                         class=" "
                         :label="formItemInfo.inputAttribute[k]['label']"
              >
                  <!--如果是textarea，且是richEditor-->
                  <template v-if="'textarea'===formItemInfo.inputAttribute[k]['inputType'] && true===formItemInfo.inputAttribute[k]['useRichTextEditor']">
                    <template v-if="'wangEditor'===formItemInfo['richTextEditorConfiguration']['name']">
                      <!--换行效果+初始文字靠左-->
                      <div :ref="k" style="display: table;width:100%;text-align:left;" :class="[''!==formItemInfo.inputTempData[k]['validResult'] && null!==formItemInfo.inputTempData[k]['validResult'] ? 'wangEditor-error-border':'']"></div>
                      <!--实际操作的是wangEditor，只是把内容赋值给了textarea。所以要使用wangEditor的onchang/blur/focus-->
                      <Input
                        @on-focus=""
                        @on-blur=""
                        @on-change=""
                        :type="formItemInfo.inputAttribute[k]['inputType']" :autosize="formItemInfo.inputAttribute[k]['autoSize']"
                        v-model="formItemInfo.inputValue[k]" :placeholder="!editable ? '':formItemInfo.inputAttribute[k]['placeHolder'][0]"
                        :class="[editable ? '':'inputUnEditAble inputDisabled', 'title'===formItemInfo.inputAttribute[k]['inputSize'] ? 'inputTitle':'']"
                        :readonly="!editable" style="display: none;"
                      >
                      <span slot="prepend"  style="border-left: 0px" v-if="undefined!==formItemInfo.icon && undefined!==formItemInfo.icon[k] && null!==formItemInfo.icon[k] && ''!==formItemInfo.icon[k]">
                            <Icon :type="formItemInfo.icon[k]" size="20" :color="formItemInfo.iconColor"></Icon>
                          </span>
                      </Input>
                    </template>
                  </template>
                  <!--普通textarea-->
                  <template v-else>
                    <Input
                      @on-focus="focusInputPlaceHolderDisappear({keyName:k});onFocus()"
                      @on-blur="blurInputPlaceHolderRestore({keyName:k});validSingleInputValueAndStoreResult({fieldName:k});validateUnique({fieldName:k,formItemInfo:formItemInfo});checkIfAllItemValidatedResultPass();ifAnyFieldValueChanged({keyName:k});onBlur();xssCheck({keyName:k})"
                      @on-change="validSingleInputValueAndStoreResult({fieldName:k});validateUnique({fieldName:k,formItemInfo:formItemInfo});checkIfAllItemValidatedResultPass();ifAnyFieldValueChanged({keyName:k});xssCheck({keyName:k})"
                      :type="formItemInfo.inputAttribute[k]['inputType']" :autosize="formItemInfo.inputAttribute[k]['autoSize']"
                      v-model="formItemInfo.inputValue[k]" :placeholder="!editable ? '':formItemInfo.inputAttribute[k]['placeHolder'][0]"
                      :class="[editable ? '':'inputUnEditAble inputDisabled', 'title'===formItemInfo.inputAttribute[k]['inputSize'] ? 'inputTitle':'']"
                      :readonly="!editable"
                    >
                      <span slot="prepend"  style="border-left: 0px" v-if="undefined!==formItemInfo.icon && undefined!==formItemInfo.icon[k] && null!==formItemInfo.icon[k] && ''!==formItemInfo.icon[k]">
                        <Icon :type="formItemInfo.icon[k]" size="20" :color="formItemInfo.iconColor"></Icon>
                      </span>
                    </Input>
                  </template>
              </FormItem>
            </template>
          </template>
        </template>




    </template>
  </div>
</template>
<script>
  /******************************/
  /**         component       **/
  /******************************/
  import selfCaptcha from './cpatcha'
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf} from 'awesomeprint'
  import E from 'wangeditor'
  import {wangEditorConfiguration} from "../../constant/globalConfiguration/3rd";
  /******************************/
  /**    common function       **/
  /******************************/
  import {sendRequestGetResult_async} from '../../function/network'
  import * as misc from '../../function/misc'
  import * as handleResult from '../../function/handleResult'
  /******************************/
  /**     common constant     **/
  /******************************/
  import {InputAttributeFieldName,InputTempDataFieldName,ValidatePart} from '../../constant/enum/nonValueEnum'
  import {extraAttributeFieldName,RichTextEditor} from '../../constant/enum/keyEnum'



  export default {
    components:{selfCaptcha},
    props: {
      'formItemInfo':{type:Object},
      editable:{type:Boolean,default:true},
      // formRefName:{type:String}
      },
    watch: {
      editable (curVal, oldVal) {
        // inf('new editable value',curVal)
        this.setTriggerOfInput(curVal)
        // if(false===curVal){
        //   this.$parent.resetFields()
        // }
      },
    },
    mounted() {
      /**   wangEditor  **/
      for(let singleKey in this.formItemInfo.inputAttribute){
        if('textarea'===this.formItemInfo.inputAttribute[singleKey]['inputType'] && true===this.formItemInfo.inputAttribute[singleKey]['useRichTextEditor']){
          if(RichTextEditor.WANG_EDITOR===this.formItemInfo.richTextEditorConfiguration.name){

            this.inputValueEditor[singleKey]=new E(this.$refs[singleKey])
            let editor = this.inputValueEditor[singleKey]
            // inf('before assign editor.customConfig',editor.customConfig)
            // inf('wangEditorConfiguration',wangEditorConfiguration)
            Object.assign(editor.customConfig, wangEditorConfiguration)
            // inf('after assign editor.customConfig',editor.customConfig)
            // editor.customConfig.zIndex =
            editor.customConfig.onchange = (html) => {
              // console.log('onchange html',html)
              this.setContentToInputValue(singleKey,html)
              this.validSingleInputValueAndStoreResult({fieldName:singleKey});
              this.validateUnique({fieldName:singleKey,formItemInfo:this.formItemInfo});
              this.checkIfAllItemValidatedResultPass();
              this.ifAnyFieldValueChanged({keyName:singleKey});
              this.xssCheck({keyName:singleKey})
            }
            editor.customConfig.onfocus = (html) => {
              // console.log('onfocus html',html)
              this.focusInputPlaceHolderDisappear({keyName:singleKey})
              this.onFocus()
            }
            editor.customConfig.onblur = (html) => {
              this.setContentToInputValue(singleKey,html)
              this.blurInputPlaceHolderRestore({keyName:singleKey});
              this.validSingleInputValueAndStoreResult({fieldName:singleKey});
              this.validateUnique({fieldName:singleKey,formItemInfo:this.formItemInfo});
              this.checkIfAllItemValidatedResultPass();
              this.ifAnyFieldValueChanged({keyName:singleKey});
              this.onBlur();
              this.xssCheck({keyName:singleKey});
              // this.blurInputPlaceHolderRestore({keyName:singleKey})

            }
            editor.create()
            // inf('this.formItemInfo.inputValue[singleKey]',this.formItemInfo.inputValue[singleKey])
            // editor.txt.html(this.formItemInfo.inputValue[singleKey])
            // this.formItemInfo.inputValue[singleKey]
          }
        }
      }

    },
    methods: {
      /**********************************************/
      /**** eliminate margin-left for autoGen   ****/
      /*********************************************/
      // autoEliminateMarginLeft(){
      //   //只有总体呈水平排列（label和input/icon）,才需要消除margin-left
      //   if(this.formItemInfo.wholeArrangeMode==='h'){
      //     let ele=document.getElementsByClassName('autoGenAnchorToDeleteMarginLeft')//.getElementsByTagName('div')
      //     console.log('ele attr',ele.length)
      //     // console.log('ele attr',ele[0].getAttribute('class'))
      //   }
      // },

      /**   wangEditor  **/
      //keyName:字段名称
      //content:字段内容
        //将wangEditor的内容赋值给inputValue
      setContentToInputValue(keyName,content){

        this.formItemInfo.inputValue[keyName] = content
/*        this.$parent.validateField(keyName, (validResult) => {
          // inf('fieldName',fieldName)
          // inf('validSingleInputValueAndStoreResult',validResult)
          this.formItemInfo.inputTempData[keyName][InputTempDataFieldName.VALID_RESULT] = validResult
          this.checkIfAllItemValidatedResultPass()
          // inf('this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT]',this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT])
        })*/
      },

      //根据是否处于edit，相应的设置input的trigger。如果disable editable，那么去除blur；否则加上blur
      setTriggerOfInput(curVal){
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
      },
      /************************/
      /****    common      ***/
      /************************/
      //获得字段的required的定义，返回true/false(undefined 也被视为false)
      getFieldRequireDefinition({fieldName}){

        for(let fieldSingleRuleDefinition of this.formItemInfo.rule[fieldName]){
          if(undefined!==fieldSingleRuleDefinition['required']){
            return {'required':fieldSingleRuleDefinition['required'],'message':fieldSingleRuleDefinition['message']}
          }
        }

        //undefined 被视为false
        return {'required':false,'message':`${this.formItemInfo.inputAttribute[fieldName][InputAttributeFieldName.LABEL]}不能为空`}
      },
      /************************/
      /****   预处理数据    ***/
      /************************/
      //将传入数据保存为原始数据（载入已经更新数据之后），以便判断是否可以更新
/*      saveAsOriginData({valueFromDb,neededFields}){
        this.formItemInfo.inputOriginValue=misc.extractPartObject({sourceObj:valueFromDb,neededKeyNames:neededFields})
      },*/
      loadServerData({valueFromDb,neededFields}){
        // inf('load in')
        // let copyOfValueFromDb=misc.objectDeepCopy(valueFromDb)
        let copyOfValueFromDb=misc.extractPartObject({sourceObj:valueFromDb,neededKeyNames:neededFields})
        // inf('copyOfValueFromDb',copyOfValueFromDb)
        // this.formItemInfo.inputOriginValue=copyOfValueFromDb
        for(let singleKey in copyOfValueFromDb){
          //autoGen，需要根据数量，自动更新对应的数组
          // inf('singleKey',singleKey)
          // inf('this.formItemInfo.inputAttribute[singleKey][InputAttributeFieldName.AUTO_GEN]',this.formItemInfo.inputAttribute[singleKey][InputAttributeFieldName.AUTO_GEN])

          if(true===this.formItemInfo.inputAttribute[singleKey][InputAttributeFieldName.AUTO_GEN]){
            //此autoGen字符有值（长度大于0）
            if(undefined!==copyOfValueFromDb[singleKey] && copyOfValueFromDb[singleKey].length>0){
              let length=copyOfValueFromDb[singleKey].length
              this.formItemInfo.inputArrayAttribute[singleKey]=new Array(length)
              this.formItemInfo.inputArrayTempData[singleKey]=new Array(length)

              // this.formItemInfo.inputOriginValue[singleKey]=copyOfValueFromDb[singleKey]

              // let length=copyOfValueFromDb[singleKey].length
              let tmpLength=0
              while (tmpLength<length){
                // inf('copyOfValueFromDb[singleKey][tmpLength]',copyOfValueFromDb[singleKey][tmpLength])
                // this.formItemInfo.inputValue[singleKey].push(copyOfValueFromDb[singleKey][tmpLength])
                // this.formItemInfo.inputOriginValue[singleKey].push(copyOfValueFromDb[singleKey][tmpLength])
/*                this.formItemInfo.inputArrayAttribute[singleKey].push(misc.objectDeepCopy(this.formItemInfo.inputAttribute[singleKey]))
                this.formItemInfo.inputArrayTempData[singleKey].push(misc.objectDeepCopy(this.formItemInfo.inputTempData[singleKey]))*/
                this.formItemInfo.inputArrayAttribute[singleKey][tmpLength]=misc.objectDeepCopy(this.formItemInfo.inputAttribute[singleKey])
                this.formItemInfo.inputArrayTempData[singleKey][tmpLength]=misc.objectDeepCopy(this.formItemInfo.inputTempData[singleKey])
                tmpLength++
              }
            }
          }
          //无论是否autoGen，首要赋值，且设置originValue
          this.formItemInfo.inputValue[singleKey]=copyOfValueFromDb[singleKey]
          //重新复制，防止是Object，导致无法inputValue/originValue指向同一个地方
          this.formItemInfo.inputOriginValue[singleKey]=misc.objectDeepCopy(copyOfValueFromDb[singleKey])
            // this.formItemInfo.inputOriginValue[singleKey]=copyOfValueFromDb[singleKey]
            // this.formItemInfo.inputValue=misc.objectDeepCopy(valueFromDb)
            // this.formItemInfo.inputOriginValue=misc.objectDeepCopy(valueFromDb)

        }

        //如果是textarea且有editor实例，那么需要用load的值来初始化editor
        for(let singleKey in this.formItemInfo.rule){
          if(undefined!==this.inputValueEditor[singleKey] && undefined!==this.formItemInfo.inputValue[singleKey]){
            this.inputValueEditor[singleKey].txt.html(this.formItemInfo.inputValue[singleKey])
          }
        }
        // inf('load done')
        // inf('his.formItemInfo.inputArrayTempData',this.formItemInfo.inputArrayTempData)
        // inf('his.formItemInfo.inputValue',this.formItemInfo.inputValue)
        //loadServerData完毕，需要对数据进行验证，以便设置validateResult（否则都是null，会造成checkIfAllItemValidatedAndPass返回false）
        // setTimeout('this.validAllInputValueAndStoreResult()',1000)
        let that=this
        this.$nextTick(function () {
          that.validAllInputValueAndStoreResult()
        })

      },
      //获得改变过的值
      getChangedValue(){
        // let finalData={}
        this.formItemInfo.changedValue={}
        for(let singleKey in this.formItemInfo.rule){
          //a. inputValue和inputOriginalValue都有值
          if(undefined!==this.formItemInfo.inputValue[singleKey] && undefined!==this.formItemInfo.inputOriginValue[singleKey]){
            //值发生变化，添加到finalData（上传至server）
            if(JSON.stringify(this.formItemInfo.inputValue[singleKey])!==JSON.stringify(this.formItemInfo.inputOriginValue[singleKey])){
              this.formItemInfo.changedValue[singleKey]=this.formItemInfo.inputValue[singleKey]
            }
          }
          //b. inputValue有值，而inputOriginalValue为undefined
          if(undefined!==this.formItemInfo.inputValue[singleKey] && undefined===this.formItemInfo.inputOriginValue[singleKey]){
            this.formItemInfo.changedValue[singleKey]=this.formItemInfo.inputValue[singleKey]
          }
          //c. inputValue为undefined，而inputOriginalValue有值
          if(undefined===this.formItemInfo.inputValue[singleKey] && undefined!==this.formItemInfo.inputOriginValue[singleKey]){
            this.formItemInfo.changedValue[singleKey]=null
          }
        }
        // return finalData
      },
      ifSingleFieldValueChanged({keyName}){
        // inf('keyname',keyName)
        // inf('this.formItemInfo.inputValue[keyName]',this.formItemInfo.inputValue[keyName])
        // inf('this.formItemInfo.inputOriginValue[keyName]',this.formItemInfo.inputOriginValue[keyName])
        if(undefined!==this.formItemInfo.inputValue[keyName]){
          return this.formItemInfo.inputValue[keyName]!==this.formItemInfo.inputOriginValue[keyName]
        }
      },
      ifAllFieldValueChanged(){
        //假设全部改变
        let result=true
        for(let singleKey in this.formItemInfo.rule){
          if(false===this.ifSingleFieldValueChanged({keyName:singleKey})){
            return false
          }
        }
        return true
      },
      ifAnyFieldValueChanged({keyName}) {
        // inf('ifAnyFieldValueChanged keyName',keyName)
        if(this.formItemInfo.inputValue[keyName]!==this.formItemInfo.inputOriginValue[keyName]){
          // inf('ifAnyFieldValueChanged keyName new cahnged value',this.formItemInfo.inputValue[keyName])
          this.formItemInfo.changedValue[keyName]=this.formItemInfo.inputValue[keyName]
        }else{
          // inf('ifAnyFieldValueChanged keyName deleted',keyName)
          delete this.formItemInfo.changedValue[keyName]
        }
/*        let result=JSON.stringify(this.formItemInfo.inputValue)!==JSON.stringify(this.formItemInfo.inputOriginValue)
        this.$emit('ifAnyFieldValueChanged',result)*/
// inf('this.formItemInfo.changedValue',this.formItemInfo.changedValue)
//         inf('Object.keys(this.formItemInfo.changedValue)',Object.keys(this.formItemInfo.changedValue))
        if(Object.keys(this.formItemInfo.changedValue).length>0){
          this.$emit('ifAnyFieldValueChanged',true)
        }else{
          this.$emit('ifAnyFieldValueChanged',false)
        }
      },
      /************************/
      /****  判断返回结果  ***/
      /************************/
      //判断返回的值里是否为captcha的错误，是否话，错误信息显示在captcha的input下
      checkIfCaptchaErrAndShow({data}){
        // inf('checkIfCaptchaErrAndShow in')
        if(-1!==[60054,60056].indexOf(data.rc)){
          this.formItemInfo.inputTempData['captcha']['validResult']=data.msg
          return true
        }else{
          return false
        }
      },
      //判断返回的值里是否为99999的错误（字段server端验证失败），是的话，错误信息显示在captcha的input下
      checkIf99999ErrAndShow({data}){
        // inf('checkIf99999ErrAndShow in')
        if(data.rc===99999){
          for(let singleKey in data.msg){
            this.formItemInfo.inputTempData[singleKey][InputTempDataFieldName.VALID_RESULT]=data.msg[singleKey]['msg']
          }
          return true
        }
        return false
      },
      //将子组件captcha的getCaptchaImg_async方法暴露出来，供formitem的父组件调用
      getCaptchaImg_async(){
        if(undefined !== this.formItemInfo.captchaInfo){
          this.$refs[this.formItemInfo.captchaInfo.captchaImgId][0].getCaptchaImg_async()
        }
      },
      onFocus(){
        this.$emit('onFocus')
      },
      onBlur(){
        this.$emit('onBlur')
      },
      /************************/
      /****  placeHolder  ****/
      /***********************/
      //模拟safiri，点击input时，placeHolder内容消失
      focusInputPlaceHolderDisappear({keyName,idx}) {
        // inf('focusInputPlaceHolderDisappear in')
        let fieldAttribute=this.formItemInfo.inputAttribute[keyName]
        //如果是autoGen，直接在inputArrayTempData操作
        if(true===fieldAttribute[InputAttributeFieldName.AUTO_GEN]){
          if(undefined===idx){
            err(`for autoGen field ${keyName}, miss parameter idx`)
          }else{
            if (null === this.formItemInfo.inputValue[keyName][idx] || '' === this.formItemInfo.inputValue[keyName][idx]) {
              this.formItemInfo.inputArrayAttribute[keyName][idx][InputAttributeFieldName.PLACE_HOLDER] = ['']
            }
          }
        }
        //non autoGen
        else{
          if (null === this.formItemInfo.inputValue[keyName] || '' === this.formItemInfo.inputValue[keyName]) {
            this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = ['']
          }
        }

        // inf('after this.userInputValue[this.currentType]',this.inputAttribute[this.currentType][keyName][InputAttributeFieldName.PLACE_HOLDER])
      },

      //如果离开input时，inputValue为空，需要恢复placeholder内容
      blurInputPlaceHolderRestore({keyName,idx}) {
inf('blurInputPlaceHolderRestore keyName',keyName)
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

      },
      restorePlaceHolder({keyName,idx}){
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

      },

      /*********************/
      /****  validate  ****/
      /*********************/
      //字段的unique检测
      //不知道为啥，props,data和computed中的数据，不能放在promise的then中使用，如果要做设置，只能通过参数传递
      async validateUnique({fieldName,formItemInfo}) {
        // return true
        //非编辑状态，不执行validate
        if(this.editable===false){
          return
        }
        //inputAttribute中定义了unique为true，且有value，并验证通过，且定义了unique check的URL，那么进行unique检测
        if (undefined !== this.formItemInfo.inputAttribute[fieldName][InputAttributeFieldName.UNIQUE]
          && true === this.formItemInfo.inputAttribute[fieldName][InputAttributeFieldName.UNIQUE]
          && null!==this.formItemInfo.inputValue[fieldName] && ''!==this.formItemInfo.inputValue[fieldName]
          && ''===this.formItemInfo.inputTempData[fieldName]['validResult']  //说明验证通过
          && undefined!==this.formItemInfo.inputAttribute[fieldName][extraAttributeFieldName.UNIQUE_CHECK_URL] //有指定的URL
          && true===this.editable
        ) {
          // inf('this.formItemInfo',this.formItemInfo.inputTempData)
          let data={
            values: {
              // [ValidatePart.METHOD]: Method.CREATE,
              [ValidatePart.SINGLE_FIELD]: {[fieldName]: this.formItemInfo.inputValue[fieldName]},
            }
          }
          let response=await sendRequestGetResult_async({urlOption:this.formItemInfo.inputAttribute[fieldName][extraAttributeFieldName.UNIQUE_CHECK_URL],data:data})

          if(response.rc>0){

            // inf('this.formItemInfo.inputTempData[fieldName]',formItemInfo)
            formItemInfo.inputTempData[fieldName]['validResult']=JSON.stringify(response.msg)//.toString()
            // this.$emit('validateAllItemResult',false)
            // inf('this.formItemInfo.inputTempData[fieldName][\'validResult\']',formItemInfo.inputTempData[fieldName]['validResult'])
          }else{
            formItemInfo.inputTempData[fieldName]['validResult']=''

          }
          //因为是异步函数，需要在Promise返回后，手工调用validateIfAllItemPass_async进行检查
          // this.$options.methods.validateAllItemResult.bind(this)()
          // inf('err done')
          // this.$options.methods.onBlur.bind(this)()
          //如果需要对检查结果做特殊处理(例如，不需要显示错误结果)，此处为钩子
          this.$emit('uniqueCheckResult',{fieldName:fieldName,data:response})
        }
      },
      //是否有重复
      validateDuplicate({keyName,idx}){
        // inf('validateDuplicate in with idx',idx)
        // inf('before valud reulst',this.formItemInfo.inputArrayTempData[keyName][idx][InputTempDataFieldName.VALID_RESULT])
        let tobeCheckValue=this.formItemInfo.inputValue[keyName][idx]
        let keyValue=this.formItemInfo.inputValue[keyName]
        if(''!==tobeCheckValue){
          // this.inputTempData[idx][InputTempDataFieldName.VALID_RESULT] =null
          for(let index in keyValue){
            // inf('index',index)
            //skip self
            if(idx!==parseInt(index)){
              let otherValue=keyValue[index]
              // inf('tobeCheckValue',tobeCheckValue)
              // inf('otherValue',otherValue)
              if(tobeCheckValue===otherValue){
                this.formItemInfo.inputArrayTempData[keyName][idx][InputTempDataFieldName.VALID_RESULT] = `重复值`
                return
              }
            }
          }
        }
        // this.formItemInfo.inputArrayTempData[keyName][idx][InputTempDataFieldName.VALID_RESULT] =''
      },
      //存储 单个input 的检测结果（null：为检测，非空字符：检测通过，空字符：检测通过）
      validSingleInputValueAndStoreResult({fieldName,idx}) {
        // inf('validSingleInputValueAndStoreResult fieldName',fieldName)
        // inf('validSingleInputValueAndStoreResult idx',idx)
        //非编辑状态，不执行validate
        if(this.editable===false){
          return
        }
//
        if(true===this.formItemInfo.inputAttribute[fieldName][InputAttributeFieldName.AUTO_GEN]){
          //如果是autoGen的inputValue不是null，那么一一检测单个元素(并消除全局错误消息)
          if(null!==this.formItemInfo.inputValue[fieldName] && undefined!==idx){
            //并消除全局错误消息
            this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT]=''
        //     inf('validSingleInputValueAndStoreResult fieldName',fieldName)
        // inf('validSingleInputValueAndStoreResult idx',idx)
        //     inf('this.formItemInfo.inputValue[fieldName][idx]',this.formItemInfo.inputValue[fieldName][idx])
        //     inf('this.formItemInfo.inputAttribute[fieldName][idx]',this.formItemInfo.inputArrayAttribute[fieldName])

            this.$parent.validateField(`${fieldName}.${idx}`, (validResult) => {
              // inf('validSingleInputValueAndStoreResult fieldName validate result',validResult)
              // inf('validSingleInputValueAndStoreResult fieldName validate err',err)
              this.formItemInfo.inputArrayTempData[fieldName][idx][InputTempDataFieldName.VALID_RESULT] = validResult
            })
          }else{
            //否则，根据rule中require的定义，对字段设置整体结果
            //如果没有任何数据，则要结合rule中定义，是否require，autogen的全局validResult(直接放置在inputTempData)
            let requiredDefine = this.getFieldRequireDefinition({fieldName: fieldName})
            // inf('requiredDefine', requiredDefine)
            //autoGen为必须字段，但是没有任何值（没有任何元素），需要（手工）设置全局错误
            if(true===requiredDefine['required']){
              // let fieldChineseName=this.formItemInfo.inputAttribute[fieldName][InputAttributeFieldName.LABEL]
              this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT]=requiredDefine['message']
            }
          }

        }else{
          //普通字段
          this.$parent.validateField(fieldName, (validResult) => {
            // inf('fieldName',fieldName)
            // inf('validSingleInputValueAndStoreResult',validResult)
            // inf('validSingleInputValueAndStoreResult fieldName validate result',validResult)
            this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT] = validResult
            // this.checkIfAllItemValidatedResultPass()
            /*          if(validResult===""){
                        this.$emit('validSingleInputValueAndStoreResult',validResult)
                      }*/

            // inf('this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT]',this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT])
          })
        }
        // inf('validSingleInputValueAndStoreResult fieldName done',fieldName)
      },
      validAllInputValueAndStoreResult(){
        // 对所有数据（无论是否null）进行检查
        // if( undefined!==this.formItemInfo.inputValue){
          for(let singleKey in this.formItemInfo.inputValue){
            //autoGen，且有inputValue，那么需要对每个元素验证
            if(true===this.formItemInfo.inputAttribute[singleKey][InputAttributeFieldName.AUTO_GEN]){
              if(null!== this.formItemInfo.inputValue[singleKey] && this.formItemInfo.inputValue[singleKey].length>0){
                // inf(`atuo gen field ${singleKey} validate result by idx`)
                for(let idx in this.formItemInfo.inputValue[singleKey]){
                  this.validSingleInputValueAndStoreResult({fieldName:singleKey,idx:idx})
                }
              }else {
                this.validSingleInputValueAndStoreResult({fieldName:singleKey})
              }
            }else{
              // inf('singleKey',singleKey)
              this.validSingleInputValueAndStoreResult({fieldName:singleKey})
            }

          }
        // }
      },
      /**   通过检测validaResult来判断是否所有item都pass（而不是直接调用iview的valida方法，否则，没有做过输入的input会出现错误，不好看）**/
      checkIfAllItemValidatedResultPass() {
        // inf('checkIfAllItemValidatedResultPass in')
        //非编辑状态，不执行validate
        if(this.editable===false){
          return
        }
        let flag=true //默认通过validate
        for (let singleFieldName in this.formItemInfo.inputAttribute) {
          let fieldAttribute=this.formItemInfo.inputAttribute[singleFieldName]
          // inf('singleFieldName',singleFieldName)
          // inf('this.formItemInfo.inputAttribute[singleFieldName]',this.formItemInfo.inputAttribute[singleFieldName])
          if(true===fieldAttribute[InputAttributeFieldName.AUTO_GEN]){
            //autoGen的验证结果保存在inputArrayTempData中
            // inf('this.checkIfAllAutoGenItemValidatedResultPass({keyName:singleFieldName})',this.checkIfAllAutoGenItemValidatedResultPass({keyName:singleFieldName}))
            if(this.checkIfAllAutoGenItemValidatedResultPass({keyName:singleFieldName})===false){
              flag=false
              break
            }
            /*if(undefined===this.formItemInfo.inputArrayTempData[singleFieldName]){
              err(`field ${singleFieldName} is autoGen, but no related inputArrayTempData`)
            }else{
              for(let idx in this.formItemInfo.inputArrayTempData[singleFieldName]){
                let eleValidateResult=this.formItemInfo.inputArrayTempData[singleFieldName][idx][InputTempDataFieldName.VALID_RESULT]
/!*                if(null===eleValidateResult){
                  this.validateSingleAutoGenItemAndStoreResult({keyName:singleFieldName,idx:idx})
                }*!/
                if(null !==eleValidateResult && '' !==eleValidateResult){
                  flag=false
                  break
                }
              }
            }*/
          }
          //non autoGen
          else{
            let singleFieldValidResult = this.formItemInfo.inputTempData[singleFieldName][InputTempDataFieldName.VALID_RESULT]
            // inf('singleFieldName',singleFieldName)
            let singleFieldRequired=this.formItemInfo.rule[singleFieldName][0]['required']
            // inf('singleFieldRequired',singleFieldRequired)
            //如果未经验证
            if(null === singleFieldValidResult){
              //且为必须，那么验证结果错误
              if(true===singleFieldRequired){
                flag=false
                break
              }
              //不是必须，这不做处理
            }else{
              //验证过
              //且验证错误（不顾是否require）
              if('' !== singleFieldValidResult){
                flag=false
                break
              }
            }

            /*//必须字段未经验证，或者字段验证失败
            if ( true===singleFieldRequired && (null === singleFieldValidResult || '' !== singleFieldValidResult)) {

              // inf('checkIfAllItemValidatedResultPass non autogen result false')
              // this.$emit('validateAllItemResult',false)
              // return
              flag=false
              break
            }*/
          }
        }
        // inf('checkIfAllItemValidatedResultPass flag',flag)
        this.$emit('checkIfAllItemValidatedResultPass',flag)
      },
      //通过检测inputTempData中所有字段的valid_result，判断是否所有item validate pass
      //产生事件validateAllItemResult，返回boolean
      async validateAllItemResult() {
        // inf('validateAllItemResult in')
        this.$parent.validate((validResult)=>{
          // inf('validateAllItemResult result',validResult)
          this.$emit('validateAllItemResult',validResult)
        })

      },
/*      async validateByRule_async(){
        let result=await this.$parent.validate()
        return Promise.resolve(result)
      },*/

      xssCheck({keyName,idx}){
        if(undefined!==this.formItemInfo.inputArrayAttribute
            && undefined!==this.formItemInfo.inputArrayAttribute[keyName]
          && true===this.formItemInfo.inputArrayAttribute[keyName][InputAttributeFieldName.AUTO_GEN]){

        }else{

        }
      },
      /***************************************************/
      /**************    autoGenFormItem    *************/
      /***************************************************/
      dismissError({keyName,idx}){
        // inf('idx',idx)
        if(null!==this.formItemInfo.inputArrayTempData[keyName][idx][InputTempDataFieldName.VALID_RESULT] && ''!==this.formItemInfo.inputArrayTempData[keyName][idx][InputTempDataFieldName.VALID_RESULT]){
          this.formItemInfo.inputArrayTempData[keyName][idx][InputTempDataFieldName.VALID_RESULT]=""
        }

      },
      //根据keyName判断一个autoGen的所有item是否已经都valid了
      checkIfAllAutoGenItemValidatedResultPass({keyName}){
        //判断所有元素是否验证通过（如果validResult为null，则要结合是否为require来判断），无法继续添加
        // inf('this.formItemInfo.inputValue[keyName]',this.formItemInfo.inputValue[keyName])
        //inputValue初始化成null
        if(null!==this.formItemInfo.inputValue[keyName]){
          // inf('this.formItemInfo.inputValue[keyName]',this.formItemInfo.inputValue[keyName])
          let length=this.formItemInfo.inputValue[keyName].length
          if(length>0){
            // inf('length',length)
            // inf('last validResult',this.formItemInfo.inputArrayTempData[keyName][length-1]['validResult'])
            while (length>0){
/*              if(null===this.formItemInfo.inputArrayTempData[keyName][length-1]['validResult']){
                await this.validateSingleAutoGenItemAndStoreResult({keyName:keyName,idx:length})
              }*/
// inf('this.formItemInfo.inputArrayTempData[keyName][length-1][\'validResult\']',this.formItemInfo.inputArrayTempData[keyName][length-1]['validResult'])
              //如果validResult为null，则要结合是否为require来判断
              if(null===this.formItemInfo.inputArrayTempData[keyName][length-1]['validResult'] ){
                //遍历key的所有rule(因为不知道require处于哪个rule)
                for(let singleRule of this.formItemInfo.rule[keyName]){
                  if(true===singleRule['required']){
                    return false
                  }
                }

              }else {
                if(""!==this.formItemInfo.inputArrayTempData[keyName][length-1]['validResult'] ){
                // this.formItemInfo.addItemButtonDisable[keyName]=true
                // showErrorInCenterMessage({that:that,msg:'有尚未填入内容的标签'})
                // this.formItemInfo.inputArrayTempData[keyName][length-1][InputTempDataFieldName.VALID_RESULT] = `文档标签不能为空啊`
                // this.formItemInfo.addItemButtonDisable[keyName]=true
                return false
                }
              }
              length--
            }
          }
        }
        // this.formItemInfo.addItemButtonDisable[keyName]=false
        return true
      },
      setAutoGenButtonStatusByCheckValidatedResult({keyName}){
        this.formItemInfo.addItemButtonDisable[keyName]=!this.checkIfAllAutoGenItemValidatedResultPass({keyName:keyName})
      },
      /***    not used for array    **/
      /*async validateSingleAutoGenItemAndStoreResult({keyName,idx}){
        let that=this
        return new Promise(function(resolve, reject){
          that.$parent.validateField(`${keyName}.${idx}`, (validResult) => {
            // inf('fieldName',keyName)
            // inf('validateSingleAutoGenItemAndStoreResult validResult',validResult)
            // inf(' this.formItemInfo.inputArrayTempData[keyName]', this.formItemInfo.inputArrayTempData[keyName])
            // inf(' this.formItemInfo.inputArrayTempData[keyName][idx]', this.formItemInfo.inputArrayTempData[keyName][idx])
            resolve(that.formItemInfo.inputArrayTempData[keyName][idx][InputTempDataFieldName.VALID_RESULT] = validResult)
            // this.validateAllItemResult()
            // inf('this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT]',this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT])
          })
        })

      },*/
      addItem({keyName}){
        // inf('keyname',keyName)
        let that=this
        this.formItemInfo.addItemButtonDisable[keyName]=true
        //如果inputValue未设置，则初始化
        if( null===this.formItemInfo.inputValue[keyName] || undefined=== this.formItemInfo.inputValue[keyName]){
          this.formItemInfo.inputValue[keyName]=[]
        }
        //判断是否所有已经存在的item都验证通过
        let existItemValidateResult=this.checkIfAllAutoGenItemValidatedResultPass({keyName:keyName})
        // inf('existItemValidateResult',existItemValidateResult)
        if(false===existItemValidateResult){
          return
        }
        //去除全局错误
        this.formItemInfo.inputTempData[keyName][InputTempDataFieldName.VALID_RESULT]=''
        //判断是否已经达到最大数量，如果没有，创建一个新的value/attribute/tempData
        let length=this.formItemInfo.inputValue[keyName].length
        if(length>=this.formItemInfo.numRange[keyName]['max']){
          this.formItemInfo.addItemButtonDisable[keyName]=true
          return
        }else{
          this.formItemInfo.inputValue[keyName].push('')
          this.formItemInfo.inputArrayAttribute[keyName].push(misc.objectDeepCopy(this.formItemInfo.inputAttribute[keyName]))
          this.formItemInfo.addItemButtonDisable[keyName]=true

          // this.$nextTick(function () {
            //设置tempData，需要设置validResult，以便运行checkIfAllItemPass(),且在界面上是否显示错误，提示用户输入（然而直接设置validResult和调用validField方法（报错）都无法触发界面错误）
            let newItemTempData=misc.objectDeepCopy(that.formItemInfo.inputTempData[keyName])
            // inf('before newItemTempData',newItemTempData)
            let requiredDefine = that.getFieldRequireDefinition({fieldName: keyName})
            if(true===requiredDefine['required']){
              newItemTempData[InputTempDataFieldName.VALID_RESULT]=requiredDefine['message']
            }
            // inf('after newItemTempData',newItemTempData)
            that.formItemInfo.inputArrayTempData[keyName].push(newItemTempData)
          // })




          // this.checkIfAllItemValidatedResultPass()
          //添加完成后，还要进行验证
          //不知为啥，不能直接使用validSingleInputValueAndStoreResult来验证已经存在的autoGen的元素（包prop不正确），所以手动修改

          // inf('this.checkIfAllAutoGenItemValidatedResultPass({keyName:keyName})',this.checkIfAllAutoGenItemValidatedResultPass({keyName:keyName}))
          // inf('this.formItemInfo.inputValue[keyName]',this.formItemInfo.inputValue[keyName])

        }

      },
      removeItem({keyName,idx}){
        this.formItemInfo.inputValue[keyName].splice(idx,1)
        this.formItemInfo.inputArrayAttribute[keyName].splice(idx,1)
        this.formItemInfo.inputArrayTempData[keyName].splice(idx,1)
        // inf('this.checkIfAllAutoGenItemValidatedResultPass({keyName:keyName})',this.checkIfAllAutoGenItemValidatedResultPass({keyName:keyName}))
        this.setAutoGenButtonStatusByCheckValidatedResult({keyName:keyName})
        //如果删除autoGen所有元素，需要进行全局（整个字段）检查
        if(this.formItemInfo.inputValue[keyName].length===0){
          this.validSingleInputValueAndStoreResult({fieldName:keyName})
        }
        // this.validateAllItemResult()
      },
      /***************************************************/
      /**************   初始化formItem数据   *************/
      /***************************************************/
      initFormItemInfo(){
        for(let singleKey in this.formItemInfo.rule){
          //并不是所有rule中字段都用作输入字段
          if(undefined!==this.formItemInfo.inputValue[singleKey]){
            this.formItemInfo.inputValue[singleKey]=null
            this.formItemInfo.changedValue[singleKey]=null
          }
          this.clearSingleItemError({keyName:singleKey})
        }
      },
      clearSingleItemError({keyName}){
        if(undefined!==this.formItemInfo.inputTempData[keyName]){
          this.formItemInfo.inputTempData[keyName][InputTempDataFieldName.VALID_RESULT]=null
        }
      },
      clearAllItemError(){
        for(let singleKey in this.formItemInfo.rule){
          this.clearSingleItemError({keyName:singleKey})
        }
      },

      /********************/
      /****  组件事件 *****/
      /********************/
      genCaptchaSuccess(){}
    },
    computed: {},
    data() {
      this.setTriggerOfInput(this.editable)
      return {

        newButtonDisable:false,//达到上限，为false（是否显示，通过editable控制）

        //采用style，优先级覆盖iview
        // buttonDisableStyle:this.$store.state.style.button.primary.disable,

        classVertical:'flex-flow-column-nowrap justify-content-flex-start align-items-flex-start align-content-flex-start',
        classHorizontal:'flex-flow-row-nowrap justify-content-flex-start align-items-flex-start align-content-flex-start',
        // ref:this.formItemInfo.captchaInfo.captchaImgId,

        //存储原始数据
        // inputOriginalValue:{},
        //如果是textarea，可能需要存储对应的editor实例
        inputValueEditor:{},
      }
    },
  }
</script>
