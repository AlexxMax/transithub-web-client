<template>
  <div>
    <div class="th-list">
      <slot></slot>
    </div>
    <div class="th-pagination">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="currentPage"
        :page-sizes="[50, 100, 200]" :page-size="limit" layout="sizes, prev, pager, next" :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { PAGE_SIZE, CURRENT_PAGE } from "@/utils/defaultValues";

export default {
  props: {
    count: {
      type: Number,
      required: true,
      default: 0
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
      this.$emit("eventFetch", this.limit, this.calculateOffset(this.limit));
    },
    handleCurrentPageChange(currentPage) {
      this.$emit("eventFetch", this.limit, this.calculateOffset(this.limit));
    },
    calculateOffset(limit) {
      return limit * (this.currentPage - 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.th-pagination {
  margin: 20px -10px 0 0;
  float: right;
}
</style>
