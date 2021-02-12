<template>
  <div id="app">
    <vue-headful
      title="Whats my IP?"
      description="A app that shows your IP geolocation and other datas."
    />
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  max-height: 100vh;
}
</style>
