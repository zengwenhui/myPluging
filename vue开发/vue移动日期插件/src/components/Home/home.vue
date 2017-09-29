<template>
    <div id="home" class="home">
       <h1>This  demonstration mintui</h1>
       <p>
          <ul>
                <li>
                    <router-link to="/toast">演示Toast效果</router-link>
                </li>
                <li><router-link to="/indicator">演示加载提示框</router-link></li>
                <li>
                    <router-link to="/loadmore">下拉上拉刷新</router-link>
                </li>
                <li>
                    <router-link to="/datepicker">日期插件</router-link>
                </li>
          </ul>
       </p>  
    </div>

</template>
<script>
    export default {
        name: "home"
    }
</script>
<style scoped>
    h1{
        font-size:0.5rem;
    }
</style>

