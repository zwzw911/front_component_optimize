<style scoped>
</style>
<template>
  <!--style="position:relative" class="flex-flow-row-wrap justify-content-space-around"-->
  <div >
    <!--<spin  fix>加载中...</spin>-->
    <!---->
    <Button type="primary" :disabled="!wholeValidResult">test</Button>
    <div class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1">
      <Form
            label-position="left"
            :model="inputCheckInfo.inputValue"
            :rules="inputCheckInfo.rule"
            :label-width="labelWidth"
            @submit.native.prevent
      >

        <self-form-item-input :inputCheckInfo="inputCheckInfo" fieldName="name"
                        :inputAppearanceSetting="inputAppearanceSetting"
                        :inputGlobalAppearanceSetting="inputGlobalAppearanceSetting"
                        :inputActionSetting="inputActionSetting"
                        @onBlur="checkWholeStatus">
        </self-form-item-input>
        <!--@onBlur="checkWholeStatus"-->
        <self-form-item-auto-gen :inputCheckInfo="inputCheckInfo" fieldName="tags"
                                 :inputAppearanceSetting="inputAppearanceSetting"
                                 :inputGlobalAppearanceSetting="inputGlobalAppearanceSetting"
                                 :inputActionSetting="inputActionSetting">
        </self-form-item-auto-gen>
        <self-form-item-select
          :inputCheckInfo="inputCheckInfo" fieldName="status"
          :inputAppearanceSetting="inputAppearanceSetting"
          :inputGlobalAppearanceSetting="inputGlobalAppearanceSetting"
          :inputActionSetting="inputActionSetting"
          @onChange="checkWholeStatus">
        </self-form-item-select>
        <self-form-item-textarea
          :inputCheckInfo="inputCheckInfo" fieldName="htmlContent"
          :inputAppearanceSetting="inputAppearanceSetting"
          :inputGlobalAppearanceSetting="inputGlobalAppearanceSetting"
          :inputActionSetting="inputActionSetting"
          @onBlur="checkWholeStatus">

        </self-form-item-textarea>

      </Form>


      <!--<self-attachment-list :attachmentListPropsInfo="attachmentListPropsInfo"></self-attachment-list>-->
    </div>

    <!--<div class="flex-flow-row-wrap justify-content-center marginTX">
      <Button type="primary" :disabled="false===validResult || false===anyFieldValueChange" @click="saveUpdate">保存</Button>
      <Button type="default"  class="marginH5">取消</Button>
      &lt;!&ndash;<Button type="success" :disabled="editable">编辑</Button>&ndash;&gt;
      &lt;!&ndash;<Button type="error" :disabled="!editable">删除</Button>&ndash;&gt;
    </div>-->
  </div>

</template>
<script>
  /******************************/
  /**          子组件         **/
  /******************************/
  // import selfFormItem from '../basicComponent/formItem'
  // import selfAutoGenFormItem from '../basicComponent/autoGenFormItem'
  // import selfAttachmentList from '../subComponents/attachmentList'
  import selfFormItemTextarea from '../basic/formItem/formItemTextarea'
  import selfFormItemSelect from '../basic/formItem/formItemSelect'
  import selfFormItemInput from '../basic/formItem/formItemInput'
  import selfFormItemAutoGen from '../basic/formItem/formItemAutoGen'
  /******************************/
  /**          网络            **/
  /******************************/
  import {sendRequestGetResult_async} from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'
  import {host} from '../../constant/configuration/appSetting'
  /******************************/
  /**      错误（函数）       **/
  /******************************/
  // import {showErrorInCenterMessage,showSuccessInCenterMessage} from '../../function/showResult'
  import * as handleResult from '../../function/handleResult'
  /******************************/
  /**           enum           **/
  /******************************/
  import {ValidatePart,RichTextEditor} from '../../constant/enum/nonValueEnum'
  /******************************/
  /**          配置            **/
  /******************************/
  // import {uploadFileDefine} from '../../constant/globalConfiguration/globalConfiguration'
  /******************************/
  /**     common constant     **/
  /******************************/
  // import * as componentInfo from '../../constant/globalConfiguration/componentInfo'
  /******************************/
  /*******     3rd     *********/
  /******************************/
  // import {inf} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  import * as misc from '../../function/misc'
  import * as formItemHelper from '../formItemHelper'

    export default {
      components:{selfFormItemInput,selfFormItemAutoGen, selfFormItemTextarea,selfFormItemSelect},
      // props: {'articleInfo':{type:Object}},
      async created(){
        // inf('this.articleInfo.formItemInfo.inputValue',this.articleInfo.formItemInfo.inputValue)
        // await this.getUpdateArticle_async()
      },
      mounted(){
        if(true===this.inputGlobalAppearanceSetting.ifUpdate){
          this.checkWholeStatus()
        }
      },
      methods: {
        checkWholeStatus() {
          this.wholeValidResult = formItemHelper.checkWholeStatus({inputCheckInfo: this.inputCheckInfo})
        },
        /********************/
        /**   网络操作    **/
        /********************/
        /*async getUpdateArticle_async(){
          let that=this
          sendRequestGetResult_async({urlOption:urlConfiguration.article.getUpdatedArticle,data:this.articleId}).then(function (response) {
            if(response.rc>0){
              handleResult.commonHandlerForErrorResult({that:that,response:response})
              return
            }
            // inf('resononse',response)
            // console.log(that)
            let neededFields=['name','status','allowComment','tags','htmlContent']

            // let neededValue=misc.extractPartObject({sourceObj:response.msg,neededKeyNames:neededFields})
            // for(let neededField of neededFields){
            //   // that.articleInfo.formItemInfo.inputValue[neededField]=response.msg[neededField]
            //   neededValue[neededField]=response.msg[neededField]
            // }
            // inf('response.msg[\'articleAttachmentsId\']',response.msg['articleAttachmentsId'])
            that.$refs[that.articleInfo.ref.formItem.articleFormItem].loadServerData({valueFromDb:response.msg['article'],neededFields:neededFields})
            // that.$refs[that.articleInfo.ref.formItem.articleFormItem].saveAsOriginData({valueFromDb:response.msg,neededFields:neededFields})

            that.attachmentListPropsInfo.currentAttachmentFileInfo=response.msg['article']['articleAttachmentsId']
            // that.$refs[that.articleInfo.ref.formItem.articleFormItem].validAllInputValueAndStoreResult()
          },function (err) {

          })
        },*/
        /*async saveUpdate(){
          let that=this
          //1. 触发form的方法，检测是否所有input都符合条件，结果传递给本组件变量validResult
          this.$refs[this.articleInfo.ref.form.articleForm].validate((validResult)=>{
            // inf('validResult',validResult)
            that.validResult=validResult

            if(false===that.validResult){
              handleResult.commonHandlerForErrorResult({that:that,response:{rc:98765,msg:'某些输入项不正确'}})
              return
            }
            //2. 上传数据
            let data={values:{}}
            data.values[ValidatePart.RECORD_ID]=that.articleId
            //2.1 获得发生变化的字段
            that.$refs[that.articleInfo.ref.formItem.articleFormItem].getChangedValue()
            data.values[ValidatePart.RECORD_INFO]=that.articleInfo.formItemInfo.changedValue
            if(0===Object.keys(data.values[ValidatePart.RECORD_INFO]).length){
              // alert('未作任何更改')
              handleResult.commonHandlerForSuccessResult({that:that,response:{rc:0,msg:'未作任何更改，无需保存'}})
              return
            }

            sendRequestGetResult_async({urlOption:urlConfiguration.article.updateArticle,data:data}).then(function (response) {
              // inf('update article resononse',response)
              // that.attachmentListPropsInfo.currentAttachmentFileInfo=response.msg['articleAttachmentsId']
              if(response.rc>0){
                handleResult.commonHandlerForErrorResult({that:that,response:response})
              }else{
                handleResult.commonHandlerForSuccessResult({that:that,response:{rc:0,msg:'文档更新成功'}})
                /!***    文档更新成功，需要重新设置inputOriginValue   ***!/
                let neededFields=['name','status','allowComment','tags','htmlContent']
                // let neededValue=misc.extractPartObject({sourceObj:response.msg,neededKeyNames:neededFields})
                // that.$refs[that.articleInfo.ref.formItem.articleFormItem].saveAsOriginData({valueFromDb:response.msg,neededFields:neededFields})
              }
            },function (err) {
              // inf('update article err',err)
              handleResult.commonHandlerForErrorResult({that:that,response:err})
            })
          })




        },*/
        /*************************/
        /**   子组件formItem emit事件   **/
        /*************************/
        checkIfAllItemValidatedResultPass(result){
          // inf('validateAllItemResult result',result)
          this.validResult=result
        },
        ifAnyFieldValueChanged(result){
          // inf('emit result',result)
          this.anyFieldValueChange=result
        },
        /********************/
        /**   是否可编辑  **/
        /********************/

      },
      computed: {},
      data() {
        // inf('this.route',this.$route.params)
          return {
            inputCheckInfo:misc.genNeedInput({collName:'article',allowFields:['name','status','htmlContent','tags'],additionalFields:undefined,method:'update'}),
            inputAppearanceSetting:{
              'name':{
                //icon:'md-person', //数组，对每个需要设置icon的字段，设置一个icon字符；如果没有设置（undefined），或者是null或者''，则忽略图标
                //iconColor:, //icon颜色
                editable:true,//boolean。确定是否采用类inputUnEditAble，实现input无边框和readonly的效果
                isPassword:false,
              },
              'status':{
                //icon:"md-phone-portrait", //数组，对每个需要设置icon的字段，设置一个icon字符；如果没有设置（undefined），或者是null或者''，则忽略图标
                //iconColor:, //icon颜色
                editable:true,//boolean。确定是否采用类inputUnEditAble，实现input无边框和readonly的效果
                selectWidth:200, //px。不知何故，iview的select组件，显示的内容必定居中，而其他input都是左对齐。为了模拟左对齐，select的width设置为合适长度，正好容纳option的内容。同时为了将select本身左对齐，formItem也要设置同样的width
              },
              'htmlContent':{
                //icon:'md-lock', //数组，对每个需要设置icon的字段，设置一个icon字符；如果没有设置（undefined），或者是null或者''，则忽略图标
                //iconColor:, //icon颜色
                editable:true,//boolean。确定是否采用类inputUnEditAble，实现input无边框和readonly的效果
                //isPassword:true,
                autoSize:{'minRows':5},
              },
              'tags':{
                //icon:'md-lock', //数组，对每个需要设置icon的字段，设置一个icon字符；如果没有设置（undefined），或者是null或者''，则忽略图标
                //iconColor:, //icon颜色
                editable:true,//boolean。确定是否采用类inputUnEditAble，实现input无边框和readonly的效果
                //isPassword:true,
                labelPosition:'left',//must same as Form setting
                labelWidth:this.labelWidth,//must same as Form?

                addButtonSize:undefined, //h1~h6，未设置，默认和labelSize一样
              }
            },
            inputGlobalAppearanceSetting:{
              ifUpdate: true, //判断是否需要为inputValue保存一个副本，以便检查是否值发生了变化
              showStarForRequire:true, //字段为require，是否显示红色*
              //inputSize:,//除了iview预定义的，还可以使用h1～h6定义大小
              //labelSize: ,//h1~h6
            },
            inputActionSetting:{
              'name':{
                uniqueCheckOption:undefined,
              },
              'status':{
                uniqueCheckOption:undefined,
              },
              'htmlContent':{
                uniqueCheckOption:undefined,
                richEditorType:RichTextEditor.WANG_EDITOR,
              },
              'tags':{
                uniqueCheckOption:undefined,
              },
            },
            articleId:'1234567890',//this.$route.params.articleId,
            // editable:false,
            // additionalData:{recordId:'test'},
            // host:host,
            // articleInfo:componentInfo.articleInfo,
            wholeValidResult:false,
            // validResult:false,//输入的值是否符合rule定义
            // anyFieldValueChange:false,//输入的值是否和原始值不一样

            labelWidth:80,
            // editable:true,//不是通过父组件传入，而是通过本组件的按钮 来控制
            /*attachmentListPropsInfo:{
              configuration:{
                action:`${host}/article/articleAttachment/${this.$route.params.articleId}`,
                maxSize:uploadFileDefine.article.article_attachment.maxSizeInMB*1024,//Mb==>kb
                format:uploadFileDefine.common.attachmentType,
                refName:'uploadAttachment',
              },
              //配置除了Upload的action之外，其他操作指定的url（例如，delete操作）
              url:{
                deleteAttachmentUrl:urlConfiguration.article.deleteAttachment, //for axios. already include host
                downloadAttachmentUrl:urlConfiguration.article.downloadAttachment,// for <a>, in subComponent include host
              },
              currentAttachmentFileInfo:[],
              editable:true,
            },*/
          }
      },
    }

</script>
