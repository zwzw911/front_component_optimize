/**
 * Created by 张伟 on 2019/3/22.
 * formItem一些帮助函数。将formItem根据不同类型分离后，有些公用的操作需要剥离出来
 */
'use strict'
import {InputAttributeFieldName,InputTempDataFieldName,ValidatePart} from '../constant/enum/nonValueEnum'
import * as network from '../function/network'

/***************************************************************************************/
/***************************************************************************************/
/*****************              combined formItem           ****************************/
/***************************************************************************************/
/***************************************************************************************/
/**   检测一个页面上，所有formItem的验证结果    **/
function checkWholeStatus({inputCheckInfo}){
  // alert('in')
  //根据inputValue进行遍历
  for(let singleFieldName in inputCheckInfo.inputValue){
    // console.log('singleFieldName',singleFieldName)
    //如果是autoGen，需要额外对inputArrayAttribute下每个元素检查结果。因为如果添加了item，这item内容必须为require（否则直接delete这个item）
    if(undefined!==inputCheckInfo.inputArrayAttribute[singleFieldName]){
      // console.log(`${singleFieldName} is autogen`)
      for(let idx in inputCheckInfo.inputArrayAttribute[singleFieldName]){

        //添加的item，require隐式为true
        // let requireDefinition=inputCheckInfo.inputArrayAttribute[singleFieldName][idx][InputAttributeFieldName.REQUIRED]
        // console.log('inputCheckInfo.inputArrayTempData[singleFieldName][idx]',inputCheckInfo.inputArrayTempData[singleFieldName][idx])
        let validResult=inputCheckInfo.inputArrayTempData[singleFieldName][idx][InputTempDataFieldName.VALID_RESULT]
        // if(true===requireDefinition){
        // console.log('idx',idx)
        // console.log('validResult',validResult)
          if(''!==validResult){
            return false
          }
        // }
        /*else{
          if(''!==validResult && null!==validResult){
            return false
          }
        }*/
      }
    }
    //非autoGen（普通字段）以及autoGen整体
    // else{
      //1. 所有require字段的validResult都要为空字符
      if(true===inputCheckInfo.inputAttribute[singleFieldName][InputAttributeFieldName.REQUIRED]){
        if(''!==inputCheckInfo.inputTempData[singleFieldName][InputTempDataFieldName.VALID_RESULT]){
          // this.wholeValidResult=false
          return false
        }
      }else{
        //2. 非require字段不能有字符（只能为空或者null）
        if(''!==inputCheckInfo.inputTempData[singleFieldName][InputTempDataFieldName.VALID_RESULT] &&
          null!==inputCheckInfo.inputTempData[singleFieldName][InputTempDataFieldName.VALID_RESULT]
        ){
          // this.wholeValidResult=false
          return false
        }
      }
    // }

  }
  // this.wholeValidResult=true
  return true
}


/** 判断2个object是否一致。必须保证参数都是非undefined/null的对象  **/
function ifSameObject({srcObj,destObj}){
  return JSON.stringify(srcObj)===JSON.stringify(destObj)
}


/**   以newObj为基准，和origObj比较，是否有变化。
 * 需要显示指出需要比较那些key，因为某些key在newOjb不存在，而另外一些key在origObj中不存在，无论以哪个为base，都可能漏掉，所以需要指定比较的key
 *
 * return: object。没有变化，返回空对象。如果是删除了key，则key设为null。
 * **/

function getChangeValue({newObj,origObj,keysArrayToBeCheck}){
  let changedValue={}
  for(let singleKey of keysArrayToBeCheck){
    //a. newObj 和 origObj 都有值，说明是修改
    if(undefined!==newObj[singleKey] && undefined!==origObj[singleKey]){
      //值发生变化，添加到finalData（上传至server）
      if(JSON.stringify(newObj[singleKey])!==JSON.stringify(origObj[singleKey])){
        changedValue[singleKey]=newObj[singleKey]
      }
      continue
    }
    //b. newObj 有值，而 origObj 为undefined，说明是添加
    if(undefined!==newObj[singleKey] && undefined===origObj[singleKey]){
      changedValue[singleKey]=newObj[singleKey]
      continue
    }
    //c. newObj 为undefined，而 origObj 有值，说明是删除
    if(undefined===newObj[singleKey] && undefined!==origObj[singleKey]){
      changedValue[singleKey]=null
    }
  }

  return changedValue
}
/***************************************************************************************/
/***************************************************************************************/
/*****************              single formItem           ****************************/
/***************************************************************************************/
/***************************************************************************************/
//验证并设置单个field的值是否valid。为了方便使用，从callback改成async
//that：formItem组件
async function validateSingleFieldValueAndStoreValidResult_async({that}){
  that.$parent.validateField(that.fieldName, (validResult) => {
    // console.log('valid result',validResult)
    // console.log('that.fieldName',that.fieldName)
    that.inputCheckInfo.inputTempData[that.fieldName][InputTempDataFieldName.VALID_RESULT] = validResult

    // console.log('that.inputCheckInfo.inputTempData[that.fieldName]',that.inputCheckInfo.inputTempData[that.fieldName])
    //输入验证通过，到server进行unique验证（如果有）
    return Promise.resolve(true)
  })
}
async function validateUnique_async({inputCheckInfo,inputActionSetting,fieldName}) {

  // inf('this.formItemInfo',this.formItemInfo.inputTempData)
  // let fieldName=this.fieldName
  let inputValue=inputCheckInfo.inputValue[fieldName]
  let data={
    values: {
      // [ValidatePart.METHOD]: Method.CREATE,
      [ValidatePart.SINGLE_FIELD]: {[fieldName]: inputValue},
    }
  }
  let response=await network.sendRequestGetResult_async({urlOption:inputActionSetting[fieldName].uniqueCheckOption,data:data})

  if(response.rc>0){

    // inf('this.formItemInfo.inputTempData[fieldName]',formItemInfo)
    inputCheckInfo.inputTempData[fieldName]['validResult']=JSON.stringify(response.msg)//.toString()
    // this.$emit('validateAllItemResult',false)
    // inf('this.formItemInfo.inputTempData[fieldName][\'validResult\']',formItemInfo.inputTempData[fieldName]['validResult'])
  }else{
    inputCheckInfo.inputTempData[fieldName]['validResult']=''

  }
}

//当autoGen的item的值为null或者''时，设置placeholder
function setPlaceHolderWhenInputValueNull_AutoGen({inputCheckInfo,fieldName,idx}){
  if(null === inputCheckInfo.inputValue[fieldName][idx]
    || '' === inputCheckInfo.inputValue[fieldName][idx]){
    inputCheckInfo.inputArrayAttribute[fieldName][idx][InputAttributeFieldName.PLACE_HOLDER]=inputCheckInfo.inputArrayAttribute[fieldName][idx][InputAttributeFieldName.PLACE_HOLDER_BKUP]
  }
}
//非autoGen的input，如果未设置值，添加placeHolder
function setPlaceHolderWhenInputValueNull({inputCheckInfo,fieldName}){
  if(null === inputCheckInfo.inputValue[fieldName]
    || '' === inputCheckInfo.inputValue[fieldName]){
    inputCheckInfo.inputAttribute[fieldName][InputAttributeFieldName.PLACE_HOLDER]=inputCheckInfo.inputAttribute[fieldName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
  }
}
export {
  checkWholeStatus,
  ifSameObject,
  getChangeValue,

  validateSingleFieldValueAndStoreValidResult_async,//验证并设置单个field的值是否valid
  validateUnique_async,

  setPlaceHolderWhenInputValueNull_AutoGen,
  setPlaceHolderWhenInputValueNull,
}
