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
      <el-row type="flex" justify="center">
        <el-col>
          <div class="footer-brand">
            <img src="~/assets/images/logo-brandname.png" class="brand-item">
            <el-row>
              <el-col :xs="16" :sm="14" :md="10" :lg="10" :xl="10">
                <p class="description">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris.
                </p>
              </el-col>
              <el-col :xs="16" :sm="14" :md="10" :lg="12" :xl="12">
                <div class="social-items">
                  <img src="~/assets/images/Facebook.png">
                  <img src="~/assets/images/Twitter.png">
                  <img src="~/assets/images/Google.png">
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="5" :sm="4" :md="4" :lg="10" :xl="10">
                <div class="phone-numbers">
                  <a>+380 44 461-88-01</a>
                  <a>+380 44 461-88-04</a>
                  <a>+380 44 461-88-06</a>
                </div>
              </el-col>
              <el-col :xs="5" :sm="4" :md="4" :lg="10" :xl="10">
                <div class="fax-numbers">
                  <a>+380 44 461-88-64</a>
                  <a>+380 44 461-88-66</a>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="5" :sm="4" :md="4" :lg="13" :xl="13">
                <div class="location">
                  <p>01001, м. Київ, пров. Тараса Шевченка, 3</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col>
            <div class="form-wrapper">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="rule-form">
            <el-col :xs="16" :sm="14" :md="10" :lg="18" :xl="18">
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
                <el-input rows="6" class="text-description" type="textarea" v-model="ruleForm.desc" placeholder="Повідомлення*"></el-input>
              </el-form-item>
              <el-form-item class="btn-send">
                <el-button  type="primary" @click="submitForm('ruleForm')" icon="el-icon-message" circle></el-button>
              </el-form-item>
            </el-col>
          </el-form>
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
  padding: 100px 70px;
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
    text-align: center;
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
    padding-left: 45px; //background-size: 4%;
    a {
      color: #606163;
      display: block;
    }
  }
  .location {
    margin-top: 60px;
    p {
      color: #606163; //   &::before {
      //     content: url("~/assets/images/Location.png");
      //     //float: left;
      //     margin-right: 33px;
      //   }
    }
  }
  .text-description {
    height: auto;
  }
  .btn-send {
    display: flex;
    justify-content: center;
  }
}
</style>

<script>
export default {
  //   methods: {
  //     handleSelect(key, keyPath) {
  //       console.log(key, keyPath);
  //     }
  //   },

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
        phoneNumber: [
          {
            required: false,
            type: "number",
            message: "Номер телефону повинен бути числом!"
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
