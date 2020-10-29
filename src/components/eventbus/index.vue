<template>
  <div>
    <h1>eventbus</h1>
    <button @click="toggleVisibleA">toggleVisibleA</button>
    <pageA v-if="visibleA"></pageA>
    <pageB></pageB>
  </div>
</template>

<script>
import {ref} from 'vue'
import pageA from "./pageA.vue"
import pageB from "./pageB.vue"

export default {
  name: "index",
  components: {pageA, pageB},
  setup() {
    const visibleA = ref(true)

    const toggleVisibleA = () => {
      visibleA.value = !visibleA.value
    }
    return {
      visibleA,

      toggleVisibleA
    }
  }
}
</script>

<style scoped>

</style>
