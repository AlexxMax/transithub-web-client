<template>
  <div>

    <!-- Header -->
    <el-header class="th-header" type="flex" v-on:scroll="changeNavColor">
      <el-row type="flex" :gutter="24" class="stick-navbar">
        <el-col :xl="4" :lg="4" :md="4" :sm="4" :xs="4" class="th-logo-col">
          <h1 class="th-logo">Transithub</h1>
        </el-col>
        <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="12" class="navbar">
          <nuxt-link to="#" class="nav-item">Головна</nuxt-link>
          <nuxt-link to="#" class="nav-item" v-scroll-to="'#about-section'">Про нас</nuxt-link>
          <nuxt-link to="#" class="nav-item" v-scroll-to="'#counters-section'">Замовлення</nuxt-link>
          <nuxt-link to="#" class="nav-item">Додаток</nuxt-link>
          <nuxt-link to="#" class="nav-item">Контакти</nuxt-link>
        </el-col>
        <el-col :xl="8" :lg="8" :md="4" :sm="4" :xs="4" class="right-navbar">
          <nuxt-link to="#" class="right-navbar-item">Авторизація <i class="el-icon-arrow-down"></i></nuxt-link>
          <nuxt-link to="#" class="right-navbar-item">Українська <i class="el-icon-arrow-down"></i></nuxt-link>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <nuxt></nuxt>
    </el-main>

  <!-- FOOTER NEED BE IN pages/index.vue -->

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
                <el-input v-model.number="ruleForm.phoneNumber" placeholder="Телефон"></el-input>
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
          <div class="th-info-wrapper">

            <h1>Transithub</h1>

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
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700');

.th-header {
  display: flex;
  width: 100%;
  height: 100px !important;
  position: fixed;
  top: 0;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 999;
  .stick-navbar{
    width: 100%;
    margin: 0 auto !important; 
    .th-logo-col{
      justify-content: center;
      align-items: center;
      align-self: center;
      .th-logo{
        color: #f0b917;
        font-family: "Montserrat - Semi Bold";
        font-size: 2.25rem;
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 0.36px;
        align-self: center;
      }
    }
    .navbar{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .nav-item{
        color: #333333;
        font-family: Montserrat;
        font-size: 1rem;
        font-weight: 400;
        letter-spacing: 0.16px;
        margin: 0 1%;
        &:hover{
          color: #606163;
        }
      }
    }
    .right-navbar{
      display: flex;
      justify-content: flex-end;
      align-self: center;
      .right-navbar-item{
        color: #333333;
        font-family: Montserrat;
        font-size: 1rem;
        font-weight: 400;
        letter-spacing: 0.16px;
        margin: 0 5%;
        &:hover{
          color: #606163;
        }
      }
    }
  } 
}

@media (min-width: 1200px) and (max-width: 1919px) {
  .th-header {
    height: 60px !important;
    .stick-navbar{
      .th-logo-col{
        .th-logo{
          font-size: 30px;
        }
      }
      .navbar{
        .nav-item{
          font-size: 14px;
          margin: 0 2%;
        }
      }
      .right-navbar{
        .right-navbar-item{
          font-size: 14px;
        }
      }
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

  .th-info-wrapper {
    h1 {
      color: #606163;
      font-size: 30px;
      letter-spacing: 1px;
      text-transform: uppercase;
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
    var checkPhoneNr = (rule, value, callback) => {
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
            message: "Будь ласка, введіть прізвище та ім'я",
            trigger: "blur"
          }
        ],

        email: [
          {
            required: true,
            message: "Будь ласка, введіть електронну пошту",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Будь ласка, введіть правильну адресу електронної пошти",
            trigger: "blur"
          }
        ],

        phoneNumber: [
          {
            validator: checkPhoneNr,
            trigger: "blur"
          }
        ],

        desc: [
          {
            required: true,
            message: "Будь ласка, напишіть повідомлення",
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
    },
    
    changeNavColor(){
      var menu = $(".el-header");
      $(window).scroll(function() {
        var top = $(this).scrollTop();
        if ( top >= 100 ) {
          menu.css(background='green');
        }
      });
    }
  }
};
</script>