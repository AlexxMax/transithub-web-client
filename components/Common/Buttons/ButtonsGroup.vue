<template>
  <div class="ButtonsGroup">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'th-buttons-group'
}
</script>

<style lang="scss" scoped>
.ButtonsGroup {
  display: flex;
  flex-direction: row;
}
</style>
