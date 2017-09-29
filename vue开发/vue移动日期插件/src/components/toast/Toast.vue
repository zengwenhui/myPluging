<template>
    <div id="toast" class="toast">
       <h1>这里是展示mint_ui提示信息（Toast）的页面</h1>
       <button @click="Toast1">点击弹出Toast</button>
       <button @click="Toast2">点击弹出带图标的Toast</button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
console.log(Toast)
   export default {
     name: 'toast',
     methods:{
      Toast1(){
            Toast({
                 message: '提示',
                 position: 'bottom',
                 duration: 5000
            });
      },
      Toast2(){
          Toast({
            message: '操作成功',
            iconClass: 'icon icon-success'
            });
      }
     }
    }
</script>