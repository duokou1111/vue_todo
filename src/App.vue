<template>
    <div class="mask">
      <div class="task_content" style="width:300px;background:#FFF;position:absolute;left:calc(50% - 125px);top:calc(50% - 100px)">
         <div class="center">
               <span class="mask_title">12321</span>
         </div>
         <div class="mask_content">今天要去打猎不然回不了叫啊实打实大苏打你</div>
         <div class="mask_close" @click="close">×</div>
      </div>
    </div>
    <div class="container" @mouseleave="testLeave">
        <span class="now btn" @click="now">现在</span>
         <div class="center">
          <div class="container_head">
            <span class="left_btn btn" @click="previous"> 前一月 </span>
            <span>{{currentDateStr}}</span>
            <span class="right_btn btn" @click="next"> 后一月 </span>
          </div>
        </div>
        <div class="container_th">
          <span>星期一</span>
          <span>星期二</span>
          <span>星期三</span>
          <span>星期四</span>
          <span>星期五</span>
          <span>星期六</span>
          <span>星期天</span>
        </div>
        <div class="container_box" >
          <div @click="testEnter($event,item.task)" :class="{container_box_inner_content:item.task}"  class="container_box_inner" v-for="item in dateBox" :key="item" :style="{background:(item.currentMonth?'#FFF':'#fafafa')}">
            <span class="container_box_inner_date" :class="{container_box_inner_date_current:item.currentDate}"> {{item.date.getDate()}} </span>
            <div class="add_box">
              <div class="add_box_title" >
                <span>标题</span>
                <div style="flex:1;border-bottom:1px solid #CCC;"><input @input="titleInput($event)" type="text" style="width:100%;border:none;outline:none"></div>
              </div>
               <div class="add_box_title">
                <span>内容</span>
                <div style="flex:1;"><textarea @input="contentInput($event)" style="width:100%;border:1px solid #CCC;outline:none;height:100px;"></textarea></div>
              </div>
              <div class="add_box_submit" @click="submit(item.date)">提交</div>
            </div>
          </div>       
        </div>
    </div>
</template>

<script>
var currentNode;
import HelloWorld from './components/HelloWorld.vue'
import {getDateArray,getLastMonth} from '@/assets/js/date.js'
export default {
  name: 'App',
  mounted(){
    this.now();
  },
  data(){
        return {
            content:'',
            title:'',
            currentDateStr:'',
            currentDate:new Date(),
            dateBox:[]
        }
    },
  methods:{
    now:function(){
      this.currentDate = new Date();
      this.currentDate.setDate(1);
      this.dateBox = getDateArray(this.currentDate);
      var month = this.currentDate.getMonth() + 1;
      this.currentDateStr = this.currentDate.getFullYear()+"年"+month+"月";
    }
    ,
    previous:function(){
      var arr = getLastMonth(this.currentDate);
      this.currentDate = new Date(arr[0],arr[1],1); 
      this.dateBox = getDateArray(this.currentDate);
      var month = this.currentDate.getMonth() + 1;
      this.currentDateStr = this.currentDate.getFullYear()+"年"+month+"月";
    },
    next:function(){
      this.currentDate = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth() + 1,1); 
      this.dateBox = getDateArray(this.currentDate);
      var month = this.currentDate.getMonth() + 1;
      this.currentDateStr = this.currentDate.getFullYear()+"年"+month+"月";
    },
    testEnter:function(event,task){
       if(currentNode!=null)
            currentNode.style.cssText="display:none;"
      if(task){
        document.getElementsByClassName('mask_title')[0].innerHTML = task.title;
        document.getElementsByClassName('mask_content')[0].innerHTML = task.content;
        document.getElementsByClassName('mask')[0].style.cssText="display:block";
      }else{
        currentNode = event.currentTarget.getElementsByClassName('add_box')[0];
        currentNode.style.cssText="display:block;"
      }
    },
    testLeave:function(event){
      if(currentNode!=null)
        currentNode.style.cssText="display:none;"
    },
    titleInput:function(event){
      this.title = event.currentTarget.value;
    },
    contentInput:function(event){
      this.content = event.currentTarget.value;
    },
    submit:function(date){
      var storage=window.localStorage;
      var key = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString();
      var obj = new Object();
      obj.title = this.title;
      obj.content = this.content;
      storage.setItem(key,JSON.stringify(obj));
      this.dateBox = getDateArray(this.currentDate);
    },
    close:function(){
      document.getElementsByClassName('mask')[0].style.cssText="display:none";
    }
  }
}
</script>

<style>
.mask{width:100%;height:100%;position:fixed;background:rgba(0,0,0,0.3);z-index:101;display:none;}
.mask_close{cursor:pointer;position:absolute;right:20px;top:5px;font-size:22px;color:#666;font-weight:bold;}
.mask_title{margin-top:20px;font-wegiht:bold;font-size:16px;}
.mask_content{width:80%;margin-left:10%;border:1px solid #CCC;border-radius:10px;color:#444;padding:10px;box-sizing:border-box;margin-top:20px;margin-bottom:20px}
.add_box_submit{border-radius: 10px;bottom: 15px;left: calc(50% - 40px);width: 80px;height: 25px;line-height: 25px;cursor: pointer;text-align: center;color: #FFF;background: #4b5cc4;position: absolute;}
.add_box_title{display:flex;width:80%;margin-left:10%;padding-top:10px;}
.add_box_title span{padding-right:10px;font-size:14px}
.container_box_inner:hover::before{display: block;}
.container_box_inner_content::before{content:"查看" !important;background: #FF7500 !important;display:block !important;}
.container_box_inner::before{font-size: 13px;line-height: 40px;content:"添加";position: absolute;width: 40px;height: 40px;background: #4b5cc4;color: #FFF;display:none;border-radius: 100%;left:50%;margin-left: -20px;top: 50%;margin-top: -20px;}
.now{position: absolute;right: 60px;top: 20px;display: block;background: #4b5cc4;color: #FFF;padding:7px 10px;border-radius: 10px;}
.now:hover{color: #FFF !important;}
.container_box_inner_date_current{color: #FFF !important;background: #4b5cc4;}
.container_box_inner_date{text-align: center;line-height: 20px;position:absolute;right: 4px;top: 4px;color: #666;font-size: 13px;display:block;width: 20px;height: 20px;border-radius: 100%;}
.container_box_inner{width:14.28%;height: 75px;border: 1px dotted rgba(0, 0, 0,0.1);position: relative;cursor: pointer;box-sizing: border-box;}
.add_box:hover{display:block !important;}
.add_box{display:none;position:absolute;width: 200px;height: 200px;background: #FFF;top: 30%;z-index: 100;left: 70%;box-shadow:3px 3px 3px 2px #888888;}
.center{display: flex;justify-content: center;text-align: center;}
.btn{cursor: pointer;font-size: 13px;font-weight: bold;}
.btn:hover{color: #4b5cc4;}
.container_th{display: flex;justify-content: space-between;}
.container_th span{text-align: center;width: 100%;font-size: 13px;color:#666;height: 40px;}
.container_box{display: flex;justify-content:left;flex-wrap: wrap;}
.container{
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  width:800px;
  height:auto;
  position: relative;
  border:1px solid #CCC;
}
.container_head{
  width: 300px;
  height: 70px;
  line-height: 70px;
  display: flex;
  justify-content: space-between;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
