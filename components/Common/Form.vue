<template>
  <div>
    <div class="Form">
      <slot name="side-nav"></slot>

      <div class="Pattern__details">
        <div class="Pattern__details-header" v-if="!noHeader">
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
  name: 'th-form',

  props: {
    noHeader: Boolean
  }
}
</script>


<style lang="scss" scoped>
.Form {
  display: flex;
  flex-direction: row;
  // margin: 0 10px;
  margin: -20px;

  .Pattern__details {
    // overflow-y: auto;
    width: 100%;

    &-header {
      border-bottom: 1px solid #EBEEF5;
      padding: 30px;
      background-color: #FAFAFA;
      // margin-bottom: 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}

@media only screen and (max-width: 991px) {
  .Form {
    flex-direction: column;
  }
}
</style>

