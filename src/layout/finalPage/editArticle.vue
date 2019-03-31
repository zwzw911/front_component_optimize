<template>
  <div class="  container" style="height: 100%">
    <self-footer style="" class="fixed-bottom"></self-footer>
    <self-edit-article></self-edit-article>
    <!--<Row class="" style="height: 100%;margin-top:50px;">
      <div class="flex-flow-column-nowrap align-content-space-between" style="">
        <Col span="24" style="flex:1" class="paddingAll2">

            <Col span="7" offset="14" class="border-left-separator">
              <div>
                <p class="h3">登录</p>
&lt;!&ndash;                <p class="h1">登录登录</p>
                <p class="h1 font-serif">登录登录</p>
                <p class="h1 font-serif-ST">登录登录</p>
                <p class="h1 font-serif-Arial">登录登录</p>
                <p class="h1 font-sans-serif">登录登录</p>
                <p class="h1 font-sans-serif-YH">登录登录</p>
                <p class="h1 font-sans-serif-HT">登录登录</p>&ndash;&gt;
&lt;!&ndash;                <p class="h1">RGBa</p>
                <p class="h1" style="font-family: Helvetica">RGBa</p>&ndash;&gt;

              </div>
              <selfLogin  class="paddingL4"></selfLogin>
            </Col>

        </Col>

        <Col span="24">

        </Col>

      </div>
    </Row>-->

  </div>
</template>

<script>
  /******************************/
  /**         component       **/
  /******************************/
  // import selfRegister from '../components/subComponents/register.vue'
  import selfEditArticle from '../../components/combined/editArticle.vue'
  // import selfChangePassword from '../components/subComponents/changePassword.vue'
  // import selfUserInfo from '../components/subComponents/userInfo.vue'


  // import selfCrop from '../components/basicComponent/crop.vue'
  // import selfUserIcon from '../components/basicComponent/userIcon.vue'
  // import selfAutoGenFormItem from '../components/basicComponent/autoGenFormItem.vue'
  //
  // import selfArticleForUpdate from '../components/subComponents/articleForUpdate.vue'
  //
  // import selfTree from '../components/basicComponent/articleTree'
  // import selfLogout from '../components/basicComponent/logout'

  // import selfSidebar from '../components/subLayoutComponents/sidebar.vue'
  import selfFooter from '../basic/footer.vue'
  // import selfHeader from '../components/subLayoutComponents/header.vue'

  /******************************/
  /**         3rd              **/
  /******************************/
  // import {inf} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  // import * as misc from "../function/misc"
  /******************************/
  /**     common constant     **/
  /******************************/
  // import * as componentInfo from '../constant/globalConfiguration/componentInfo'


  export default {
    components:{selfEditArticle,selfFooter},
      computed:{

      },
    data () {
      return {

      }
    },
    methods:{

    }
  }
</script>
