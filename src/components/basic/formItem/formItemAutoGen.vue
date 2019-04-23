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
  labelWidth:40,  //autoGen特有：当没有任何item时候，还需要显示label，此时使用formItem的labelWidth是无法实现的（没有item就没有formItem，也就没有label，所以label需要独立）
  labelPosition:,//autoGen特有：top or left。因为label是独立的，所以，需要从父级组件继承来，来设置label的位置
  inputWidth: ,//autoGen中的item，永远都是按行排列的,所以需要设置width
  addButtonSize, //AutoGen特定，确定按钮大小，默认不设置，size和labelSize一样
  addButtonMarginTop:,//因为addButton无法获得input的height（iview中input的高度包括本身以及error message的高度），所以提供此参数，以便手工居中

inputGlobalAppearanceSetting:
  ifUpdate: boolean，判断是否需要为inputValue保存一个副本，以便检查是否值发生了变化
  showStarForRequire:boolean, //字段为require，是否显示红色*
  inputSize:除了iview预定义的，还可以使用h1～h6定义大小
  labelSize: h1~h6





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
  <!--inputGlobalAppearanceSetting.showStarForRequire ? '':'noStarForRequire' ,-->
  <div :class="classHorizontal">
    <!--  一下formItem只是用来在没有item的时候，显示label用   -->
    <!--  是否显示* 和整体field有关，而不是和field下某个元素有关，所以需要显示的设置required，而不是通过元素的rule来设置 -->
    <FormItem v-if="0===inputCheckInfo.inputValue[fieldName].length"
              :label=" inputCheckInfo.inputAttribute[fieldName]['label']"
              :required="inputCheckInfo.rule[fieldName][0]['required']"
              :class="[inputGlobalAppearanceSetting.showStarForRequire && inputCheckInfo.inputAttribute[fieldName].required ? '':'noStarForRequire',
                          undefined===inputCheckInfo.labelSize ? '':inputCheckInfo.labelSize,
                          undefined===inputCheckInfo.inputSize ? '':inputCheckInfo.inputSize,
                          ]"
    >
    </FormItem>
    <!--:rules="inputCheckInfo.rule[ruleFieldName]"-->
    <FormItem v-for="(ele,idx) in inputCheckInfo.inputValue[fieldName]"
              :prop="fieldName+'.'+idx"
              :key="idx"
              :error="inputCheckInfo.inputArrayTempData[fieldName][idx]['validResult']"
              :required="false"
              :rules="inputCheckInfo.rule[ruleFieldName]"

              :class="[inputGlobalAppearanceSetting.showStarForRequire && inputCheckInfo.inputAttribute[fieldName].required ? '':'noStarForRequire',
                          undefined===inputCheckInfo.labelSize ? '':inputCheckInfo.labelSize,
                          undefined===inputCheckInfo.inputSize ? '':inputCheckInfo.inputSize,
                          idx>0 ? 'marginLeft0':''
                          ]"
              class="marginR7"
              :label="idx===0 || undefined===idx  ? inputCheckInfo.inputAttribute[fieldName]['label']:''"

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
        :style="[{width:inputAppearanceSetting[fieldName].inputWidth+'px'}]"
        style="margin-left: 0px;"
      >

      <!--:class="[editable ? '':'inputUnEditAble', 'title'===inputAttribute[idx]['inputSize'] ? 'inputTitle':'']" :readonly="!editable"-->
      <span slot="prepend"  style="border-left: 0px" v-if="undefined!==inputCheckInfo.icon  && null!==inputCheckInfo.icon && ''!==inputCheckInfo.icon">
        <Icon :type="inputCheckInfo.icon" size="20" :color="inputCheckInfo.iconColor"></Icon>
      </span>
      <!--:style="{visibility: editable ? 'visible':'hidden'}"-->
      <!--v-if="editable===true"-->
      <span slot="append" style=""  class="cursorPointer "
            @click="_removeItem_async({idx:idx})">
        <Icon type="md-remove-circle" size="18"  class="color-lighten-red" title="移除"></Icon>
      </span>
      </Input>
    </FormItem>
    <Tooltip :content="addItemButtonTooltipMsg"
             placement="top" >
      <Icon type="md-add-circle"
            :size="undefined!==inputAppearanceSetting[fieldName].addButtonSize ? inputAppearanceSetting[fieldName].addButtonSize:inputGlobalAppearanceSetting.labelSize"
            :disabled="addItemButtonDisable"
            :class="[addItemButtonDisable ? 'color-grey':'color-primary cursor-pointer']"
            @click="addItem_async();"
            :style="[{'margin-top': inputAppearanceSetting[fieldName].addButtonMarginTop+'px'}]"
      >
      </Icon>
    </Tooltip>

    <!--</div>-->

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

      this._setAddItemButtonEnable()
      // this.addItemButtonDisable=false//默认是可以addItem
      // this.addItemButtonTooltipMsg=`添加新${this.inputCheckInfo.inputArrayAttribute[this.fieldName][0]['label']}`
      //1. 检测inputValue是否为数组（防止字符）, 如果不是，初始化为只有一个空元素的数组（以便formItem能显示label）
      if(false===misc.isArray(this.inputCheckInfo.inputValue[this.fieldName])){
        this.inputCheckInfo.inputValue[this.fieldName]=[]
        // this.inputCheckInfo.inputArrayTempData[this.fieldName].push({[InputTempDataFieldName.VALID_RESULT]:null})
        // // this.inputCheckInfo.inputArrayTempData[this.fieldName].push({[InputTempDataFieldName.VALID_RESULT]:null})
        // this.inputCheckInfo.inputArrayAttribute[this.fieldName].push(misc.objectDeepCopy(this.inputCheckInfo.inputAttribute[this.fieldName]))
        // return true
      }
      //2. 根据min/maxItemNum，截断inputValue
      let inputValueLength=this.inputCheckInfo.inputValue[this.fieldName]
      //2.1 inputValue的长度超过预定义，需要截断多余的元素，并disable addButton
      if(inputValueLength > this._maxItemNumber){
        console.log(`ERR:inputValue length exceed ${this._maxItemNumber}`)
        //添加 按钮 disable
        this._setAddItemButtonDisable_reachMaxItemNum()
        // this.addItemButtonDisable=true
        while (inputValueLength> this._maxItemNumber){
          //删除最后一个元素splice的第一个参数是idx
          this.inputCheckInfo.inputValue[this.fieldName].splice(inputValueLength-1,1)
          inputValueLength--
        }

        // this.addItemButtonDisable=true
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
        this.$nextTick(async function () {
          await formItemHelper.validateSingleFieldValueAndStoreValidResult_async({that:this})
        })
      }
    },
    methods: {
      _setAddItemButtonEnable(){
        this.addItemButtonDisable=false
        this.addItemButtonTooltipMsg=`添加新${this.inputCheckInfo.inputAttribute[this.fieldName]['label']}`
      },
      _setAddItemButtonDisable_reachMaxItemNum(){
        this.addItemButtonDisable=true
        this.addItemButtonTooltipMsg=`达到上限，无法继续添加`
      },
      _setAddItemButtonDisable_previousItemInputWrong(){
        this.addItemButtonDisable=true
        this.addItemButtonTooltipMsg=`输入不正确，无法继续添加`
      },
      //计算addButtonDisable是否enable
      _calcAndSetAddItemButtonDisableAStatus(){
        //判断是否已经达到最大数量，并设置按钮状态
        let currentValueLength=this.inputCheckInfo.inputValue[this.fieldName].length
        // console.log('currentValueLength',currentValueLength)
        // console.log('this.inputCheckInfo.numRange[this.fieldName][\'max\']',this.inputCheckInfo.numRange[this.fieldName]['max'])
        if(currentValueLength>=this.inputCheckInfo.numRange[this.fieldName]['max']){
          this._setAddItemButtonDisable_reachMaxItemNum()
          return false
          // return this.addItemButtonDisable=true
        }else{
          this._setAddItemButtonEnable()
          return true
          // return this.addItemButtonDisable=false
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
      async checkIfAllAutoGenItemValidatedResultPass_async(){
        //判断所有元素是否验证通过（如果validResult为null，则要结合是否为require来判断），无法继续添加
        // inf('this.formItemInfo.inputValue[keyName]',this.formItemInfo.inputValue[keyName])
        //inputValue初始化成null
        let keyName=this.fieldName
        if(null!==this.inputCheckInfo.inputValue[keyName]){
          // inf('this.formItemInfo.inputValue[keyName]',this.formItemInfo.inputValue[keyName])
          let length=this.inputCheckInfo.inputValue[keyName].length
          while (length>0){
            //如果单个item的validResult为null，说明此item尚未验证，则直接返回false（item默认require为true）
            if(null===this.inputCheckInfo.inputArrayTempData[keyName][length-1][InputTempDataFieldName.VALID_RESULT] ){
              //根据inputArrayTempData，是否已经验证过，没有的话，进行验证
                let singleValidateResult=await this._validateItemValueAndStoreResult_async({idx:length-1})
              // console.log('checkIfAllAutoGenItemValidatedResultPass_async: null check result',singleValidateResult)
                if(false===singleValidateResult){
                  return Promise.resolve(false)
                }
            }else {
              if(""!==this.inputCheckInfo.inputArrayTempData[keyName][length-1]['validResult'] ){
                return Promise.resolve(false)
              }
            }
            length--
          }
          // }
        }
        // this.formItemInfo.addItemButtonDisable[keyName]=false
        return Promise.resolve(true)
      },
      async addItem_async(){
        // inf('keyname',keyName)
        let keyName=this.fieldName
        let that=this


        //判断是否所有已经存在的item都验证通过，没有通过，则按钮状态为disable
        let existItemValidateResult=await this.checkIfAllAutoGenItemValidatedResultPass_async()
        console.log('existItemValidateResult',existItemValidateResult)
        if(false===existItemValidateResult){
          this._setAddItemButtonDisable_previousItemInputWrong()
          return this.$emit('addItem')
          // return this.addItemButtonDisable=true
        }
        //计算并设置 添加 按钮的状态
        if(false===this._calcAndSetAddItemButtonDisableAStatus()){
          return this.$emit('addItem')
        }
        //去除全局错误
        this.inputCheckInfo.inputTempData[keyName][InputTempDataFieldName.VALID_RESULT]=''

        // 如果没有，创建一个新的value/attribute/tempData
        this.inputCheckInfo.inputValue[keyName].push('')
        this.inputCheckInfo.inputArrayAttribute[keyName].push(misc.objectDeepCopy(this.inputCheckInfo.inputAttribute[keyName]))
        this.inputCheckInfo.inputArrayTempData[keyName].push({[InputTempDataFieldName.VALID_RESULT]:null})
        // })
        // console.log('_validateItemValueAndStoreResult_async')
        // console.log('_validateItemValueAndStoreResult_async idx',this.inputCheckInfo.inputValue[keyName].length-1)
        this.$nextTick(async function () {
          //立即对新添加的item进行验证，如果不通过，给出明确的错误提示，让整体提交的按钮disable（不验证，无提示，直接disable整体提交按钮，用户会困惑）
          await that._validateItemValueAndStoreResult_async({idx:this.inputCheckInfo.inputValue[keyName].length-1})
        })


        // console.log('_validateItemValueAndStoreResult_async done')
        //计算并设置 添加 按钮的状态
        this._calcAndSetAddItemButtonDisableAStatus()
        this.$emit('addItem')
      },
      async _removeItem_async({idx}){
/*        //第一个元素不能被删除，只能清existItemValidateResult 空为空字符（这样才能显示formItem的label）
        if(0===idx){
          this.inputCheckInfo.inputValue[this.fieldName][idx]=''
          this.inputCheckInfo.inputArrayTempData[this.fieldName][idx][InputTempDataFieldName.VALID_RESULT]=null
          this.inputCheckInfo.inputArrayAttribute[this.fieldName][idx][InputAttributeFieldName.PLACE_HOLDER]=this.inputCheckInfo.inputArrayAttribute[this.fieldName][idx][InputAttributeFieldName.PLACE_HOLDER_BKUP]
          //再次
          // return await this._validateItemValueAndStoreResult_async({idx:0})
        }else{*/
          //删除对应的值
          this.inputCheckInfo.inputValue[this.fieldName].splice(idx,1)
          this.inputCheckInfo.inputArrayAttribute[this.fieldName].splice(idx,1)
          this.inputCheckInfo.inputArrayTempData[this.fieldName].splice(idx,1)
        // }


        //计算并设置 添加 按钮的状态
        this._calcAndSetAddItemButtonDisableAStatus()

        //触发事件，以便父组件检测，删除item后，是否符合rule
        this.$emit('removeItem')
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
        }

      },

      //和非autoGen的formItem不一样，因为要传入idx这个参数，所以无法做成函数放入formItemHelper中
      //validate单个item的值，将结果存入inputArrayTempData，并返回验证结果是否通过
      async _validateItemValueAndStoreResult_async({idx}){
        let that=this
        return new Promise(function(resolve, reject){
          that.$parent.validateField(`${that.fieldName}.${idx}`, (validResult) => {
            that.inputCheckInfo.inputArrayTempData[that.fieldName][idx][InputTempDataFieldName.VALID_RESULT] = validResult
            console.log('_validateItemValueAndStoreResult_async valid result',validResult)
            if(''===validResult){
              // console.log('validate reulst “”')
              return resolve(true)
            }else{
              // console.log('validate reulst err')
              return resolve(false)
            }

          })
        })

      },
      /************************/
      /****  判断返回结果  ***/
      /************************/

      onFocus({idx}){
        //1. onFocus，清空placeHolder(理论上应该是inputValue为空才设置placeHolder，但是判断也需要代码，干脆直接清空placeHolder)
        this.inputCheckInfo.inputArrayAttribute[this.fieldName][idx][InputAttributeFieldName.PLACE_HOLDER]=''

        this.$emit('onFocus')
      },
      async onBlur_async({idx}){
        formItemHelper.setPlaceHolderWhenInputValueNull_AutoGen({inputCheckInfo:this.inputCheckInfo,fieldName:this.fieldName,idx:idx})
        // this._setPlaceHolderWhenInputValueNull({idx:idx})
        let result=await this._validateItemValueAndStoreResult_async({idx:idx})
        if(true===result){
          this._setAddItemButtonEnable()
        }else{
          this._setAddItemButtonDisable_previousItemInputWrong()
          return this.$emit('onBlur')
        }

        if(undefined!==this.inputActionSetting[this.fieldName]['uniqueCheckOption']){
          await formItemHelper.validateUnique_async({inputCheckInfo:this.inputCheckInfo,inputActionSetting:this.inputActionSetting,fieldName:this.fieldName})
        }
        this.$emit('onBlur')
      },
      async onChange_async({idx}){
        //1. 检查inputValue，如果是空字符，或者null，说明需要设置ph
        formItemHelper.setPlaceHolderWhenInputValueNull_AutoGen({inputCheckInfo:this.inputCheckInfo,fieldName:this.fieldName,idx:idx})
        //2. 验证输入（即使空）
        let result=await this._validateItemValueAndStoreResult_async({idx:idx})
        true===result ? this._setAddItemButtonEnable():this._setAddItemButtonDisable_previousItemInputWrong()
        this.$emit('onChange')
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
        addItemButtonTooltipMsg:'',//addItemButton的提示信息
        _maxItemNumber:0,
        _minItemNumber:0,

      }
    },
  }
</script>
