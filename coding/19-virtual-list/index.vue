<template>
  <div>
    <VirtualList :size="40" :remain="8" :list="lists">
    </VirtualList>
  </div>
</template>

<script>
export default {
  name: 'VirtualListDemo'
}
</script>

<style lang="scss" scoped></style>
