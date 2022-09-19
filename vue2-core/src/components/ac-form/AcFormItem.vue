<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  name: 'AcFormItem',
  inject: ['form'],
  data() {
    return {
      errorMessage: ''
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  mounted() {
    // 挂载的顺序 是先子在父
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate() {
      if (this.prop) {
        const model = this.form.model[this.prop]
        const rules = this.form.rules[this.prop]

        const descriptor = {
          [this.prop]: rules
        }
        const validator = new Schema(descriptor)
        return validator.validate(
          {
            [this.prop]: model
          },
          (errors, fields) => {
            if (errors) {
              this.errorMessage = errors[0].message
            } else {
              this.errorMessage = ''
            }
          }
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
