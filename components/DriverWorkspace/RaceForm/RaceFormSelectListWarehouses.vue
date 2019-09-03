<template>
<div class="RaceFormSelectListWarehouse">
  <Scaffold
    :title="$t('forms.common.pqWarehouses')"
    :visible.sync="innerVisible"
    v-loading="loading"
  >
    <div class="RaceFormSelectListWarehouse__list">
      <Item
        v-for="item of items"
        :key="item.guid"
        :item="item"
        @select="item => $emit('select', item)"
      />

      <div
        class="RaceFormSelectListWarehouse__empty"
        v-if="isEmpty"
      >
        <span>There are no one warehouse in selected settelment</span>
      </div>
    </div>
  </Scaffold>
</div>
</template>

<script>
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListScaffold'
import Item from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListItemWarehouses'

export default {
  name: 'th-driver-workspace-race-form-select-list-warehouses',

  components: { Scaffold, Item, },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    koatuu: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    items: null,
    loading: false,
  }),

  watch: {
    visible: {
      immediate: true,
      handler(visible) {
        visible ? this.handleSearch() : null
      }
    }
  },

  computed: {
    innerVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    },

    isEmpty() {
      return this.items && !this.items.length && !this.loading
    }
  },

  methods: {
    async handleSearch() {
      this.loading = true

      const { status, items } = await this.$api.warehouses.getWarehousesByKoatuu(this.koatuu)
      this.items = status ? items : null

      this.loading = false
    }
  }

}
</script>

<style lang='scss' scoped>
.RaceFormSelectListWarehouse {
    &__search {
        margin: 10px 0;
    }

    &__list {
        height: calc(100vh - 177px);
        overflow-y: auto;
    }

    &__empty {
        margin-top: 2rem;

        text-align: center;
        color: $--color-info;
    }
}
</style>
