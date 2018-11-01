<template>
  <div @keyup.enter="submitForm('ruleForm')">
    <el-row type="flex" justify="center">

      <!-- Card -->
      <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="10">
        <el-card class="box-card">

          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            size="mini">
            <span class="th-form-title">Вхід</span>

            <el-form-item prop="email">
              <label>Електронна пошта</label>
              <el-input
                v-model="ruleForm.email"
                placeholder="Введіть електронну пошту"
                type="email"
                name="email"
                auto-complete="on"
                autofocus/>
            </el-form-item>

            <el-form-item prop="password">
              <label>Пароль</label>
              <el-input
                v-model="ruleForm.password"
                placeholder="Введіть пароль"
                type="password"
                name="password"
                auto-complete="off"/>
            </el-form-item>

            <!-- <div class="th-remember">
              <el-checkbox>Запам’ятати мене</el-checkbox>
              <a href="/registration">Забули пароль?</a>
            </div> -->

            <div class="th-btn-submit-wrapper">
              <Button
                type="primary"
                class="th-btn-submit"
                @click="submitForm('ruleForm')">Ввійти</Button>
            </div>

            <div class="th-registration">
              <nuxt-link to="/registration"><span>Ще не маєте облікового запису?</span> Реєстрація
                <i class="el-icon-arrow-right"></i>
              </nuxt-link>

            </div>

          </el-form>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import Button from "@/components/Common/Buttons/Button";

export default {
  layout: "authorization",

  components: {
    Button
  },

  data() {
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Будь ласка, введіть електронну пошту"));
      } else {
        callback();
      }
    };

    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Будь ласка, введіть пароль"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        email: "",
        password: ""
      },

      rules: {
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
        ]
      }
    };
  },

  methods: {
    submitForm(ruleForm) {
      this.$nextTick(async () => {
        this.$refs[ruleForm].validate(async (valid) => {
          if (valid) {
            this.$nuxt.$loading.start()

            await this.$store.dispatch("user/userLogin", this.ruleForm)
            this.$router.push(`/workspace/requests`)

            this.$nuxt.$loading.finish()
          } else {
            return false;
          }
        })
      })
    }
  },

  asyncData({ store }) {
    return {
      ruleForm: {
        email: store.state.user.email
      }
    };
  }
};
</script>

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
      // height: 40px;
      // border-radius: 5px;
      // background-color: #f0b917;
      // color: white;
      // font-size: 14px;
      // border-width: 0;

      // &:hover {
      //   background-color: #f4c333;
      // }
    }
  }

  .th-registration {
    margin-top: 20px;
    a {
      color: #f0b917;
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
