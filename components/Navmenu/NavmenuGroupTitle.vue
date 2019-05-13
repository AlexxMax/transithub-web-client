<template>
  <div class="NavmenuGroupTitle" :class="{ 'NavmenuGroupTitle--margin-top': addMarginTop }">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'th-navmenu-group-title',

  props: {
    title: {
      type: String,
      required: true
    },

    addMarginTop: Boolean
  }
}
</script>

<style lang='scss' scoped>
.NavmenuGroupTitle {
  font-size: 10px;
  margin: 0 20px 5px;
  font-weight: 600;
  text-transform: uppercase;
  color: #BABABA;

  &--margin-top {
    margin: 20px 20px 5px;
  }
}
</style>
