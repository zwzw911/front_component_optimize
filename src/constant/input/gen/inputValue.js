/*    gene by D:\U\ss_vue_express\server_common\maintain\convert2Client\generateClientInputValue.js  
* 空对象，存储字段值（vue双向绑定） 
*/

"use strict"


const inputValueForCreate={
    "admin_penalize": {
        "punishedId": null,
        "reason": null,
        "penalizeType": null,
        "penalizeSubType": null,
        "duration": null
    },
    "admin_user": {
        "name": null,
        "password": null,
        "userType": null,
        "userPriority": null
    },
    "category": {
        "name": null,
        "parentCategoryId": null
    },
    "resource_profile": {
        "name": null,
        "range": null,
        "type": null,
        "maxNum": null,
        "maxDiskSpaceInMb": null
    },
    "store_path": {
        "name": null,
        "path": null,
        "usage": null,
        "sizeInKb": null,
        "lowThreshold": null,
        "highThreshold": null
    },
    "article": {
        "name": null,
        "status": null,
        "folderId": null,
        "htmlContent": null,
        "tags": null,
        "categoryId": null,
        "allowComment": null
    },
    "article_comment": {
        "articleId": null,
        "content": null
    },
    "article_like_dislike": {
        "articleId": null
    },
    "folder": {
        "name": null,
        "parentFolderId": null
    },
    "tag": {
        "name": null
    },
    "add_friend_request": {
        "receiver": null,
        "message": null
    },
    "join_public_group_request": {
        "publicGroupId": null
    },
    "member_penalize": {
        "publicGroupId": null,
        "memberId": null,
        "penalizeType": null,
        "duration": null
    },
    "public_group": {
        "name": null,
        "joinInRule": null,
        "adminsId": null,
        "membersId": null
    },
    "public_group_event": {
        "publicGroupId": null,
        "eventType": null,
        "targetId": null,
        "status": null
    },
    "public_group_interaction": {
        "publicGroupId": null,
        "content": null
    },
    "user_friend_group": {
        "friendGroupName": null,
        "friendsInGroup": null
    },
    "impeach": {
        "title": null,
        "content": null,
        "impeachedArticleId": null,
        "impeachedCommentId": null
    },
    "impeach_action": {
        "impeachId": null,
        "adminOwnerId": null,
        "action": null
    },
    "impeach_image": {
        "impeachId": null
    },
    "impeach_comment": {
        "impeachId": null
    },
    "impeach_comment_image": {
        "impeachCommentId": null
    },
    "user": {
        "name": null,
        "account": null,
        "password": null,
        "addFriendRule": null
    },
    "user_resource_profile": {
        "userId": null,
        "resource_profile_id": null,
        "duration": null
    },
    "collection": {
        "name": null,
        "articlesId": null,
        "topicsId": null
    },
    "send_recommend": {
        "articleId": null
    },
    "topic": {
        "name": null,
        "desc": null,
        "articlesId": null
    }
}
//设成notUsed(null会影响update的fieldValue，导致server认为字段需要被删除；undefined，会导致字段不存在，而在赋值时出错；notUsed最好，即避免了以上问题，又可以提示开发，update的时候，那些字段没有被初始化)
const inputValueForUpdate={
    "admin_penalize": {},
    "admin_user": {
        "name": "notUsed",
        "password": "notUsed",
        "userType": "notUsed",
        "userPriority": "notUsed"
    },
    "category": {
        "name": "notUsed",
        "parentCategoryId": "notUsed"
    },
    "resource_profile": {},
    "store_path": {
        "sizeInKb": "notUsed",
        "lowThreshold": "notUsed",
        "highThreshold": "notUsed"
    },
    "article": {
        "name": "notUsed",
        "status": "notUsed",
        "folderId": "notUsed",
        "htmlContent": "notUsed",
        "tags": "notUsed",
        "categoryId": "notUsed",
        "allowComment": "notUsed"
    },
    "article_comment": {},
    "article_like_dislike": {},
    "folder": {
        "name": "notUsed",
        "parentFolderId": "notUsed"
    },
    "tag": {},
    "add_friend_request": {},
    "join_public_group_request": {},
    "member_penalize": {},
    "public_group": {
        "name": "notUsed",
        "joinInRule": "notUsed",
        "adminsId": "notUsed",
        "membersId": "notUsed"
    },
    "public_group_event": {},
    "public_group_interaction": {},
    "user_friend_group": {
        "friendGroupName": "notUsed",
        "friendsInGroup": "notUsed"
    },
    "impeach": {
        "title": "notUsed",
        "content": "notUsed"
    },
    "impeach_action": {},
    "impeach_image": {},
    "impeach_comment": {
        "content": "notUsed"
    },
    "impeach_comment_image": {},
    "user": {
        "name": "notUsed",
        "account": "notUsed",
        "password": "notUsed",
        "addFriendRule": "notUsed"
    },
    "user_resource_profile": {},
    "collection": {
        "name": "notUsed",
        "articlesId": "notUsed",
        "topicsId": "notUsed"
    },
    "send_recommend": {},
    "topic": {
        "name": "notUsed",
        "desc": "notUsed",
        "articlesId": "notUsed"
    }
}

export {inputValueForCreate,inputValueForUpdate}