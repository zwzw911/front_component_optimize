'use strict'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/************************************/
/********   引入第三方  ***********/
/************************************/

/***  自定义css(development)  ****/

import '../static/css/action.css'
import '../static/css/color.css'
import '../static/css/border.css'
import '../static/css/common.css'
import '../static/css/customer.css'
import '../static/css/flex.css'
import '../static/css/font.css'
import '../static/css/bootStrap.css'
import '../static/css/marginPadding.css'
import '../static/css/position.css'
import '../static/css/radius.css'
import '../static/css/size.css'
import '../static/css/style.css'
import '../static/css/iviewEnhancement.css'

/**           引入cookies          **/
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

/**  引入iview（需npm install --save iview）     **/
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)


/**************************/
/**   引入element-ui     **/
/**************************/
import { Tree } from 'element-ui'
Vue.use(Tree)
// Vue.component(Tree.name, Tree);
// Vue.component(Button.name, Button);
/**************************************************/
/**  引入vuex （需npm install --save vuex）    **/
/**************************************************/
// import {headerInfo,footerInfo} from './globalState/headerFooterInfo'
// import {inputRelatePropertyInfo} from './globalState/inputRelateProperty'

// import {inputRelatePropertyInfo} from './globalState/globalState'
import Vuex from 'vuex'
Vue.use(Vuex)
//通过模块的方法载入vuex的配置
import * as globalState from './globalState/globalState'
let store=new Vuex.Store({
  modules:{
    // inputRelatePropertyInfo,
    // globalState,
    // footerInfo,
    headerInfo:globalState.headerInfo,
    footerInfo:globalState.footerInfo,
    redirectInfo:globalState.redirectInfo,

    // inputRelatePropertyInfo:globalState.inputRelatePropertyInfo,
    // url:globalState.url,
    // style:globalState.style,
  }
})

/************************************/
/********   引入第三方结束 ***********/
/************************************/


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,//引入vuex定义的state
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
