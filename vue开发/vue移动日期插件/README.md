# self
#日历选择 http://www.showonne.com/vue-date/dist/browser/     （vue）
#日期选择  http://www.cnblogs.com/libin-1/p/5995481.html   （移动端）
> first Vue Project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 目录说明：
>  babelrc   //对babel的一些具备配置和依赖项说明
  {
  "presets": [
    ["env", { "modules": false }], //将一些ES6的语法经行编译的依赖
    "stage-2"
  ],
  "plugins": ["transform-runtime"],  //将一些ES6的方法经行转化的插件
  "comments": false,               //false转换后的代码不生成注释
  "env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": [ "istanbul" ]
    }
  }
}
> editorconfig  //对编辑器的一些具备设置
root = true
                    
[*]
charset = utf-8   //代码编码格式
indent_style = space   //缩进方式
indent_size = 2   //缩进大小
end_of_line = lf   
insert_final_newline = true
trim_trailing_whitespace = true


> eslintignore   //不对文件经行eslint规范检查的配置文件
build/*.js
config/*.js

> eslintrc.js   // eslint的一个配置文件

// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',    //继承规则   规则在上面的github可以查阅
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {            //对具体的规则经行修改
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}

>gitgnore  //对git的配置  配置哪些文件不会提到git仓库中去
.DS_Store
node_modules/
dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
>index.html  //打包后的文件会被插到index.html文件中来。

>package.json  //项目的配置文件
script  //执行的新命令
dependencies   //项目运行的依赖
devDependencies  //项目编译中的依赖

flex布局： 弹性布局
注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。
主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；
交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。
#flex-direction属性
>flex-direction:
 row（主轴在水平方向 起点在左边） | 
 row-reverse(主轴为水平方向，起点在右端) | 
 column(主轴为垂直方向，起点在上沿。) | 
 column-reverse(column-reverse：主轴为垂直方向，起点在下沿。);
#flex-wrap属性
  项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
  >flex-wrap: 
  nowrap不换行。 | 
  wrap 换行 | 
  wrap-reverse 反向换行;
  #flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
  #justify-content属性  项目在主轴上的对齐方式
  flex-start(横向排列第一) | flex-end（横向排列最后） | center居中 | space-between(space-between：两端对齐，项目之间的间隔都相等。) | 
  space-around(space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。);
#align-items属性   项目在交叉轴上的对齐方式
align-items: flex-start | flex-end | center | baseline（以第一行文字对齐） | stretch(如果项目未设置高度或设为auto，将占满整个容器的高度。);
#align-content属性
>align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
flex-start：与交叉轴的起点对齐。
flex-end：与交叉轴的终点对齐。
center：与交叉轴的中点对齐。
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
stretch（默认值）：轴线占满整个交叉轴。


#项目的属性：
>order属性  
 order: <integer>;数值越少越靠前
 >flex-grow属性
  flex-grow: <number>; /* default 0 */
  >flex-basis属性
  flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
  >flex属性
  #flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
  >align-self属性
  align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
  align-self: auto | flex-start | flex-end | center | baseline | stretch;