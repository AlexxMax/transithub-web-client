<template>
  <div class="th-list-toolbar-wrapper">
    <div class="th-list-toolbar">
      <div class="th-list-toolbar-left">
        <slot name="left" />
      </div>
      <div class="th-list-toolbar-right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-list-toolbar'
}
</script>

<style lang="scss" scoped>
.th-list-toolbar-wrapper {
  margin: 20px 0;

  .th-list-toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .th-list-toolbar-left {

    }

    .th-list-toolbar-right {

    }
  }
}

@media only screen and (max-width: 600px) {
  .th-list-toolbar-wrapper {
    .th-list-toolbar {
      .th-list-toolbar-left {
        width: 100%;
        margin-right: 10px;
      }

      .th-list-toolbar-right {

      }
    }
  }
}
</style>
