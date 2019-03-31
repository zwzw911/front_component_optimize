/**
 * Created by 张伟 on 2019/03/13.
 */
'use strict'

import {inputValueForCreate,inputValueForUpdate} from '../constant/inputValue/gen/inputValue'
import {inputAttribute} from '../constant/inputValue/gen/inputAttribute'
import {inputTempData} from '../constant/inputValue/gen/inputTempData'
import {ruleForCreate,ruleForUpdate} from '../constant/rule/rule'
import {extraAttribute} from '../constant/inputValue/manual/extraAttribute'
// inputRule/Attribute/Value/Tempdata，不可改变，实际copy副本，然后使用
let inputRelatePropertyInfo={
  state:{
    inputValueForCreate:inputValueForCreate,
    inputValueForUpdate:inputValueForUpdate,
    inputAttribute:inputAttribute,
    inputTempData:inputTempData,
    ruleForCreate:ruleForCreate,
    ruleForUpdate:ruleForUpdate,
    extraAttribute:extraAttribute,
  },
  getters:{},
  mutations:{
  },
  actions:{}
}



export {
  inputRelatePropertyInfo,

}
