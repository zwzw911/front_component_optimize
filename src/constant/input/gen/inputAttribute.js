/*    gene by D:\U\ss_vue_express\server_common\maintain\convert2Client\generateClientInputAttribute.js  
* 字段的必要属性，例如label，placeHolder等 
*/

"use strict"


const inputAttribute={
    "admin_penalize": {
        "punishedId": {
            "label": "受罚人",
            "placeHolder": [
                "受罚人账号，手机号或者邮件地址"
            ],
            "placeHolderBkup": [
                "受罚人账号，手机号或者邮件地址"
            ]
        },
        "reason": {
            "label": "受罚原因",
            "placeHolder": [
                "受罚原因，至少15个字符"
            ],
            "placeHolderBkup": [
                "受罚原因，至少15个字符"
            ]
        },
        "penalizeType": {
            "label": "受罚类型",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "1": "禁止文档",
                "2": "禁止评论",
                "3": "禁止创建系列",
                "4": "禁止踩赞",
                "10": "禁止评论举报",
                "20": "禁止好友分组",
                "21": "禁止添加好友",
                "30": "禁止创建群",
                "31": "禁止加入群",
                "40": "禁止上传头像",
                "50": "禁止目录相关操作",
                "60": "禁止举报",
                "61": "禁止操作举报",
                "70": "禁止用户相关操作",
                "80": "禁止分享文档",
                "90": "禁止收藏文档"
            }
        },
        "penalizeSubType": {
            "label": "受罚子类型",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "1": "禁止创建",
                "2": "禁止读取",
                "3": "禁止更新",
                "4": "禁止删除",
                "5": "禁止查询",
                "9": "禁止所有操作"
            }
        },
        "duration": {
            "label": "受罚时长",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "revokeReason": {
            "label": "撤销原因",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "admin_user": {
        "name": {
            "label": "用户名",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "unique": true
        },
        "password": {
            "label": "密码",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "userType": {
            "label": "管理员类型",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "1": "超级管理员",
                "2": "管理员"
            }
        },
        "userPriority": {
            "label": "用户权限",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "1": "浏览举报",
                "2": "分配举报",
                "3": "处理举报",
                "10": "创建管理员",
                "11": "删除管理员",
                "12": "更新管理员",
                "20": "处罚用户",
                "21": "撤销处罚"
            }
        }
    },
    "category": {
        "name": {
            "label": "分类名称",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "unique": true
        },
        "parentCategoryId": {
            "label": "上级分类",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "resource_profile": {
        "name": {
            "label": "资源配置名称",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "unique": true
        },
        "range": {
            "label": "资源配置范围",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "1": "用户文档所有资源",
                "10": "文档图片",
                "12": "文档附件",
                "14": "单次举报最大可插入图片资源",
                "16": "举报附件资源",
                "18": "整个举报过程中最大可插入图片资源",
                "20": "整个举报过程中用户最大可插入图片资源",
                "100": "最大目录数量",
                "102": "最大朋友群数量",
                "105": "最大朋友数量",
                "106": "最大未处理的添加朋友的请求数",
                "110": "新建但未做过任何处理的文档数",
                "112": "最大文档数",
                "114": "文档最大评论数",
                "116": "用户对文档的最大评论数",
                "118": "用户最大编辑中举报数",
                "120": "最大撤销举报数",
                "122": "用户最大提交当未被处理的举报数",
                "124": "每个举报中每个用户最多创建的评论",
                "126": "每个用户最大可创建的公共群数",
                "130": "入群最大被拒次数",
                "140": "最大分享文档数量",
                "150": "最大未读的收到的分享文档数量",
                "151": "最大已读的接收到的分享文档数量",
                "160": "每个用户最大可创建的收藏夹数量",
                "161": "每个收藏夹中最大文档数量",
                "162": "每个收藏夹中最大主题数量"
            }
        },
        "type": {
            "label": "资源配置类型",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "1": "基本资源配置",
                "2": "高级资源配置"
            }
        },
        "maxNum": {
            "label": "最大文件数量",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "maxDiskSpaceInMb": {
            "label": "最大存储空间",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "store_path": {
        "name": {
            "label": "存储路径名称",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "unique": true
        },
        "path": {
            "label": "存储路径",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "unique": true
        },
        "usage": {
            "label": "用途",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "1": "临时文件夹",
                "2": "用户头像",
                "3": "文档图片",
                "4": "文档附件",
                "5": "举报图片"
            }
        },
        "sizeInKb": {
            "label": "容量",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "lowThreshold": {
            "label": "容量下限值",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "highThreshold": {
            "label": "容量上限值",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "article": {
        "name": {
            "label": "文档标题",
            "placeHolder": [
                "文档标题，至多50个字符"
            ],
            "placeHolderBkup": [
                "文档标题，至多50个字符"
            ]
        },
        "status": {
            "label": "文档状态",
            "placeHolder": [
                "文档状态"
            ],
            "placeHolderBkup": [
                "文档状态"
            ],
            "enumValue": {
                "0": "新建文档",
                "1": "编辑中",
                "2": "编辑完成"
            }
        },
        "folderId": {
            "label": "文档目录",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "htmlContent": {
            "label": "文档内容",
            "placeHolder": [
                "文档内容"
            ],
            "placeHolderBkup": [
                "文档内容"
            ]
        },
        "tags": {
            "label": "文档标签",
            "placeHolder": [
                "文档标签，2至20个字符"
            ],
            "placeHolderBkup": [
                "文档标签，2至20个字符"
            ]
        },
        "categoryId": {
            "label": "分类",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "allowComment": {
            "label": "允许评论",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "1": "允许评论",
                "2": "禁止评论"
            }
        }
    },
    "article_comment": {
        "articleId": {
            "label": "文档",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "content": {
            "label": "评论内容",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "article_like_dislike": {
        "articleId": {
            "label": "文档",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "folder": {
        "name": {
            "label": "目录名称",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "parentFolderId": {
            "label": "上级目录",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "tag": {
        "name": {
            "label": "标签名称",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "unique": true
        }
    },
    "add_friend_request": {
        "receiver": {
            "label": "添加的好友",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "message": {
            "label": "附加信息",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "join_public_group_request": {
        "publicGroupId": {
            "label": "公共群",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "member_penalize": {
        "publicGroupId": {
            "label": "群",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "memberId": {
            "label": "成员",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "penalizeType": {
            "label": "处罚类型",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "1": "禁止文档",
                "2": "禁止评论",
                "3": "禁止创建系列",
                "4": "禁止踩赞",
                "10": "禁止评论举报",
                "20": "禁止好友分组",
                "21": "禁止添加好友",
                "30": "禁止创建群",
                "31": "禁止加入群",
                "40": "禁止上传头像",
                "50": "禁止目录相关操作",
                "60": "禁止举报",
                "61": "禁止操作举报",
                "70": "禁止用户相关操作",
                "80": "禁止分享文档",
                "90": "禁止收藏文档"
            }
        },
        "duration": {
            "label": "处罚时间",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "public_group": {
        "name": {
            "label": "群名称",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "unique": true
        },
        "joinInRule": {
            "label": "新成员加入规则",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "1": "任意加入",
                "2": "批准加入",
                "3": "拒绝加入"
            }
        },
        "adminsId": {
            "label": "群管理员",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "membersId": {
            "label": "群成员",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "public_group_event": {
        "publicGroupId": {
            "label": "群",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "eventType": {
            "label": "群事件类型",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "0": "群创建",
                "1": "新用户申请加入",
                "2": "邀请新用户加入",
                "3": "更改管理员",
                "4": "删除群成员",
                "5": "用户退群"
            }
        },
        "targetId": {
            "label": "事件接收者",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "status": {
            "label": "事件状态",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "0": "群创建",
                "1": "新用户申请加入",
                "2": "邀请新用户加入",
                "3": "更改管理员",
                "4": "删除群成员",
                "5": "用户退群"
            }
        }
    },
    "public_group_interaction": {
        "publicGroupId": {
            "label": "群",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "content": {
            "label": "群发言内容",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "user_friend_group": {
        "friendGroupName": {
            "label": "朋友分组名",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "friendsInGroup": {
            "label": "好友分组",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "impeach": {
        "title": {
            "label": "举报名",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "content": {
            "label": "举报内容",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "impeachedArticleId": {
            "label": "举报的文档",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "impeachedCommentId": {
            "label": "举报的评论",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "impeach_action": {
        "impeachId": {
            "label": "举报",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "adminOwnerId": {
            "label": "处理人",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "action": {
            "label": "操作",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "1": "创建",
                "2": "提交",
                "3": "撤回",
                "4": "分配",
                "5": "接受",
                "6": "驳回",
                "7": "完成"
            }
        }
    },
    "impeach_image": {
        "impeachId": {
            "label": "举报对象",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "impeach_comment": {
        "impeachId": {
            "label": "举报",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "content": {
            "label": "评论内容",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "impeach_comment_image": {
        "impeachCommentId": {
            "label": "举报处理",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "user": {
        "name": {
            "label": "昵称",
            "placeHolder": [
                "昵称，由2-20个字符组成"
            ],
            "placeHolderBkup": [
                "昵称，由2-20个字符组成"
            ],
            "unique": true
        },
        "account": {
            "label": "账号",
            "placeHolder": [
                "请输入您的手机号",
                "请输入您的电子邮件地址"
            ],
            "placeHolderBkup": [
                "请输入您的手机号",
                "请输入您的电子邮件地址"
            ],
            "unique": true
        },
        "password": {
            "label": "密码",
            "placeHolder": [
                "密码，由6-20个字母、数字、特殊字符组成"
            ],
            "placeHolderBkup": [
                "密码，由6-20个字母、数字、特殊字符组成"
            ]
        },
        "photoDataUrl": {
            "label": "用户头像",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "addFriendRule": {
            "label": "朋友规则",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ],
            "enumValue": {
                "1": "任意加入",
                "2": "批准加入",
                "3": "拒绝加入"
            }
        }
    },
    "user_resource_profile": {
        "userId": {
            "label": "用户",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "resource_profile_id": {
            "label": "资源配置",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "duration": {
            "label": "资源配置有效期",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "collection": {
        "name": {
            "label": "收藏夹名",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "articlesId": {
            "label": "收藏文档",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "topicsId": {
            "label": "收藏系列",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "send_recommend": {
        "articleId": {
            "label": "文档",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    },
    "topic": {
        "name": {
            "label": "系列名",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "desc": {
            "label": "系列描述",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        },
        "articlesId": {
            "label": "系列文档",
            "placeHolder": [
                ""
            ],
            "placeHolderBkup": [
                ""
            ]
        }
    }
}

export {inputAttribute}