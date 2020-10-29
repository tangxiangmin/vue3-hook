import {ref, computed} from 'vue'
import {createStore} from 'vuex'
import useModel from "./index"

// 常规计数器，无法在多个组件中共享count状态
export function useCounter() {
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

const store = createStore({
    state: {
        count: 0
    },
    mutations: {
        setCount(state, payload) {
            state.count = payload
        }
    },
    actions: {
        decrement({commit}) {
            const {count} = state
            commit('setCount', count - 1)
        },
        increment({commit}) {
            const {count} = state
            commit('setCount', count + 1)
        }
    },
})


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

export function useCounter3() {
    return useModel(useCounter)
}
