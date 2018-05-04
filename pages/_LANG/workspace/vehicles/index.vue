<template>
  <el-row>
    <el-table :data="vehicles" stripe style="width: 100%">
        <el-table-column prop="v_number" label="#" width="120">
      </el-table-column>
      <el-table-column prop="tech_passport" label="Тех паспорт" width="275">
      </el-table-column>
      <el-table-column prop="kind" label="Різновид" width="275">
      </el-table-column>
      <el-table-column prop="gross" label="Брутто" width="275">
      </el-table-column>
      <el-table-column prop="net" label="Нетто" width="275">
      </el-table-column>
      <el-table-column prop="cargo_capacity" label="Вантажомісткість" width="275">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  computed: {
    vehicles: function() {
      return this.$store.state.vehicles.list.slice();
    }
  }
};
</script>