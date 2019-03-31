<style scoped>
</style>

<template>
<!--  <Menu :active-name="sidebarActiveMenu" width="auto" :open-names="sidebarOpenMenus" @on-select="clickMenu" @on-open-change="menuChange">
    <Submenu v-for="(item,key) in sidebarName" :name="key" :key="key" >
      <template slot="title">
        <Icon :type="item.icon"></Icon>
        {{item.name}}
      </template>
      <Menu-item v-for="(child,childKey) in item.children" :name="childKey" :key="childKey" >{{child.name}}</Menu-item>
    </Submenu>
  </Menu>-->
<div>
  <!--<self-spin :spin-info="spinInfoForLatest"></self-spin>-->

  <Menu class="" active-name=""  width="auto" :open-names="['latestArticle','hottestArticle']">
    <!--<Menu-item>-->

    <Submenu name="latestArticle">

      <template slot="title">
        <Icon type="md-flash" class="color-light-primary"></Icon>
        最新文档
      </template>

      <self-spin :spin-info="spinInfoForLatest"></self-spin>
      <template v-if="false===spinInfoForLatest.show">
        <template v-if="''!==errMsgForGetLatest">
          <p class="long-word-break color-red">{{errMsgForGetLatest}}</p>
        </template>
        <template v-else>
          <template v-for="(item,idx) in latestArticleInfo">
            <MenuItem :name="item.name" @click="readArticle({articleId:item['id']})">{{item.name}}</MenuItem>
          </template>
        </template>
      </template>



      <!--        <MenuItem name="1-2">Option2</MenuItem>
              <MenuItem name="1-3">Option3</MenuItem>-->
    </Submenu>
    <!--</Menu-item>-->
    <Submenu name="hottestArticle">

      <template slot="title">
        <Icon type="md-flame" class="color-red"></Icon>
        最新文档
      </template>
    </Submenu>
  </Menu>
</div>

</template>

<script>
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /**         component       **/
  /******************************/
  import selfSpin from '../../components/basicComponent/spin'

  /******************************/
  /**    common function       **/
  /******************************/
  import * as misc from '../../function/misc'
  /******************************/
  /**          网络            **/
  /******************************/
  import * as network from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'

  export default {
    components:{selfSpin},
    async created(){
      // await this.getSideBarArticle_async()
    },
      methods:{
        /**   获得sidebar的文档信息（最新和最火的文档） **/
        async getSideBarArticle_async(){

          let that=this
          let res=await network.sendRequestGetResult_async({urlOption:urlConfiguration.article.getLatestArticle})
          if(res ){
            //如果没有session，抛出reject，供父组件调用
            if(60050===res.rc){
              return that.getSideBarArticle_async()
              // return Promise.reject(res)
            }
            if( res.rc>0){
              that.errMsgForGetLatest=res.msg
            }else{
              that.latestArticleInfo=res.msg
            }
            that.spinInfoForLatest.show=false
            // return Promise.resolve()
          }
          /*return new Promise(function(resolve, reject){
            network.sendRequestGetResult_async({urlOption:urlConfiguration.article.getLatestArticle}).then(
              function(res){
                if(res ){
                  //如果没有session，抛出reject，供父组件调用
                  if(60050===res.rc){
                    return that.getSideBarArticle_async()
                    // return Promise.reject(res)
                  }
                  if( res.rc>0){
                    that.errMsgForGetLatest=res.msg
                  }else{
                    that.latestArticleInfo=res.msg
                  }
                  that.spinInfoForLatest.show=false

                }
                inf('before resolve')
                return resolve(1)
              },
              function(err){
                that.errMsgForGetLatest=err
                that.spinInfoForLatest.show=false
                inf('before reject')
                return reject(false)
              },
            )
          })*/

        },

        readArticle({articleId}){
          misc.openNewPage({url:`/getArticle/${articleId}`})
        },
      },

    computed:{

    },
      data(){
        return {
          spinInfoForLatest:{
            msg:'读取文档...',
            show:true,
          },
          errMsgForGetLatest:"",
          latestArticleInfo:undefined,

          spinInfoForHottest:{
            msg:'读取文档...',
            show:true,
          },
          errMsgForGetHottest:"",
          hottestArticle:undefined,
        }
      }
  }
</script>
