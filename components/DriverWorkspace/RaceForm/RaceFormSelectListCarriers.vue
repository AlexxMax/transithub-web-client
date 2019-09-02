<template>
<div class="RaceFormSelectListCarriers">
  <Scaffold
    title="Carriers"
    :visible.sync="innerVisible"
  >
    <div>
      <el-input
        class="RaceFormSelectListCarriers__search"
        clearable
        prefix-icon="el-icon-search"
        :placeholder="$t('lists.search')"
        :value="search"
        @input="value => { handleSearch(value); search = value }"
      />

      <div
        class="RaceFormSelectListCarriers__list"
        v-loading="loading"
      >

        <div
          class="RaceFormSelectListCarriers__item"
          v-for="item of items"
          :key="item.guid"
          :item="item"
          @click="$emit('select', item)"
        >
          <span>{{ item.fullname }}</span>
        </div>

        <div
          class="RaceFormSelectListCarriers__empty"
          v-if="isEmpty"
        >
          <span>The list is empty</span>
        </div>

      </div>
    </div>
  </Scaffold>
</div>
</template>

<script>
import { debounce, isEmpty } from 'lodash'

import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListScaffold'

export default {

  components: { Scaffold },

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    search: null,
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
    handleSearch: debounce(async function() {
      this.loading = true

      const { status, items } = await this.$api.organisations.getOrganisations(null, this.search)
      this.items = status ? items : null

      this.loading = false
    }, 500)
  }
}
</script>

<style lang='scss' scoped>
.RaceFormSelectListCarriers {
    &__search {
        margin: 10px 0;
    }

    &__list {
        height: calc(100vh - 177px);

        overflow-y: auto;
    }

    &__item {
        padding: $--driver-workspace-padding 0;

        // white-space: nowrap;
        // text-overflow: ellipsis;

        border-bottom: $--driver-workspace-border;

        cursor: pointer;
        // overflow: hidden;

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
