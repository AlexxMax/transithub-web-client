<template>
  <Tooltip
    position="bottom"
    :content="tooltip"
    :disabled="!tooltip"
  >
    <button
      v-loading="processing"
      class="rounded-full h-10"
      :class="{
        'w-10': faIcon && !label,
        'px-5': !faIcon && label,
        'text-black': !faIcon && label,
        'text-white': type === TYPES.primary,
        'hover:bg-gray-100': type === TYPES.simple,
        'hover:text-primary': type === TYPES.simple,
        'bg-gray-200': type === TYPES.simple && !transparent,
        'bg-primary': type === TYPES.primary && !transparent,
        'bg-transparent': transparent,
      }"
      type="button"
      @click="$emit('click')"
    >
      <fa v-if="faIcon" class="mr-0" :icon="faIcon"/>
      <span v-if="label" :class="{ 'ml-1': faIcon }">{{ label }}</span>
    </button>
  </Tooltip>
</template>

<script>
import Tooltip from '@/components/Common/Tooltip'

const TYPES = {
  primary: 'primary',
  simple: ''
}

export default {
  name: 'th-round-button',

  components: { Tooltip },

  props: {
    faIcon: {
      type: String,
      retuired: true,
    },
    tooltip: String,
    transparent: Boolean,
    label: String,
    type: {
      type: String,
      default: TYPES.simple
    },
    processing: Boolean,
  },

  created() {
    this.TYPES = TYPES
  },
}
</script>
