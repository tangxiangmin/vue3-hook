<template>
  <div>

    <!--    <useRequestDemo></useRequestDemo>-->
    <!--    <useModelDemo></useModelDemo>-->
    <!--    <useModelDemo></useModelDemo>-->
    <!--    <useDebounceDemo></useDebounceDemo>-->
    <!--    <useEventBusDemo></useEventBusDemo>-->
    <useReducerDemo></useReducerDemo>
    <useReducerDemo></useReducerDemo>
  </div>
</template>

<script>
import useRequestDemo from "./components/useRequest.vue";
import useModelDemo from "./components/useModel.vue";
import useDebounceDemo from "./components/useDebounce.vue";
import useEventBusDemo from "./components/eventbus/index.vue";
import useReducerDemo from "./components/useReducer.vue";

export default {
  name: 'App',
  components: {useRequestDemo, useModelDemo, useDebounceDemo, useEventBusDemo, useReducerDemo}
}
</script>
