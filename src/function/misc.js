/**
 * Created by 张伟 on 2019/03/13.
 */
'use strict'

import {inputValueForCreate,inputValueForUpdate} from '../constant/input/gen/inputValue'
import {inputAttribute} from '../constant/input/gen/inputAttribute'
import {inputTempData} from '../constant/input/gen/inputTempData'
import {ruleForCreate,ruleForUpdate} from '../constant/input/gen/rule'

import{additionalInput} from '../constant/input/additionalInput'
// import {icon} from '../constant/inputValue/manual/icon'
// import {extraAttribute} from '../constant/inputValue/manual/extraAttribute'
import {InputAttributeFieldName} from '../constant/enum/nonValueEnum'
import {numRange} from '../constant/input/gen/numRange'

/*import {additionalInputAttribute} from '../constant/additionalInputValue/inputAttribute'
import {additionalInputTempData} from '../constant/additionalInputValue/inputTempData'
import {additionalInputValue} from '../constant/additionalInputValue/inputValue'
import {additionalRuleForCreate,additionalRuleForUpdate} from '../constant/additionalInputValue/rule'
import {additionalIcon} from '../constant/additionalInputValue/icon'*/

import {host} from '../constant/configuration/appSetting'

const source={
  inputValueForCreate:inputValueForCreate,
  inputValueForUpdate:inputValueForUpdate,
  inputAttribute:inputAttribute,
  inputTempData:inputTempData,
  // icon:icon,
  // ruleForCreate:ruleForCreate,
  // ruleForUpdate:ruleForUpdate,
  rule:ruleForCreate,
  // extraAttribute:extraAttribute,
  numRange:numRange,
}

// inf('before func',source['inputValueForCreate']['article'])
/*
*
* 复制4个必须字段，并添加额外字段，例如 additionalFields: 非rule定义的字段（例如captcha）
* 因为create/update，可能某些字段的rule不一致（字段在create是require，但是update不需reuqire），因此需要method区分
* */
function genNeedInput({collName,allowFields,additionalFields,method='create'}) {
  let source={
    inputAttribute:inputAttribute,
    inputTempData:inputTempData,
    numRange:numRange,
  }
  if('create'===method){
    source['inputValue']=inputValueForCreate
    source['rule']=ruleForCreate
  }
  if('update'===method){
    source['inputValue']=inputValueForUpdate
    source['rule']=ruleForUpdate
  }
  // inf('collName',collName)
  // inf('source[\'icon\'][collName]',source['icon'][collName])
  //1. 复制 自动生成的 数据
  let finalResult={
    inputValue:objectPartlyDeepCopy({sourceObj:source['inputValue'][collName],expectedKey:allowFields}),
    // inputValueForUpdate:objectPartlyDeepCopy({sourceObj:source['inputValueForUpdate'][collName],expectedKey:allowFields}),
    inputAttribute:objectPartlyDeepCopy({sourceObj:source['inputAttribute'][collName],expectedKey:allowFields}),
    inputTempData:objectPartlyDeepCopy({sourceObj:source['inputTempData'][collName],expectedKey:allowFields}),
    rule:objectPartlyDeepCopy({sourceObj:source['rule'][collName],expectedKey:allowFields}),
    // icon:objectPartlyDeepCopy({sourceObj:source['icon'][collName],expectedKey:allowFields}),
    numRange:objectPartlyDeepCopy({sourceObj:source['numRange'][collName],expectedKey:allowFields}),//如果是autoGen，最多几个input

    /*      autoGen暂时不是自动生成     */
/*    inputArrayAttribute:{},//对于需要autoGen的字段，需要为每个元素存储attribute（使用attribute中的placeHolder）
    inputArrayTempData:{},//对于需要autoGen的字段，需要为每个元素存储tempData（存储验证结果）

    addItemButtonDisable:{},//每个可以autoGen的字段，addItemButton的状态*/
  }
  // inf('finalResult。icon',finalResult.icon)

  /*//2. 合并字段额外的定义（inputAttribute）
  let sourceInputAttribute=finalResult['inputAttribute']
  if(undefined!==source['extraAttribute'][collName]){
    let extraInputAttribute=objectPartlyDeepCopy({sourceObj:source['extraAttribute'][collName],expectedKey:allowFields})

    for(let singleField in sourceInputAttribute){
      if(undefined!==extraInputAttribute[singleField]){
        for(let singleExtraAttribute in extraInputAttribute[singleField]){
          if(undefined!==extraInputAttribute[singleField][singleExtraAttribute]){
            sourceInputAttribute[singleField][singleExtraAttribute]=extraInputAttribute[singleField][singleExtraAttribute]
          }
        }
      }
    }
  }*/

  //3. 合并额外的字段，例如captcha
  //   inf('additionalFields',additionalFields)
  if(undefined!==additionalFields && 0<additionalFields.length){
    for(let singleFieldName of additionalFields){
      finalResult.inputAttribute[singleFieldName]=objectDeepCopy(additionalInput[singleFieldName]['inputAttribute'])
      finalResult.inputTempData[singleFieldName]=objectDeepCopy(additionalInput[singleFieldName]['inputTempData'])
      finalResult.inputValue[singleFieldName]=objectDeepCopy(additionalInput[singleFieldName]['inputValue'])
      // finalResult.icon[singleFieldName]=  objectDeepCopy(additionalIcon[singleFieldName])
      finalResult.rule[singleFieldName]=objectDeepCopy(additionalInput[singleFieldName]['rule'])
      // console.log('additionalInput[singleFieldName]',additionalInput[singleFieldName])
    }
  }
  // console.log('finalResult3',finalResult)
  // console.log('finalResult.rule',finalResult.rule)
  //4. rule中的正则无法复制，需要手工赋值
  for(let singleFieldName in finalResult.rule){
    for(let singleEle of finalResult.rule[singleFieldName]){
      // inf('singleFieldName',singleFieldName)
      if(undefined!==singleEle['pattern']){
        //判断字段的rule原始定义在inputAttribute还是additionalInput
        if(undefined!==source.rule[collName][singleFieldName]){
          // inf('source.inputAttribute[collName][singleFieldName]',source.rule[collName][singleFieldName])
          for(let originalSingleEle of source.rule[collName][singleFieldName]){
            if(undefined!==originalSingleEle['pattern']){
              singleEle['pattern']=originalSingleEle['pattern']
            }
          }
        }
        // additionalInput[singleFieldName]['rule']
        if(undefined!==additionalInput[singleFieldName] && undefined!==additionalInput[singleFieldName]['rule']){
          let setPatternDone=false
          for(let originalSingleRule of additionalInput[singleFieldName]['rule']){
            for(let singleRuleAttrName in originalSingleRule){
              if('pattern'===singleRuleAttrName){
                singleEle['pattern']=originalSingleRule['pattern']
                setPatternDone=true
                break
              }
            }
            if(true===setPatternDone){
              break
            }

          }
        }
      }
    }
  }
  // console.log('finalResult4',finalResult)
  //5 根据rule中require的定义，为inputAttr生成required属性，以便进行整体验证已经是否显示*的时候使用
  for(let singleFieldName in finalResult.inputValue){
    //从rule中获得require属性
    for(let singleRule of finalResult.rule[singleFieldName]){
      for(let singleRuleAttrName in singleRule){
        if('required'===singleRuleAttrName){
          finalResult.inputAttribute[singleFieldName][InputAttributeFieldName.REQUIRED]=singleRule[singleRuleAttrName]
          break
        }
      }
      if(undefined!==finalResult.inputAttribute[singleFieldName][InputAttributeFieldName.REQUIRED]){
        break
      }
    }
  }



  // inf('2finalResult.inputValue.tags',finalResult.inputValue.tags)
  //5. 检查inputAttribute的autoGen属性，判断是否要生成autoGen字段对应的数据
  /*for(let singleFieldName in finalResult.inputAttribute){
    // inf(`singleFieldName`,singleFieldName)
    // inf('inputAttribute[singleFieldName][InputAttributeFieldName.AUTO_GEN]',finalResult.inputAttribute[singleFieldName][InputAttributeFieldName.AUTO_GEN])

    //字段是autoGen
    if(undefined!==finalResult.inputAttribute[singleFieldName][InputAttributeFieldName.AUTO_GEN] && true===finalResult.inputAttribute[singleFieldName][InputAttributeFieldName.AUTO_GEN]){
      // inf(`valida singleFieldName`,singleFieldName)
      finalResult.inputArrayAttribute[singleFieldName]=[]
      finalResult.inputArrayTempData[singleFieldName]=[]
      finalResult.addItemButtonDisable[singleFieldName]=false //默认可以添加新元素
      //检查字段的rule，其中是否有max，且type为array的元素
      // finalResult.maxNum[singleFieldName]=singleEle['max']

    }
  }*/
  // inf('3finalResult.maxNum.tags',finalResult.maxNum.tags)
  // console.log('finalResult',finalResult)
  return finalResult
}

// function genAutoGenInfo(){}
/*
* collName
* */
function mergeInputAttribute({sourceCollInputAttribute,extraCollInputAttribute,allowFields}){
  let resultInputAttribute=objectPartlyDeepCopy({sourceObj:sourceCollInputAttribute,expectedKey:allowFields})
  let extraInputAttribute=objectPartlyDeepCopy({sourceObj:extraCollInputAttribute,expectedKey:allowFields})
// inf('resultInputAttribute',resultInputAttribute)
//   inf('extraInputAttribute',extraInputAttribute)
  for(let singleField of allowFields){
    if(undefined!==extraInputAttribute[singleField]){
      // inf('')
      for(let singleExtraAttribute in extraInputAttribute[singleField]){
        if(undefined!==extraInputAttribute[singleField][singleExtraAttribute]){
          resultInputAttribute[singleField][singleExtraAttribute]=extraInputAttribute[singleField][singleExtraAttribute]
        }
      }
    }
  }
  // inf('after resultInputAttribute',resultInputAttribute)
  return resultInputAttribute
}

function objectDeepCopy(sourceObj){
  if(undefined===sourceObj || null===sourceObj){
    return sourceObj
  }
  return JSON.parse(JSON.stringify(sourceObj))
}

/*  部分copy对象
* @expectedKey:需要copy的key
* */
function objectPartlyDeepCopy({sourceObj,expectedKey}){
  if(undefined===sourceObj || null===sourceObj){
    return sourceObj
  }

  let copyObject={}
  for(let singleKey of expectedKey){
    // inf('singleKey',singleKey)
    // inf('sourceObj[singleKey]',sourceObj[singleKey])
    if(undefined!==sourceObj[singleKey]){
      copyObject[singleKey]=JSON.parse(JSON.stringify(sourceObj[singleKey]))
    }
  }
  return copyObject
}

/*  从sourceObj，将neededKeyNames提取到一个新的object
*   return: 一个object，是对sourceObj的引用而不是复制
* */
function extractPartObject({sourceObj,neededKeyNames}){
  let extractObj
  if(neededKeyNames.length>0){
    extractObj={}
    for(let singleKyeName of neededKeyNames){
      if(undefined!==sourceObj[singleKyeName]){
        extractObj[singleKyeName]=sourceObj[singleKyeName]
      }
    }
    return extractObj
  }else{
    //没有设置任何needed key name，则返回原始object
    return sourceObj
  }
}
/*  childArray中的每个元素都包含在parentArray中
*
* */
function ifArrayContainArray({parentArray,childArray}){
  if(childArray.length===0 || parentArray.length===0){
    return false
  }
  for(let singleChildEle of childArray){
    if(-1===parentArray.indexOf(singleChildEle)){
      return false
    }
  }
  return true
}

/*  搜索array中空值（null,undefined,{},[],''）
* 返回数组
* */
function searchEmptyValueIdxInArray({array}){
  let idxToBeDeleted=[]
  for(let idx in array){
    if(null===array[idx] || undefined===array[idx] || []===array[idx] || {}===array[idx] || ''===array[idx] ){
      idxToBeDeleted.push(idx)
    }
  }

  return idxToBeDeleted

}

/*  删除指定元素
* */
function deleteDefinedEleInArray({array,tobeDeletedIdx}){
  if(tobeDeletedIdx.length>0){
    tobeDeletedIdx.reverse()
    for(let idx of tobeDeletedIdx){
      array.splice(idx,1)
    }
  }
}
/*  使用html5原生的FileReader读取文件
* @inputId：选择文件的inputId
* @readType：以何种方式读取文件。text/dataURL/binary 3种
* @maxSize: 读取文件最大size。byte
* */
//0. 检测fileRead是否可用
//1，根据readType检测文件类型是否正确
//2. 检测文件size是否介于0和maxSize
//3. 根据readType读取文件
async function nativeReadFile_async({inputId,readType,maxSize}){
  //在onload触发之后，才能获得file内容，所以是异步操作
  return new Promise(function(resolve,reject){
    if(undefined === typeof FileReader){
      return reject({rc:1,msg:"当前浏览器版本过低，请升级到最新版本后重试"});

    }

    let reader=new FileReader()
    let file=document.getElementById(inputId).files[0]

    // console.log('file',file)
    if(undefined===file){
      return reject ({rc:2,msg:'请先选择要上传的文件'})
    }

    if(0===file.size){
      return reject({rc:3,msg:'文件内容为空'})

    }
    if(maxSize<file.size){
      return reject({rc:4,msg:'文件超过预定义大小'})
      // return deferred.promise;
    }

    switch (readType){
      case 'text':
        if('text/plain'!==file.type){
          return reject({rc:5,msg:'文件必须是文本文件'})
        }
        reader.readAsText(file)
        reader.onload=function(e){
          return resolve({rc:0,msg:{fileContent:this.result,fileName:file.name,fileSize:file.size}})
        }
        break;
      case 'dataURL':
        if('image/png'!==file.type && 'image/jpeg'!==file.type && 'image/gif'!==file.type){
          return reject({rc:6,msg:'文件必须是图片文件'})
        }
        reader.readAsDataURL(file)
        reader.onload=function(e){
          return resolve({rc:0,msg:{fileContent:this.result,fileName:file.name,fileSize:file.size}})
        }

        break;
      case 'binary':
        reader.readAsBinaryString(file)
        reader.onload=function(e){
          return resolve({rc:0,msg:{fileContent:this.result,fileName:file.name,fileSize:file.size}})
        }
        break;
    }
  })

}

//判断用户是否已经登录
function ifUserLogin({that}){

  // return that.$store.state.headerInfo.userName!==''
  if(true===that.$cookies.isKey('loginDone')){
    return that.$cookies.get('loginDone')==='1'
  }else{
    return false
  }
}

//页面跳转
//path: string or number
function routeTo({that,path}){
  that.$router.push(path)
}



function openNewPage({url}){
  window.open(`${host}${url}`)
}

/**   将formItemInfo中的inpurValue和inputTempData初始化，以便使用formItemInfo的组件初始化 **/
function initFormItemInfo({formItemInfo}){
  if(undefined!==formItemInfo['inputValue']){
    for(let fieldName in formItemInfo['inputValue']){
      formItemInfo['inputValue'][fieldName]=null
    }
  }
  if(undefined!==formItemInfo['inputTempData']){
    for(let fieldName in formItemInfo['inputTempData']){
      formItemInfo['inputTempData'][fieldName]['validResult']=null
    }
  }
}
export {
  genNeedInput,
  mergeInputAttribute,



  objectPartlyDeepCopy,
  objectDeepCopy,
  extractPartObject,

  ifArrayContainArray,
  searchEmptyValueIdxInArray,
  deleteDefinedEleInArray,
  nativeReadFile_async,

  ifUserLogin,
  routeTo,

  openNewPage,

  initFormItemInfo,
  // countDown,
}

