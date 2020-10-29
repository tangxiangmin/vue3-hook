import {onUnmounted} from 'vue'

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
