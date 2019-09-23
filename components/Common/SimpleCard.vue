<template functional>
  <div
    class="SimpleCard rounded-lg p-4 bg-white shadow"
    :class="[{
      'bg-primary': props.active,
      'hover:bg-primary-light': props.hover,
      'shadow-lg': props.active,
      'cursor-pointer': props.pointer,
      'w-11/12': props.isBindList
    }, data.staticClass]"
    v-on="listeners"
    v-bind="data.attrs"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'th-simple-card',

  props: {
    active: Boolean,
    hover: Boolean,
    pointer: Boolean,
    isBindList: Boolean
  }
}
</script>

<style lang="scss" scoped>
.SimpleCard {
  transition: all .4s ease-in;
}
</style>
