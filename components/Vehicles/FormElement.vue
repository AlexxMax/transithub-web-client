<template>
  <th-form>
    <template slot="header">
      <h3>Технічний засіб</h3>
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

        <el-tabs>
          <el-tab-pane label="Технічна інформація">
            <el-row>
              <el-col :span="12">
                <el-form :model="techInfo" size="mini">
                  <el-form-item label="Брутто">
                    <el-input v-model="techInfo.gross" clearable>
                      <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                  </el-form-item>

                  <el-form-item label="Нетто">
                    <el-input v-model="techInfo.net" clearable>
                      <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                  </el-form-item>

                  <el-form-item label="Тара">
                    <el-input v-model="techInfo.tara" clearable>
                      <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                  </el-form-item>

                  <el-form-item label="Вантажомісткість">
                    <el-input v-model="techInfo.cargo_capacity" clearable>
                      <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </template>
  </th-form>
</template>

<script>
import CommonForm from "@/components/Common/Form";

export default {
  components: {
    "th-form": CommonForm
  },

  data() {
    const vehicle = this.$store.state.vehicles.list.find(
      elem => elem.guid === this.$route.params.guid
    );

    return {
      vehicle: {
        v_number: "" || vehicle.v_number,
        tech_passport: "" || vehicle.tech_passport
      },

      techInfo: {
        gross: "" || vehicle.gross,
        net: "" || vehicle.net,
        tara: "" || vehicle.tara,
        cargo_capacity: "" || vehicle.cargo_capacity
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.el-tabs {
  margin-top: 30px;
}
</style>
