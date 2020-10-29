<template>
  <div>
    <p v-if="loading">loading</p>
    <div v-else>
      <ul v-for="(book,index) in list" :key="index">
        <li>{{ book }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {useBook, useBook2, useUser} from '../useRequest/demo'

export default {
  name: 'useApiDemo',
  setup() {
    // const {list, loading} = useBook()
    // const {list, loading} = useBook2()
    const {list, loading} = useUser()
    return {
      list,
      loading
    }
  }
}
</script>
