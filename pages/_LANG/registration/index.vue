<template>
  <div>
    <el-row :gutter="40" type="flex" justify="center">

      <!-- Card -->
      <el-col :xs="18" :sm="16" :md="14" :lg="14" :xl="14">
        <el-card class="box-card">

          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
            <span class="th-form-title">Реєстрація</span>

            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-form-item prop="surname">
                <label>Прізвище *</label>
                <el-input v-model.number="ruleForm2.name" placeholder="Введіть прізвище"></el-input>
              </el-form-item>

              <el-form-item prop="name">
                <label>Ім'я *</label>
                <el-input v-model.number="ruleForm2.name" placeholder="Введіть ім'я"></el-input>
              </el-form-item>

              <el-form-item prop="patronymic">
                <label>По батькові *</label>
                <el-input v-model.number="ruleForm2.name" placeholder="Введіть по батькові"></el-input>
              </el-form-item>

              <el-form-item prop="email">
                <label>Електронна пошта *</label>
                <el-input type='email' v-model.number="ruleForm2.email" placeholder="Введіть електронну пошту"></el-input>
              </el-form-item>

            </el-col>

            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">

              <el-form-item prop="number">
                <label>Номер моб. телефону *</label>
                <el-input v-model.number="ruleForm2.number" placeholder="Введіть номер моб. телефону"></el-input>
              </el-form-item>

              <el-form-item prop="pass">
                <label>Пароль *</label>
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="Введіть пароль"></el-input>
              </el-form-item>

              <el-form-item prop="checkPass">
                <label>Підтвердження пароля *</label>
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="Підтвердьте пароль"></el-input>
              </el-form-item>

              <el-form-item>
                <div class="th-note">
                  <span>* обов'язкові поля</span>
                </div>
              </el-form-item>

            </el-col>

            <el-col>
              
              <div class="th-btn-submit-wrapper">
                <button class="th-btn-submit" @click="submitForm('ruleForm2')">Зареєструватися</button>
              </div>
            </el-col>

          </el-form>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<style lang="scss" scoped>
.el-row {
  margin: 0 !important;
}

.el-card {
  padding: 20px 40px;
  background: white;
  z-index: 100;
  margin: -80px 0 80px 0;

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
    margin: 20px 0 40px 0;

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
}
</style>

<script>
export default {
  layout: "authorization",

  data() {
    var checkSurname = (rule, value, callback) => {
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

    var checkPatronymic = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Будь ласка, введіть по батькові"));
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

    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(
          new Error("Будь ласка, введіть номер мобільного телефону")
        );
      }

      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Дане поле приймає лише числові значення"));
        } else {
          callback();
        }
      }, 1000);
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
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("Введені паролі не співпадають"));
      } else {
        callback();
      }
    };

    return {
      ruleForm2: {
        surname: "",
        name: "",
        patronymic: "",
        email: "",
        number: "",
        pass: "",
        checkPass: ""
      },

      rules2: {
        surname: [
          {
            validator: checkSurname,
            trigger: "blur"
          }
        ],

        name: [
          {
            validator: checkName,
            trigger: "blur"
          }
        ],

        patronymic: [
          {
            validator: checkPatronymic,
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
            trigger: "blur,change"
          }
        ],

        number: [
          {
            validator: checkNumber,
            trigger: "blur"
          }
        ],

        pass: [
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
    submitForm(ruleForm2) {
      this.$refs[ruleForm2].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
