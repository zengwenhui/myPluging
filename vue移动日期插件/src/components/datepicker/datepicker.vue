<script>
// for Vue 2.0
import myDatepicker from './vue-datepicker-es6.vue'

export default {
  data () {
    return {
      sendDate:"2017-05-01",
      dismiss:false,
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
        placeholder: '提示信息',
        inputStyle: {              //控制文本样式
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F'
        },
        color: {
          checkedDay:"#08c7b4",     //选中天数的颜色
          header: '#eee',           //背景颜色
          headerText: 'red'       //导航栏眼色 
        },
        buttons: {                       //确认框文字
          ok: '确认',
          cancel: '取消'
        },
        overlayOpacity: "0", // 遮罩层背景颜色透明度
        dismissible: false // 是否点击遮罩层取消弹出框
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
      limit: [{
        type: 'weekday',
        available: [1, 2, 3, 4, 5,6,7]         
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
    }
  }
}
</script>
<template>
  <div class="card">
    <!-- for Vue 2.0 -->
    <div class="row">
      <form action="" id="q">
        <label for="q">提示</label>
        <input type="text" style="height:100px;border:1px solid #ccc;" v-model="sendDate">
        <input type="button" value="点我切换" @click="open">
      </form>
      
    </div>
    <div class="container">
      <date-picker :date="startTime" :option="option" :limit="limit" :sendDate="sendDate" :dismissflag="dismiss"></date-picker>
    </div>
 
  </div>
</template>
<style> 
.container{
  width:100%;
  position:relative;
}
</style>
    

