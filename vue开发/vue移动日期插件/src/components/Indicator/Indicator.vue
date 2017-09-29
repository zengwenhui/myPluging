<template>
  
      <div id="Indicator">
            <p><button @click="Indicator1">
                  显示加载提示框
            </button></p>
            <p><button @click="Indicator2">
                 显示带加载信息的提示框
            </button></p>
      </div>

</template>

<script>
      import { Indicator } from 'mint-ui'
      export default {
            name:"Indicator",
            methods:{
                  Indicator1:function(){
                        Indicator.open();
                  },
                  Indicator2:function(){
                       Indicator.open('加载中...');
                  },
            }
      }
</script>