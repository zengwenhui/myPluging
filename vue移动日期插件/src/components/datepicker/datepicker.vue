<script>
// for Vue 2.0
import myDatepicker from './vue-datepicker-es6.vue'
import date from "./../../assets/data.js"
export default {
  data () {
    return {
      sendDate:"2017-05-01",
      dismiss:false,
      date:date,
      startTime: {
        time: ''
      },
      endtime: {
        time: '2016-03-19'
      },
      option: {
        type: 'date',
        week: ['日', '一', '二', '三', '四', '五', '六'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        format: 'YYYY-MM-DD',
        color: {
          checkedDay:"#08c7b4",     //选中天数的颜色
          header: '#eee',           //背景颜色
          headerText: 'red'       //导航栏眼色 
        },
      },
      timeoption: {
        type: 'min',
        week: ['日', '一', '二', '三', '四', '五', '六'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm'
      },
      multiOption: {
        type: 'multi-day',
        week: ['日', '一', '二', '三', '四', '五', '六'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format:"YYYY-MM-DD HH:mm"
      },
      limit: [{          //禁止点击
        type: 'weekday',
        available: [0,1, 2, 3, 4, 5, 6, ]         
      },
      {
        type: 'fromto',
        from: '2016-1-1',                        //切割起点
        to: '2019-02-20'                //切割到什么日期
      }]
    }
  },
  components: {
    'date-picker': myDatepicker
  },
  methods:{
    open(){
      this.dismiss = !this.dismiss;
      console.log(this.dismiss)
    },
    call(data){
      console.log("callback")
    }
  }
}
</script>
<template>
  <div class="card">
    <div class="container">
      <date-picker @tag="call" :date="startTime" :option="option" :limit="limit" :show="date" :sendDate="sendDate" :dismissflag="dismiss"></date-picker>
    </div>
  </div>
</template>
<style> 
.container{
  width:100%;
  position:relative;
}
</style>
    

