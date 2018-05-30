<template>
  <div>
    <el-row type="flex" justify="center">

      <!-- Card -->
      <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="10">

        <el-card class="box-card">

          <el-form :model="formData" status-icon :rules="rules" ref="formNewCompany" class="demo-formData">
            <span class="th-form-title">Реєстрація компанії</span>

            <el-radio-group v-model="radio" size="medium">
              <el-radio label="2" border>Створити нову компанію</el-radio>
              <el-radio label="1" border>Вибрати існуючу компанію</el-radio>
            </el-radio-group>

            <div v-if="radio === '2'">

              <el-form-item prop="name">
                <label>Назва компанії *</label>
                <el-input v-model="formData.name" placeholder="Введіть назву компанії"></el-input>
              </el-form-item>

              <el-form-item>
                <div class="th-note">
                  <span>* обов'язкові поля</span>
                </div>
              </el-form-item>

              <div class="th-btn-submit-wrapper">
                <button class="th-btn-submit" @click.prevent="submitFormNewCompany()">Зареєструвати</button>
              </div>
            </div>
          </el-form>

          <el-form :model="formData" status-icon :rules="rules" ref="formCompanyByWorkspaceName" class="demo-formData">
            <div v-if="radio === '1'">

              <el-form-item prop="workspaceName">
                <label>Ключ компанії *</label>
                <el-input v-model="formData.workspaceName" placeholder="Введіть ключ компанії"></el-input>
              </el-form-item>

              <el-form-item>
                <div class="th-note">
                  <span>* обов'язкові поля</span>
                </div>
              </el-form-item>

              <div class="th-btn-submit-wrapper">
                <button class="th-btn-submit" @click.prevent="submitFormCompanyByWorkspaceName()">Застосувати</button>
              </div>

              <!-- <div class="th-back">
                <nuxt-link to="/login">
                  <i class="el-icon-arrow-left"></i> Повернутися до логування
                </nuxt-link>
              </div> -->
            </div>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Будь ласка, введіть назву компанії"));
      } else {
        callback();
      }
    };

    var checkKey = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Будь ласка, введіть ключ компанії"));
      } else {
        callback();
      }
    };

    return {
      radio: "2",

      formData: {
        name: "",
        workspaceName: ""
      },

      rules: {
        name: [
          {
            validator: checkName,
            trigger: "blur"
          }
        ],

        workspaceName: [
          {
            validator: checkKey,
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    submitFormNewCompany() {
      this.$refs["formNewCompany"].validate(async valid => {
        if (valid) {
          const companyRegistered = await this.$store.dispatch(
            "companies/companyRegister",
            this.formData
          );
          if (companyRegistered) {
            const userAddedToCompany = await this.$store.dispatch(
              "companies/addUserToCompany",
              {
                companyGuid: this.$store.state.companies.currentCompany.guid,
                userId: this.$store.state.user.id
              }
            );
            if (userAddedToCompany) {
              this.$emit("registration-next-step");
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    submitFormCompanyByWorkspaceName() {
      this.$refs["formCompanyByWorkspaceName"].validate(async valid => {
        if (valid) {
          const gotCompanyByWorkspaceName = await this.$store.dispatch(
            "companies/getCompanyByWorkspaceName",
            this.formData.workspaceName
          );
          if (gotCompanyByWorkspaceName) {
            const userAddedToCompany = await this.$store.dispatch(
              "companies/addUserToCompany",
              {
                companyGuid: this.$store.state.companies.currentCompany.guid,
                userId: this.$store.state.user.id
              }
            );

            if (userAddedToCompany) {
              this.$emit("registration-next-step");
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin: 0 !important;
}

.el-card {
  padding: 20px 40px;
  background: white;
  z-index: 100;
  margin-top: -80px;

  .th-form-title {
    font-size: 34px;
    font-family: "Raleway" !important;
    color: #f0b917;
    display: flex;
    justify-content: center;
    z-index: 2;
    line-height: 60px;
    margin-bottom: 20px;
  }

  .el-form-item {
    label {
      font-size: 14px !important;
      color: #989795 !important;
      width: 100%;
    }
  }

  .th-note {
    font-size: 12px !important;
    color: #989795;
  }

  .th-btn-submit-wrapper {
    width: 100%;
    margin: 20px 0 20px 0;

    .th-btn-submit {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      background-color: #f0b917;
      color: white;
      font-size: 14px;
      border-width: 0;

      &:hover {
        background-color: #f4c333;
      }
    }
  }

  .th-back {
    text-align: center;
    margin: 30px 20px;

    a {
      color: #f0b917;

      &:hover {
        color: #f4c333;
      }
    }
  }

  .el-radio-group {
    margin: 30px 0;
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 700px) {
  .el-card {
    padding: 0;
    margin-top: 0;
    border: none;
  }
}

@media (max-width: 370px) {
  .el-card {
    padding: 0;
    margin-top: 0;
    border: none;
  }
}
</style>
