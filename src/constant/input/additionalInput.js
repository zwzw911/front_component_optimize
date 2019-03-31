/**
 * Created by 张伟 on 2019/3/13.
 * 某些需要输入的字段，无法通过server端产生，需要手工产生inputAttr,inputTemp，inputValue,rule
 * 以便在需要的时候，和到server产生的inputValue，完成client的验证
 * 因为这样的字段很少，所以把inputAttr/inputTemp/inputValue/rule放在一个文件中操作
 */
'use strict'
/**
 * inputAttribute: label/placeHolder/placeHolderBkup/enumValue/autoGen
 * **/
const additionalInput={
  captcha:{
    inputAttribute:{"label":"验证码","placeHolder":["验证码"],"placeHolderBkup":["验证码"]},
    inputTempData:{"validResult":null},
    inputValue:null,
    rule:[
      {"required":true,"trigger":"blur,change","message":"验证码不能为空","type":"string"},
      {"pattern":/^[\da-zA-Z]{4}$/,"trigger":"blur,change","message":"验证码格式错误","type":"string"}
      ]
  },
}

export {additionalInput}
