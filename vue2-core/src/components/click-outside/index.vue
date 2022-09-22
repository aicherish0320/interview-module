<template>
  <div class="box" v-click-outside="hide">
    <input type="text" @focus="focus" />
    <div class="inner" v-show="isShow">面板</div>
  </div>
</template>

<script>
export default {
  name: 'ClickOutSide',
  directives: {
    ClickOutside: {
      bind(el, binding, vNode) {
        const handler = function (e) {
          // 点击外面了
          if (!el.contains(e.target)) {
            const fn = vNode.context[binding.expression]
            fn()
          }
        }
        el.handler = handler
        document.addEventListener('click', handler)
      },
      unbind(el) {
        document.removeEventListener('click', el.handler)
      }
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    focus() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>

<style scoped>
.box {
  display: inline-flex;
  flex-direction: column;
  border: 1px solid red;
}
</style>
