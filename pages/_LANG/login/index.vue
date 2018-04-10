<template>
  <div>
    <el-row type="flex" justify="center">

      <!-- Card -->
      <el-col :xs="18" :sm="16" :md="14" :lg="8" :xl="8">
        <el-card class="box-card">

          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
            <span class="th-form-title">Вхід</span>

            <el-form-item prop="email">
              <label>Електронна пошта</label>
              <el-input v-model.number="ruleForm2.email" placeholder="Введіть електронну пошту"></el-input>
            </el-form-item>

            <el-form-item prop="pass">
              <label>Пароль</label>
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="Введіть пароль"></el-input>
            </el-form-item>

            <div class="th-remember">
              <el-checkbox>Запам’ятати мене</el-checkbox>
              <a href="/registration">Забули пароль?</a>
            </div>

            <div class="th-btn-submit-wrapper">
              <button class="th-btn-submit" @click="submitForm('ruleForm2')">Ввійти</button>
            </div>

            <div class="th-registration">
              <span>Ще не маєте облікового запису?</span>
              <!-- <a href="/registration">Зареєструватися <i class="el-icon-arrow-right"></i> </a> -->

              <nuxt-link to="/registration">Зареєструватися
                <i class="el-icon-arrow-right"></i>
              </nuxt-link>

            </div>

          </el-form>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<style lang="scss" scoped>
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

  .th-remember,
  .th-registration {
    .el-checkbox,
    span,
    a {
      font-size: 14px !important;
      color: #989795;
    }
    a {
      float: right;

      &:hover {
        color: #f4c333;
      }
    }
  }
  .th-btn-submit-wrapper {
    width: 100%;
    margin-top: 44px;

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

  .th-registration {
    margin-top: 44px;
    a {
      color: #f0b917;
    }
  }
}
</style>

<script>
export default {
  layout: "authorization",

  data() {
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

    return {
      ruleForm2: {
        email: "",
        pass: ""
      },

      rules2: {
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

        pass: [
          {
            validator: validatePass,
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
