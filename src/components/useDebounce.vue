<template>
  <div>
    <input type="text" v-model="keyword">
  </div>
</template>

<script>
import {useAssociateSearch} from "../useDebounce/demo";

export default {
  name: "useDebounce",
  setup() {
    const {keyword} = useAssociateSearch()
    return {
      keyword
    }

  }
}
</script>

<style scoped>

</style>
