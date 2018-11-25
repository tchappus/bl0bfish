<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
@import "../node_modules/uikit/src/less/uikit.theme.less";

@global-font-family: "Poppins", sans-serif;
</style>
