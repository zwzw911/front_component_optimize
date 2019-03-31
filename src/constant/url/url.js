/**
 * Created by 张伟 on 2018/4/21.
 */
'use strict'
import {RequestMethod} from '../enum/network'

const urlConfiguration={
  standAlone:{
    captcha:{url:'/user/captcha',method:RequestMethod.GET},
  },
  user:{
    login:{url:'/user/login',method:RequestMethod.POST},
    logout:{url:'/user/logout',method:RequestMethod.DELETE},
    register:{url:'/user',method:RequestMethod.POST},
    uniqueCheck:{url:'/user/uniqueCheck',method:RequestMethod.POST},
    uploadUserPhoto:{url:'/user/uploadUserPhoto',method:RequestMethod.PUT},
    getUserInfo:{url:'/user',method:RequestMethod.GET},
    search:{url:'/user/search',method:RequestMethod.GET},
    saveUserInfo:{url:'/user',method:RequestMethod.PUT},
    changePassword:{url:'/user/changePassword',method:RequestMethod.PUT}
  },
  folder:{
    readFolderContent:{url:'/folder',method:RequestMethod.GET},
    createFolder:{url:'/folder',method:RequestMethod.POST},
    updateFolder:{url:'/folder',method:RequestMethod.PUT},
    deleteFolder:{url:'/folder',method:RequestMethod.DELETE},
  },
  addFriend:{
    create:{url:'/add_friend_request',method:RequestMethod.POST},
    accept:{url:'/add_friend_request/accept',method:RequestMethod.PUT},
    decline:{url:'/add_friend_request/decline',method:RequestMethod.PUT},
  },
  article:{
    getArticle:{url:'/article',method:RequestMethod.GET},
    getMainPageArticle:{url:'/article/mainPage',method:RequestMethod.GET},
    getUpdatedArticle:{url:'/article/getUpdateArticle',method:RequestMethod.GET},
    getLatestArticle:{url:'/article/latestArticle',method:RequestMethod.GET},
    getHottestArticle:{url:'/article/hottestArticle',method:RequestMethod.GET},
    createArticle:{url:'/article',method:RequestMethod.POST},//no any params
    updateArticle:{url:'/article',method:RequestMethod.PUT},//recordId+recordInfo
    // deleteArticle:{url:'/article',method:RequestMethod.DELETE},//recordId。 not support yet


    uploadImage:{url:'/article/articleImage',method:RequestMethod.POST},//recordId(article)

    uploadAttachment:{url:'/article/articleAttachment',method:RequestMethod.POST},
    deleteAttachment:{url:'/article/articleAttachment',method:RequestMethod.DELETE},
    downloadAttachment:{url:'/article/articleAttachment',method:RequestMethod.GET},
  },

  articleComment:{
    createComment:{url:'/article_comment',method:RequestMethod.POST},//no any params
  },

  articleLikeDislike:{
    like:{url:'/article_like_dislike/like',method:RequestMethod.POST},//singleField
    dislike:{url:'/article_like_dislike/dislike',method:RequestMethod.POST},//singleField
  },

  impeach:{
    impeachArticle:{url:'/impeach/article',method:RequestMethod.POST},//recordInfo
    impeachComment:{url:'/impeach/comment',method:RequestMethod.POST},//recordInfo
    impeachUploadImage:{url:'/impeach/uploadImage',method:RequestMethod.POST},
    updateImpeach:{url:'/impeach',method:RequestMethod.PUT},
    deleteImpeach:{url:'/impeach',method:RequestMethod.DELETE},
  },

  impeachAction:{
    createAction:{url:'/impeach_action',method:RequestMethod.POST},
  },

  impeachComment:{
    addComment:{url:'/impeach_comment',method:RequestMethod.POST},
    updateComment:{url:'/impeach_comment',method:RequestMethod.PUT},
    impeachCommentUploadImage:{url:'/impeach_comment/uploadImage',method:RequestMethod.POST},
  },

  /**   群     **/
  publicGroup:{
    createPublicGroup:{url:'/public_group',method:RequestMethod.POST},
    updatePublicGroup:{url:'/public_group',method:RequestMethod.PUT},
    deletePublicGroup:{url:'/public_group',method:RequestMethod.DELETE},

    //只有删除用户，用户加入由join_public_group_request处理
    removeMember:{url:'/public_group/removeMember',method:RequestMethod.PUT},
    //成员自己离群
    requestExit:{url:'/public_group/requestExit',method:RequestMethod.PUT},
    //包含群主的提拔和降级
    manageAdminMember:{url:'/public_group/manageAdminMember',method:RequestMethod.PUT},
  },
  /**   public group admin对加入请求的处理  **/
  joinPublicGroupRequest:{
    initiateRequest:{url:'/join_public_group_request',method:RequestMethod.POST},
    declineRequest:{url:'/join_public_group_request/decline',method:RequestMethod.PUT},
    acceptRequest:{url:'/join_public_group_request/accept',method:RequestMethod.PUT},
  },
  /**   user friend group **/
  userFriendGroup:{
    getAllFriendGroups:{url:'/user_friend_group',method:RequestMethod.GET},
    getAllFriendGroupsAndItsMember:{url:'/user_friend_group/friends',method:RequestMethod.GET},
    getAllFriendGroupsMember:{url:'/user_friend_group/friendGroup',method:RequestMethod.GET},

    searchFriend:{url:'/user_friend_group/friend',method:RequestMethod.GET},
    createFriendGroup:{url:'/user_friend_group',method:RequestMethod.POST},
    updateFriendGroup:{url:'/user_friend_group',method:RequestMethod.PUT},
    deleteFriendGroup:{url:'/user_friend_group',method:RequestMethod.DELETE},
    moveFriend:{url:'/user_friend_group/move_friend',method:RequestMethod.PUT}, //editSub  {field1:{from;recordId,to:recordId,eleArray:[]}}
  },
  /**   recommend **/
  recommend:{
    createRecommend:{url:'/recommend',method:RequestMethod.POST},
    getUnreadRecommend:{url:'/recommend/getUnreadRecommend',method:RequestMethod.GET},
    getReadRecommend:{url:'/recommend/getReadRecommend',method:RequestMethod.GET},
    getSendRecommend:{url:'/recommend/getSendRecommend',method:RequestMethod.GET},

    readUnreadRecommend:{url:'/recommend/readUnreadRecommend',method:RequestMethod.PUT},
  },
  /**   collection  **/
  collection:{
    createCollection:{url:'/collection',method:RequestMethod.POST},
    getCollectionContent:{url:'/collection',method:RequestMethod.GET},//
    //显示所有collection，以便用户获得更好体验（无需点击top level来获得2nd level的collection）
    getAllCollection:{url:'/collection/all',method:RequestMethod.GET},
    getTopCollection:{url:'/collection/top',method:RequestMethod.GET},//如果URL中带collectionId，说明读取单个collection的内容；没有id，读取所有collection（list）
    getNonTopCollection:{url:'/collection/nonTop',method:RequestMethod.GET},//
    deleteCollection:{url:'/collection',method:RequestMethod.DELETE},
    updateCollectionName:{url:'/collection/name',method:RequestMethod.PUT},
    addDeleteContent:{url:'/collection/content',method:RequestMethod.PUT},
  },
  /******************************************/
  /*************    admin    ***************/
  /******************************************/
  adminUser:{
    createAdminUser:{url:'/admin_user',method:RequestMethod.POST},
    updateAdminUser:{url:'/admin_user',method:RequestMethod.PUT},
    deleteAdminUser:{url:'/admin_user',method:RequestMethod.DELETE},

    login:{url:'/admin_user/login',method:RequestMethod.POST},
    logout:{url:'/admin_user/logout',method:RequestMethod.DELETE},
  },

  adminImpeachAction:{
    create:{url:'/impeach_action',method:RequestMethod.POST},
  },
  adminPenalize:{
    create:{url:'/admin_penalize',method:RequestMethod.POST},
    'delete':{url:'/admin_penalize',method:RequestMethod.DELETE},
  },

  /******************************************/
  /*************    static    **************/
  /******************************************/


}

export {urlConfiguration}
