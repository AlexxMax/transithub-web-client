<template>
  <el-row>
    <el-table
      stripe
      border
      size="small"
      :data="goods"
      style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        resizable
        prop="name"
        label="Name"
        sortable>
      </el-table-column>
      <el-table-column
        prop="classificator_code"
        label="Code"
        sortable>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  computed: {
    goods: function() {
      return this.$store.state.goods.list
    }
  }
}
</script>

<style>

</style>
