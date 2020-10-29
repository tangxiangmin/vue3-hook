## useModel

参考：[hox源码](https://github.com/umijs/hox/blob/master/README-cn.md)


### 背景

当掌握了Hook（或者Composition API）之后，感觉万物皆可hook，总是想把数据和操作这堆数据的方法封装在一起，比如下面的计数器

```js
function useCounter() {
    const count = ref(0)
    const decrement = () => {
        count.value--
    }
    const increment = () => {
        count.value++
    }
    return {
        count,
        decrement,
        increment
    }
}
```
这个`useCounter`暴露了获取当前数值count、增加数值decrement和减少数值increment等数据和方法，然后就可以在各个组件中愉快地实现计数器了

在某些场景下我们希望多个组件可以共享同一个计数器，而不是每个组件自己独立的计数器。


一种情况是使用诸如vuex等全局状态管理工具，然后修改`useCounter`的实现


```js
import {createStore} from 'vuex'


const store = createStore({
    state: {
        count: 0
    },
    mutations: {
        setCount(state, payload) {
            state.count = payload
        }
    }
})
```
然后重新实现`useCounter`
```js
export function useCounter2() {
    const count = computed(() => {
        return store.state.count
    })
    const decrement = () => {
        store.commit('setCount', count.value + 1)
    }
    const increment = () => {
        store.commit('setCount', count.value + 1)
    }
    return {
        count,
        decrement,
        increment
    }
}
```
很显然，现在的`useCounter2`仅仅只是store的`state`与`mutations`的封装，直接在组件中使用store也可以达到相同的效果，封装就变得意义不大；此外，如果单单只是为了这个功能就为项目增加了vuex依赖，显得十分笨重。

基于这些问题，我们可以使用一个`useModel`来实现复用某个钩子状态的需求

### 实现

整个思路也比较简单，使用一个Map来保存某个hook的状态

```js
const map = new WeakMap()
export default function useModel(hook) {
    if (!map.get(hook)) {
        let ans = hook()
        map.set(hook, ans)
    }
    return map.get(hook)
}
```

然后包装一下`useCounter`

```js
export function useCounter3() {
    return useModel(useCounter)
}

// 在多个组件调用
const {count, decrement, increment} = useCounter3()
// ...
const {count, decrement, increment} = useCounter3()
```

这样，在每次调用`useCounter3`时，都返回的是同一个状态，也就实现了多个组件之间的hook状态共享。

### 思考

`userModel`提供了一种除`vuex`和`provide()/inject()`之外共享数据状态的思路，并且可以很灵活的管理数据与操作数据的方案，而无需将所有state放在一起或者模块下面。

缺点在于，当不使用`useModel`包装时，`useCounter`就是一个普通的hook，后期维护而言，我们很难判断某个状态到底是全局共享的数据还是局部的数据。

因此在使用`useModel`处理hook的共享状态时，还要要慎重考虑一下到底合不合适。

