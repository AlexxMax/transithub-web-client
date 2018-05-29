<template>
  <div>
    <div class="th-details-form">
      <slot name="header"></slot>
      <slot name="toolbar"></slot>
      <slot name="content"></slot>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.th-details-form {
  overflow-y: auto;
  height: 100vh;
}
</style>

