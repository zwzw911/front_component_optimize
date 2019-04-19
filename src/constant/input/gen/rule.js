/*    gene by D:\U\ss_vue_express\server_common\maintain\convert2Client\generateClientRule.js  
* 产生client的rule 
*/

"use strict"


const ruleForCreate=
{
  "admin_penalize": {
    "punishedId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "受罚人不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "受罚人格式不正确",
        "type": "string"
      }
    ],
    "reason": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "受罚原因不能为空",
        "type": "string"
      },
      {
        "min": 15,
        "trigger": "blur,change",
        "message": "受罚原因至少15个字符",
        "type": "string"
      },
      {
        "max": 1000,
        "trigger": "blur,change",
        "message": "受罚原因的字数不能超过1000个字符",
        "type": "string"
      }
    ],
    "penalizeType": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "受罚类型不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2",
          "3",
          "4",
          "10",
          "20",
          "21",
          "30",
          "31",
          "40",
          "50",
          "60",
          "61",
          "70",
          "80",
          "90"
        ],
        "trigger": "blur,change",
        "message": "受罚类型不正确",
        "type": "enum"
      }
    ],
    "penalizeSubType": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "受罚子类型不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "9"
        ],
        "trigger": "blur,change",
        "message": "受罚子类型不正确",
        "type": "enum"
      }
    ],
    "duration": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "受罚时长不能为空",
        "type": "integer"
      },
      {
        "min": 0,
        "trigger": "blur,change",
        "message": "受罚时长至少1天",
        "type": "integer"
      },
      {
        "max": 30,
        "trigger": "blur,change",
        "message": "受罚时长最长30天",
        "type": "integer"
      }
    ]
  },
  "admin_user": {
    "name": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "用户名不能为空",
        "type": "string"
      },
      {
        "pattern":/^[\\u4E00-\\u9FFF\\w]{2,20}$/,
        "trigger": "blur,change",
        "message": "用户名必须由2-20个字符组成",
        "type": "string"
      }
    ],
    "password": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "密码不能为空",
        "type": "string"
      },
      {
        "pattern":/^[A-Za-z0-9~`!@#%&)(_=}{:\"><,;'\\[\\]\\\\\\^\\$\\*\\+\\|\\?\\.\\-]{6,20}$/,
        "trigger": "blur,change",
        "message": "密码必须由6-20个字符组成",
        "type": "string"
      }
    ],
    "userType": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "管理员类型不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2"
        ],
        "trigger": "blur,change",
        "message": "管理员类型不正确",
        "type": "enum"
      }
    ],
    "userPriority": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "用户权限不能为空",
        "type": "array"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "至少拥有1个权限",
        "type": "array"
      },
      {
        "max": 8,
        "trigger": "blur,change",
        "message": "最多拥有8个权限",
        "type": "array"
      }
    ],
    "userPriority.0": [
      {
        "enum": [
          "1",
          "2",
          "3",
          "10",
          "11",
          "12",
          "20",
          "21"
        ],
        "trigger": "blur,change",
        "message": "用户权限不正确",
        "type": "enum"
      }
    ]
  },
  "category": {
    "name": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "分类名不能为空",
        "type": "string"
      },
      {
        "min": 2,
        "trigger": "blur,change",
        "message": "分类名至少2个字符",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "分类名的长度不能超过50个字符",
        "type": "string"
      }
    ],
    "parentCategoryId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "上级分类不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "上级分类必须是objectId",
        "type": "string"
      }
    ]
  },
  "resource_profile": {
    "name": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "资源配置名称不能为空",
        "type": "string"
      },
      {
        "min": 2,
        "trigger": "blur,change",
        "message": "资源配置名称至少2个字符",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "资源配置名称的长度不能超过50个字符",
        "type": "string"
      }
    ],
    "range": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "资源配置范围不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "10",
          "12",
          "14",
          "16",
          "18",
          "20",
          "100",
          "102",
          "105",
          "106",
          "110",
          "112",
          "114",
          "116",
          "118",
          "120",
          "122",
          "124",
          "126",
          "128",
          "130",
          "140",
          "150",
          "151",
          "160",
          "161",
          "162"
        ],
        "trigger": "blur,change",
        "message": "资源配置范围的类型不正确",
        "type": "enum"
      }
    ],
    "type": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "资源配置类型不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2"
        ],
        "trigger": "blur,change",
        "message": "资源配置类型的值类型不正确",
        "type": "enum"
      }
    ],
    "maxNum": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "最大文件数量不能为空",
        "type": "number"
      }
    ],
    "maxDiskSpaceInMb": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "最大存储空间不能为空",
        "type": "number"
      }
    ]
  },
  "store_path": {
    "name": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "存储路径名称不能为空",
        "type": "string"
      },
      {
        "min": 2,
        "trigger": "blur,change",
        "message": "存储路径名称至少1个字符",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "存储路径名称的长度不能超过50个字符",
        "type": "string"
      }
    ],
    "path": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "存储路径不能为空"
      }
    ],
    "usage": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "存储路径用途不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "trigger": "blur,change",
        "message": "储路径用途的类型不正确",
        "type": "enum"
      }
    ],
    "sizeInKb": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "容量不能为空",
        "type": "number"
      },
      {
        "max": 1000000,
        "trigger": "blur,change",
        "message": "容量最多1000M",
        "type": "number"
      }
    ],
    "lowThreshold": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "容量下限值不能为空",
        "type": "number"
      },
      {
        "min": 50,
        "trigger": "blur,change",
        "message": "容量下限值至少50%",
        "type": "number"
      },
      {
        "max": 80,
        "trigger": "blur,change",
        "message": "容量门限报警值最多95%",
        "type": "number"
      }
    ],
    "highThreshold": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "容量上限值不能为空",
        "type": "number"
      },
      {
        "min": 60,
        "trigger": "blur,change",
        "message": "容量上限值至少60%",
        "type": "number"
      },
      {
        "max": 95,
        "trigger": "blur,change",
        "message": "容量上限值最多95%",
        "type": "number"
      }
    ]
  },
  "article": {
    "name": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "文档名不能为空",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "文档名的长度不能超过50个字符",
        "type": "string"
      }
    ],
    "status": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "文档状态不能为空",
        "type": "string"
      },
      {
        "enum": [
          "0",
          "1",
          "2"
        ],
        "trigger": "blur,change",
        "message": "文档状态不正确",
        "type": "enum"
      }
    ],
    "folderId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "文档目录不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "文档目录必须是objectId",
        "type": "string"
      }
    ],
    "htmlContent": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "文档内容不能为空",
        "type": "string"
      },
      {
        "min": 15,
        "trigger": "blur,change",
        "message": "文档内容至少15个字符",
        "type": "string"
      },
      {
        "max": 50000,
        "trigger": "blur,change",
        "message": "文档内容的长度不能超过50000个字符",
        "type": "string"
      }
    ],
    "tags": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "文档标签不能为空",
        "type": "array"
      },
      {
        "max": 5,
        "trigger": "blur,change",
        "message": "最多设置5标签",
        "type": "array"
      }
    ],
    "tags.0": [
      {
        "min": 2,
        "trigger": "blur,change",
        "message": "文档标签至少2个字符",
        "type": "string"
      },
      {
        "max": 20,
        "trigger": "blur,change",
        "message": "文档标签的长度不能超过20个字符",
        "type": "string"
      }
    ],
    "categoryId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "文档分类不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "文档分类必须是objectId",
        "type": "string"
      }
    ],
    "allowComment": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "评论设置不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2"
        ],
        "trigger": "blur,change",
        "message": "文档评论设置不正确",
        "type": "enum"
      }
    ]
  },
  "article_comment": {
    "articleId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "文档不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "文档必须是objectId",
        "type": "string"
      }
    ],
    "content": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "评论内容不能为空",
        "type": "string"
      },
      {
        "min": 15,
        "trigger": "blur,change",
        "message": "评论内容至少15个字符",
        "type": "string"
      },
      {
        "max": 255,
        "trigger": "blur,change",
        "message": "评论内容不能超过255个字符",
        "type": "string"
      }
    ]
  },
  "article_like_dislike": {
    "articleId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "文档不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "文档必须是objectId",
        "type": "string"
      }
    ]
  },
  "folder": {
    "name": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "目录名不能为空",
        "type": "string"
      },
      {
        "pattern":/^[\\u4E00-\\u9FFF\\w]{1,255}$/,
        "trigger": "blur,change",
        "message": "目录名必须由1-255个字符组成",
        "type": "string"
      }
    ],
    "parentFolderId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "上级目录不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "上级目录必须是objectId",
        "type": "string"
      }
    ]
  },
  "tag": {
    "name": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "标签名称不能为空",
        "type": "string"
      },
      {
        "pattern":/^[\\u4E00-\\u9FFF\\w]{2,20}$/,
        "trigger": "blur,change",
        "message": "标签名必须由2-20个字符组成",
        "type": "string"
      }
    ]
  },
  "add_friend_request": {
    "receiver": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "添加好友不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "好友必须是objectId",
        "type": "string"
      }
    ],
    "message": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "附加信息不能为空"
      },
      {
        "min": 5,
        "trigger": "blur,change",
        "message": "附加信息至少5个字符"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "附加信息的长度不能超过50个字符"
      }
    ]
  },
  "join_public_group_request": {
    "publicGroupId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "公共群不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "公共群必须是objectId",
        "type": "string"
      }
    ]
  },
  "member_penalize": {
    "publicGroupId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "群不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "群必须是objectId",
        "type": "string"
      }
    ],
    "memberId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "成员不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "成员必须是objectId",
        "type": "string"
      }
    ],
    "penalizeType": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "处罚类型不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2",
          "3",
          "4",
          "10",
          "20",
          "21",
          "30",
          "31",
          "40",
          "50",
          "60",
          "61",
          "70",
          "80",
          "90"
        ],
        "trigger": "blur,change",
        "message": "未知处罚类型",
        "type": "enum"
      }
    ],
    "duration": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "处罚时间不能为空",
        "type": "integer"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "处罚时间最少1天",
        "type": "integer"
      },
      {
        "max": 30,
        "trigger": "blur,change",
        "message": "处罚时间最多30天",
        "type": "integer"
      }
    ]
  },
  "public_group": {
    "name": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "群名称不能为空",
        "type": "string"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "群名称至少1个字符",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "群名称的长度不能超过20个字符",
        "type": "string"
      }
    ],
    "joinInRule": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "新成员加入规则不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2",
          "3"
        ],
        "trigger": "blur,change",
        "message": "新成员加入规则不正确",
        "type": "enum"
      }
    ],
    "adminsId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "群管理员不能为空",
        "type": "array"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "群管理员至少有一个成员",
        "type": "array"
      },
      {
        "max": 10,
        "trigger": "blur,change",
        "message": "群最多有10个群管理员",
        "type": "array"
      }
    ],
    "adminsId.0": [
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "群管理员必须是objectId",
        "type": "string"
      }
    ],
    "membersId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "群成员不能为空",
        "type": "array"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "群至少有一个成员",
        "type": "array"
      },
      {
        "max": 200,
        "trigger": "blur,change",
        "message": "群最多有200个成员",
        "type": "array"
      }
    ],
    "membersId.0": [
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "群成员必须是objectId",
        "type": "string"
      }
    ]
  },
  "public_group_event": {
    "publicGroupId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "群不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "群必须是objectId",
        "type": "string"
      }
    ],
    "eventType": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "群事件类型不能为空",
        "type": "string"
      },
      {
        "enum": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "trigger": "blur,change",
        "message": "未知群事件类型",
        "type": "enum"
      }
    ],
    "targetId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "事件接收者不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "事件接收者必须是objectId",
        "type": "string"
      }
    ],
    "status": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "事件状态不能为空",
        "type": "string"
      },
      {
        "enum": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "trigger": "blur,change",
        "message": "未知事件状态",
        "type": "enum"
      }
    ]
  },
  "public_group_interaction": {
    "publicGroupId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "群不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "群必须是objectId",
        "type": "string"
      }
    ],
    "content": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "群发言内容不能为空",
        "type": "string"
      },
      {
        "min": 15,
        "trigger": "blur,change",
        "message": "群发言内容至少15个字符",
        "type": "string"
      },
      {
        "max": 1000,
        "trigger": "blur,change",
        "message": "群发言内容的长度不能超过1000个字符",
        "type": "string"
      }
    ]
  },
  "user_friend_group": {
    "friendGroupName": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "朋友分组名不能为空",
        "type": "string"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "朋友分组名至少1个字符",
        "type": "string"
      },
      {
        "max": 20,
        "trigger": "blur,change",
        "message": "朋友分组名的长度不能超过20个字符",
        "type": "string"
      }
    ],
    "friendsInGroup": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "好友分组不能为空",
        "type": "array"
      },
      {
        "max": 100,
        "trigger": "blur,change",
        "message": "好友分组最多包含100个好友",
        "type": "array"
      }
    ],
    "friendsInGroup.0": [
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "好友必须是objectId",
        "type": "string"
      }
    ]
  },
  "impeach": {
    "title": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "举报名不能为空",
        "type": "string"
      },
      {
        "min": 2,
        "trigger": "blur,change",
        "message": "举报名至少2个字符",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "举报名的长度不能超过50个字符",
        "type": "string"
      }
    ],
    "content": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "举报内容不能为空",
        "type": "string"
      },
      {
        "min": 5,
        "trigger": "blur,change",
        "message": "举报内容至少5个字符",
        "type": "string"
      },
      {
        "max": 1999,
        "trigger": "blur,change",
        "message": "举报内容的长度不能超过1999个字符",
        "type": "string"
      }
    ],
    "impeachedArticleId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "举报的文档不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "举报的文档必须是objectId",
        "type": "string"
      }
    ],
    "impeachedCommentId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "举报的评论不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "举报的评论必须是objectId",
        "type": "string"
      }
    ]
  },
  "impeach_action": {
    "impeachId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "举报不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "举报必须是objectId",
        "type": "string"
      }
    ],
    "adminOwnerId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "处理人不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "处理人必须是objectId",
        "type": "string"
      }
    ],
    "action": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "操作不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7"
        ],
        "trigger": "blur,change",
        "message": "未知操作",
        "type": "enum"
      }
    ]
  },
  "impeach_image": {
    "impeachId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "举报对象不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "举报对象必须是objectId",
        "type": "string"
      }
    ]
  },
  "impeach_comment": {
    "impeachId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "举报不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "举报必须是objectId",
        "type": "string"
      }
    ]
  },
  "impeach_comment_image": {
    "impeachCommentId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "举报处理不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "举报处理必须是objectId",
        "type": "string"
      }
    ]
  },
  "user": {
    "name": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "昵称不能为空",
        "type": "string"
      },
      {
        "max": 20,
        "trigger": "blur,change",
        "message": "昵称最多20个字符",
        "type": "string"
      },
      {
        "pattern":/^[\\u4E00-\\u9FFF\\w]{2,20}$/,
        "trigger": "blur,change",
        "message": "昵称必须由2-20个字符组成",
        "type": "string"
      }
    ],
    "account": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "账号不能为空",
        "type": "string"
      },
      {
        "pattern":/^(([\\w\\u4e00-\\u9fa5\\-]+\\.)*[\\w\\u4e00-\\u9fa5\\-]+@([\\w\\u4e00-\\u9fa5\\-]+\\.)+[A-Za-z]+|1\\d{10})$/,
        "trigger": "blur,change",
        "message": "账号必须是手机号或者email",
        "type": "string"
      }
    ],
    "password": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "密码不能为空",
        "type": "string"
      },
      {
        "pattern":/^[A-Za-z0-9~`!@#%&)(_=}{:\"><,;'\\[\\]\\\\\\^\\$\\*\\+\\|\\?\\.\\-]{6,20}$/,
        "trigger": "blur,change",
        "message": "密码必须由6-20个字符组成",
        "type": "string"
      }
    ],
    "addFriendRule": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "朋友规则不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2",
          "3"
        ],
        "trigger": "blur,change",
        "message": "未知规则",
        "type": "enum"
      }
    ]
  },
  "user_resource_profile": {
    "userId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "用户不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "用户格式不正确",
        "type": "string"
      }
    ],
    "resource_profile_id": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "资源配置不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "资源配置格式不正确",
        "type": "string"
      }
    ],
    "duration": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "资源配置有效期不能为空",
        "type": "number"
      },
      {
        "min": 0,
        "trigger": "blur,change",
        "message": "源配置有效期最短1天",
        "type": "number"
      },
      {
        "max": 365,
        "trigger": "blur,change",
        "message": "源配置有效期最长1年",
        "type": "number"
      }
    ]
  },
  "collection": {
    "name": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "收藏夹名不能为空",
        "type": "string"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "收藏夹名至少1个字符",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "收藏夹名的字符数不能超过50个字符",
        "type": "string"
      }
    ],
    "articlesId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "收藏文档不能为空",
        "type": "array"
      },
      {
        "max": 100,
        "trigger": "blur,change",
        "message": "最多收藏100篇文档",
        "type": "array"
      }
    ],
    "articlesId.0": [
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "文档必须是objectId",
        "type": "string"
      }
    ],
    "topicsId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "系列不能为空",
        "type": "array"
      },
      {
        "max": 100,
        "trigger": "blur,change",
        "message": "最多收藏100个系列",
        "type": "array"
      }
    ],
    "topicsId.0": [
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "系列必须是objectId",
        "type": "string"
      }
    ]
  },
  "send_recommend": {
    "articleId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "文档不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "文档必须是objectId",
        "type": "string"
      }
    ]
  },
  "topic": {
    "name": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "系列名不能为空",
        "type": "string"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "系列名至少1个字符",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "系列名的字符数不能超过50个字符",
        "type": "string"
      }
    ],
    "desc": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "系列描述不能为空",
        "type": "string"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "系列描述至少1个字符",
        "type": "string"
      },
      {
        "max": 140,
        "trigger": "blur,change",
        "message": "系列描述包含的字符数不能超过50个字符",
        "type": "string"
      }
    ],
    "articlesId": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "系列文档不能为空",
        "type": "array"
      },
      {
        "max": 10,
        "trigger": "blur,change",
        "message": "最多设置10篇文档",
        "type": "array"
      }
    ],
    "articlesId.0": [
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "文档必须是objectId",
        "type": "string"
      }
    ]
  }
}
const ruleForUpdate=
{
  "admin_penalize": {},
  "admin_user": {
    "name": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "用户名不能为空",
        "type": "string"
      },
      {
        "pattern":/^[\\u4E00-\\u9FFF\\w]{2,20}$/,
        "trigger": "blur,change",
        "message": "用户名必须由2-20个字符组成",
        "type": "string"
      }
    ],
    "password": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "密码不能为空",
        "type": "string"
      },
      {
        "pattern":/^[A-Za-z0-9~`!@#%&)(_=}{:\"><,;'\\[\\]\\\\\\^\\$\\*\\+\\|\\?\\.\\-]{6,20}$/,
        "trigger": "blur,change",
        "message": "密码必须由6-20个字符组成",
        "type": "string"
      }
    ],
    "userType": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "管理员类型不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2"
        ],
        "trigger": "blur,change",
        "message": "管理员类型不正确",
        "type": "enum"
      }
    ],
    "userPriority": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "用户权限不能为空",
        "type": "array"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "至少拥有1个权限",
        "type": "array"
      },
      {
        "max": 8,
        "trigger": "blur,change",
        "message": "最多拥有8个权限",
        "type": "array"
      }
    ],
    "userPriority.0": [
      {
        "enum": [
          "1",
          "2",
          "3",
          "10",
          "11",
          "12",
          "20",
          "21"
        ],
        "trigger": "blur,change",
        "message": "用户权限不正确",
        "type": "enum"
      }
    ]
  },
  "category": {
    "name": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "分类名不能为空",
        "type": "string"
      },
      {
        "min": 2,
        "trigger": "blur,change",
        "message": "分类名至少2个字符",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "分类名的长度不能超过50个字符",
        "type": "string"
      }
    ],
    "parentCategoryId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "上级分类不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "上级分类必须是objectId",
        "type": "string"
      }
    ]
  },
  "resource_profile": {},
  "store_path": {
    "sizeInKb": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "容量不能为空",
        "type": "number"
      },
      {
        "max": 1000000,
        "trigger": "blur,change",
        "message": "容量最多1000M",
        "type": "number"
      }
    ],
    "lowThreshold": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "容量下限值不能为空",
        "type": "number"
      },
      {
        "min": 50,
        "trigger": "blur,change",
        "message": "容量下限值至少50%",
        "type": "number"
      },
      {
        "max": 80,
        "trigger": "blur,change",
        "message": "容量门限报警值最多95%",
        "type": "number"
      }
    ],
    "highThreshold": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "容量上限值不能为空",
        "type": "number"
      },
      {
        "min": 60,
        "trigger": "blur,change",
        "message": "容量上限值至少60%",
        "type": "number"
      },
      {
        "max": 95,
        "trigger": "blur,change",
        "message": "容量上限值最多95%",
        "type": "number"
      }
    ]
  },
  "article": {
    "name": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "文档名不能为空",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "文档名的长度不能超过50个字符",
        "type": "string"
      }
    ],
    "status": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "文档状态不能为空",
        "type": "string"
      },
      {
        "enum": [
          "0",
          "1",
          "2"
        ],
        "trigger": "blur,change",
        "message": "文档状态不正确",
        "type": "enum"
      }
    ],
    "folderId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "文档目录不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "文档目录必须是objectId",
        "type": "string"
      }
    ],
    "htmlContent": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "文档内容不能为空",
        "type": "string"
      },
      {
        "min": 15,
        "trigger": "blur,change",
        "message": "文档内容至少15个字符",
        "type": "string"
      },
      {
        "max": 50000,
        "trigger": "blur,change",
        "message": "文档内容的长度不能超过50000个字符",
        "type": "string"
      }
    ],
    "tags": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "文档标签不能为空",
        "type": "array"
      },
      {
        "max": 5,
        "trigger": "blur,change",
        "message": "最多设置5标签",
        "type": "array"
      }
    ],
    "tags.0": [
      {
        "min": 2,
        "trigger": "blur,change",
        "message": "文档标签至少2个字符",
        "type": "string"
      },
      {
        "max": 20,
        "trigger": "blur,change",
        "message": "文档标签的长度不能超过20个字符",
        "type": "string"
      }
    ],
    "categoryId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "文档分类不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "文档分类必须是objectId",
        "type": "string"
      }
    ],
    "allowComment": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "评论设置不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2"
        ],
        "trigger": "blur,change",
        "message": "文档评论设置不正确",
        "type": "enum"
      }
    ]
  },
  "article_comment": {},
  "article_like_dislike": {},
  "folder": {
    "name": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "目录名不能为空",
        "type": "string"
      },
      {
        "pattern":/^[\\u4E00-\\u9FFF\\w]{1,255}$/,
        "trigger": "blur,change",
        "message": "目录名必须由1-255个字符组成",
        "type": "string"
      }
    ],
    "parentFolderId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "上级目录不能为空",
        "type": "string"
      },
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "上级目录必须是objectId",
        "type": "string"
      }
    ]
  },
  "tag": {},
  "add_friend_request": {},
  "join_public_group_request": {},
  "member_penalize": {},
  "public_group": {
    "name": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "群名称不能为空",
        "type": "string"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "群名称至少1个字符",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "群名称的长度不能超过20个字符",
        "type": "string"
      }
    ],
    "joinInRule": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "新成员加入规则不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2",
          "3"
        ],
        "trigger": "blur,change",
        "message": "新成员加入规则不正确",
        "type": "enum"
      }
    ],
    "adminsId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "群管理员不能为空",
        "type": "array"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "群管理员至少有一个成员",
        "type": "array"
      },
      {
        "max": 10,
        "trigger": "blur,change",
        "message": "群最多有10个群管理员",
        "type": "array"
      }
    ],
    "adminsId.0": [
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "群管理员必须是objectId",
        "type": "string"
      }
    ],
    "membersId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "群成员不能为空",
        "type": "array"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "群至少有一个成员",
        "type": "array"
      },
      {
        "max": 200,
        "trigger": "blur,change",
        "message": "群最多有200个成员",
        "type": "array"
      }
    ],
    "membersId.0": [
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "群成员必须是objectId",
        "type": "string"
      }
    ]
  },
  "public_group_event": {},
  "public_group_interaction": {},
  "user_friend_group": {
    "friendGroupName": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "朋友分组名不能为空",
        "type": "string"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "朋友分组名至少1个字符",
        "type": "string"
      },
      {
        "max": 20,
        "trigger": "blur,change",
        "message": "朋友分组名的长度不能超过20个字符",
        "type": "string"
      }
    ],
    "friendsInGroup": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "好友分组不能为空",
        "type": "array"
      },
      {
        "max": 100,
        "trigger": "blur,change",
        "message": "好友分组最多包含100个好友",
        "type": "array"
      }
    ],
    "friendsInGroup.0": [
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "好友必须是objectId",
        "type": "string"
      }
    ]
  },
  "impeach": {
    "title": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "举报名不能为空",
        "type": "string"
      },
      {
        "min": 2,
        "trigger": "blur,change",
        "message": "举报名至少2个字符",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "举报名的长度不能超过50个字符",
        "type": "string"
      }
    ],
    "content": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "举报内容不能为空",
        "type": "string"
      },
      {
        "min": 5,
        "trigger": "blur,change",
        "message": "举报内容至少5个字符",
        "type": "string"
      },
      {
        "max": 1999,
        "trigger": "blur,change",
        "message": "举报内容的长度不能超过1999个字符",
        "type": "string"
      }
    ]
  },
  "impeach_action": {},
  "impeach_image": {},
  "impeach_comment": {
    "content": [
      {
        "required": true,
        "trigger": "blur,change",
        "message": "评论内容不能为空",
        "type": "string"
      },
      {
        "min": 15,
        "trigger": "blur,change",
        "message": "评论内容至少15个字符",
        "type": "string"
      },
      {
        "max": 140,
        "trigger": "blur,change",
        "message": "评论内容不能超过140个字符",
        "type": "string"
      }
    ]
  },
  "impeach_comment_image": {},
  "user": {
    "name": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "昵称不能为空",
        "type": "string"
      },
      {
        "max": 20,
        "trigger": "blur,change",
        "message": "昵称最多20个字符",
        "type": "string"
      },
      {
        "pattern":/^[\\u4E00-\\u9FFF\\w]{2,20}$/,
        "trigger": "blur,change",
        "message": "昵称必须由2-20个字符组成",
        "type": "string"
      }
    ],
    "account": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "账号不能为空",
        "type": "string"
      },
      {
        "pattern":/^(([\\w\\u4e00-\\u9fa5\\-]+\\.)*[\\w\\u4e00-\\u9fa5\\-]+@([\\w\\u4e00-\\u9fa5\\-]+\\.)+[A-Za-z]+|1\\d{10})$/,
        "trigger": "blur,change",
        "message": "账号必须是手机号或者email",
        "type": "string"
      }
    ],
    "password": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "密码不能为空",
        "type": "string"
      },
      {
        "pattern":/^[A-Za-z0-9~`!@#%&)(_=}{:\"><,;'\\[\\]\\\\\\^\\$\\*\\+\\|\\?\\.\\-]{6,20}$/,
        "trigger": "blur,change",
        "message": "密码必须由6-20个字符组成",
        "type": "string"
      }
    ],
    "addFriendRule": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "朋友规则不能为空",
        "type": "string"
      },
      {
        "enum": [
          "1",
          "2",
          "3"
        ],
        "trigger": "blur,change",
        "message": "未知规则",
        "type": "enum"
      }
    ]
  },
  "user_resource_profile": {},
  "collection": {
    "name": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "收藏夹名不能为空",
        "type": "string"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "收藏夹名至少1个字符",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "收藏夹名的字符数不能超过50个字符",
        "type": "string"
      }
    ],
    "articlesId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "收藏文档不能为空",
        "type": "array"
      },
      {
        "max": 100,
        "trigger": "blur,change",
        "message": "最多收藏100篇文档",
        "type": "array"
      }
    ],
    "articlesId.0": [
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "文档必须是objectId",
        "type": "string"
      }
    ],
    "topicsId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "系列不能为空",
        "type": "array"
      },
      {
        "max": 100,
        "trigger": "blur,change",
        "message": "最多收藏100个系列",
        "type": "array"
      }
    ],
    "topicsId.0": [
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "系列必须是objectId",
        "type": "string"
      }
    ]
  },
  "send_recommend": {},
  "topic": {
    "name": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "系列名不能为空",
        "type": "string"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "系列名至少1个字符",
        "type": "string"
      },
      {
        "max": 50,
        "trigger": "blur,change",
        "message": "系列名的字符数不能超过50个字符",
        "type": "string"
      }
    ],
    "desc": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "系列描述不能为空",
        "type": "string"
      },
      {
        "min": 1,
        "trigger": "blur,change",
        "message": "系列描述至少1个字符",
        "type": "string"
      },
      {
        "max": 140,
        "trigger": "blur,change",
        "message": "系列描述包含的字符数不能超过50个字符",
        "type": "string"
      }
    ],
    "articlesId": [
      {
        "required": false,
        "trigger": "blur,change",
        "message": "系列文档不能为空",
        "type": "array"
      },
      {
        "max": 10,
        "trigger": "blur,change",
        "message": "最多设置10篇文档",
        "type": "array"
      }
    ],
    "articlesId.0": [
      {
        "pattern":/^[0-9a-fA-F]{24}$/,
        "trigger": "blur,change",
        "message": "文档必须是objectId",
        "type": "string"
      }
    ]
  }
}

export {ruleForCreate,ruleForUpdate}