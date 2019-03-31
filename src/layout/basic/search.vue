<style scoped>
</style>

<template>
  <div class="flex-flow-row-nowrap justify-content-space-between align-items-center">
    <img :src="searchInfo.config.logoSrc"/>
    <div class="">
      <Input style="width: 280px;">
        <Button   slot="append" icon="ios-search" :style="[buttonBgColor,buttonRadius]" style="" ></Button>
      </Input>

    </div>

  </div>
</template>

<script>
  // import {TABLE} from '../../assets/constant'

  export default {
    props:['searchInfo'], //searchInfo.config:一些图片/主题的配置
      methods:{
        /*menuChange(name){
//          console.log(`menuchange in ${name}`)
        },
        clickMenu(name){
//            console.log(`${typeof TABLE.billType}`)
            console.log(`sidebar cilic is ${JSON.stringify(name)}`)
          let cName=''
          for(let submenu in this.sidebarName){
                for(let menuKey in this.sidebarName[submenu].children){
                    if(name===menuKey){
                      cName=this.sidebarName[submenu]['children'][menuKey]['name']
                      break
                    }
                }
          }

          this.$store.commit('setClickedTableAndMenu',{table:name,chineseName:cName})
          this.$store.commit('setClickedTable',{table:name,chineseName:cName})
          this.$store.commit('setCurrentTabelHeader',{currentColl:name})
//          console.log(`after commit`)
//          this.$store.commit('initAllACValue')
          //为当前coll的所有字段获得ac，以便为coll的所有记录服务
//          this.$store.dispatch('getAllFieldACValueByUpdate',{})

          this.$store.dispatch('search',{searchParams:{},currentPage:1})
          //点击coll时，初始获得所有外键的AC信息
//          this.$store.dispatch('initGetAllFieldValue',{searchParams:{},currentPage:1,currentColl:name})
//          console.log(`after dispatch`)
        }*/
      },

    computed:{
      buttonBgColor(){
        switch (this.searchInfo.config.buttonType){
          case 'primary':
            return {
              'background-color':`#2d8cf0`,
              color:`white`,
            }
        }
      },
      buttonRadius(){
        return {
          'border-top-left-radius': `0px`,
          'border-bottom-left-radius': `0px`
        }

      },
    },
      data(){
        return {

        }
          /*return {
            sidebarName: {
                configuration:{
//              key:'configuration',
//                name: 'configuration',
                  name:'配置信息',
                icon:'gear-b',
                children:
                  {
        //submenu中，将key的值绑定到name属性，当此menu被点击（on-select），name（也就是sidebarName的key）会被返回，所以最好英文
                    billType:{name: '单据类别'},
                    department:{name:'部门信息'},
                    employee:{name:  '员工信息'}
                  }
            },
            reimbursement:{
//              name: 'reimbursement',
              name:'报销信息',
              icon:'clipboard',
              children:
                {
                  bill:{name: '报销记录'},
                  'static':{name:'统计信息'}
                }


            }
          },
             /!* sidebarName:[
              {
                label: '配置信息',
                name: 'configuration',
                icon:'gear-b',
                children: [
                    //menu中，name属性作为key，会被返回，所以最好英文
                  {name:TABLE.billType.toString(),label: '单据类别'},
                  {name:TABLE.department.toString(), label: '部门信息'},
                  {name:TABLE.employee.toString(), label: '员工信息'}
                ]

              },
              {
                label:'报销信息',
                name: 'reimbursement',
                icon:'clipboard',
                children:[
                  {name:TABLE.bill.toString(),label:'报销记录'},
                  {label:'统计信息'}
                ]

              }
            ],*!/
          }*/

      }
  }
</script>
