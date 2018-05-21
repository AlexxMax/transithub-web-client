<template>
  <el-row>
    <el-table :data="vehicles" stripe style="width: 100%" height="80vh">
      <el-table-column prop="v_number_slug" label="#" width="120" fixed>
      </el-table-column>
      <el-table-column prop="tech_passport" label="Тех паспорт" width="265">
      </el-table-column>
      <el-table-column prop="kind" label="Різновид" width="265">
      </el-table-column>
      <el-table-column prop="gross" label="Брутто" width="265">
      </el-table-column>
      <el-table-column prop="net" label="Нетто" width="265">
      </el-table-column>
      <el-table-column prop="cargo_capacity" label="Вантажомісткість" width="265">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  props: {
    vehicles: {
      type: Array,
      required: true
    }
  }
};
</script>