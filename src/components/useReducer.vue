<template>
  <div>
    <h1>useReducer</h1>

    <div>
      <button @click="dispatch({type:'decrement'})">-</button>
      <span>{{ state.count }}</span>
      <button @click="dispatch({type:'increment'})">+</button>
    </div>
  </div>
</template>

<script>
import {useRedux, useStore} from '../useReducer/demo'

export default {
  name: "useReducer",
  setup() {
    // const {state, dispatch} = useRedux()
    const {state, dispatch} = useStore()

    return {
      state,
      dispatch
    }
  }
}
</script>

<style scoped>

</style>
