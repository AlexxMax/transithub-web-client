<template>
  <th-form>
    <template slot="header">
      <h3>Технічний засіб</h3>
    </template>

    <template slot="content">
      <el-row type="flex" :gutter="20">
        <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">

          <el-form :model="formMain" ref="formMain" :rules="rules" label-position="left" size="medium">

            <el-col :xs="24" :sm="12" :md="10" :lg="10" :xl="10">
              <el-form-item label="Номерний знак" prop="v_number">
                <el-input v-model="formMain.v_number" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :md="10" :lg="10" :xl="10">
              <el-form-item label="Технічний паспорт" prop="tech_passport">
                <el-input v-model="formMain.tech_passport" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>

      <el-tabs type="card">
        <el-tab-pane label="Технічна інформація">

          <el-row type="flex">
            <el-col :xs="24" :sm="14" :md="7" :lg="5" :xl="5">
              <el-form :model="formTechInfo" ref="formMain" :rules="rules" label-position="left" size="medium">

                <el-form-item label="Брутто" prop="gross">
                  <el-input v-model="formTechInfo.gross" clearable>
                    <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                  </el-input>
                </el-form-item>

                <el-form-item label="Нетто" prop="net">
                  <el-input v-model="formTechInfo.net" clearable>
                    <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                  </el-input>
                </el-form-item>

                <el-form-item label="Тара" prop="tara">
                  <el-input v-model="formTechInfo.tara" clearable>
                    <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                  </el-input>
                </el-form-item>

                <el-form-item label="Вантажомісткість" prop="cargo_capacity">
                  <el-input v-model="formTechInfo.cargo_capacity" clearable>
                    <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
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
      // vehicle: {
      //   ...vehicle
      // }

      formMain: {
        v_number: "" || vehicle.v_number,
        tech_passport: "" || vehicle.tech_passport
      },

      formTechInfo: {
        gross: "" || vehicle.gross,
        net: "" || vehicle.net,
        tara: "" || vehicle.tara,
        cargo_capacity: "" || vehicle.cargo_capacity
      }
    };
  }
};
</script>
