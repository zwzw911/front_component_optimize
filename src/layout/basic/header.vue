<!--<style scoped>

  .layout-header{
    background: azure;
    /*padding: 10px 0;*/
    /*overflow: hidden;*/
    /*height:40px;*/
    /*border:1px solid red;*/
    display:flex;
    flex-flow:row nowrap;
/*    flex-direction:row;
    flex-wrap:nowrap;*/
    justify-content: flex-end;
    align-items: center;
  }
  .layout-header-main{
    float: left;
    margin-right: 300px;
    /*border:1px solid red;*/
    /*height: 30px;*/
  }
  .layout-header-main a{
    color: black;
  }

</style>-->
<template>
  <div class="container bg-color-primary paddingV2 ">
    <div class="flex-flow-row-nowrap justify-content-space-between">
      <span class="color-white marginR4 cursor-pointer h4" @click="createArticle"><Icon type="ios-create-outline" class="marginR1"/>写文档</span>
      <div v-if="userLogin">
        <span @click="routeToAfterLogin('userName')" class="color-white marginR4 cursor-pointer">{{userName}}</span>
        <span @click="routeToAfterLogin('logout')" class="color-white marginR4 cursor-pointer">退出</span>
      </div>
      <div v-else >
        <span @click="routeToBeforeLogin('login')" class="color-white marginR4 cursor-pointer">登录</span>
        <span @click="routeToBeforeLogin('register')" class="color-white marginR4 cursor-pointer">注册</span>
      </div>
    </div>

    <!--<template v-if="userLogin">
      <Menu mode="horizontal" :theme="theme" active-name="1" @on-select="routeToAfterLogin">
        <div class="flex-flow-row-nowrap justify-content-space-between">
          <div>
            <MenuItem name="userName" >
              {{userName}}
            </MenuItem>
            <MenuItem name="logout" >
              退出
            </MenuItem>
          </div>
          <div>
            <MenuItem name="myArticle">
              我的文档
            </MenuItem>
            <MenuItem name="myCollection">
              我的收藏
            </MenuItem>
          </div>
        </div>

      </Menu>
    </template>
    <template v-else >
      <Menu mode="horizontal" :theme="theme" active-name="1" @on-select="routeToBeforeLogin">
        <div class="flex-flow-row-nowrap-reverse justify-content-space-between">
          <div>
            <MenuItem name="login" >
              登录
            </MenuItem>
            <MenuItem name="register" >
              注册
            </MenuItem>
          </div>
        </div>
      </Menu>
    </template>-->

  </div>
</template>


<script>
  /******************************/
  /**    common function       **/
  /******************************/
  import * as network from '../../function/network'
  import * as handleResult from '../../function/handleResult'
  import * as misc from '../../function/misc'
  // import {sendRequestGetResult_async} from '../../function/network'

  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf} from 'awesomeprint'

  /******************************/
  /**    common constant       **/
  /******************************/
  import {urlConfiguration} from '../../constant/url/url'
  import {routePath} from '../../constant/url/routePath'
  // import * as appSetting from '../../constant/envConfiguration/appSetting'

  export default {
      props:['headerInfo'],
      computed:{
        // userName(){return this.headerInfo.userName},
/*        userLogin(){
          // return ifUserLogin({that:this})
          return this.$cookies.isKey('loginDone')
        }*/
      },
    methods:{

      routeToBeforeLogin(menuName){
          switch (menuName){
            case 'login':
              misc.routeTo({that:this,path:'/login'})
                  break;
            case 'register':
              misc.routeTo({that:this,path:'/register'})
                  break;

          }
      },
      async routeToAfterLogin(menuName){
          switch (menuName){
            case 'userName':
              misc.routeTo({that:this,path:'/userCenter'})
              // window.open(`http://127.0.0.1:8080/userCenter`)
              break;
            case 'logout':
              let serverResult=await network.sendRequestGetResult_async({urlOption:urlConfiguration.user.logout})
              let result=this.$cookies.remove('connect.sid')
              this.$cookies.remove('loginDone')
              /**   logout，直接转到主页   **/
              //如果不是主页，执行跳转
              if(this.$route.path!=='/'){
                misc.routeTo({that:this,path:routePath.main})
              }else{
                //如果已经是主页，执行刷新（因为logout后，session变化，需要重新获得加密id）
                window.location.reload()
              }


              this.userLogin=false

              break;
          }
      },
      async createArticle(){
        if(false===misc.ifUserLogin){
          handleResult.commonHandlerForErrorResult({that:this,response:{rc:98765,msg:'尚未登录，无法写文档'}})
          return
        }
        let result=await network.sendRequestGetResult_async({urlOption:urlConfiguration.article.createArticle})
        inf('result',result)
        if(result.rc>0){
          handleResult.commonHandlerForErrorResult({that:this,response:result})
          return
        }
        misc.openNewPage({url:`/updateArticle/${result.msg['id']}`})
      },
    },
    data(){
        return{
          itemMargin:'marginR_2',//header中部件之间的间隔（例如用户名/退出，登录/注册）
          itemFontSize:'h5',
          transfer:true,
          theme:'light',

          //从cookie中读取，而不是globalState
          userName:this.$cookies.get('account'),
          userLogin:this.$cookies.isKey('loginDone'),
        }
    },
  }

</script>
