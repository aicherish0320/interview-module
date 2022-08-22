<template>
  <div>
    <ul class="box">
      <li v-for="(list, index) in lists" :key="list.id">
        <!-- <img :src="list.url" alt="img" width="100" /> -->
        <img v-lazy="list.url" :id="index" alt="img" width="200" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
// 服务端渲染仅仅支持 created。

export default {
  name: 'VueLazyLoad',
  data() {
    return {
      lists: []
    }
  },
  mounted() {
    this.getLists()
  },
  methods: {
    async getLists() {
      const { data } = await axios.get('/api/lists')
      this.lists = data
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 250px;
  height: 500px;
  overflow: scroll;
  border: 1px solid green;
  & > li {
    img {
      min-height: 100px;
    }
  }
}
</style>
