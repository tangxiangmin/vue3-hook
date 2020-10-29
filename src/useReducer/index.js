import {ref} from 'vue'

export default function useReducer(reducer, initialState = {}) {

    const state = ref(initialState)

    const dispatch = (action) => {
        // 约定action格式为 {type:string, payload: any}
        state.value = reducer(state.value, action)
    }

    return {
        state,
        dispatch
    }
}
