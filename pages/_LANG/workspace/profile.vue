<template>
  <div>
    <el-tabs type="card">

      <el-tab-pane label="Основне">

        <el-row type="flex" :gutter="80">
          <el-col :xs="24" :sm="16" :md="14" :lg="10" :xl="10">

            <el-form :model="formMain" ref="formMain" :rules="rules" label-width="135px">
              <el-form-item label="Прізвище" prop="lastname">
                <el-input v-model="formMain.lastname" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>

              <el-form-item label="Ім'я" prop="firstname">
                <el-input v-model="formMain.firstname" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>

              <el-form-item label="Електронна пошта" prop="email">
                <el-input type='email' v-model="formMain.email" clearable>
                  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                </el-input>
              </el-form-item>

              <el-form-item label="Мова інтерфейсу" prop="langs">
                <el-select v-model="formMain.lang" placeholder="Select" clearable>
                  <el-option v-for="(lang, index) in langs" :key="index" :label="lang.label" :value="lang.value">
                    {{lang.label}}
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Компанії" prop="company">
                <div class="th-companies-list" v-for="(company, index) in companies.list" :key="index">
                  {{ ++index}}.{{ " " + company.name }}
                </div>
              </el-form-item>

              <el-form-item>
                <el-button v-show="false">Відмінити</el-button>
                <el-button type="primary" @click="saveMainData">Змінити дані</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="Пароль">

        <el-row type="flex">
          <el-col :xs="24" :sm="14" :md="14" :lg="10" :xl="10">

            <el-button type="danger" style="margin-top:20px" @click="centerDialogVisible = true">Змінити пароль</el-button>

            <el-dialog title="Зміна пароля" :visible.sync="centerDialogVisible" width="30%" center>

              <el-form :model="formPassword" ref="formMain" :rules="rules">

                <el-form-item prop="password">
                  <label>Старий пароль</label>
                  <el-input type="password" v-model="formPassword.password" auto-complete="off">
                    <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                  </el-input>
                </el-form-item>

                <el-form-item prop="newPassword">
                  <label>Новий пароль</label>
                  <el-input type="password" v-model="formPassword.newPassword" auto-complete="off">
                    <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                  </el-input>
                </el-form-item>

                <el-form-item prop="newPasswordCheck">
                  <label>Підтвердження пароля</label>
                  <el-input type="password" v-model="formPassword.newPasswordCheck" auto-complete="off">
                    <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                  </el-input>
                </el-form-item>
              </el-form>
              
                <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible = false">Скасувати</el-button>
                  <el-button type="primary" @click="savePassData">Зберегти</el-button>
                </span>
            </el-dialog>
          </el-col>
        </el-row>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    var checkLastname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Будь ласка, введіть прізвище"));
      } else {
        callback();
      }
    };

    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Будь ласка, введіть ім'я"));
      } else {
        callback();
      }
    };

    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Будь ласка, введіть електронну пошту"));
      } else {
        callback();
      }
    };

    const user = this.$store.state.user;

    return {
      formMain: {
        lastname: "" || user.lastname,
        firstname: "" || user.firstname,
        lang: "" || user.language,
        email: "" || user.email
      },

      formPassword: {
        password: "",
        newPassword: "",
        newPasswordCheck: ""
      },

      rules: {
        lastname: [
          {
            validator: checkLastname,
            trigger: "blur"
          }
        ],

        firstname: [
          {
            validator: checkName,
            trigger: "blur"
          }
        ],

        email: [
          {
            validator: checkEmail,
            trigger: "blur"
          },

          {
            type: "email",
            message: "Будь ласка, введіть правильну адресу електронної пошти",
            trigger: "blur"
          }
        ]
      },

      langs: [
        {
          value: "ua",
          label: "Українська"
        },
        {
          value: "en",
          label: "English"
        }
      ],

      centerDialogVisible: false
    };
  },

  computed: mapState(["user", "companies"]),

  methods: {
    saveMainData() {
      this.$refs["formMain"].validate(async valid => {
        if (valid) {
          const userDataChanged = await this.$store.dispatch(
            "user/userUpdate",
            this.formMain
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    savePassData() {}
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-top: 30px;
}

.label,
.th-companies-list {
  color: #606266;
}

// .el-dialog--center .el-dialog__body {
//   padding: 25px 25px 0px !important;
// }

// .el-dialog {
//   width: 30% !important;
//
// }
// @media (max-width: 700px) {
//   .el-dialog {
//     width: 90%;
//   }
// }
</style>
