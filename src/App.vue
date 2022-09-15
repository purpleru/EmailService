<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
  }
};
</script>

<style>
#app{
  max-width: 700px;
  margin: 0 auto;
}

.layui-layer-input {
  outline: none;
}
</style>
