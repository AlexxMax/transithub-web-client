<template>
  <el-dialog
    class="PQQueueProfilesCatalogListSelectDialog"
    :z-index="4000"
    :title="title"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '40%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="hide"
  >

    <div v-loading="loading">
      <span 
        class="PQQueueProfilesCatalogListSelectDialog__subtitle"
        v-if="!isEmpty"
      >
        {{ $t('forms.pqQueueProfiles.general.chooseQueueProfileFromList') }}
      </span>

      <Item
        class="mt-6"
        v-for="item in items"
        :key="item.guid"
        :active="item.guid === activeItemGuid"
        :item="item"
        @select="$emit('select', item)"
      />

      <div
        class="PQQueueProfilesCatalogListSelectDialog__empty"
        v-if="isEmpty"
      >
        <span>{{ $t('lists.emptyListMessage') }}</span>
      </div>
    </div>
    
  </el-dialog>
</template>

<script>
import Item from '@/components/PQQueueProfiles/PQQueueProfilesCatalogListItem'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { isEmpty } from 'lodash'

export default {
  name: 'th-pq-queue-profiles-catalog-list-select-dialog',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: { Item },

  props: {
    activeItem: Object,
    items: Array,
    title: String,
    loading: Boolean
  },

  data: () => ({
    dialogVisible: false
  }),

  computed: {
    activeItemGuid() {
      return this.activeItem ? this.activeItem.guid : null
    },

    isEmpty() {
      return this.items && !this.items.length
    }
  },

  methods: {
    show() {
      this.dialogVisible = true
    },

    hide() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.PQQueueProfilesCatalogListSelectDialog {
  &__subtitle {
    color: $--color-info;
  }
}
</style>