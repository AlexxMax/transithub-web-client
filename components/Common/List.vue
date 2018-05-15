<template>
  <div>
    <slot></slot>
    <div class="th-pagination">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :page-sizes="[50, 100, 200]" :page-size="limit" layout="sizes, prev, pager, next" :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true,
      default: 0
    }
  },

  data() {
    limit: 50;
  },

  methods: {
    handleSizeChange(limit) {
      console.log(`${limit} items per page`);
    },
    handleCurrentChange(currentPage) {
      console.log(`current page: ${currentPage}`);
    }
    // setOffset(offset, limit, currentPage) {
    //   console.log(`${(offset = limit * (currentPage - 1))} offset`);
    // }
  }
};
</script>

<style lang="scss" scoped>
.th-pagination {
  float: right;
}
</style>
