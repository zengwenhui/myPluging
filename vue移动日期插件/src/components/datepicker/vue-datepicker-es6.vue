<template>
   <!--- <div class="datepickbox">
      <input type="text" title="input date" class="cov-datepicker"  :placeholder="option.placeholder" v-model="date.time" :required="required" @click="showCheck" @foucus="showCheck" :style="option.inputStyle ? option.inputStyle : {}" />
    </div>-->
   
   <!-- <div class="datepicker-overlay" v-if="showInfo.check" @click="dismiss($event)" v-bind:style="{'background' : option.overlayOpacity? 'rgba(0,0,0,'+option.overlayOpacity+')' : 'rgba(0,0,0,0.5)'}">
   -->
      <div class="cov-date-body" :style="{'background-color': option.color ? option.color.header : '#3f51b5'}">
      <!--
        <div class="cov-date-monthly">
          <div class="cov-date-previous" @click="nextMonth('pre')">«</div>
          <div class="cov-date-caption" :style="{'color': option.color ? option.color.headerText : '#fff'}">
            <span @click="showYear"><small>{{checked.year}}</small></span>
            <br>
            <span @click="showMonth">{{displayInfo.month}}</span>
          </div>
          <div class="cov-date-next" @click="nextMonth('next')">»</div>
        </div>
-->
        <!--显示天数-->
        <div class="cov-date-box" v-if="showInfo.day">
          <div class="cov-picker-box">
            <div class="week">
              <ul>
                <li v-for="weekie in library.week">{{weekie}}</li>
              </ul>
            </div>
            <div  v-for="day in dayList"  track-by="$index"  @click="checkDay(day,$event)" :class="{'day':day.moment,'inset':!day.moment,'checked':day.checked,'unavailable':day.unavailable,'passive-day': !(day.inMonth),'active-leave':day.type == '1','active-normal':day.type == '0','active-fail':day.type == '2','radius-l':(day.value !='' && day.isleft == '1'),'radius-r':(day.value != '' && day.isright == '1')}" >{{day.value}}
            </div>  
          </div>
        </div>

        <!--显示年份-->
        <div class="cov-date-box list-box" v-if="showInfo.year">
          <div class="cov-picker-box date-list" id="yearList">
            <div class="date-item" v-for="yearItem in library.year" track-by="$index" @click="setYear(yearItem)">{{yearItem}}</div>
          </div>
        </div>
        <!--显示月份-->
        <div class="cov-date-box list-box" v-if="showInfo.month">
          <div class="cov-picker-box date-list">
            <div class="date-item" v-for="monthItem in library.month" track-by="$index" @click="setMonth(monthItem)">{{monthItem}}</div>
          </div>
        </div>
        <!--显示小时-->
        <div class="cov-date-box list-box" v-if="showInfo.hour">
          <div class="cov-picker-box date-list">
            <div class="watch-box">
              <div class="hour-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <ul>
                  <li class="hour-item" v-for="hitem in hours" @click="setTime('hour', hitem, hours)" :class="{'active':hitem.checked}">{{hitem.value}}</li>
                </ul>
              </div>
              <div class="min-box">
                <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
                <div class="min-item" v-for="mitem in mins" @click="setTime('min',mitem, mins)" :class="{'active':mitem.checked}">{{mitem.value}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    required: false,
    sendDate: String,
    dismissflag:Boolean,
    date: {
      type: Object,
      required: true
    },
    show:Object,
    option: {
      type: Object,
      default () {
        return {
          type: 'multi-day',
          SundayFirst: false,
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          format: 'YYYY-MM-DD',
          color: {
            checked: '#F50057',
            header: '#3f51b5',
            headerText: '#fff'
          }
        }
      }
    },
    limit: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    function hours () {
      let list = []
      let hour = 24
      while (hour > 0) {
        hour--
        list.push({
          checked: false,
          value: hour < 10 ? '0' + hour : hour
        })
      }
      return list
    }
    function mins () {
      let list = []
      let min = 60
      while (min > 0) {
        min--
        list.push({
          checked: false,
          value: min < 10 ? '0' + min : min
        })
      }
      return list
    }
    return {
      activeDom:null,    //日历被选择元素的dom对象   只能选中一个元素
      hours: hours(),
      mins: mins(),
      showInfo: {
        hour: false,
        day: false,
        month: false,
        year: false,
        check: false
      },
      displayInfo: {
        month: ''
      },
      library: {
        week: this.option.week,
        month: this.option.month,
        year: []
      },
      checked: {
        oldtime: '',
        currentMoment: null,
        year: '',
        month: '',
        day: '',
        hour: '00',
        min: '00'
      },
      dayList: [],
      selectedDays: []
    }
  },
  watch:{
    dismissflag (bool) {
      console.log(bool)
          if(bool){
             
          }else{

          }
    }
  },
  mounted(){
     this.date.time = this.sendDate;
              this.option.type = 'day'
              this.showCheck();
  },
  methods: {
    pad (n) {
      n = Math.floor(n)
      return n < 10 ? '0' + n : n
    },
    nextMonth (type) {
      let next = null
      type === 'next' ? next = moment(this.checked.currentMoment).add(1, 'M') : next = moment(this.checked.currentMoment).add(-1, 'M')
      this.showDay(next)
    },
     // 讲传进来的时间转换成一个月的天数的基本day对象（time格式为2017-07-07）
    showDay (time) {              
      console.log(time)
      if (time === undefined || !Date.parse(time)) {
        this.checked.currentMoment = moment()
      } else {
        this.checked.currentMoment = moment(time, this.option.format)
      }
      this.showOne('day')   //显示天数
      this.checked.year = moment(this.checked.currentMoment).format('YYYY')
      this.checked.month = moment(this.checked.currentMoment).format('MM')
      this.checked.day = moment(this.checked.currentMoment).format('DD')
      this.displayInfo.month = this.library.month[moment(this.checked.currentMoment).month()]  //头部header部分显示月份
      let days = []
      let currentMoment = this.checked.currentMoment
      let firstDay = moment(currentMoment).date(2).day()   //返回日期对应的星期
      // gettting previous and next month
      // let currentMonth = moment(currentMoment)
      let previousMonth = moment(currentMoment)
      let nextMonth = moment(currentMoment)
      nextMonth.add(1, 'months')    //加上一个月
      previousMonth.subtract(1, 'months')   //减去一个月
      let monthDays = moment(currentMoment).daysInMonth()//返回这个月的天数
      let oldtime = this.checked.oldtime
      for (let i = 1; i <= monthDays; ++i) {
        days.push({
          value: i,
          inMonth: true,        //是否是当月
          unavailable: false,
          checked: false,
          moment: moment(currentMoment).date(i)
        })
        if (i === Math.ceil(moment(currentMoment).format('D')) && moment(oldtime, this.option.format).year() === moment(currentMoment).year() && moment(oldtime, this.option.format).month() === moment(currentMoment).month()) {
          days[i - 1].checked = true
        }
        this.checkBySelectDays(i, days)
      }
      if (firstDay === 0) firstDay = 7
      for (let i = 0; i < firstDay - (this.option.SundayFirst ? 0 : 1); i++) {
        let passiveDay = {
          value: previousMonth.daysInMonth() - (i),
          inMonth: false,
          action: 'previous',
          unavailable: false,
          checked: false,
          moment: moment(currentMoment).date(1).subtract(i + 1, 'days')
        }
        days.unshift(passiveDay)
      }
      if (this.limit.length > 0) {
        for (let li of this.limit) {
          switch (li.type) {
            case 'fromto':
              days = this.limitFromTo(li, days)
              break
            case 'weekday':
              days = this.limitWeekDay(li, days)
              break
          }
        }
      }
      var passiveDaysAtFinal = 42 - days.length
      for (let i = 1; i <= passiveDaysAtFinal; i++) {
        let passiveDay = {
          value: i,
          inMonth: false,
          action: 'next',
          unavailable: false,
          checked: false,
          moment: moment(currentMoment).add(1, 'months').date(i)
        }
        days.push(passiveDay)
      }
      console.log(days)
      days = this.insertDom(days)
      this.insertAttr(days)
      console.log("showDay")
      this.dayList = days
    },
    insertDom(dataList){        //添加处理数据 author: Zeng
      let arr = [];
        dataList.forEach(function(item,index){
          if(index%7 != 6){
            arr.push(item);
            arr.push({place:"true",moment:false,value:"",inMonth:false})
          }else{
           arr.push(item);
          }
        })
        console.log(arr)
        return arr;
    },
    insertAttr(dataList){   //author：Zeng   渲染添加样式
      dataList.forEach((item,index)=>{
        
        if(!item.inMonth && item.value != ""){   //非本月day样式
          item.isleft = 0;
          item.isright = 0;
          item.type = "4";
        }else{
          if(item.value == ""){   //空白处理
          }else{                  //渲染本月颜色
              item.type = this.show.child[item.value-1].type;
          }
        }
      })
      dataList.forEach(function(item,index){
          if(item.value == ""){
              let l = dataList[index-1].type ;
              let r = dataList[index+1].type ;
              if(l <= 2 && r <=2 ){
                if(l == r){
                  item.type = l;
                }else{
                  item.type = "5"
                  item.isleft = 1;
                  item.isright = 1;
                }
              }else{
                item.type = "5";
                if(l <= 2){
                   item.isleft = 1;
                   item.isright = 0;
                }else{
                  if(r <= 2){
                    item.isright = 1;
                    item.isleft = 0 ;
                  }else{
                    item.isright = 0;
                    item.isleft = 0;
                  }
                }
              }
          }
      })
      dataList.forEach(function(item,index){
         if(item.value != "" && item.inMonth){
              var day = moment(item.moment).day()   //取星期
              if(day%7 != 0){           //非星期日
                  item.isleft = dataList[index-1].isright;
                  if(day%7 != 6){      //星期六
                      item.isright= dataList[index+1].isleft;
                  }else{
                      if(item.type <= 2){
                         item.isright = 1;
                      }else{
                         item.isright = 0;
                      }
                  }
              }else{                    //星期日
                 if(item.type <= 2){
                    item.isleft = 1;
                    item.isright = dataList[index+1].isleft;
                 }else{
                   item.isleft = 0;
                   item.isright = 0;
                 }
              }
          }
      })
      console.log(dataList)
      console.log(1)
    },
    checkBySelectDays (d, days) {
      this.selectedDays.forEach(day => {
        if (this.checked.year === moment(day).format('YYYY') && this.checked.month === moment(day).format('MM') && d === Math.ceil(moment(day).format('D'))) {
          days[d - 1].checked = true
        }
      })
    },
    limitWeekDay (limit, days) {
      days.map((day) => {
        if (limit.available.indexOf(Math.floor(day.moment.format('d'))) === -1) {
          day.unavailable = true
        }
      })
      return days
    },
    limitFromTo (limit, days) {
      if (limit.from || limit.to) {
        days.map((day) => {
          if (this.getLimitCondition(limit, day)) {
            day.unavailable = true
          }
        })
      }
      return days
    },
    getLimitCondition (limit, day) {
      let tmpMoment = moment(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value))
      if (limit.from && !limit.to) {
        return !tmpMoment.isAfter(limit.from)
      } else if (!limit.from && limit.to) {
        return !tmpMoment.isBefore(limit.to)
      } else {
        return !tmpMoment.isBetween(limit.from, limit.to)
      }
    },
    createDom(dom){
      var wid = dom.clientWidth;
      var hei = dom.clientHeight;
      var innerT = dom.innerText;
      if(this.activeDom){        //删除上一次选中的dom元素
        var parents = this.activeDom.parentNode;
        parents.removeChild(this.activeDom)
      }
      this.activeDom = document.createElement('div');
      var child = this.activeDom;
      // child.style.width = wid + "px" ;
      // child.style.height = hei +"px";
      // child.style.position = ""
      // child.style.top = "0"
      child.innerHTML = innerT;
      var str  = "top:0;position:absolute;width:"+wid+"px;height:"+hei+"px;background-color:red;border-radius:50%;"
      child.style.cssText = str;
      dom.appendChild(child)
      console.log(child)
    },
    checkDay (obj,e) {
      this.$emit('tag',obj)
      if( obj.value === ''){   //排除相邻二个日子之间的空格
        return false;
      }
     
      if(!obj.inMonth){
        return false;
      }
       this.createDom(e.target)
      
      console.log("11")
      if (obj.unavailable || obj.value === '') {
        return false
      }
      if (!(obj.inMonth)) {
        this.nextMonth(obj.action)
      }
      if (this.option.type === 'day' || this.option.type === 'min') {
        this.dayList.forEach((x) => {
          x.checked = false
        })
        this.checked.day = this.pad(obj.value)
        obj.checked = true
      } else {
        let day = this.pad(obj.value)
        let ctime = this.checked.year + '-' + this.checked.month + '-' + day
        if (obj.checked === true) {
          obj.checked = false
          this.selectedDays.$remove(ctime)
        } else {
          this.selectedDays.push(ctime)
          obj.checked = true
        }
      }
      switch (this.option.type) {
        case 'day':
          this.picked()
          break
        case 'min':
          this.showOne('hour')
            // shift activated time items to visible position.
          this.shiftActTime()
          break
      }
    },
    showYear () {
      let year = moment(this.checked.currentMoment).year()
      this.library.year = []
      let yearTmp = []
      for (let i = year - 100; i < year + 5; ++i) {
        yearTmp.push(i)
      }
      this.library.year = yearTmp
      this.showOne('year')
      this.$nextTick(() => {
        let listDom = document.getElementById('yearList')
        listDom.scrollTop = (listDom.scrollHeight - 100)
        this.addYear()
      })
    },
    showOne (type) {
      switch (type) {
        case 'year':   
          this.showInfo.hour = false
          this.showInfo.day = false
          this.showInfo.year = true
          this.showInfo.month = false
          break
        case 'month':
          this.showInfo.hour = false
          this.showInfo.day = false
          this.showInfo.year = false
          this.showInfo.month = true
          break
        case 'day':
          this.showInfo.hour = false
          this.showInfo.day = true
          this.showInfo.year = false
          this.showInfo.month = false
          break
        case 'hour':
          this.showInfo.hour = true
          this.showInfo.day = false
          this.showInfo.year = false
          this.showInfo.month = false
          break
        default:
          this.showInfo.day = true
          this.showInfo.year = false
          this.showInfo.month = false
          this.showInfo.hour = false
      }
    },
    showMonth () {
      this.showOne('month')
    },
    addYear () {
      let listDom = document.getElementById('yearList')
      listDom.addEventListener('scroll', (e) => {
        if (listDom.scrollTop < listDom.scrollHeight - 100) {
          let len = this.library.year.length
          let lastYear = this.library.year[len - 1]
          this.library.year.push(lastYear + 1)
        }
      }, false)
    },
    setYear (year) {
      this.checked.currentMoment = moment(year + '-' + this.checked.month + '-' + this.checked.day)
      this.showDay(this.checked.currentMoment)
    },
    setMonth (month) {
      let mo = (this.library.month.indexOf(month) + 1)
      if (mo < 10) {
        mo = '0' + '' + mo
      }
      this.checked.currentMoment = moment(this.checked.year + '-' + mo + '-' + this.checked.day)
      this.showDay(this.checked.currentMoment)
    },
    showCheck () {           //初始化显示
      if (this.date.time === '') {      //读值为空  显示天数
        this.showDay()
      } else {
        if (this.option.type === 'day' || this.option.type === 'min') {
          this.checked.oldtime = this.date.time      //记录进来的时间
          this.showDay(this.date.time)
        } else {
          this.selectedDays = JSON.parse(this.date.time)
          if (this.selectedDays.length) {
            this.checked.oldtime = this.selectedDays[0]
            this.showDay(this.selectedDays[0])
          } else {
            this.showDay()
          }
        }
      }
      this.showInfo.check = true //显示
    },
    setTime (type, obj, list) {
      for (let item of list) {
        item.checked = false
        if (item.value === obj.value) {
          item.checked = true
          this.checked[type] = item.value
        }
      }
    },
    picked () {
      if (this.option.type === 'day' || this.option.type === 'min') {
        let ctime = this.checked.year + '-' + this.checked.month + '-' + this.checked.day + ' ' + this.checked.hour + ':' + this.checked.min
        this.checked.currentMoment = moment(ctime, 'YYYY-MM-DD HH:mm')
        this.date.time = moment(this.checked.currentMoment).format(this.option.format)
      } else {
        this.date.time = JSON.stringify(this.selectedDays)
      }
      this.showInfo.check = false
      this.$emit('change', this.date.time)
    },
    dismiss (evt) {
      if (evt.target.className === 'datepicker-overlay') {
        if (this.option.dismissible === undefined || this.option.dismissible) {
          this.showInfo.check = false
          this.$emit('cancel')
        }
      }
    },
    shiftActTime () {
      // shift activated time items to visible position.
      this.$nextTick(() => {
        if (!document.querySelector('.hour-item.active')) {
          return false
        }
        document.querySelector('.hour-box').scrollTop = (document.querySelector('.hour-item.active').offsetTop || 0) - 250
        document.querySelector('.min-box').scrollTop = (document.querySelector('.min-item.active').offsetTop || 0) - 250
      })
    }
  }
}
</script>
<style scoped>
.datepicker-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 998;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-animation: fadein 0.5s;
  /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 0.5s;
  /* Firefox < 16 */
  -ms-animation: fadein 0.5s;
  /* Internet Explorer */
  -o-animation: fadein 0.5s;
  /* Opera < 12.1 */
  animation: fadein 0.5s;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* Firefox < 16 */
@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* Internet Explorer */
@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* Opera < 12.1 */
@-o-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.cov-date-body {
  display: inline-block;
  background: #3F51B5;
  overflow: hidden;
  position: relative;
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 400;
  display: block;
   width: 100%;

  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
}
.cov-picker-box {
  background: #fff;
  width: 100%;
  display: inline-block;
  padding: 10px;
  box-sizing: border-box !important;
  -moz-box-sizing: border-box !important;
  -webkit-box-sizing: border-box !important;
  -ms-box-sizing: border-box !important;

  width: 100%;
             
  text-align: start!important;
}
.cov-picker-box td {
  height: 34px;
  width: 34px;
  padding: 0;
  line-height: 34px;
  color: #000;
  background: #fff;
  text-align: center;
  cursor: pointer;
}
.cov-picker-box td:hover {
  background: #E6E6E6;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}
.day {
  /*width: 14.2857143%;*/
  width:10%;
  display: inline-block;
  margin-top:12px; 
  text-align: center;
  position:relative;
  height:38px;
  padding: 0;
  line-height: 38px;
  color: #000;
  background: #fff;
  vertical-align: middle;
}
.inset{
  width:5%;
  display: inline-block;
  margin-top:12px; 
  height:38px;
  text-align: center;
  cursor: pointer;
  height:calc(width);
  padding: 0;
  line-height: 38px;
  color: #000;
  background: #fff;
  vertical-align: middle;
}
.week ul {
  margin: 0 0 8px;
  padding: 0;
  list-style: none;
}
.week ul li {
  width: 14.2%;
  display: inline-block;
  text-align: center;
  background: transparent;
  color: #000;
  font-weight: bold;
}
.passive-day {
  color: #bbb;
}
.checked {
  background: #F50057;
  color: #FFF !important;
  /*border-radius: 50%;*/
}
.unavailable {
  color: #ccc;
  cursor: not-allowed;
}
.cov-date-monthly {
  height: 150px;
}
.cov-date-monthly > div {
  display: inline-block;
  padding: 0;
  margin: 0;
  vertical-align: middle;
  color: #fff;
  height: 150px;
  float: left;
  text-align: center;
  cursor: pointer;
}
.cov-date-previous,
.cov-date-next {
  position: relative;
  width: 20% !important;
  text-indent: -300px;
  overflow: hidden;
  color: #fff;
}
.cov-date-caption {
  width: 60%;
  padding: 50px 0!important;
  box-sizing: border-box;
  font-size: 24px;
}
.cov-date-caption span:hover {
  color: rgba(255, 255, 255, 0.7);
}
.cov-date-previous:hover,
.cov-date-next:hover {
  background: rgba(255, 255, 255, 0.1);
}
.day:hover {
  /*background: #EAEAEA;*/
}
.unavailable:hover {
  background: none;
}
.checked:hover {
  background: #FF4F8E;
}
.cov-date-next::before,
.cov-date-previous::before {
  width: 20px;
  height: 2px;
  text-align: center;
  position: absolute;
  background: #fff;
  top: 50%;
  margin-top: -7px;
  margin-left: -7px;
  left: 50%;
  line-height: 0;
  content: '';
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
}
.cov-date-next::after,
.cov-date-previous::after {
  width: 20px;
  height: 2px;
  text-align: center;
  position: absolute;
  background: #fff;
  margin-top: 6px;
  margin-left: -7px;
  top: 50%;
  left: 50%;
  line-height: 0;
  content: '';
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.cov-date-previous::after {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
}
.cov-date-previous::before {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.date-item {
  text-align: center;
  font-size: 20px;
  padding: 10px 0;
  cursor: pointer;
}
.date-item:hover {
  background: #e0e0e0;
}
.date-list {
  overflow: auto;
  vertical-align: top;
  padding: 0;
}
.cov-vue-date {
  display: inline-block;
  color: #5D5D5D;
}
.button-box {
  background: #fff;
  vertical-align: top;
  height: 50px;
  line-height: 50px;
  text-align: right;
  padding-right: 20px;
}
.button-box span {
  cursor: pointer;
  padding: 10px 20px;
}
.watch-box {
  height: 100%;
  overflow: hidden;
}
.hour-box,
.min-box {
  display: inline-block;
  width: 50%;
  text-align: center;
  height: 100%;
  overflow: auto;
  float: left;
}
.hour-box ul,
.min-box ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.hour-item,
.min-item {
  padding: 10px;
  font-size: 36px;
  cursor: pointer;
}
.hour-item:hover,
.min-item:hover {
  background: #E3E3E3;
}
.hour-box .active,
.min-box .active {
  background: #F50057;
  color: #FFF !important;
}
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-track {
  background: #E3E3E3;
}
::-webkit-scrollbar-thumb {
  background: #C1C1C1;
  border-radius: 2px;
}
/*自定义添加*/
.radius-l{        /*切左边*/
  border-top-left-radius:50% !important;
  border-bottom-left-radius:50% !important;
}
.radius-r{      /*切右边*/
  border-top-right-radius:50% !important;
  border-bottom-right-radius:50% !important;
}
.active-leave{      /*请假1*/
  background-color:	#FFD700 !important;
}
.active-normal{     /*正常0*/
  background:#32CD32 !important;
}
.active-fail{      /*旷工2*/
  background-color:	#F08080 !important;
}
</style>