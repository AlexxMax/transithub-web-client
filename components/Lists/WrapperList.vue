<template>
  <div>
    <div class="th-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[25, 50, 100, 200]"
        :page-size="25" layout="sizes, prev, pager, next" :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.th-pagination {
  float: right;
}
</style>


