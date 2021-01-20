vue3-hook
===

开发文档:[使用Vue3封装一些有用的组合API](https://www.shymean.com/article/%E4%BD%BF%E7%94%A8Vue3%E5%B0%81%E8%A3%85%E4%B8%80%E4%BA%9B%E6%9C%89%E7%94%A8%E7%9A%84%E7%BB%84%E5%90%88API)

## Feature

* useRequest用于统一管理网络请求相关状态，而无需在每次网络请求中重复处理loading、error等逻辑
* useEventBus实现了在组件卸载时自动取消当前组件监听的事件，无需重复编写onUnmounted代码，这个思路也可以用于DOM事件、定时器、网络请求等注册和取消
* useModel实现了在多个组件共享同一个hook状态，展示了一种除vuex、provide/inject函数之外跨组件共享数据的方案
* useReducer利用hook实现了一个简易版的redux，并且利用useModel实现了全局的store
* useDebounce与useThrottle，实现了去抖和节流，并思考了hook化的代码风格与常规的util代码风格，以及是否有必要将所有的东西都hook化
* ...
