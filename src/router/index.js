import Vue from 'vue'
import Router from 'vue-router'
/**   import page   **/
import login from '@/layout/finalPage/login'
import editArticle from '@/layout/finalPage/editArticle'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      // path: '/',name: 'login',component: login
      path: '/',name: 'editArticle',component: editArticle
    }
  ]
})
