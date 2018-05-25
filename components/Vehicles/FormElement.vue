<template>
  <th-form>
    <template slot="header">
      <h3>{{ vehicle.title }}</h3>
    </template>

    <template slot="content">
      <el-form :model="vehicle" label-width="140px" label-position="top" size="mini">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Номерний знак">
              <el-input v-model="vehicle.v_number" clearable>
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Технічний паспорт">
              <el-input v-model="vehicle.tech_passport" clearable>
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form :model="vehicle" size="mini">
              <el-form-item label="Брутто">
                <el-input v-model="vehicle.gross" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>

              <el-form-item label="Нетто">
                <el-input v-model="vehicle.net" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>

              <el-form-item label="Тара">
                <el-input v-model="vehicle.tara" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>

              <el-form-item label="Вантажомісткість">
                <el-input v-model="vehicle.cargo_capacity" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </th-form>
</template>

<script>
import CommonForm from "@/components/Common/Form"

import { onFormCreated } from "@/utils/formsCommonMethods"

export default {
  components: {
    "th-form": CommonForm
  },

  data() {
    return {
      vehicle: {},
    };
  },

  async created() {
    await this.fetchData()
    onFormCreated()
  },

  methods: {
    fetchData: async function() {
      const vehicle = await this.$store.dispatch(
        "vehicles/loadElement",
        this.$route.params.guid
      )
      this.vehicle = { ...vehicle }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-tabs {
  margin-top: 30px;
}
</style>
