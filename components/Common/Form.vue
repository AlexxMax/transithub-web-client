<template>
  <div>
    <div class="th-form">
      <div class="th-details-form">
        <div class="th-details-form-header">
          <slot name="header"></slot>
          <slot name="toolbar"></slot>
        </div>
        <slot name="content"></slot>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>


<style lang="scss" scoped>
.th-form {
  display: flex;
  flex-direction: row;
  margin: 0 10px;

  .th-details-form {
    overflow-y: auto;
    // height: 100vh;
    width: 100%;

    .th-details-form-header {
      margin-bottom: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>

