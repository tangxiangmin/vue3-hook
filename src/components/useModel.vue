<template>
  <div>
    <button @click="decrement">-</button>
    <span>{{ count }}</span>
    <button @click="increment">+</button>
  </div>
</template>

<script>
import {useCounter, useCounter2, useCounter3} from "../useModel/demo"

export default {
  name: "useModelDemo",
  setup() {
    // const {count, decrement, increment} = useCounter()
    // const {count, decrement, increment} = useCounter2()
    // 多次调用useCounter3时仍旧可以得到共享的状态
    const {count, decrement, increment} = useCounter3()
    return {
      count,
      decrement,
      increment
    }

  }
}
</script>

<style scoped>

</style>
