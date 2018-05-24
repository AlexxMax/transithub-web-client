<template>
  <div>
    <el-row type="flex" :gutter="20">
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">

        <el-form :model="formMain" ref="formMain" :rules="rules" label-position="left" size="medium">
          <h1>Технічний засіб</h1>

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

    <div class="th-footer">
      <div class="th-back">
        <nuxt-link to="/workspace/vehicles">
          <i class="el-icon-arrow-left"></i>Скасувати
        </nuxt-link>
      </div>
      <el-button type="danger" @click.prevent="removeDomain(item)">Видалити</el-button>
      <el-button class="th-chagne-data" type="primary" @click="saveMainData">Змінити дані</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    console.log(this.$route.params.guid);

    const vehicle = this.$store.state.vehicles.list.find(elem => {
      if (elem.guid === this.$route.params.guid) {
        return elem;
      }
    });

    console.log(vehicle);

    return {
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

<style lang="scss" scoped>
.th-footer {
  position: fixed;
  bottom: 0;
  margin-bottom: 17px;

  .th-back {
    display: inline-block;
    margin-right: 40px;
  }
}
</style>