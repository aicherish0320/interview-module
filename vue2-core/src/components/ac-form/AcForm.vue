<template>
  <form @submit.prevent>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'AcForm',
  provide() {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      // 返回一个对象，保证数据不被共享
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    async validate(cb) {
      // 需要看一下内部的 input-item 是否验证通过
      // 获取所有的子组件
      const children = this.$broadcast('AcFormItem')
      try {
        await Promise.all(children.map((c) => c.validate()))
        cb(true)
      } catch (error) {
        cb(false)
      }
    },
    $broadcast(componentName, eventName) {
      const children = this.$children
      const arr = []
      function findChildren(children) {
        children.forEach((child) => {
          if (child.$options.name === componentName) {
            if (eventName) {
              child.$emit(eventName)
            } else {
              arr.push(child)
            }
          }

          if (child.$children) {
            findChildren(child.$children)
          }
        })
      }
      findChildren(children)

      return arr
    }
  }
}
</script>

<style lang="scss" scoped></style>
