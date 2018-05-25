<template>
  <el-row>
    <el-table :data="drivers" :default-sort="{prop: 'name', order: 'ascending'}" stripe style="width: 100%" height="78vh" @row-click="rowClick">
      <el-table-column prop="name" label="Прізвище, ім'я та по батькові" width="295" sortable fixed>
      </el-table-column>
      <el-table-column prop="cert_serial_number" label="Серійний номер" width="295">
      </el-table-column>
      <el-table-column prop="phone" label="Номер мобільного телефону" width="295">
      </el-table-column>
      <el-table-column prop="validation_date" label="Дата перевірки" width="295">
      </el-table-column>
      <el-table-column prop="validation_place" label="Місце перевірки" width="295">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  props: {
    drivers: {
      type: Array,
      required: true
    }
  },

  methods: {
    rowClick: function(row) {
      this.$router.push(`/workspace/drivers/${row.guid}`);
    }
  }
};
</script>
