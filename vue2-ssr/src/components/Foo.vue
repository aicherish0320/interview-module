<template>
  <div class="foo" @click="handleClick">Foo</div>
</template>

<script>
export default {
  name: 'Foo',
  methods: {
    handleClick() {
      alert(2)
    }
  },
}
</script>

<style>
.foo {
  color: red;
}
</style>
