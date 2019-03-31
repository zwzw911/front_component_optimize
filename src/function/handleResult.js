/**
 * Created by 张伟 on 2018/9/28.
 */
'use strict'


/******************************/
/**    common function      **/
/******************************/
import {pageViewWH} from './componentsHelper'
import * as misc from './misc'
// import * as showResult from '../function/showResult'

/******************************/
/*****     constant      *****/
/******************************/
import {routePath} from '../constant/url/routePath'

/*  对一些通用的返回结果集中处理，例如：没有登录则直接转移到登录页面
*   showType:显示在modal，还是信息中
* */
function commonHandlerForErrorResult({that,response,showType='message',redirectToLoginCode=[51000]}){
  if(undefined!==response){
/*    //尚未设置session
    if(60050===response.rc){
      // that.$router.push('/redirectToLogin')
      return
    }*/
if(-1!==redirectToLoginCode.indexOf(response.rc)){
  that.$router.push('/redirectToLogin')
  return
}
/*    //尚未登录，无法获得用户信息
    if(50100===response.rc){
      that.$router.push('/redirectToLogin')
      return
    }*/

    if('message'===showType){
      showErrorInCenterMessage({that:that,msg:response.msg})
    }
    if('modal'===showType){
      showErrorInModal({that:that,msg:response.msg})
    }
  }
}

function commonHandlerForSuccessResult({that,response,showType='message'}){
  if(undefined!==response){
    if('message'===showType){
      showSuccessInCenterMessage({that:that,msg:response.msg})
    }
    // if('modal'===showType){
    //   showErrorInModal({that:that,msg:response.msg})
    // }
  }
}



//网络操作返回的结果进行判别，如果有错误，显示
function showErrorInModal({that,msg}){
  that.$Modal.error({
    title: '错误',
    content: msg
  });
}

/**   使用message显示错误   **/
function showErrorInCenterMessage({that,msg,title='错误'}){
  let {W,H}=pageViewWH()
  let top=parseInt(H)/2
  // that.$Notice.config({
  //   top:200,
  // })
  that.$Notice.error({
    title: '错误 ',
    desc: msg,
    // top:top,
  });
}


function showSuccessInCenterMessage({that,msg,title='成功'}){
  let {W,H}=pageViewWH()
  let top=parseInt(H)/2
  // that.$Notice.config({
  //   top:200,
  // })
  that.$Notice.success({
    title: title,
    desc: msg,
    top:top,
  });
}

/**   使用了自定义的modal，处理错误结果   **/
/*function commonModalErrorResult({that,response,showType='message',redirectToLoginCode=[51000]}){
  if(undefined!==response){
    /!*    //尚未设置session
        if(60050===response.rc){
          // that.$router.push('/redirectToLogin')
          return
        }*!/
    if(-1!==redirectToLoginCode.indexOf(response.rc)){
      that.$router.push('/redirectToLogin')
      return
    }
    /!*    //尚未登录，无法获得用户信息
        if(50100===response.rc){
          that.$router.push('/redirectToLogin')
          return
        }*!/

    if('message'===showType){
      showErrorInCenterMessage({that:that,msg:response.msg})
    }
    if('modal'===showType){
      showErrorInModal({that:that,msg:response.msg})
    }
  }
}*/
export {
  commonHandlerForErrorResult,
  commonHandlerForSuccessResult,
  // showErrorInModal,
  // showErrorInCenterMessage,
  //
  // showSuccessInCenterMessage,
}
