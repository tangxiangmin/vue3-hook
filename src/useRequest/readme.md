
## useRequest

### 背景
使用hook来封装一组数据的操作是很容易的，例如下面的`useBook`
```js
import {ref, onMounted} from 'vue'

function fetchBookList() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([1, 2, 3])
        }, 1000)
    })
}

export function useBook() {
    const list = ref([])
    const loading = ref(false)
    const getList = async () => {
        loading.value = true
        const data = await fetchBookList({page: 1})
        loading.value = false
        list.value = data
    }

    onMounted(() => {
        getList()
    })

    return {
        list,
        loading,
        getList
    }
}
```

其中封装了获取资源、处理加载状态等逻辑，看起来貌似能满足我们的需求了

缺点在于对应另外一个资源而言，我们貌似还需要写类似的模板代码，因此可以将这一堆代码再次抽象，封装成`useApi`方法

### 实现
```js
function useApi(api) {
    const loading = ref(false)
    const result = ref(null)
    const error = ref(null)

    const fetchResource = (params) => {
        loading.value = true
        return api(params).then(data => {
            result.value = data
        }).catch(e => {
            error.value = e
        }).finally(() => {
            loading.value = false
        })
    }
    return {
        loading,
        error,
        result,
        fetchResource
    }
}
```

然后修改上面的`useBook`方法
```js
function useBook2() {
    const {loading, error, result, fetchResource,} = useApi(fetchBookList)

    onMounted(() => {
        fetchResource({page: 1})
    })

    return {
        loading,
        error,
        list: result
    }
}
```
注意这是一个非常通用的方法，假设现在需求封装其他的请求，处理起来也是非常方便的，不需要再一遍遍地处理loading和error等标志量
```js
function fetchUserList() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const payload = {
                code: 200,
                data: [11, 22, 33],
                msg: 'success'
            }
            resolve(payload)
        }, 1000)
    })
}

function useUser() {
    const {loading, error, result, fetchResource,} = useApi((params) => {
        // 封装请求返回值
        return fetchUserList(params).then(res => {
            console.log(res)
            if (res.code === 200) {
                return res.data
            }
            return []
        })
    })

    onMounted(() => {
        fetchResource({page: 1})
    })

    return {
        loading,
        error,
        list: result
    }
}
```

### 进阶

处理网络请求是前端工作中十分常见的问题，处理上面列举到的加载、错误处理等，还可以包含去抖、节流、轮询等各种情况，还有离开页面时取消未完成的请求等，都是可以在`useRequest`中进一步封装的



