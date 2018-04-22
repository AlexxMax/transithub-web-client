<template>
  <div>
    <el-tabs type="card">

      <el-tab-pane label="Основне">

        <el-row type="flex" gutter="80">
          <el-col :xs="24" :sm="14" :md="14" :lg="8" :xl="8">

            <el-form ref="form" :model="form" label-width="120px">

              <el-form-item prop="lastname">
                <label>Прізвище *</label>
                <el-input v-model="form.lastname">
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>

              <el-form-item prop="firstname">
                <label>Ім'я *</label>
                <el-input v-model="form.firstname">
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>

              <el-form-item label="Електронна пошта" prop="email">
                <el-input type='email' v-model="form.email">
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>

              <el-form-item label="Мова інтерфейсу">
                <el-select v-model="value4" clearable placeholder="Select">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Компанії">
               <span v-for="company in companies" :key="company.value">
                 {{ company }}
               </span>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="saveChangedData">Змінити дані</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

      </el-tab-pane>
      <el-tab-pane label="Пароль">Config</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },

      options: [
        {
          value: "UA",
          label: "Українська"
        },
        {
          value: "EN",
          label: "Англійська"
        }
      ],

      value4: "",

      companies: ["1", "2", "3"]
    };
  },

  methods: {
    saveChangedData() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="scss" scoped>
label {
  color: #606266;
}
</style>

