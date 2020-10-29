## useDebounce

### 背景

前端很多业务场景下都需要处理节流或去抖的场景，节流函数和去抖函数本身没有减少事件的触发次数，而是控制事件处理函数的执行来减少实际逻辑处理过程，从而提高浏览器性能。


一个去抖的场景是：在搜索框中根据用户输入的文本搜索关联的内容并下拉展示，由于input是一个触发频率很高的事件，一般需要等到用户停止输出文本一段时间后才开始请求接口查询数据。

先来实现最原始的业务逻辑
```js
import {ref, watch} from 'vue'

function debounce(cb, delay = 100) {
    let timer
    return function () {
        clearTimeout(timer)
        let args = arguments,
            context = this
        timer = setTimeout(() => {
            cb.apply(context, args)
        }, delay)
    }
}
export function useAssociateSearch() {
    const keyword = ref('')

    const search = () => {
        console.log('search...', keyword.value)
        // mock 请求接口获取数据
    }

    // watch(keyword, search) // 原始逻辑，每次变化都请求
    watch(keyword, debounce(search, 1000)) // 去抖，停止操作1秒后再请求

    return {
        keyword
    }
}
```
然后在视图中引入
```html
<template>
  <div>
    <input type="text" v-model="keyword">
  </div>
</template>

<script>
import {useAssociateSearch} from "../useDebounce";

export default {
  name: "useDebounce",
  setup() {
    const {keyword} = useAssociateSearch()
    return {
      keyword
    }

  }
}
</script>
```

与`useApi`同理，我们可以将这个debounce的逻辑抽象出来，，封装成一个通用的`useDebounce`

### 实现

貌似不需要我们再额外编写任何代码，直接将`debounce`方法重命名为`useDebounce`即可，为了凑字数，我们还是改装一下，同时增加cancel方法

```js
export function useDebounce(cb, delay = 100) {
    const timer = ref(null)

    let handler = function () {
        clearTimeout(timer.value)
        let args = arguments,
            context = this
        timer.value = setTimeout(() => {
            cb.apply(context, args)
        }, delay)
    }

    const cancel = () => {
        clearTimeout(timer)
        timer.value = null
    }
    
    return {
        handler,
        cancel
    }
}
```

## useThrottle

节流与去抖的封装方式基本相同，只要知道`throttle`的实现就可以了。

```js
export function useThrottle(cb, duration = 100) {
    let start = +new Date()
    return function () {
        let args = arguments
        let context = this
        let now = +new Date()
        if (now - start >= duration) {
            cb.apply(context, args)
            start = now
        }
    }
}
```

## 思考
从去抖/节流的形式可以看出，某些hook与我们之前的工具函数并没有十分明显的边界。是将所有代码统一hook化，还是保留原来引入工具函数的风格，这是一个需要思考和实践的问题
