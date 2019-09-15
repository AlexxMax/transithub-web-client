<template>
  <component :is="component" :class="{ 'p-4': simplified }">
    <div class="flex justify-between items-center">
      <div class="flex">
        <span class="font-semibold uppercase mr-2">{{ title }}</span>
        <ItemsCounter
          :loaded-count="loadedCount"
          :all-count="allCount"
        />
      </div>

      <component
        v-if="showCreateButton"
        :is="componentCreateButtonWrapper"
        :content="createButtonTooltipText"
        placement="bottom"
      >
        <Button
          round
          icon-only
          type="primary"
          fa-icon="plus"
          size="big"
          @click="$emit('create')"
        />
      </component>
    </div>
  </component>
</template>

<script>
import SimpleCard from '@/components/Common/SimpleCard'
import Tooltip from '@/components/Common/Tooltip'
import Button from '@/components/Common/Buttons/Button'
import ItemsCounter from '@/components/Common/ItemsCounter'

export default {
  name: 'th-list-head',

  components: { SimpleCard, Tooltip, Button, ItemsCounter },

  props: {
    title: {
      type: String,
      required: true,
    },
    showCreateButton: {
      type: Boolean,
      default: true,
    },
    createButtonTooltipText: String,
    loadedCount: {
      type: Number,
      default: 0
    },
    allCount: {
      type: Number,
      default: 0
    },
    simplified: Boolean,
  },

  computed: {
    component() {
      return this.simplified ? 'div' : 'SimpleCard'
    },

    componentCreateButtonWrapper() {
      return this.createButtonTooltipText ? 'Tooltip' : 'div'
    }
  }
}
</script>
