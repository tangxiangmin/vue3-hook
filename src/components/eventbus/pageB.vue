<template>
  <div>
    <h2>
      page B
    </h2>
    <button @click="emitHello">emit('hello')</button>
  </div>

</template>

<script>
import useEventBus from "../../useEventBus";

export default {
  name: "pageB",
  setup() {
    const bus = useEventBus()
    bus.on('hello2', () => {
      console.log('pageB: listen hello')
    })

    const emitHello = () => {
      bus.emit('hello')
    }
    return {
      emitHello

    }
  }
}
</script>

<style scoped>

</style>
