<template>
  <div class="FormText">
    <div :class="{ 'FormText__text': true, 'FormText__expanded': expand }">
      {{ text }}
    </div>
    <div class="FormText__icon" @click="expand = !expand">
      <fa :icon="icon"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-form-text',

  props: {
    text: String
  },

  data: () => ({
    expand: false
  }),

  computed: {
    icon() {
      return this.expand ? 'angle-up' : 'angle-down'
    }
  }
}
</script>

<style lang="scss" scoped>
.FormText {
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: -5px;

  &:hover {
    background-color: #f8f8f8;
    border-radius: 5px;
  }

  .FormText__text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;

    &.FormText__expanded {
      white-space: unset;
    }
  }

  .FormText__icon {
    margin-top: 5px;
    text-align: center;
    color: #606266;
    cursor: pointer;

    &:hover {
      background-color: #ebebeb;
      margin: 5px -5px -5px;
      padding-bottom: 5px;
      border-radius: 0px 0px 5px 5px;
    }
  }
}
</style>
