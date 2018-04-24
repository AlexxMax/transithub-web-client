<template>
  <div>
    <el-row type="flex" justify="center">

      <!-- Card -->
      <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="10">

        <el-card class="box-card">

          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <span class="th-form-title">Реєстрація</span>

            <el-form-item prop="lastname">
              <label>Прізвище *</label>
              <el-input v-model="ruleForm.lastname" placeholder="Введіть прізвище"></el-input>
            </el-form-item>

            <el-form-item prop="firstname">
              <label>Ім'я *</label>
              <el-input v-model="ruleForm.firstname" placeholder="Введіть ім'я"></el-input>
            </el-form-item>

            <el-form-item prop="email">
              <label>Електронна пошта *</label>
              <el-input type='email' v-model="ruleForm.email" placeholder="Введіть електронну пошту"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <label>Пароль *</label>
              <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="Введіть пароль"></el-input>
            </el-form-item>

            <el-form-item prop="checkPass">
              <label>Підтвердження пароля *</label>
              <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="Підтвердьте пароль"></el-input>
            </el-form-item>

            <el-form-item>
              <div class="th-note">
                <span>* обов'язкові поля</span>
              </div>
            </el-form-item>

            <div class="th-btn-submit-wrapper">
              <button class="th-btn-submit" @click.prevent="submitForm('ruleForm')" >Зареєструватися</button>
            </div>

            <div class="th-back">
              <nuxt-link to="/login">
                <i class="el-icon-arrow-left"></i> Повернутися до логування
              </nuxt-link>
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

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Будь ласка, введіть пароль"));
      } else {
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Будь ласка, підтвердьте пароль"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("Введені паролі не співпадають"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        lastname: "",
        firstname: "",
        email: "",
        password: "",
        checkPass: ""
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
        ],

        password: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],

        checkPass: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(async valid => {
        if (valid) {
          const userRegistered = await this.$store.dispatch(
            "user/userRegister",
            this.ruleForm
          );
          if (userRegistered) {
            this.$emit("registration-next-step");
          }
        } else {
          return false;
        }
      });
    },

    changeStep(step) {}
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
    margin: 30px 0 20px 0;

    a {
      color: #f0b917;

      &:hover {
        color: #f4c333;
      }
    }
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