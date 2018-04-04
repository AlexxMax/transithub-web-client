<template>
  <div>

    <el-header class="th-header">
      <el-row type="flex" justify="center">
        <el-col>
          <div class="th-navbar">
            <img src="~/assets/images/Logo.png" class="logo-item">
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <nuxt></nuxt>
    </el-main>

    <el-footer style="height: auto" class="th-footer">
      <el-row :gutter="80">
        <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
          <div class="contact-form-wrapper">

            <!-- Form Contact Us -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="rule-form">

              <el-form-item>
                <span class="contact-form-title">
                  Написати нам
                </span>
              </el-form-item>

              <el-form-item prop="name">
                <el-input v-model="ruleForm.name" placeholder="Прізвище та ім'я*"></el-input>
              </el-form-item>

              <el-form-item prop="email">
                <el-input v-model="ruleForm.email" placeholder="Електронна пошта*"></el-input>
              </el-form-item>

              <el-form-item prop="phoneNumber">
                <el-input type="age" v-model.number="ruleForm.age" placeholder="Телефон"></el-input>
              </el-form-item>

              <el-form-item prop="topic">
                <el-input v-model="ruleForm.topic" placeholder="Тема повідомлення"></el-input>
              </el-form-item>

              <el-form-item prop="desc">
                <el-input :rows="6" class="text-description" type="textarea" v-model="ruleForm.desc" placeholder="Повідомлення*"></el-input>
              </el-form-item>
             
              <div class="th-btn-send-wrapper">
                <button class="th-btn-send" @click="submitForm('ruleForm')">Надіслати</button>
              </div>

            </el-form>

          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="14" :xl="14">
          <div>

            <img src="~/assets/images/logo-brandname.png" class="brand-item">

            <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris. </p>

            <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="12">
              <div class="social-items">
                <img src="~/assets/images/socials/Facebook.png">
                <img src="~/assets/images/socials/Twitter.png">
                <img src="~/assets/images/socials/Google.png">
              </div>

            </el-col>
          </div>
        </el-col>
      </el-row>
      
    </el-footer>
  </div>
</template>

<style lang="scss" scoped>
.th-header {
  height: 110px !important;
  margin-bottom: -110px; // for el-main
  padding: 0 !important;

  .th-navbar {
    text-align: center;

    .logo-item {
      width: 220px;
      height: 110px;
    }
  }
}

.el-main {
  padding: 0 !important;
}

.th-footer {
  padding: 60px 130px 30px 130px;
  overflow: hidden !important;
  background-color: #f8f9fa;

  .brand-item {
    width: 110px;
    height: 20px;
  }

  .description {
    margin-top: 20px;
    font-size: 13px;
    color: #606163;
    line-height: 1.75;
  }

  .social-items {
    margin-top: 40px;

    img {
      margin-right: 10px;
    }
  }

  .contact-section {
    margin-top: 60px;
    color: #464949;
    font-weight: 600;
  }

  .yellow {
    width: 160px;
    border-color: #f0b917;
    margin-right: 80px;
  }

  .phone-numbers {
    background: url("~/assets/images/Phone.png") no-repeat 0 12px;
  }

  .fax-numbers {
    background: url("~/assets/images/Fax.png") no-repeat 0 8px;
  }

  .location {
    background: url("~/assets/images/Location.png") no-repeat 0 0px;
  }

  .phone-numbers,
  .fax-numbers,
  .location {
    margin-top: 70px;
    padding-left: 45px;
    a {
      color: #606163;
      display: block;
    }
  }

  .location {
    margin-top: 60px;

    p {
      color: #606163;
    }
  }

  .text-description {
    height: auto;
  }

  .th-btn-send-wrapper {
    width: 100%;

    .th-btn-send {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      background-color: #f0b917;
      color: white;
      font-size: 14px;
      border-width: 0;
    }
  }

  .contact-form-title {
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
    font-size: 25px;
    font-weight: 500;
    color: #f0b917;
  }

  .el-form-item__content {
    width: 100% !important;

    .el-button {
      width: 100% !important;
    }
  }

  .el-input,
  .el-textarea {
    border: 1px solid #f0b917;
    border-radius: 4px;
  }
}

@media (max-width: 1200px) {
  .th-footer {
    padding: 60px 30px 30px 30px;
  }
}
</style>

<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },

  data() {
    return {
      ruleForm: {
        name: "",
        email: "",
        phoneNumber: "",
        desc: ""
      },

      rules: {
        name: [
          {
            required: true,
            message: "Будь ласка, введіть прізвище та ім'я!",
            trigger: "blur"
          }
        ],

        email: [
          {
            required: true,
            message: "Будь ласка, введіть електронну адресу!",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Будь ласка, введіть правильну адресу електронної пошти!",
            trigger: "blur,change"
          }
        ],

        desc: [
          {
            required: true,
            message: "Будь ласка, напишіть повідомлення!",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    }
  }
};
</script>
