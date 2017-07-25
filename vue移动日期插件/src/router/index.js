import Vue from 'vue'
import Router from 'vue-router'
import Toast from '@/components/toast/Toast'
import Home from '../components/Home/home'
import Indicator from "@/components/Indicator/Indicator"
import Loadmore from "@/components/Loadmore/Loadmore"
import Datepicker from "@/components/datepicker/datepicker"
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: {
                path: '/home',
                name: 'home'
            }
        },
        {
            name: "home",
            path: "/home",
            component: Home
        },
        {
            path: '/toast',
            name: 'Toast',
            component: Toast
        }, {
            path: "/indicator",
            component: Indicator,
            name: "Indicator"
        }, {
            path: "/loadmore",
            name: "loadmore",
            component: Loadmore
        }, {
            path: "/datepicker",
            name: "datepicker",
            component: Datepicker
        }
    ]
})