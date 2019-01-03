# studyantd
> 本项目是我学习react生态来完成管理系统的学习code.<br />
> 14-4

React全家桶

基本知识点

- React全家桶
  - React基础知识
  - Router 4.0 语法讲解
  - Redux集成开发
- AntD UI组件
  - 最实用的基础组件
  - AntD栅格系统
  - ETable组件封装
  - BaseForm组件封装
  - 表格内嵌单选、复选封装
- 公共机制封装
  - Axios请求插件封装
  - API 封装
  - 错误拦截
  - 权限、菜单封装
  - 日期、金额、手机号封装...
  - Loading、分页、Mock...

前沿的技术栈

健全的架构

丰富UI组件

第一章 React介绍

- React基本介绍
- React脚手架、Yarn介绍
- React生命周期介绍

React 基本介绍

- 是Facebook开源的一个JavaScript库
- React结合生态库构成一个MV*框架
- React特点
  - Declarative(声明式编码)
  - Component-Based（组件化编码）
  - 高效的DOM Diff算法
  - 单向数据流

MV*框架： 只关注视图view层和数据层Model

生态介绍：

- Vue生态：Vue + Vue-Router + Vuex + Axios + Babel + Webpack
- React生态：React + React-Router + Redux + Axios + Babel + Webpack

编程式实现：需要以具体代码表达再哪里做什么，如何实现

声明式实现：需要声明再哪里做什么，而无需关心如何实现

React脚手架、Yarn介绍

- 如何安装React脚手架
- 如何使用脚手架初始化项目
- 什么是Yarn，为什么要使用Yarn
- 如何使用Yarn

安装和使用React官方脚手架

    npm install -g create-react-app  // 全局安装脚手架



    create-react-app yourprojectname // 初始化react项目

安装和使用Yarn

注：如果yarn使用出现问题，可以调整yarn的镜像源

    yarn config set registry https://registry.npm.taobao.org

React生命周期

- getDefaultPops
- getInitialState
- componentWillMount
- render
- componetnDidMount
- componetWillReceiveProps
- shouldComponentUpdate
- componentDidUpdate
- componentWillUnmount

备注：

1. onClick的绑定
2. 初始化的方法

第二章 项目主页工程搭建

- 基础插件安装，Less文件加载配置
- 项目主页结构开发
- 菜单组件开发
- 头部组件开发
- 底部组件开发

基础插件的安装

- 安装React-Router、Axios
- 安装AntD
- 暴露webpack配置文件
- 安装less-loader
- 修改less-loader

问题：

Q1：react-router-dom是什么

Q2：eject （暴露配置文件）

备注：如果yarn eject 出错的，运行如下命令：

    git add .
    git commit -am "Save before ejecting"
    
    yarn eject

Q3：webpack.config.dev.js是指本地开发的环境；webpack.config.prod.js是指生产的环境；webpackDevServer.config.js配置本地服务器

Q4：引入antd

Q5：babel-plugin-import

    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]

主页结构开发

- 页面结构定义
- 目录结构定义
- 栅格系统使用
- calc计算方法使用

3-7

百度天气 api 

选择了高德api

yarn add jsonp --save 解决跨域问题

Flex语法

    display: flex;
    align-items: center;
    justify-content: center;

less的语法

第三章 React Router 4.0

第一节 React Router 4.0基本概念介绍

第二节 React Router 4.0 Demo

- HashRouter
  - http://localhost:3000/#/admin/buttons
- BrowserRouter
  - http://localhost:3000/admin.buttons

问题：

q1: 基本的less语法

q2: 基本的Flex语法

q3: 基本的React-router语法

<switch> 匹配第一个路由，一旦匹配成功，不会匹配其他

exact={true}是精准匹配

第四章 AntD UI组件

1. Card组件
2. Modal
   传参与否

注意：

q1: map的语法

第五章 AntD Form组件

- 登陆
- 注册

第六章 AntD Table组件

项目工程化-Table动态渲染

- Mock数据
- Axios封装
- Loading处理、错误拦截

重点：

- Easy Mock

- MockJs

第七章 EChats

    yarn add echarts echarts-for-react --save

- react-draft-wysiwyg 插件
- draftjs-to-html插件

    yarn add react-draft-wysiwyg draftjs-to-html



第八章 权限

- 选择合适的权限模型
  - 传统的权限模型
  - RBAC模型（基于角色的访问控制）
