<template>
  <div>
    <img src="./assets/lisa2.jpg" alt="lisa" />
    <HelloWorld msg="Vue3 + Vite" />
    <img :src="img" />
    <div class="box"></div>
  </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import img from './assets/lisa2.jpg'
</script>

<style>
.box {
  width: 100px;
  height: 100px;
  background-image: url(./assets/lisa2.jpg);
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
