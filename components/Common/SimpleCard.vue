<template functional>
  <div
    class="rounded-lg p-4 bg-white shadow"
    :class="[{
      'bg-primary': props.active,
      'hover:bg-primary-light': props.hover,
      'shadow-lg': props.active,
      'cursor-pointer': props.pointer
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
    pointer: Boolean
  }
}
</script>
