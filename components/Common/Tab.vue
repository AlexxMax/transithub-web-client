<template>
  <span
    class="py-6 px-2 mr-4 font-semibold uppercase cursor-pointer text-gray-600 hover:text-black"
    :class="{ 'text-primary': active, 'font-bold': active, 'hover:text-primary': active, '-my-6': embed }"
    @click="$emit('click')"
  >
    {{ title }}
  </span>
</template>

<script>
export default {
  name: 'th-tab',

  props: {
    title: {
      type: String,
      required: true,
    },
    active: Boolean,
    embed: Boolean
  },
}
</script>
