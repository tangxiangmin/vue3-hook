const initialState = {count: 0};

import useReducer from './index'
import useModel from '../useModel'

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

export function useStore() {
    return useReducer(reducer, initialState);
}


// 全局的store
export function useRedux() {
    return useModel(useStore);
}
