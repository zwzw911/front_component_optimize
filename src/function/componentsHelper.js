/**
 * Created by 张伟 on 2019/3/19.
 */
'use strict'
import axios from 'axios'
// import * as ap from 'awesomeprint'



// import {inf,war,err} from 'awesomeprint'
function getPosPara(element){
  let result={}
  let pos=element.getBoundingClientRect()

  //获得元素的原始长宽
  if(undefined ===element.naturalWidth){
    if(undefined === pos.width ){
      result.width=pos.right-pos.left
      result.height=pos.top-pos.bottom
    }else{
      result.width=pos.width
      result.height=pos.height
    }
  }else{
    result['width']=element.naturalWidth
    result['height']=element.naturalHeight
  }


  let posMember=['top','bottom','left','right']
  for(let singlePosMember of posMember){
    result[singlePosMember]=Math.round(pos[singlePosMember])
  }


  return result
}

// function myAxios(){
/*  const myAxios = axios.create({
    // baseURL: process.env.BASE_API, // node环境的不同，对应不同的baseURL
    timeout: 5000, // 请求的超时时间
    //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
    // headers: {
    // "Content-Type": "application/x-www-form-urlencoded"
    // },
    withCredentials: true // 允许携带cookie
  })*/

/*// 发送请求前处理request的数据
  axios.defaults.transformRequest = [function (data) {
    let newData = ''
    for (let k in data) {
      newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
    return newData
  }]

// request拦截器
  service.interceptors.request.use(
    config => {
      // 发送请求之前，要做的业务
      return config
    },
    error => {
      // 错误处理代码

      return Promise.reject(error)
    }
  )

// response拦截器
  service.interceptors.response.use(
    response => {
      // 数据响应之后，要做的业务
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )*/

//   return service
// }

/* 从constant/additionalInputValue中，将指定的字段，加入到当前的inputValue中（例如，添加captcha）
* @inputAttribute: 普通的（根据server产生的）inputAttribute
* @inputTempData: 普通的（根据server产生的）inputTempData
* @inputValue: 普通的（根据server产生的）inputValue
* @arr_fieldName: 需要从addition中merge到普通中的字段名
* @ruleForCreate/Update:
* */
/*function mergeAdditionalField({arr_fieldName,inputAttribute,inputTempData,inputValue,icon,ruleForCreate,ruleForUpdate}){
    //检测字段名是否在3个文件中都存在（additionalInputValue->additionalInputAttr/TempData/InputValue）
  // ap.inf('')
  for(let singleFieldName of arr_fieldName){
    if(undefined===additionalInputAttribute[singleFieldName]
      || undefined===additionalInputTempData[singleFieldName]
      || undefined===additionalInputValue[singleFieldName]
      || (undefined===additionalRuleForCreate[singleFieldName] && undefined===additionalRuleForUpdate[singleFieldName])

    ){
      // ap.inf('continue in')
      continue
    }
    inputAttribute[singleFieldName]=additionalInputAttribute[singleFieldName]
    inputTempData[singleFieldName]=additionalInputTempData[singleFieldName]
    inputValue[singleFieldName]=additionalInputValue[singleFieldName]
    icon[singleFieldName]=  additionalIcon[singleFieldName]

    if(undefined!==ruleForCreate){
      ruleForCreate[singleFieldName]=additionalRuleForCreate[singleFieldName]
    }
    if(undefined!==ruleForUpdate) {
      ruleForUpdate[singleFieldName] = additionalRuleForUpdate[singleFieldName]
    }
  }
}*/

/*function mergeAdditionalField({arr_fieldName,formItemInfo}){
  //检测字段名是否在3个文件中都存在（additionalInputValue->additionalInputAttr/TempData/InputValue）
  // ap.inf('')
  for(let singleFieldName of arr_fieldName){
/!*    if(undefined===additionalInputAttribute[singleFieldName]
      || undefined===additionalInputTempData[singleFieldName]
      || undefined===additionalInputValue[singleFieldName]
      || (undefined===additionalRuleForCreate[singleFieldName] && undefined===additionalRuleForUpdate[singleFieldName])

    ){
      // ap.inf('continue in')
      continue
    }*!/
    formItemInfo.inputAttribute[singleFieldName]=additionalInputAttribute[singleFieldName]
    formItemInfo.inputTempData[singleFieldName]=additionalInputTempData[singleFieldName]
    formItemInfo.inputValue[singleFieldName]=additionalInputValue[singleFieldName]
    formItemInfo.icon[singleFieldName]=  additionalIcon[singleFieldName]
    formItemInfo.rule[singleFieldName]=additionalRuleForCreate[singleFieldName]
    // if(undefined!==ruleForCreate){
    //   ruleForCreate[singleFieldName]=additionalRuleForCreate[singleFieldName]
    // }
    // if(undefined!==ruleForUpdate) {
    //   ruleForUpdate[singleFieldName] = additionalRuleForUpdate[singleFieldName]
    // }
  }
}*/
/*    网页可见区域宽高，不包括工具栏和滚动条（浏览器窗口可视区域大小）      */
function pageViewWH(){
  let w = document.documentElement.clientWidth || document.body.clientWidth;
  let h = document.documentElement.clientHeight || document.body.clientHeight;
  return {width:w,height:h}
}

/*  网页可见区域宽高，包括滚动条等边线（会随窗口的显示大小改变） */
function pageWH(){
  let w = document.documentElement.offsetWidth || document.body.offsetWidth ;
  let h = document.documentElement.offsetHeight || document.body.offsetHeight
  return {width:w,height:h}
}

/*    网页正文全文宽高      */
function pageContentWH(){
  let w = document.documentElement.scrollWidth || document.body.scrollWidth;
  let h = document.documentElement.scrollHeight || document.body.scrollHeight;
  return {width:w,height:h}
}

/*    获得指定元素的WH*/
function getElementWH(element){

  let result={}
  if(undefined ===element.naturalWidth){
    // inf('non innaturalWidth in')
    let pos=element.getBoundingClientRect()
    if(undefined === pos.width ){
      result.width=pos.right-pos.left
      result.height=pos.top-pos.bottom
    }else{
      result.width=pos.width
      result.height=pos.height
    }
  }else{
    // inf('naturalWidth in')
    result['width']=element.naturalWidth
    result['height']=element.naturalHeight
  }
  return result
}
/*    获得指定元素的margin   */
function getElementMargin(element){
  let result={}
  result['top']=element.style['margin-top']
  result['bottom']=element.style['margin-bottom']
  result['left']=element.style['margin-left']
  result['right']=element.style['margin-right']
  for(let singleKey in result){
    if(undefined!==result[singleKey]){
      result[singleKey]=parseInt(result[singleKey].replace('px',''))
    }
  }
  return result
}

/*      计算将元素设于指定元素中央，所需要的参数
* @element:需要被居中的元素
* @elementWH:某些情况下，element的长度是根据内容变化的（例如div），此时需要手工计算需要的elementWH。如果传入了手工计算的值，则无需通过getElementWH()计算
* @container：在哪个元素中居中
* @withCover: boolean，是否需要borderWidth，以便覆盖整个container。
*
* return:{top,left,border-width}。都是字符，已经包含px
* */
//如果container空，默认为整个页面
function calcCenterParams({element,elementWH,container,withCover}){
  if(true===withCover){
    element.style.borderWidth=''
  }
  let containerWH
  // inf('pass in elementWH',elementWH)
  if(undefined===elementWH){
    elementWH=getElementWH(element)
    let elementMargin=getElementMargin(element)
    // inf('elementMargin',elementMargin)
    elementWH['width']+=(elementMargin['left']+elementMargin['right'])
    elementWH['height']+=(elementMargin['top']+elementMargin['bottom'])
  }


  // inf('after elementWH',elementWH)
  // inf('container',container)
  if(null===container || undefined===container){
    containerWH=pageViewWH()
  }else{
    containerWH=getElementWH(container)
  }
  // inf('containerWH',containerWH)
  //不考虑padding的位置设置
  let elementVirtualPos={top:0,left:0}

  if(containerWH['height']>elementWH['height']){
    elementVirtualPos['top']=parseInt((containerWH['height']-elementWH['height'])/2)
  }
  if(containerWH['width']>elementWH['width']){
    elementVirtualPos['left']=parseInt((containerWH['width']-elementWH['width'])/2)
  }
  // inf('elementVirtualPos',elementVirtualPos)

  let elementBorderWidth={top:0,left:0}
  if(true===withCover){

    if(containerWH['height']>elementWH['height']){
      elementBorderWidth['top']=elementVirtualPos['top']
      //如果设置了遮盖，则元素的top/left为0，和container重合
      elementVirtualPos['top']=0
    }
    if(containerWH['width']>elementWH['width']){
      elementBorderWidth['left']=elementVirtualPos['left']
      //如果设置了遮盖，则元素的top/left为0，和container重合
      elementVirtualPos['left']=0
    }
  }


  // inf('elementBorderWidth',elementBorderWidth)
  // return {top:elementVirtualPos['top']+'px',left:elementVirtualPos['left']+'px',borderWidth:elementBorderWidth['top']+'px'+' '+elementBorderWidth['left']+'px'}
  element.style.top=elementVirtualPos['top']+'px'
  element.style.left=elementVirtualPos['left']+'px'

  element.style['borderWidth']=elementBorderWidth['top']+'px'+' '+elementBorderWidth['left']+'px'
}



export {
  getPosPara,
  // myAxios,
  // mergeAdditionalField,
  pageViewWH,
  pageWH,
  pageContentWH,
  getElementWH,
  getElementMargin,
  calcCenterParams,
}
