<template>
<div class="RaceFormSelectListGoods">
  <Scaffold
    title="Select Goods"
    v-loading="loading"
    :visible.sync="innerVisible"
  >
    <div class="RaceFormSelectListGoods__list">

      <div
        class="RaceFormSelectListGoods__item"
        v-for="item of items"
        :key="item.guid"
        :item="item"
        @click="$emit('select', item)"
      >
        <span>{{ item.name }}</span>
      </div>

      <div
        class="RaceFormSelectListGoods__empty"
        v-if="isEmpty"
      >
        <span>{{ $t('lists.emptyListMessage') }}</span>
      </div>

    </div>
  </Scaffold>
</div>
</template>

<script>
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListScaffold'

export default {
  components: {
    Scaffold
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },

  data: () => ({
    items: null,
    loading: false,
  }),

  watch: {
    visible: {
      immediate: true,
      handler(visible) {
        visible ? this.fetchGoods() : null
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
    async fetchGoods() {
      this.loading = true

      const { status, items } = await this.$api.goods.getGoods()
      this.items = status ? items : null

      this.loading = false
    }
  }
}
</script>

<style lang='scss' scoped>
.RaceFormSelectListGoods {

    &__list {
        height: calc(100vh - 120px);

        overflow-y: auto;
    }

    &__item {
        padding: $--driver-workspace-padding 0;

        white-space: nowrap;
        text-overflow: ellipsis;

        border-bottom: $--driver-workspace-border;

        cursor: pointer;
        overflow: hidden;

        &:hover {
            font-weight: bold;
            color: $--color-primary;
        }
    }

    &__empty {
        margin-top: 2rem;

        text-align: center;
        color: $--color-info;
    }
}
</style>
