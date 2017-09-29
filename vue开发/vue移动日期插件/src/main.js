// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
// import vuex from 'vuex'
import "./flexible"
import App from './App'
import router from './router'
import "./assets/vconsole"
Vue.config.productionTip = false //关闭vue2.0调试输出信息

Vue.use(MintUI);
console.log(22)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})