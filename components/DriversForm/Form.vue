<template>
  <div>
    <el-row type="flex" :gutter="20">
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">

        <el-form :model="formMain" ref="formMain" :rules="rules" label-position="left" size="medium">
          <h1>Водій</h1>

          <el-col :xs="24" :sm="12" :md="10" :lg="10" :xl="10">
            <el-form-item label="Прізвище" prop="last_name">
              <el-input v-model="formMain.last_name" clearable>
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="10" :lg="10" :xl="10">
            <el-form-item label="Ім'я" prop="first_name">
              <el-input v-model="formMain.first_name" clearable>
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="10" :lg="10" :xl="10">
            <el-form-item label="По батькові" prop="middle_name">
              <el-input v-model="formMain.middle_name" clearable>
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="10" :lg="10" :xl="10">
            <el-form-item label="Повне ім'я" prop="full_name">
              <el-input v-model="formMain.full_name" :disabled="true">
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>

    <el-tabs type="card">
      <el-tab-pane label="Паспортні дані">

        <el-row type="flex">
          <el-col :xs="24" :sm="14" :md="7" :lg="5" :xl="5">
            <el-form :model="formPassData" ref="formMain" :rules="rules" label-position="left" size="medium">

              <el-form-item label="Серійний номер" prop="cert_serial_number">
                <el-input v-model="formTechInfo.cert_serial_number" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>

              <el-form-item label="Pass Date" prop="pass_date">
                <el-input v-model="formTechInfo.pass_date" clearable>
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
        <nuxt-link to="/workspace/drivers">
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

    const driver = this.$store.state.drivers.list.find(elem => {
      if (elem.guid === this.$route.params.guid) {
        return elem;
      }
    });

    console.log(driver);

    return {
      formMain: {
        last_name: "" || drivers.last_name,
        first_name: "" || driver.first_name,
        middle_name: "" || driver.middle_name,
        full_name: "" || driver.full_name
      },

      formPassData: {
        cert_serial_number: "" || driver.cert_serial_number,
        pass_date: "" || driver.pass_date
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
