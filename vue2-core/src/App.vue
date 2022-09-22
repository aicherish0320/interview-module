<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/> -->
    <!-- VueLazyLoad -->
    <!-- <VueLazyLoad></VueLazyLoad> -->

    <!-- <ac-form :model="form" :rules="rules" ref="formRef">
      <ac-form-item label="用户名" prop="username">
        <ac-input v-model="form.username"></ac-input>
      </ac-form-item>
      <ac-form-item label="密码" prop="password">
        <ac-input type="password" v-model="form.password"></ac-input>
      </ac-form-item>
      <ac-form-item>
        <button @click="submitForm">submit</button>
      </ac-form-item>
    </ac-form> -->

    <ClickOutside></ClickOutside>
  </div>
</template>

<script>
import VueLazyLoad from './components/VueLazyLoad.vue'
import AcForm from '@/components/ac-form/AcForm.vue'
import AcFormItem from '@/components/ac-form/AcFormItem.vue'
import AcInput from '@/components/ac-form/AcInput.vue'
import ClickOutside from './components/click-outside/index.vue'
export default {
  name: 'App',
  components: {
    VueLazyLoad,
    AcInput,
    AcForm,
    AcFormItem,
    ClickOutside
  },
  data() {
    return {
      form: {
        username: 'jack',
        password: '123'
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码'
          }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss"></style>
