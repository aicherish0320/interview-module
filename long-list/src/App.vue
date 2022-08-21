<template>
  <div id="app">
    <VirtualList :size="40" :remain="8" :items="items" :variable="true">
      <template v-slot:default="{ item }">
        <ListItem :item="item"> </ListItem>
      </template>
    </VirtualList>
  </div>
</template>

<script>
import VirtualList from './components/VirtualList.vue'
import ListItem from './components/ListItem.vue'
import Mock from 'mockjs'

const items = []
for (let i = 0; i < 1 * 1000; i++) {
  items.push({ id: i, value: Mock.Random.sentence(5, 50) })
}

export default {
  name: 'App',
  components: {
    VirtualList,
    ListItem
  },
  data() {
    return {
      items
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  padding: 10px 20px;
}
</style>
