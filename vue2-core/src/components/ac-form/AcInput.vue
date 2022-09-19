<template>
  <input type="text" :value="value" @input="handleInput" />
</template>

<script>
export default {
  name: 'AcInput',
  // model: {
  //   // 可以重新定义 v-model 解析出来的结果
  //   prop: '',
  //   event: ''
  // },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
      // 组件在创建的过程中，会确定父子关系
      // this.$parent.$emit('validate')
      this.$dispatch('AcFormItem', 'validate')
    },
    $dispatch(componentName, eventName) {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.name === componentName) {
          break
        } else {
          parent = parent.$parent
        }
      }
      if (parent) {
        if (eventName) {
          parent.$emit(eventName)
        }
        return parent
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
