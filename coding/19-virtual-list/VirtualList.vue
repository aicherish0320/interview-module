<template>
  <div class="viewport" ref="viewportRef">
    <div class="scroll-bar"
     ref="scrollBarRef"></div>
    <div class="scroll-list">
      <p v-for="item in visibleLists" :key="item.id">
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualList',
  props: {
    size: {
      type: Number,
      default: 40
    },
    remain: {
      type: Number,
      default: 8
    },
    lists: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      start: 0,
      end: this.remain,
      offset: ''
    }
  },
  computed: {
    visibleLists() {
      return this.lists.slice(start, end)
    }
  },
  mounted () {
    this.$refs.viewportRef.height = this.size * this.remain+'px';
    this.$refs.scrollBarRef.height = this.size * this.lists.length
    +'px';
  },
  methods: {
    handleScroll() {
      const scrollTop = this.$refs.viewportRef.scrollTop
      this.start = Math.floor(scrollTop / this.size)
      this.end = this.start + this.remain
    }
  },
}
</script>

<style lang="scss" scoped></style>
