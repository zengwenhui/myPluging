#移动端开发
>移动端资源整合 http://www.daqianduan.com/6281.html
http://www.cnblogs.com/PeunZhang/p/3407453.html
#移动web页面使用字体的思考  http://www.cnblogs.com/PeunZhang/p/3592096.html

/* 推荐移动端定义字体的代码 */
body{font-family:Helvetica;}
#移动端click时间的思考
触摸事件的响应顺序

ontouchstart
ontouchmove
ontouchend
onclick
解决移动端click的延迟问题
1：fastclick可以解决在手机上点击事件的300ms延迟 
>FastClick  结局click在移动端的延迟  
https://github.com/ftlabs/fastclick
2：zepto的touch模块，tap事件也是为了解决在click的延迟问题
3:可以通过绑定ontouchstart事件，加快对事件的响应
#用CSS开启硬件加速来提高网站性能  http://www.cnblogs.com/PeunZhang/p/3510083.html
CSS animations, transforms 以及 transitions 不会自动开启GPU加速，而是由浏览器的缓慢的软件渲染引擎来执行。那我们怎样才可以切换到GPU模式呢，很多浏览器提供了某些触发的CSS规则。
现在，像Chrome, FireFox, Safari, IE9+和最新版本的Opera都支持硬件加速，当它们检测到页面中某个DOM元素应用了某些CSS规则时就会开启，最显著的特征的元素的3D变换。
例如：
.cube {
   -webkit-transform: translate3d(250px,250px,250px)
   rotate3d(250px,250px,250px,-120deg)
   scale3d(0.5, 0.5, 0.5);
}
虽然我们可能不想对元素应用3D变换，可我们一样可以开启3D引擎。例如我们可以用transform: translateZ(0); 来开启硬件加速 。
.cube {
   -webkit-transform: translateZ(0);
   -moz-transform: translateZ(0);
   -ms-transform: translateZ(0);
   -o-transform: translateZ(0);
   transform: translateZ(0);
   /* Other transform properties here */
}
在webkit内核的浏览器中，另一个行之有效的方法是
.cube {
   -webkit-transform: translate3d(0, 0, 0);
   -moz-transform: translate3d(0, 0, 0);
   -ms-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
  /* Other transform properties here */
}

在 Chrome and Safari中，当我们使用CSS transforms 或者 animations时可能会有页面闪烁的效果，下面的代码可以修复此情况：
.cube {
   -webkit-backface-visibility: hidden;
   -moz-backface-visibility: hidden;
   -ms-backface-visibility: hidden;
   backface-visibility: hidden;
 
   -webkit-perspective: 1000;
   -moz-perspective: 1000;
   -ms-perspective: 1000;
   perspective: 1000;
   /* Other transform properties here */
}