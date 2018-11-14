<template>
  <div @keyup.enter="submitForm('ruleForm')">
    <el-row type="flex" justify="center">

      <!-- Card -->
      <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
        <el-card class="box-card">

          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            size="mini">
            <span class="th-form-title">Вхід</span>

           <div class="th-card-sides">
              <div class="th-left-side">
                <el-form-item prop="email">
                  <!-- <label>Електронна пошта</label> -->
                  <el-input
                    v-model="ruleForm.emailOrPassword"
                    placeholder="Номер телефону або електронна пошта"
                    type="email"
                    name="email"
                    auto-complete="on"
                    autofocus/>
                </el-form-item>

                <el-form-item prop="password">
                  <!-- <label>Пароль</label> -->
                  <el-input v-if="!seen"
                    v-model="ruleForm.password"
                    placeholder="Введіть пароль"
                    type="password"
                    name="password"
                    auto-complete="off"/>

                  <el-input v-if="seen"
                    v-model="ruleForm.password"
                    placeholder="Введіть код"
                    type="password"
                    name="password"
                    auto-complete="off"/>

                </el-form-item>

                <div class="th-form-remember">
                  <!-- <el-checkbox>Запам’ятати мене</el-checkbox> -->
                  <a href="#">Забули пароль?</a>
                </div>

                <div class="th-btn-submit-wrapper">
                  <Button v-if="!seen"
                    class="th-link-get-code"
                    @click="seen = !seen">Отримати смс з паролем</Button>

                  <Button v-if="seen"
                    class="th-link-get-code">dsfd</Button>

                  <Button
                    type="primary"
                    class="th-btn-submit"
                    @click="submitForm('ruleForm')">Ввійти</Button>
                </div>
              </div>
               
              <div class="th-gap"></div>

              <div class="th-vertical-divider">або</div>

              <div class="th-right-side">
                <Button class="btn btn-facebook">
                  <div class="icon">
                    <i class="fab fa-facebook-f fa-fw"></i>
                  </div>
                </Button>
                <Button class="btn btn-google">
                  <div class="icon">
                    <i class="fab fa-google-plus-g fa-fw"></i>
                  </div>
                </Button>
              </div>
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
    const checkEmailPassword = (rule, value, callback) => {
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
      seen: false,
      ruleForm: {
        emailOrPassword: "",
        password: ""
      },

      rules: {
        emailOrPassword: [
          {
            validator: checkEmailPassword,
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
    margin-bottom: 30px;
  }

  .th-card-sides {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;

    .th-left-side,
    .th-right-side {
      flex: 1 1 0;
      margin: 10px;
    }

    .th-gap {
      padding: 30px;
    }

    .th-vertical-divider {
      position: absolute;
      z-index: 1;
      top: 35%;
      height: 31%;
      line-height: 0;
      opacity: .7;

      &::before, &::after {
        position: absolute;
        left: 50%;
        content: '';
        border-left: .5px solid rgba(34,36,38,.1);
        border-right: .5px solid rgba(255,255,255,.1);
        width: 0%;
        height: calc(100% - 1rem);
      }

      &::before {
        top: -100%;
      }

      &::after {
        top: auto;
        bottom: 0;
      }
    }
  }

  // .el-form-item {
  //   label {
  //     font-size: 14px !important;
  //     color: #989795 !important;
  //     width: 100%;
  //   }
  // }

  .th-right-side {
    display: flex;
    flex-direction: column;
    margin-top: 32px !important;

    .btn {
      margin: 10px 0;
      display: block;
      position: relative;
      padding: 10px 60px;

      &.btn-facebook,
      &.btn-google {
        color:#fff;
        font-size: 13px;
        letter-spacing: .3px;
        text-align: center;
        border-radius: 30px;
        overflow: hidden;

        &:hover {
          opacity: .9;
        }

        .icon {
          position: absolute;
          left: 0px;
          top: 0;
          padding: 20px 25px;
        }

        .fa-fw {
          position: absolute;
          left: 37%;
          bottom: 39%;
        }
      }

      &.btn-facebook {
        background-color: #4C69BA;

        &::after {
          content: "Ввійти з Facebook";
          left: 4%;
          position: relative;
        }

        .icon {
          background-color:#3b5998;
        }
      }

      &.btn-google {
        background: #de4c34;

        &::after {
          content: "Ввійти з Google";
          left: 4%;
          position: relative;
        }

        .icon {
          background-color: #ce3e26;
        }
      }
    }
  }

  .th-btn-submit-wrapper {
    width: 100%;
    margin-top: 44px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .th-link-get-code {
      font-size: 14px;

      &:hover {
        color: #C4C4C4 !important;
      }
    }

    .th-btn-submit {
      width: 30%;
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

  .th-form-remember a {
    font-size: 13px !important;
    color: #C4C4C4;
  }

  .th-form-remember,
  .th-registration {
    .el-checkbox,
    span,
    a {
      font-size: 14px;
      color: #989795;
    }
    a {
      float: right;

      &:hover {
        color: #f4c333;
      }
    }
  } 

  .th-registration {
    padding: 0 30px 20px 30px;
    margin-top: 60px;
    text-align: center !important;

    a {
      color: #f0b917;
      float: none !important;

      &:hover {
        color: #C4C4C4 !important;
      }
    }
  }
}

@media (max-width: 700px) {
  .el-card {
    height: 75vh;
    margin-top: 0;
    border: none;

    .th-card-sides {
      .th-gap {
        display: none;
      }

      .th-vertical-divider {
        display: none;
      }
    }
  }
}

@media (max-width: 370px) {
  .el-card {
    height: 85vh;

    .th-right-side .btn {
      margin: 5px 0;
    }

    .th-registration {
      margin-top: 15px;
    }
  }
}

</style>
