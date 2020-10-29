<template>
  <div><h2>page A</h2></div>
</template>

<script>
import useEventBus from "../../useEventBus";

export default {
  name: "pageA",
  setup() {
    const bus = useEventBus()
    // 当该组件被卸载后，注册的消息会被自动卸载
    bus.on('hello', () => {
      console.log('pageA: listen hello')
    })
  }
}
</script>

<style scoped>

</style>
