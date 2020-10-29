

## useEventBus


EventBus在多个组件之间进行事件通知的场景下还是比较有用的，通过监听事件和触发事件，可以在订阅者和发布者之间解耦，实现一个常规的eventBus也比较简单

```js
class EventBus {
    constructor() {
        this.eventMap = new Map()
    }

    on(key, cb) {
        let handlers = this.eventMap.get(key)
        if (!handlers) {
            handlers = []
        }
        handlers.push(cb)
        this.eventMap.set(key, handlers)
    }

    off(key, cb) {
        const handlers = this.eventMap.get(key)
        if (!handlers) return
        if (cb) {
            const idx = handlers.indexOf(cb)
            idx > -1 && handlers.splice(idx, 1)
            this.eventMap.set(key, handlers)
        } else {
            this.eventMap.delete(key)
        }
    }

    once(key, cb) {
        const handlers = [(payload) => {
            cb(payload)
            this.off(key)
        }]
        this.eventMap.set(key, handlers)
    }

    emit(key, payload) {
        const handlers = this.eventMap.get(key)
        if (!Array.isArray(handlers)) return
        handlers.forEach(handler => {
            handler(payload)
        })
    }
}
```

带来的问题是：我们在组件初始化时监听事件，在交互时触发事件，这些是很容易理解的；但很容易被遗忘的是，我们还需要在组件卸载时取消事件注册。

因此可以封装一个`useEventBus`接口，统一处理这些逻辑

### 实现

既然要在组件卸载时取消注册的相关事件，简单的实现思路是：只要在注册时(`on`和`once`)收集相关的事件和处理函数，然后在`onUnmounted`的时候取消(`off`)收集到的这些事件即可

因此我们可以劫持事件注册的方法，同时额外创建一个`eventMap`用于收集使用当前接口注册的事件
```js
// 事件总线，全局单例
const bus = new EventBus()

export default function useEventBus() {
    let instance = {
        eventMap: new Map(),
        // 复用eventBus事件收集相关逻辑
        on: bus.on,
        once: bus.once,
        // 清空eventMap
        clear() {
            this.eventMap.forEach((list, key) => {
                list.forEach(cb => {
                    bus.off(key, cb)
                })
            })
            eventMap.clear()
        }
    }
    let eventMap = new Map()
    // 劫持两个监听方法，收集当前组件对应的事件
    const on = (key, cb) => {
        instance.on(key, cb)
        bus.on(key, cb)
    }
    const once = (key, cb) => {
        instance.once(key, cb)
        bus.once(key, cb)
    }

    // 组件卸载时取消相关的事件
    onUnmounted(() => {
        instance.clear()
    })
    return {
        on,
        once,
        off: bus.off.bind(bus),
        emit: bus.emit.bind(bus)
    }
}
```

这样，当组价卸载时也会通过`instance.clear`移除该组件注册的相关事件，比起手动在每个组件`onUnmounted`时手动取消要方便很多。

这个思路可以运用在很多需要在组件卸载时执行清理操作的逻辑，比如：
* DOM事件注册`addEventListener`和`removeEventListener`
* 计时器`setTimeout`和`clearTimeout`
* 网络请求`request`和`abort`

从这个封装也可以看见组合API一个非常明显的优势：尽可能地抽象公共逻辑，而无需关注每个组件具体的细节
