
## useReducer

redux的思想可以简单概括为
* store维护全局的state数据状态，
* 各个组件可以按需使用state中的数据，并监听state的变化
* `reducer`接收action并返回新的state，组件可以通过`dispatch`传递action触发reducer
* state更新后，通知相关依赖更新数据

我们甚至可以将redux的使用hook化，类似于

```js
function reducer(state, action){
    // 根据action进行处理
    // 返回新的state
}
const initialState = {}
const {state, dispatch} = useReducer(reducer, initialState);
```

### 实现

借助于Vue的数据响应系统，我们甚至不需要实现任何发布和订阅逻辑

```js
import {ref} from 'vue'

export default function useReducer(reducer, initialState = {}) {
    const state = ref(initialState)
     // 约定action格式为 {type:string, payload: any}
    const dispatch = (action) => {
        state.value = reducer(state.value, action)
    }
    return {
        state,
        dispatch
    }
}
```
然后实现一个`useRedux`负责传递`reducer`和`action`
```js
import useReducer from './index'

function reducer(state, action) {
    switch (action.type) {
        case "reset":
            return initialState;
        case "increment":
            return {count: state.count + 1};
        case "decrement":
            return {count: state.count - 1};
    }
}

function useStore() {
    return useReducer(reducer, initialState);
}
```

我们希望是维护一个全局的store，因此可以使用上面的`useModel`

```js
export function useRedux() {
    return useModel(useStore);
}
```

然后就可以在组件中使用了
```html
<template>
<div>
  <button @click="dispatch({type:'decrement'})">-</button>
  <span>{{ state.count }}</span>
  <button @click="dispatch({type:'increment'})">+</button>
</div>
</template>

<script>
export default {
  name: "useReducer",
  setup() {
    const {state, dispatch} = useStore()
    return {
      state,
      dispatch
    }
  }
}
</script>
```

看起来跟我们上面`useModel`的例子并没有什么区别，主要是暴露了通用的`dispatch`方法，在reducer处维护状态变化的逻辑，而不是在每个useCounter中自己维护修改数据的逻辑

### 思考

当然这个redux是非常简陋的，包括中间件、`combineReducers`、`connect`等方法均为实现，但也为我们展示了一个最基本的redux数据流转过程。
