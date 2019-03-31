/**
 * Created by 张伟 on 2018/03/13.
 */
'use strict'


let headerInfo={
  state:{
    userName:'',
    articleId:'',
  },
  getters:{},
  mutations:{
    loginSuccessful(state,payload){
      state.userName=payload.userName
    },
    loginOut(state){
      state.userName=''
    },
/*    setArticleId(state,articleId){
      state.articleId=articleId
    },*/
  },
  actions:{}
}

let footerInfo={
  state:{
    year:'2018',
  },
  getters:{},
  mutations:{
  },
  actions:{}
}


export {
  headerInfo,
  footerInfo,
}
