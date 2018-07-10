<template>
  <div class="th-sidebar-link-wrapper" @click="$emit('click')">
    <div class="th-sidebar-link">
      <div class="th-sidebar-link-icon">
        <slot name="icon" />
      </div>
      <div class="th-sidebar-link-text">
        <span class="th-sidebar-link-text-title"> {{ title }}</span>
        <span class="th-sidebar-link-text-subtitle"> {{ subtitle }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.th-sidebar-link-wrapper {
  padding: 10px;
  border-radius: 5px;
  color: #606266;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }

  .th-sidebar-link {
    display: flex;
    flex-direction: row;

    .th-sidebar-link-icon {
      font-size: 30px;
      width: 40px;
    }

    .th-sidebar-link-text {
      margin-left: 10px;
      display: flex;
      flex-direction: column;

      .th-sidebar-link-text-title {
        font-size: 14px;
      }

      .th-sidebar-link-text-subtitle {
        margin-top: 4px;
        font-size: 12px;
      }
    }
  }
}
</style>
