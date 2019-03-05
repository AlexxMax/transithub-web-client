<template>
  <div class="List" :class="classes">
    <div v-if="title" class="th-list-title">
      {{ title }}
      <!-- <span class="th-list-subtitle">{{ count }}</span> -->
      <el-badge v-if="showBadge" :value="countTitle" />
    </div>

    <div v-if="!noToolbar" class="th-list-toolbar">
      <slot name="toolbar"></slot>
    </div>

    <div class="th-list">
      <slot></slot>
    </div>

    <div v-if="visibleLoadMore">
      <LoadMore
        v-if="noPagination"
        :loading="loading"
        :on-load-more="handleLoadMore"
      />

      <div v-else class="th-pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentPageChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 25, 50, 100, 200]"
          :page-size="limit"
          layout="sizes, prev, pager, next, jumper"
          :total="count"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LoadMore from '@/components/Common/Lists/ListsLoadMore'

import { PAGE_SIZE, CURRENT_PAGE } from "@/utils/defaultValues"

const SIZES = {
  full: 'full',
  compact: 'compact'
}

export default {
  name: 'th-common-list',

  components: { LoadMore },

  props: {
    loading: Boolean,
    count: {
      type: Number,
      default: 0
    },
    loadedCount: Number,
    title: String,
    storeModule: String,
    storeMutation: {
      type: String,
      default: 'SET_OFFSET'
    },
    noToolbar: Boolean,
    noPagination: Boolean,
    size: {
      type: String,
      default: SIZES.full
    },
    showBadge: Boolean,
    showLoadMore: Boolean
  },

  data() {
    return {
      limit: PAGE_SIZE,
      currentPage: CURRENT_PAGE
    };
  },

  computed: {
    classes() {
      return {
        'List__full': this.size === SIZES.full,
        'List__compact': this.size === SIZES.compact
      }
    },
    countTitle() {
      return this.count === 0 && this.loadedCount === 0 ? '0' : `${this.loadedCount}/${this.count}`
    },
    visibleLoadMore() {
      return this.count !== this.loadedCount && this.count > 0 && this.showLoadMore
    }
  },

  methods: {
    handleSizeChange(limit) {
      this.limit = limit
      this.$store.commit(`${this.storeModule}/SET_LIMIT`, limit)
      this.$emit("eventFetch")
    },
    handleCurrentPageChange(currentPage) {
      this.$store.commit(`${this.storeModule}/${this.storeMutation}`, this.calculateOffset(this.limit))
      this.$emit("eventFetch")
    },
    calculateOffset(limit) {
      return limit * (this.currentPage - 1);
    },
    handleLoadMore() {
      const limit = this.$store.state[this.storeModule].limit
      const offset = this.$store.state[this.storeModule].offset + limit
      this.$store.commit(`${this.storeModule}/${this.storeMutation}`, offset)
      this.$emit('eventFetch')
    }
  }
};
</script>

<style lang="scss" scoped>
.List {
  padding: 0 5px;
  // max-width: 1000px;
  margin: auto;

  &.List__full {
    width: 100%;
  }

  &.List__compact {
    width: 900px;
  }
}

.th-list-title {
  font-size: 18px;
  font-weight: 500;
  padding: 0 5px;

  .th-list-subtitle {
    font-size: 10px;
    font-weight: 200;
    color: #606266;
  }
}

.th-list-toolbar {
  padding: 0 5px;
}

.th-pagination {
  margin: 19px -10px 0 0;
  text-align: center;
  // float: right;
}

@media only screen and (max-width: 991px) {
  .List.List__compact {
    width: 100%;
  }
}
</style>
