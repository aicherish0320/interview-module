<template>
  <div class="viewport" ref="viewport" @scroll="scrollFn">
    <div class="scroll-bar" ref="scrollBar"></div>
    <div class="scroll-list" :style="{ transform: `translateY(${offset}px)` }">
      <div
        v-for="item in visibleData"
        :vid="item.id"
        :key="item.id"
        ref="items"
      >
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from 'lodash-es'
export default {
  props: ['size', 'remain', 'items', 'variable'],
  data() {
    return {
      start: 0,
      end: this.remain,
      offset: 0
    }
  },
  computed: {
    prevCount() {
      return Math.min(this.start, this.remain)
    },
    nextCount() {
      return Math.min(this.remain, this.items.length - this.end)
    },
    visibleData() {
      const start = this.start - this.prevCount
      const end = this.end + this.nextCount
      return this.items.slice(start, end)
    }
  },
  created() {
    this.scrollFn = throttle(this.handleScroll, 200, { leading: false })
  },
  mounted() {
    this.$refs.viewport.style.height = this.size * this.remain + 'px'
    this.$refs.scrollBar.style.height = this.size * this.items.length + 'px'

    // 如果加载完毕 我需要缓存每一项的高度
    this.cacheList()
  },
  updated() {
    this.$nextTick(() => {
      const nodes = this.$refs.items
      if (!(nodes && nodes.length)) {
        return
      }
      nodes.forEach((node) => {
        let { height } = node.getBoundingClientRect()
        const id = node.getAttribute('vid') - 0

        let oldHeight = this.positions[id].height
        // 计算当前的高度 是否和之前的有变化
        let val = oldHeight - height
        if (val) {
          this.positions[id].height = height
          this.positions[id].bottom = this.positions[id].bottom - val

          for (let i = id + 1; i < this.positions.length; i++) {
            this.positions[i].top = this.positions[i - 1].bottom
            this.positions[i].bottom = this.positions[i].bottom - val
          }
        }
      })
      this.$refs.scrollBar.style.height =
        this.positions[this.positions.length - 1].bottom + 'px'
    })
  },
  methods: {
    cacheList() {
      this.positions = this.items.map((item, index) => ({
        height: this.size,
        top: index * this.size,
        bottom: (index + 1) * this.size
      }))
    },
    getStartIndex(value) {
      let start = 0
      let end = this.positions.length - 1
      let temp = null

      while (start <= end) {
        let middleIndex = parseInt((start + end) / 2)
        let middleValue = this.positions[middleIndex].bottom
        if (middleValue === value) {
          return middleIndex + 1
        } else if (middleValue < value) {
          start = middleIndex + 1
        } else if (middleValue > value) {
          if (temp === null || temp > middleIndex) {
            temp = middleIndex
          }

          end = middleIndex - 1
        }
      }

      return temp
    },
    handleScroll() {
      // 计算滚出去几个，当前是第几个
      let scrollTop = this.$refs.viewport.scrollTop

      if (this.variable) {
        // 使用 二分查找 找到对应的记录
        this.start = this.getStartIndex(scrollTop)
        this.end = this.start + this.remain
        this.offset = this.positions[this.start - this.prevCount]
          ? this.positions[this.start - this.prevCount].top
          : 0
      } else {
        // 从第几个开始
        this.start = Math.floor(scrollTop / this.size)
        // 结束
        this.end = this.start + this.remain
        // 可视区域的偏移量，让可视区域调整位置
        this.offset = this.start * this.size - this.size * this.prevCount
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.viewport {
  position: relative;
  overflow-y: scroll;
  .scroll-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
