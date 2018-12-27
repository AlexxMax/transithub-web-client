<template>
  <div style="padding: 0 5px">
    <div v-if="title" class="th-list-title">
      {{ title }}
      <!-- <span class="th-list-subtitle">{{ count }}</span> -->
      <el-badge :value="count" />
    </div>

    <div class="th-list-toolbar">
      <slot name="toolbar"></slot>
    </div>

    <div class="th-list">
      <slot></slot>
    </div>

    <div class="th-pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 25, 50, 100, 200]"
        :page-size="limit"
        layout="sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { PAGE_SIZE, CURRENT_PAGE } from "@/utils/defaultValues"

export default {
  name: 'th-common-list',

  props: {
    count: {
      type: Number,
      required: true,
      default: 0
    },
    title: String,
    "store-module": {
      type: String,
      required: true
    }
  },

  data() {
    return {
      limit: PAGE_SIZE,
      currentPage: CURRENT_PAGE
    };
  },

  methods: {
    handleSizeChange(limit) {
      this.limit = limit;
      this.$store.commit(`${this.storeModule}/SET_LIMIT`, limit)
      this.$emit("eventFetch")
    },
    handleCurrentPageChange(currentPage) {
      this.$store.commit(`${this.storeModule}/SET_OFFSET`, this.calculateOffset(this.limit))
      this.$emit("eventFetch")
    },
    calculateOffset(limit) {
      return limit * (this.currentPage - 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.th-list-title {
  font-size: 16px;
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
  margin: 20px -10px 0 0;
  text-align: center;
  // float: right;
}
</style>
