<template>
  <div>
    <div class="th-form">
      <div class="th-details-form">
        <slot name="header"></slot>
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

  .th-details-form {
    overflow-y: auto;
    height: 100vh;
    width: 100%;
    // margin-left: 20px;
  }

  .th-form-side {
    margin: -20px -20px 0px 0px;
    padding: 20px;
    min-width: 190px;
  }
}
</style>

