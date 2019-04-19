/*    gene by D:\U\ss_vue_express\server_common\maintain\convert2Client\generateClientNonValueEnum.js
* 一些常用的enum值，写代码方便，例如ValidatePart
*/

"use strict"

/**
 * enumValue: 为select提供option
 * required：是否显示星号，已经全局判断字段是否验证通过
 * **/
const InputAttributeFieldName=
{"LABEL":"label","PLACE_HOLDER":"placeHolder","PLACE_HOLDER_BKUP":"placeHolderBkup","ENUM_VALUE":"enumValue","REQUIRED":"required","AUTO_GEN":"autoGen"}//"INPUT_TYPE":"inputType","UNIQUE":"unique","AUTO_GEN":"autoGen"
const InputTempDataFieldName=
{"VALID_RESULT":"validResult"}
const ValidatePart=
{"SEARCH_PARAMS":"searchParams","RECORD_INFO":"recordInfo","RECORD_ID":"recordId","CURRENT_PAGE":"currentPage","FILTER_FIELD_VALUE":"filterFieldValue","RECORD_ID_ARRAY":"recIdArr","EDIT_SUB_FIELD":"editSubField","EVENT":"event","SINGLE_FIELD":"singleField","MANIPULATE_ARRAY":"manipulateArray","METHOD":"method","CAPTCHA":"captcha","SMS":"sms","CHOOSE_FRIEND":"chooseFriend"}


const RichTextEditor={
  'WANG_EDITOR':'wangEditor',
}


export {
  InputAttributeFieldName,
  InputTempDataFieldName,
  ValidatePart,

  RichTextEditor,
}
