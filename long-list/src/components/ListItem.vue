<template>
  <div style="padding: 10px 20px; border: 1px solid green">
    {{ item.id }}-{{ item.value }}
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="scss" scoped></style>
