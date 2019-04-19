<!--
inputCheckInfo: //由于iview的限制，必须整体出入，然后根据fieldName选择。无需rule，rule直接在Form中设置
  inputValue:数组
  //inputAttribute:数组 //虽然传入，无需使用
  inputTempData:数组  //用来记录全局错误，例如，item的数量是否超出最大限制
  inputArrayAttribute: 数组
  inputArrayTempData: 数组
  numRange：确定最小/最大可以添加的个数

fieldName:字符，从inputCheckInfo中选择合适的

inputAppearanceSetting://对input外观的设置
  icon: 数组，对每个需要设置icon的字段，设置一个icon字符；如果没有设置（undefined），或者是null或者''，则忽略图标
  iconColor: icon颜色
  editable:boolean。确定是否采用类inputUnEditAble，实现input无边框和readonly的效果
  isPassword:boolean
  labelPosition: top/left //因为有多个input，但是只能有一个label，所以无法使用iview自带的position，需要和form的设置一致
  labelWidth：//理由通labelPosition
  addButtonSize, //AutoGen特定，确定按钮大小，默认不设置，size和labelSize一样

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
  <!--根据labelPosition决定是 label和input间的位置；label和input水平还是垂直排列-->
  <!--idx>0 && inputCheckInfo.inputArrangeMode==='h' ? 'inputLabel-hidden':'',-->
  <!--:class="[ inputAppearanceSetting.labelPosition==='top'  ? classVertical: classHorizontal]"-->
  <!--autoGenAnchorToDeleteMarginLeft-->
  <div >
    <FormItem v-for="(ele,idx) in inputCheckInfo.inputValue[fieldName]"
              :prop="fieldName+'.'+idx"
              :key="idx"
              :error="inputCheckInfo.inputArrayTempData[fieldName][idx]['validResult']"
              :rules="inputCheckInfo.rule[ruleFieldName]"
              :class="[inputCheckInfo.showStarForRequire ? '':'noStarForRequire' ,
                          undefined===inputCheckInfo.labelSize ? '':inputCheckInfo.labelSize,
                          undefined===inputCheckInfo.inputSize ? '':inputCheckInfo.inputSize,
                          ]"
              class=" marginR4"
              :label="idx===0  ? inputCheckInfo.inputArrayAttribute[fieldName][0]['label']:''"
    >

      <!--:type="inputCheckInfo.inputAttribute[fieldName]['inputType']"-->
      <!--:autosize="inputCheckInfo.inputAttribute[fieldName]['autoSize']"-->
      <!--:class="[editable ? '':'inputUnEditAble']"-->
      <!--:readonly="!editable"-->
      <!--:style="{width: inputCheckInfo.inputWidth+'px'}"-->
      <Input
        @on-focus="onFocus({idx:idx});"
        @on-blur="onBlur_async({idx:idx});"
        @on-change="onChange_async({idx:idx})"
        type="text"
        v-model="inputCheckInfo.inputValue[fieldName][idx]"
        :placeholder="inputCheckInfo.inputArrayAttribute[fieldName][idx]['placeHolder'][0]"
      >

      <!--:class="[editable ? '':'inputUnEditAble', 'title'===inputAttribute[idx]['inputSize'] ? 'inputTitle':'']" :readonly="!editable"-->
      <span slot="prepend"  style="border-left: 0px" v-if="undefined!==inputCheckInfo.icon  && null!==inputCheckInfo.icon && ''!==inputCheckInfo.icon">
        <Icon :type="inputCheckInfo.icon" size="20" :color="inputCheckInfo.iconColor"></Icon>
      </span>
      <!--:style="{visibility: editable ? 'visible':'hidden'}"-->
      <!--v-if="editable===true"-->
      <span slot="append" style=""  class="cursorPointer"
            @click="removeItem({idx:idx})">
        <Icon type="md-remove-circle" size="18"  color="#aaaaaa" title="移除"></Icon>
      </span>
      </Input>
    </FormItem>
    <!--{hidden:!editable},-->
    <Icon type="md-add-circle"

          :disabled="addItemButtonDisable"
          :class="[undefined===inputAppearanceSetting.addButtonSize ? '':inputGlobalAppearanceSetting.labelSize,addItemButtonDisable ? 'color-grey':'color-primary cursor-pointer']"
          @click="addItem();"
    >
      添加
    </Icon>
  </div>

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
      //无论update还是create，都要初始化
      //0. 首先获得最小最大item数量
      this._getNumRange()
      //1. 检测inputValue是否为数组（防止字符）, 如果不是，初始化为空数组
      if(false===misc.isArray(this.inputCheckInfo.inputValue[this.fieldName])){
        this.inputCheckInfo.inputValue[this.fieldName]=['test']
      }
      //2. 根据min/maxItemNum，截断inputValue
      let inputValueLength=this.inputCheckInfo.inputValue[this.fieldName]
      //2.1 inputValue的长度超过预定义，需要截断多余的元素
      if(inputValueLength > this._maxItemNumber){
        console.log(`ERR:inputValue length exceed ${this._maxItemNumber}`)
        while (inputValueLength> this._maxItemNumber){
          //删除最后一个元素splice的第一个参数是idx
          this.inputCheckInfo.inputValue[this.fieldName].splice(inputValueLength-1,1)
          inputValueLength--
        }
      }
      //4. 如果是update操作，除了备份原始数据，还要根据原始数据(inputValue)的个数，生成对应的inputArrayAttribute/inputArrayTempData
      if(true===this.inputGlobalAppearanceSetting.ifUpdate) {
        this.inputValueBkup = misc.objectDeepCopy(this.inputCheckInfo.inputValue[this.fieldName])
      }
      //5. 根据inputValue，设置inputArrayTempData/Attribute
      let totalLength=this.inputCheckInfo.inputValue[this.fieldName].length
      while (totalLength>0){
        this.inputCheckInfo.inputArrayAttribute[this.fieldName].push(misc.objectDeepCopy(this.inputCheckInfo.inputAttribute[this.fieldName]))
        //update，认为验证结果是已经通过的
        this.inputCheckInfo.inputArrayTempData[this.fieldName].push({[InputTempDataFieldName.VALID_RESULT]:''})
        totalLength--
      }
    },
    async mounted(){
      //如果是update，需要验证从server获得的数据是否合格，并且把结果存储起来，以便父组件直接判断
      if(true===this.inputGlobalAppearanceSetting.ifUpdate){
        await formItemHelper.validateSingleFieldValueAndStoreValidResult_async({that:this})
      }
    },
    methods: {
      //计算addButtonDisable是否enable
      _calcAndSetAddItemButtonDisableAStatus(){
        //判断是否已经达到最大数量，并设置按钮状态
        let currentValueLength=this.inputCheckInfo.inputValue[this.fieldName].length
        if(currentValueLength>=this.inputCheckInfo.numRange[this.fieldName]['max']){
          return this.addItemButtonDisable=true
        }else{
          return this.addItemButtonDisable=false
        }
      },

      //获得ele的rule的require定义(主要是message)
      _getEleRequireDefinition(){
        for(let fieldSingleRuleDefinition of this.inputCheckInfo.rule[`${this.fieldName}.0`]){
          if(undefined!==fieldSingleRuleDefinition['required']){
            return {'required':fieldSingleRuleDefinition['required'],'message':fieldSingleRuleDefinition['message']}
          }
        }

        //undefined 被视为true
        return {'required':false,'message':`${this.inputCheckInfo.inputAttribute[this.fieldName][InputAttributeFieldName.LABEL]}不能为空`}
      },
      //判断autoGen的所有item是否已经都valid了
      checkIfAllAutoGenItemValidatedResultPass(){
        //判断所有元素是否验证通过（如果validResult为null，则要结合是否为require来判断），无法继续添加
        // inf('this.formItemInfo.inputValue[keyName]',this.formItemInfo.inputValue[keyName])
        //inputValue初始化成null
        let keyName=this.fieldName
        if(null!==this.inputCheckInfo.inputValue[keyName]){
          // inf('this.formItemInfo.inputValue[keyName]',this.formItemInfo.inputValue[keyName])
          let length=this.inputCheckInfo.inputValue[keyName].length
          // if(length>0){
            // inf('length',length)
            // inf('last validResult',this.formItemInfo.inputArrayTempData[keyName][length-1]['validResult'])
          while (length>0){
            /*              if(null===this.formItemInfo.inputArrayTempData[keyName][length-1]['validResult']){
                            await this.validateSingleAutoGenItemAndStoreResult({keyName:keyName,idx:length})
                          }*/
// inf('this.formItemInfo.inputArrayTempData[keyName][length-1][\'validResult\']',this.formItemInfo.inputArrayTempData[keyName][length-1]['validResult'])
            //如果单个item的validResult为null，说明此item尚未验证，则直接返回false（item默认require为true）
            if(null===this.inputCheckInfo.inputArrayTempData[keyName][length-1][InputTempDataFieldName.VALID_RESULT] ){
              //遍历key的所有rule(因为不知道require处于哪个rule)
/*              for(let singleRule of this.formItemInfo.rule[keyName]){
                if(true===singleRule['required']){*/
                  return false
 /*               }
              }*/

            }else {
              if(""!==this.inputCheckInfo.inputArrayTempData[keyName][length-1]['validResult'] ){
                // this.formItemInfo.addItemButtonDisable[keyName]=true
                // showErrorInCenterMessage({that:that,msg:'有尚未填入内容的标签'})
                // this.formItemInfo.inputArrayTempData[keyName][length-1][InputTempDataFieldName.VALID_RESULT] = `文档标签不能为空啊`
                // this.formItemInfo.addItemButtonDisable[keyName]=true
                return false
              }
            }
            length--
          }
          // }
        }
        // this.formItemInfo.addItemButtonDisable[keyName]=false
        return true
      },
      addItem(){
        // inf('keyname',keyName)
        let keyName=this.fieldName
        let that=this

        //判断是否所有已经存在的item都验证通过，没有通过，则按钮状态为disable
        let existItemValidateResult=this.checkIfAllAutoGenItemValidatedResultPass()
        // inf('existItemValidateResult',existItemValidateResult)
        if(false===existItemValidateResult){
          return this.addItemButtonDisable=true
        }
        //去除全局错误
        this.inputCheckInfo.inputTempData[keyName][InputTempDataFieldName.VALID_RESULT]=''
       /* //判断是否已经达到最大数量，
        let currentValueLength=this.inputCheckInfo.inputValue[keyName].length
        if(currentValueLength>=this.inputCheckInfo.numRange[keyName]['max']){
          this.addItemButtonDisable=true
          return false
        }*/

        // 如果没有，创建一个新的value/attribute/tempData
        this.inputCheckInfo.inputValue[keyName].push('')
        this.inputCheckInfo.inputArrayAttribute[keyName].push(misc.objectDeepCopy(this.inputCheckInfo.inputAttribute[keyName]))
        // this.addItemButtonDisable=true

        // this.$nextTick(function () {
        //设置tempData，需要设置validResult，以便运行checkIfAllItemPass(),且在界面上是否显示错误，提示用户输入（然而直接设置validResult和调用validField方法（报错）都无法触发界面错误）
        let newItemTempData=misc.objectDeepCopy(that.inputCheckInfo.inputTempData[keyName])
        // inf('before newItemTempData',newItemTempData)
        //require必定为true，但是为了获得message，所以还是要运行一下_getEleRequireDefinition
        let requiredDefine = that._getEleRequireDefinition()
        // if(true===requiredDefine['required']){
        newItemTempData[InputTempDataFieldName.VALID_RESULT]=requiredDefine['message']
        // }
        // inf('after newItemTempData',newItemTempData)
        that.inputCheckInfo.inputArrayTempData[keyName].push(newItemTempData)
        // })


        //计算并设置 添加 按钮的状态
        this._calcAndSetAddItemButtonDisableAStatus()

        // this.checkIfAllItemValidatedResultPass()
        //添加完成后，还要进行验证
        //不知为啥，不能直接使用validSingleInputValueAndStoreResult来验证已经存在的autoGen的元素（包prop不正确），所以手动修改

        // inf('this.checkIfAllAutoGenItemValidatedResultPass({keyName:keyName})',this.checkIfAllAutoGenItemValidatedResultPass({keyName:keyName}))
        // inf('this.formItemInfo.inputValue[keyName]',this.formItemInfo.inputValue[keyName])



      },
      removeItem({idx}){
        //删除对应的值
        this.inputCheckInfo.inputValue[this.fieldName].splice(idx,1)
        this.inputCheckInfo.inputArrayAttribute[this.fieldName].splice(idx,1)
        this.inputCheckInfo.inputArrayTempData[this.fieldName].splice(idx,1)

        //计算并设置 添加 按钮的状态
        this._calcAndSetAddItemButtonDisableAStatus()
        // inf('this.checkIfAllAutoGenItemValidatedResultPass({keyName:keyName})',this.checkIfAllAutoGenItemValidatedResultPass({keyName:keyName}))
        // this.setAutoGenButtonStatusByCheckValidatedResult({keyName:keyName})
        //如果删除autoGen所有元素，需要进行全局（整个字段）检查
/*        if(this.formItemInfo.inputValue[keyName].length===0){
          this.validSingleInputValueAndStoreResult({fieldName:keyName})
        }*/
        // this.validateAllItemResult()
      },
      //通过传入的numRange设置最小/最大数量。如果numRange没有最小，则设置最小为0；如果numRange没有最大，则设置最大为5
      _getNumRange(){
        //如果numRange没有设置numRange，直接设置默认值
        if(undefined===this.inputCheckInfo.numRange){
          this._minItemNumber=0
          this._maxItemNumber=5
        }else{
          //如果没有设置min，使用默认值0，否则从numRange读取
          if(undefined===this.inputCheckInfo.numRange[this.fieldName]['min']){
            this._minItemNumber=0
            console.log('not set min in numRange')
          }else{
            this._minItemNumber=this.inputCheckInfo.numRange[this.fieldName]['min']
          }
          //如果没有设置min，使用默认值0，否则从numRange读取
          if(undefined===this.inputCheckInfo.numRange[this.fieldName]['max']){
            this._maxItemNumber=5
            console.log('not set max in numRange')
          }else{
            this._maxItemNumber=this.inputCheckInfo.numRange[this.fieldName]['max']
          }
          // undefined===this.inputCheckInfo.numRange['max'] ?  this._maxItemNumber=5:this._maxItemNumber=this.inputCheckInfo.numRange['max']
        }



        /*if(undefined===this.inputCheckInfo.numRange || undefined===this.inputCheckInfo.numRange['min']){
          this._minItemNumber=0
        }
        if(undefined===this.inputCheckInfo.numRange || undefined===this.inputCheckInfo.numRange['max']){
          this._maxItemNumber=5
        }
        if(undefined!==this.inputCheckInfo.numRange['min']){
          this._minItemNumber=this.inputCheckInfo.numRange['min']
        }
        if(undefined!==this.inputCheckInfo.numRange['max']){
          this._maxItemNumber=this.inputCheckInfo.numRange['max']
        }*/
      },
      //当input的值为null或者''时，设置placeholder
      _setPlaceHolderWhenInputValueNull({idx}){
        if(null === this.inputCheckInfo.inputValue[this.fieldName][idx]
          || '' === this.inputCheckInfo.inputValue[this.fieldName][idx]){
          this.inputCheckInfo.inputArrayAttribute[this.fieldName][idx][InputAttributeFieldName.PLACE_HOLDER]=this.inputCheckInfo.inputArrayAttribute[this.fieldName][idx][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }
      },
      //和非autoGen的formItem不一样，因为要传入idx这个参数，所以无法做成函数放入formItemHelper中
      async _validateSingleFieldValueAndStoreValidResult_async({idx}){
        this.$parent.validateField(`${this.fieldName}.${idx}`, (validResult) => {
          // inf('validSingleInputValueAndStoreResult fieldName validate result',validResult)
          // inf('validSingleInputValueAndStoreResult fieldName validate err',err)
          this.inputCheckInfo.inputArrayTempData[this.fieldName][idx][InputTempDataFieldName.VALID_RESULT] = validResult
          return Promise.resolve(true)
        })
      },

      /************************/
      /****  判断返回结果  ***/
      /************************/

      onFocus({idx}){
        //1. 检查验证结果，验证失败（validResult不为空和null），则删除inputValue.
        //不要自动删除，也许用户只想在原来的基础上进行修改
/*        //实现了自动清空错误输入的功能
        if(null !== this.inputCheckInfo.inputTempData[this.fieldName][InputTempDataFieldName.VALID_RESULT]
          && '' !== this.inputCheckInfo.inputTempData[this.fieldName][InputTempDataFieldName.VALID_RESULT]){
          this.inputCheckInfo.inputValue[this.fieldName]=''
        }*/

        //2. 检查inputValue，如果是空字符，或者null，说明需要设置ph
        this._setPlaceHolderWhenInputValueNull({idx:idx})
/*        if(null === this.inputCheckInfo.inputValue[this.fieldName]
          || '' === this.inputCheckInfo.inputValue[this.fieldName]){
          this.inputCheckInfo.inputAttribute[this.fieldName][InputAttributeFieldName.PLACE_HOLDER]=this.inputCheckInfo.inputAttribute[this.fieldName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }*/
        this.$emit('onFocus')
      },
      async onBlur_async({idx}){

        await this._validateSingleFieldValueAndStoreValidResult_async({idx:idx})
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
      async onChange_async({idx}){
        //1. 检查inputValue，如果是空字符，或者null，说明需要设置ph
        this._setPlaceHolderWhenInputValueNull({inputCheckInfo:this.inputCheckInfo,fieldName:this.fieldName,idx:idx})
/*        if(null === this.inputCheckInfo.inputValue[this.fieldName]
          || '' === this.inputCheckInfo.inputValue[this.fieldName]){
          this.inputCheckInfo.inputAttribute[this.fieldName][InputAttributeFieldName.PLACE_HOLDER]=this.inputCheckInfo.inputAttribute[this.fieldName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }*/
        //2. 验证输入（即使空）
        await this._validateSingleFieldValueAndStoreValidResult_async({idx:idx})
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


        classVertical:'flex-flow-column-nowrap justify-content-flex-start align-items-flex-start align-content-flex-start',
        classHorizontal:'flex-flow-row-nowrap justify-content-flex-start align-items-flex-start align-content-flex-start',

        ruleFieldName:this.fieldName+'.0',//记录元素rule的fieldName

        addItemButtonDisable:true, //添加item的按钮是否disable，默认disable

        _maxItemNumber:0,
        _minItemNumber:0,
        //采用style，优先级覆盖iview
        // buttonDisableStyle:this.$store.state.style.button.primary.disable,

        // classVertical:'flex-flow-column-nowrap justify-content-flex-start align-items-flex-start align-content-flex-start',
        // classHorizontal:'flex-flow-row-nowrap justify-content-flex-start align-items-flex-start align-content-flex-start',



        // ref:this.inputCheckInfo.captchaInfo.captchaImgId,

        //存储原始数据
        // inputOriginalValue:{},
        //如果是textarea，可能需要存储对应的editor实例
        // inputValueEditor:{},
      }
    },
  }
</script>
