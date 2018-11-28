<template>
  <div>
    <el-row type="flex" justify="center">

      <!-- Card -->
      <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="10">

        <el-card class="box-card">

          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" size="mini">
            <span class="th-form-title">
              {{ $t('forms.user.registration.title') }}
            </span>

            <el-form-item prop="firstname"
              :label="$t('forms.user.common.firstname')">
              <!-- <label>Ім'я *</label> -->
              <el-input v-model="ruleForm.firstname"
                :placeholder="$t('forms.user.validation.firstname')"
                clearable></el-input>
            </el-form-item>

            <el-form-item prop="lastname"
              :label="$t('forms.user.common.lastname')">
              <!-- <label>Прізвище *</label> -->
              <el-input v-model="ruleForm.lastname"
                :placeholder="$t('forms.user.validation.lastname')"
                clearable></el-input>
            </el-form-item>

            <el-form-item prop="email"
              :label="$t('forms.common.email')">
              <!-- <label>Електронна пошта *</label> -->
              <el-input
                type='email'
                v-model="ruleForm.email"
                :placeholder="$t('forms.user.validation.email')"
                clearable
                name="email"
                id="email"/>
            </el-form-item>

            <el-form-item prop="phone"
              :label="$t('forms.common.phone')">
              <!-- <label>Номер телефону *</label> -->
              <el-input
                type='tel'
                v-mask="phoneMask"
                v-model="ruleForm.phone"
                :placeholder="$t('forms.user.validation.phone')"
                clearable
                name="tel"
                id="tel"
                @keydown.delete.native="handlePhoneDelete"/>
            </el-form-item>

            <el-form-item prop="password"
              :label="$t('forms.user.common.password')">
              <!-- <label>Пароль *</label> -->
              <el-input type="password" v-model="ruleForm.password" auto-complete="off"
                :placeholder="$t('forms.user.validation.password')"
                clearable></el-input>
            </el-form-item>

            <el-form-item prop="confirmPass"
              :label="$t('forms.user.common.passwordCheck')">
              <!-- <label>Підтвердження пароля *</label> -->
              <el-input type="password" v-model="ruleForm.confirmPass" auto-complete="off"
                :placeholder="$t('forms.user.validation.passwordCheck')"
                clearable></el-input>
            </el-form-item>

            <el-form-item>
              <div class="th-note">
                <span>{{ $t('forms.user.registration.requiredFields') }}</span>
              </div>
            </el-form-item>

            <div class="th-btn-submit-wrapper">
              <Button
                type="primary"
                class="th-btn-submit"
                @click="submitForm('ruleForm')">
                {{ $t('forms.user.registration.register') }}
              </Button>
            </div>

            <div class="th-back">
              <nuxt-link to="/login">
                <i class="el-icon-arrow-left"></i>
                {{ $t('forms.user.registration.backToLogin') }}
              </nuxt-link>
            </div>

          </el-form>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Button from "@/components/Common/Buttons/Button"
import { VALIDATION_TRIGGER, PHONE_MASK } from '@/utils/constants'

export default {
  components: {
    Button
  },

  data() {
    const validation = {
      firstname: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.user.validation.firstname')))
        }
        cb()
      },

      lastname: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.user.validation.lastname')))
        }
        cb()
      },

      email: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.user.validation.email')))
        }
        cb()
      },

       phone: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.user.validation.phone')))
        }
        cb()
      },

      phoneValid: (rule, value, cb) => {
        if (!value.pValidPhone()) {
          cb(new Error(this.$t('forms.user.validation.incorrectPhone')))
        }
      },

      password: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.user.validation.password')))
        }
        cb()
      },

      confirmPass: (rule, value, cb) => {
        if (value === "") {
          cb(new Error(this.$t('forms.user.validation.passwordCheck')))
        } else if (value !== this.ruleForm.password) {
          cb(new Error(this.$t('forms.user.validation.passwordCheckDiff')));
        } else {
          cb();
        }
      }
    }

    // var checkLastname = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("Будь ласка, введіть прізвище"));
    //   } else {
    //     callback();
    //   }
    // };

    // var checkName = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("Будь ласка, введіть ім'я"));
    //   } else {
    //     callback();
    //   }
    // };

    // var checkEmail = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("Будь ласка, введіть електронну пошту"));
    //   } else {
    //     callback();
    //   }
    // };

    // var checkPhone = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("Будь ласка, введіть номер телефону"));
    //   } else {
    //     callback();
    //   }
    // };

    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("Будь ласка, введіть пароль"));
    //   } else {
    //     callback();
    //   }
    // };

    // var confirmPass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("Будь ласка, підтвердьте пароль"));
    //   } else if (value !== this.ruleForm.password) {
    //     callback(new Error("Введені паролі не співпадають"));
    //   } else {
    //     callback();
    //   }
    // };

    return {
      ruleForm: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "+38",
        password: "",
        confirmPass: ""
      },

      phoneMask: PHONE_MASK,

      rules: {
        firstname: [{
          required: true,
          validator: validation.firstname,
          trigger: VALIDATION_TRIGGER,
          max: 100
        }],

        lastname: [{
          required: true,
          validator: validation.lastname,
          trigger: VALIDATION_TRIGGER,
          max: 100
        }],

        email: [{
          required: true,
          validator: validation.email,
          trigger: VALIDATION_TRIGGER,
          max: 500,
        }, {
          type: 'email',
          message: this.$t('forms.user.validation.incorrectEmail'),
          trigger: ['blur', 'change']
        }],

        phone: [{
          required: true,
          validator: validation.phone,
          trigger: VALIDATION_TRIGGER,
          max: 13
        }, {
          type: 'string',
          validator: validation.phoneValid,
          trigger: ['blur', 'change']
        }],

        password: [{
          required: true,
          validator: validation.password,
          trigger: VALIDATION_TRIGGER,
          max: 500
        }],

        confirmPass: [{
          required: true,
          validator: validation.confirmPass,
          trigger: VALIDATION_TRIGGER,
          max: 500
        }]

        // lastname: [
        //   {
        //     validator: checkLastname,
        //     trigger: "blur"
        //   }
        // ],

        // firstname: [
        //   {
        //     validator: checkName,
        //     trigger: "blur"
        //   }
        // ],

        // email: [
        //   {
        //     validator: checkEmail,
        //     trigger: "blur"
        //   },

        //   {
        //     type: "email",
        //     message: "Будь ласка, введіть правильну адресу електронної пошти",
        //     trigger: "blur"
        //   }
        // ],

        // phone: [
        //   {
        //     validator: checkPhone,
        //     trigger: "blur"
        //   },

        //   // {
        //   //   type: "number",
        //   //   message: "Будь ласка, введіть правильний номер телефону",
        //   //   trigger: "blur"
        //   // }
        // ],

        // password: [
        //   {
        //     validator: validatePass,
        //     trigger: "blur"
        //   }
        // ],

        // checkPass: [
        //   {
        //     validator: confirmPass,
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },

  methods: {
     submitForm: function() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$nextTick(async () => {
            this.$nuxt.$loading.start()

           const userRegistered = await this.$store.dispatch(
              "user/userRegister",
              this.ruleForm
            )

            if (userRegistered) {
              //this.$emit("registration-next-step");
              this.$router.push("/registration/email-check");
            }

            this.$nuxt.$loading.finish()
          })
        }
      })
    },
    handlePhoneDelete(e) {
      if (this.ruleForm.phone.length < 4) {
        e.preventDefault()
      }
    }


    // submitForm(ruleForm) {
    //   this.$nextTick(async () => {
    //     this.$refs[ruleForm].validate(async valid => {
    //       if (valid) {
    //         this.$nuxt.$loading.start()

    //         const userRegistered = await this.$store.dispatch(
    //           "user/userRegister",
    //           this.ruleForm
    //         );
    //         if (userRegistered) {
    //           //this.$emit("registration-next-step");
    //           this.$router.push("/registration/email-check");
    //         }

    //         this.$nuxt.$loading.finish()
    //       } else {
    //         return false;
    //       }
    //     })
    //   })
    // }
    //changeStep(step) {}
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
