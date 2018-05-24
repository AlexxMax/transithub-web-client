<template>
  <div>
    <div class="th-details-form">
      <slot name="header"></slot>

      <slot name="toolbar"></slot>

      <div class="th-form-content">
        <slot name="content"></slot>
      </div>

      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .th-form-content {
    margin-top: 20px;
  }
</style>

