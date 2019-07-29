<template>
  <div @keyup.enter="submitForm">
    <el-row type="flex" justify="center">

      <!-- Card -->
      <el-col :xs="24" :sm="16" :md="9">
        <el-card class="box-card">

          <el-form
            v-loading="loading"
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="rule-form"
            class="demo-ruleForm"
            size="mini"
            @submit.native.prevent>
            <span class="th-form-title">{{ $t('forms.user.login.title') }}</span>

           <div class="th-card-sides">
              <div class="th-left-side">

                <div class="Login__left-login-type-switch">
                  <el-radio-group class="Login__radio-group" size="medium" v-model="radioSwitch">
                    <el-radio
                      @change="loginType = 'email'"
                      label="email">
                      {{ $t('forms.common.email') }}
                      </el-radio>
                    <el-radio
                      class="Login__left-login-type-switch__radio-btn"
                      @change="loginType = 'phone'"
                      label="phone">
                      {{ $t('forms.common.phone') }}
                    </el-radio>
                  </el-radio-group>
                </div>

                <el-form-item prop="email" v-show="loginType === 'email'">
                  <el-input
                    v-model="ruleForm.email"
                    :placeholder="$t('forms.user.login.email')"
                    name="email"
                    type="email"
                    id="email"
                    auto-complete="email"
                    autofocus>
                    <fa class="Login__left-login-form-input-icon input-internal-icon" icon="envelope" slot="prefix" />
                  </el-input>
                </el-form-item>

                <el-form-item prop="phone" v-show="loginType === 'phone'">
                  <el-input
                    v-mask="phoneMask"
                    v-model="ruleForm.phone"
                    :placeholder="$t('forms.user.login.phone')"
                    name="tel"
                    type="tel"
                    id="tel"
                    auto-complete="tel"
                    autofocus
                    @keydown.delete.native="handlePhoneDelete">
                    <fa class="Login__left-login-form-input-icon input-internal-icon" icon="phone" slot="prefix" />
                  </el-input>
                </el-form-item>

                <el-form-item prop="password">
                  <!-- <label>Пароль</label> -->
                  <el-input v-if="!seen"
                    v-model="ruleForm.password"
                    :placeholder="$t('forms.user.login.password')"
                    type="password"
                    name="password"
                    auto-complete="off"
                    show-password
                  >
                    <fa class="Login__left-login-form-input-icon input-internal-icon" icon="lock" slot="prefix" />
                  </el-input>
                </el-form-item>

                <!-- <el-form-item prop="code">
                   <el-input v-if="seen"
                    v-model="ruleForm.code"
                    :placeholder="$t('forms.user.login.code')"
                    type="text"
                    name="code"
                    auto-complete="off"/>
                </el-form-item> -->

                <div class="th-form-remember">
                  <span
                    class="Login__forget-password"
                    @click="visible = true"
                  >
                    {{ $t('forms.user.login.forgetPass') }}
                  </span>
                </div>

                <div class="th-btn-submit-wrapper">
                  <Button
                    class="th-link-get-code"
                    @click="handleShowPinDialog">{{ $t('forms.user.login.getMessage') }}</Button>

                  <!-- <Button v-if="seen"
                    class="th-link-get-code">{{ $t('forms.user.login.repeatMessage') }}</Button> -->

                  <Button
                    autofocus
                    round
                    type="primary"
                    class="th-btn-submit"
                    @click="submitForm">{{ $t('forms.user.login.logIn') }}</Button>
                </div>
              </div>

              <!-- <div class="th-gap"></div>

              <div class="th-vertical-divider">{{ $t('forms.user.login.or') }}</div> -->

              <!-- <div class="th-right-side">
                <Button class="btn btn-facebook" @click="handleLoginByFacebook">
                  <div class="icon">
                    <i class="fab fa-facebook-f fa-fw"></i>
                  </div>

                  <span class="th-btn-title">{{ $t('forms.user.login.logInFacebook') }}</span>
                </Button>

                <Button class="btn btn-google" @click="handleLoginByGoogle">
                  <div class="icon">
                    <i class="fab fa-google-plus-g fa-fw"></i>
                  </div>

                   <span class="th-btn-title">{{ $t('forms.user.login.logInGoogle') }}</span>
                </Button>
              </div> -->
           </div>

            <div class="th-registration">
              <span>{{ $t('forms.user.login.isAlreadyUser') }}</span>
              <nuxt-link :to="$i18n.path('registration')">
                {{ $t('forms.user.registration.title') }}
                <!-- <fa icon="arrow-right"/> -->
                <i class="el-icon-arrow-right" style="font-weight: 800;"></i>
              </nuxt-link>
            </div>

          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <UserPhoneConfirmation
      ref="pin-dialog"
      :phone="phone"
      @submit="submitFormByPin"
    />

    <AuthChangePassword
      :visible.sync="visible"
      :user="{ email: ruleForm.email, phone: ruleForm.phone }"
      @close="visible = false"
    />

    <!-- <DialogChangeUserPassword
      ref="dialog-change-user-password"
      :user-email="ruleForm.email"
      :user-phone="ruleForm.phone"
    /> -->

  </div>
</template>

<script>
import Button from "@/components/Common/Buttons/Button"
import UserPhoneConfirmation from '@/components/Users/UserPhoneConfirmation'
import AuthChangePassword from '@/components/Auth/AuthChangePassword'
// import DialogChangeUserPassword from '@/components/Users/DialogChangeUserPassword'

import { VALIDATION_TRIGGER, PHONE_MASK } from '@/utils/constants'
import { showMessage, showErrorMessage, showSuccessMessage } from '@/utils/messages'

import Router from '@/utils/router'

export default {
  layout: "authorization",

  components: {
    Button,
    UserPhoneConfirmation,
    AuthChangePassword
    // DialogChangeUserPassword
  },

  data() {
     const validation = {
      email: (rule, value, cb) => {
        if (!value && this.loginType === 'email') {
          cb(new Error(this.$t('forms.user.validation.email')))
        }
        cb()
      },

      phone: (rule, value, cb) => {
        if (!value && this.loginType === 'phone') {
          cb(new Error(this.$t('forms.user.validation.phone')))
        }
        cb()
      },

      phoneValid: (rule, value, cb) => {
        if (!value.pValidPhone() && this.loginType === 'phone') {
          cb(new Error(this.$t('forms.user.validation.incorrectPhone')))
        }
        cb()
      },

      password: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.user.validation.password')))
        }
        cb()
      },

      //  code: (rule, value, cb) => {
      //   if (!value) {
      //     cb(new Error(this.$t('forms.user.login.code')))
      //   }
      //   cb()
      // }
    }

    // const checkPhoneOrEmail = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("Будь ласка, введіть електронну пошту"));
    //   } else {
    //     callback();
    //   }
    // };

    // const validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("Будь ласка, введіть пароль"));
    //   } else {
    //     callback();
    //   }
    // };

    // const validateCode = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("Будь ласка, введіть отриманий код"));
    //   } else {
    //     callback();
    //   }
    // };

    return {
      seen: false,
      loading: false,

      visible: false,

      loginType: 'email',

      ruleForm: {
        email: "",
        phone: "+38",
        password: "",
        code: ""
      },

      phone: '',
      phoneMask: PHONE_MASK,

      radioSwitch: 'email',

      rules: {
        email: [
          {
            required: true,
            validator: validation.email,
            trigger: VALIDATION_TRIGGER,
            max: 100
          }, {
            type: 'email',
            message: this.$t('forms.user.validation.incorrectEmail'),
            trigger: ['blur', 'change']
          }
        ],

        phone: [
          {
            required: true,
            validator: validation.phone,
            trigger: VALIDATION_TRIGGER,
            max: 100
          }, {
            type: 'string',
            validator: validation.phoneValid,
            trigger: ['blur', 'change']
          }
        ],

        password: [
          {
           required: true,
            validator: validation.password,
            trigger: VALIDATION_TRIGGER,
            max: 500
          }
        ],

        // code: [
        //   {
        //     required: true,
        //     validator: validation.code,
        //     trigger: VALIDATION_TRIGGER,
        //     max: 50
        //   }
        // ]
      }
    };
  },

  computed: {
    title () {
    	return this.$t('forms.user.login.title') + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  },

  methods: {
    submitForm() {
      const pinDialog = this.$refs['pin-dialog']
      if (pinDialog.visible) {
        this.submitFormByPin()
      } else {
        this.submitFormByPassword()
      }
    },
    async submitFormByPassword() {
      this.$refs['rule-form'].validate(async (valid) => {
        if (valid) {
          this.$nextTick(async () => {
            this.$nuxt.$loading.start()

            const payload = {
              password: this.ruleForm.password
            }

            if (this.loginType === "phone") {
              payload.phone = this.ruleForm.phone.pUnmaskPhone()
            } else {
              payload.email = this.ruleForm.email
            }

            const success = await this.$store.dispatch("user/userLogin", payload)
            if (success) {
              this.$router.push(`/workspace`)
            } else {
              showErrorMessage(this.$t(this.loginType === "phone" ? 'messages.loginByPhoneError' : 'messages.loginByEmailError'))
            }

            this.$nuxt.$loading.finish()
          })
        }
      })
    },
    async submitFormByPin() {
      const pinDialog = this.$refs['pin-dialog']
      this.$nextTick(async () => {
        this.$nuxt.$loading.start()

        const pin = pinDialog.getPin()
        if (pin) {
          const payload = {
            phone: this.phone,
            pin: pin,
            authType: 'pin'
          }

          const success = await this.$store.dispatch("user/userLogin", payload)
          if (success) {
            pinDialog.hide()
            this.$router.push(`/workspace`)
          } else {
            showErrorMessage(this.$t('messages.loginErrorWithPin'))
          }

        } else {
          showErrorMessage(this.$t('messages.cantLogInByPhoneAndPin'))
        }

        this.$nuxt.$loading.finish()
      })
    },
    async handleShowPinDialog() {
      const field = this.loginType === 'phone' ? 'phone' : 'email'
      this.$refs['rule-form'].validateField(field, async (errors) => {
        if (!errors) {
          const pinDialog = this.$refs['pin-dialog']
          this.loading = true

          let loginPhone = null, loginEmail = null
          if (this.loginType === 'phone') {
            loginPhone = this.ruleForm.phone.pUnmaskPhone()
          } else {
            loginEmail = this.ruleForm.email
          }

          const { status, pinSended, phone } = await this.$api.users.sendPinToUser(loginPhone, loginEmail)
          if (!status) {
            loginPhone ? showErrorMessage(this.$t('messages.cantSendPinCodeByPhone')) : showErrorMessage(this.$t('messages.cantSendPinCodeByEmail'))
          }

          this.loading = false

          if (!phone) {
            showErrorMessage(this.$t('messages.userHasNoPhoneOnLoginByEmail').replace('%1', loginEmail))
          } else if (status && pinSended) {
            this.phone = phone
            pinDialog.show()
          }
        }
      })
    },
    handleLoginByFacebook() {
      showMessage(this.$t('development.facebookAuth'))
    },
    handleLoginByGoogle() {
      showMessage(this.$t('development.googleAuth'))
    },
    handlePhoneDelete(e) {
      if (this.ruleForm.phone.length < 4) {
        e.preventDefault()
      }
    }
  },

  // asyncData({ store }) {
  //   return {
  //     ruleForm: {
  //       email: store.state.user.email,
  //       phone: store.state.user.phone
  //     }
  //   };
  // }

  mounted() {
    const from = this.$store.state.route.from
    this.$store.commit('router/SET_WORKSPACE_LANDING_ROUTE', Router.getWorkspaceRoute(from))
  }
};
</script>

<style lang="scss" scoped>
$color-primary: #FFD74D;

.box-card {
  border-radius: 15px;
}

.el-card {
  background: white;
  z-index: 100;
  margin-top: -90px;
  padding: 20px 40px;

  .th-form-title {
    font-size: 34px;
    //font-family: "Raleway" !important;
    color: $color-primary;
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

    .th-left-side {
      flex: 1 1 0;
      margin: 10px;
    }

    .th-left-side {
      .Login__left-login-type-switch {
        margin-bottom: 15px;
        text-align: center;
      }
      .Login__left-login-form-input-icon {
        color: #c0c4cc;
      }
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

  // .th-right-side {
  //   display: flex;
  //   flex-direction: column;
  //   margin-top: 32px !important;

  //   .btn {
  //     margin: 10px 0;
  //     display: block;
  //     position: relative;
  //     padding: 10px 60px;

  //     &.btn-facebook,
  //     &.btn-google {
  //       color:#fff;
  //       font-size: 13px;
  //       letter-spacing: .3px;
  //       text-align: center;
  //       border-radius: 30px;
  //       overflow: hidden;

  //       &:hover {
  //         opacity: .9;
  //       }

  //       .icon {
  //         position: absolute;
  //         left: 0px;
  //         top: 0;
  //         padding: 20px 25px;
  //       }

  //       .fa-fw {
  //         position: absolute;
  //         left: 37%;
  //         bottom: 39%;
  //       }
  //     }

  //     &.btn-facebook {
  //       background-color: #4C69BA;

  //       .icon {
  //         background-color:#3b5998;
  //       }
  //     }

  //     &.btn-google {
  //       background: #de4c34;

  //       .icon {
  //         background-color: #ce3e26;
  //       }
  //     }

  //     .th-btn-title {
  //         //content: "Ввійти з Facebook";
  //         left: 5%;
  //         position: relative;
  //       }
  //   }
  // }

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
    clear: both;

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
    //padding: 0 30px 20px 30px;
    padding: 0;
    margin-top: 50px;
    text-align: center !important;

    a {
      font-weight: 800;
      color: $color-primary;
      float: none !important;

      &:hover {
        color: #C4C4C4 !important;
      }
    }
  }
}

.Login__radio-group {
  position: inherit;
}

.Login__forget-password {
  cursor: pointer;
  float: right;
  font-size: 13px !important;
  margin-top: -10px;
  margin-bottom: 20px;

  &:hover {
    color: #FFD74D !important;
  }
}

@media screen and (max-width: 1024px) {
  .Login__radio-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .Login__left-login-type-switch__radio-btn {
    margin-top: 0;
    margin-left: 0;
  }

  .th-registration {
    margin-top: 35px;
    display: flex;
    flex-direction: column;

    span {
      margin-bottom: 5px;
    }
  }

  .th-btn-submit-wrapper {
    margin-top: 60px;
  }
}
  
@media screen and (max-width: 700px) {
  .el-card {
    height: auto;
    margin-top: 0;
    border: none;
    box-shadow: none;
  }
}

@media (max-width: 380px) {
  .el-card {
    padding: 30px 20px;
  }
}

@media (max-width: 320px) {
  .el-card {
    .th-registration {
      margin-top: 20px;
    }
  }
}
</style>
