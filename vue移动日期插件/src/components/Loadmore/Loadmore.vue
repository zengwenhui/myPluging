<template>
    <div id="loadmore">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
            <li v-for="item in list">{{ item }}</li>
        </ul>
        </mt-loadmore>
    </div>
</template>

<script>
    import { Loadmore } from 'mint-ui';
    // import Vue from "vue"
    // Vue.component(Loadmore.name, Loadmore);
    export default {
        name:"loadmore",
        data(){
            return {
                list:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
                allLoaded:false    //数据是否全部获取完成
            }
        },
        methods:{
            loadTop() {
                 // 加载更多数据
                 console.log("触发上拉刷新的操作")
               setTimeout(()=>{
                    this.$refs.loadmore.onTopLoaded();
               },2000)
            },
            loadBottom(){
                setTimeout(()=>{
                    this.$refs.loadmore.onBottomLoaded();
                },1000);
            }

        }
    }
</script>
<style scoped>
    ul li{
        height:2rem;
    }
</style>