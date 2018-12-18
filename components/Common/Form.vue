<template>
  <div>
    <div class="Form">
      <div class="Pattern__details">
        <div class="Pattern__details-header">
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
export default {
  name: 'th-form'
}
</script>


<style lang="scss" scoped>
.Form {
  display: flex;
  flex-direction: row;
  // margin: 0 10px;
  margin: -20px;

  .Pattern__details {
    overflow-y: auto;
    width: 100%;

    .Pattern__details-header {
      border-bottom: 1px solid #EBEEF5;
      padding: 20px 30px 30px;
      background-color: #FAFAFA;
      // margin-bottom: 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>

