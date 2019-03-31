/**
 * Created by 张伟 on 2018/9/13.
 * 和url不同的是，此处定义的是页面的路径，而url是ajax，一般用于获得数据
 */
'use strict'


const routePath={
  'main':'/',
  'login':'/login',
  'register':'/register',
  'registerAgreement':'/registerAgreement',

  'userCenter':'/userCenter',

  'updateArticle':'/updateArticle/:articleId',//'/updateArticle',
  'readArticle':'/getArticle/:articleId',

  'redirectToLogin':'/redirectToLogin',
}
export {
  routePath
}
