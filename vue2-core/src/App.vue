<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/> -->
    <!-- VueLazyLoad -->
    <VueLazyLoad></VueLazyLoad>
  </div>
</template>

<script>
import VueLazyLoad from './components/VueLazyLoad.vue'
export default {
  name: 'App',
  components: {
    VueLazyLoad
  }
}
</script>

<style lang="scss"></style>
