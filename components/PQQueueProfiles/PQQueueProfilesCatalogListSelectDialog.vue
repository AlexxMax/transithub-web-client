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
      <div class="flex justify-between pb-4">
        <span>{{ infoSubtitle }}</span>

        <Button
          round
          icon-only
          type="primary"
          fa-icon="plus"
          size="big"
          @click="$emit('create')"
        />
      </div>

      <Item
        class="mt-3"
        v-for="(item, i) in items"
        :key="`${i}-${item.guid}`"
        :active="item.guid === activeItemGuid"
        :item="item"
        @select="$emit('select', item)"
      />
    </div>
    
  </el-dialog>
</template>

<script>
import Item from '@/components/PQQueueProfiles/PQQueueProfilesCatalogListItem'
import Button from '@/components/Common/Buttons/Button'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { isEmpty } from 'lodash'

export default {
  name: 'th-pq-queue-profiles-catalog-list-select-dialog',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: { Item, Button },

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
    },

    infoSubtitle() {
      return this.isEmpty ? this.$t('lists.emptyListMessage') : this.$t('forms.pqQueueProfiles.general.chooseQueueProfileFromList')
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
