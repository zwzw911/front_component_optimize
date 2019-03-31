/**
 * Created by 张伟 on 2019/03/13.
 */
'use strict'

/**   为了获得redirect的提示信息，下采用全局变量   **/
let redirectInfo={
  state:{
    msg:'',
    // articleId:'',
  },
  getters:{},
  mutations:{
    setRedirectMsg(state,payload){
      state.msg=payload.msg
    },

/*    setArticleId(state,articleId){
      state.articleId=articleId
    },*/
  },
  actions:{}
}



export {
  redirectInfo,

}
