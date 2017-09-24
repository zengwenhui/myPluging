#css样式类
>animate.css   css3.0运动库

>Normalize.css   全局样式优化 
https://github.com/necolas/normalize.css
>CSS Reset     全局样式重置
https://github.com/murtaugh/HTML5-Reset
#vue

#js
>FastClick  结局click在移动端的延迟  
https://github.com/ftlabs/fastclick

#调试类工具
>vconsole  一个移动端的控制台
https://github.com/WechatFE/vConsole

#移动端开发
>移动端资源整合 http://www.daqianduan.com/6281.html
>移动web页面使用字体的思考  http://www.cnblogs.com/PeunZhang/p/3592096.html

/* 推荐移动端定义字体的代码 */
body{font-family:Helvetica;}
>移动端时间的思考
触摸事件的响应顺序

ontouchstart
ontouchmove
ontouchend
onclick
解决移动端click的延迟问题
1：fastclick可以解决在手机上点击事件的300ms延迟
2：zepto的touch模块，tap事件也是为了解决在click的延迟问题
3:可以通过绑定ontouchstart事件，加快对事件的响应