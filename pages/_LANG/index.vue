<template>
  <div>

    <!-- Banner -->
    <div id="banner">
      <el-row type="flex" justify="center">
        <el-col :xs="16" :sm="14" :md="10" :lg="12" :xl="12">
          <div class="th-header-text">
            <span id="th-first-row">Найефективніша допомога </span>
            <span id="th-second-row">в прийнятті логістичних</span>
            <span id="th-third-row">рішень</span>
          </div>
          <el-row class="th-btn-cont">
            <a v-scroll-to="'#about-section'"><img src="~/assets/images/icon-arow-down.png" class="el-icon-arrow-down"></a>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <!-- About us -->
    <div class="th-about container" id="about-section">
      <!-- Section name-->
      <el-row type="flex" class="about-main-row">
        <el-col :xl="24" :lg="24" :md="20"  :sm="14" :xs="16" class="th-about-name">
          <h1 class="about-text">Про нас</h1>
        </el-col>
      </el-row>

      <!-- First row -->
      <el-row class="about-row-container">
        <!-- first column -->
        <el-col :xl="12" :lg="12" :md="10"  :sm="7" :xs="8" class="about-column">
          <div class="item-wrapper">
            <div class="item-header">
              <div class="circle">
                <img src="~/assets/images/user.png">
              </div>
              <div class="item-description">
                <div class="header-name-container">
                  <p class="header-name" id="number-1">Ретельна перевірка кожного користувача</p>
                </div>
              </div>
            </div>
            <div class="item-text-container">
              <p class="item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            </div>
          </div>
        </el-col>
        
        <!-- second column -->
        <el-col :xl="12" :lg="12" :md="10" :sm="7" :xs="8" class="about-column">
          <div class="item-wrapper">
            <div class="item-header">
              <div class="circle">
                <img src="~/assets/images/document.png">
              </div>
              <div class="item-description">
                <div class="header-name-container">
                  <p class="header-name" id="number-2">Швидке оформлення необідних документів</p>
                </div>
              </div>
            </div>
            <div class="item-text-container">
              <p class="item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- Second row -->
      <el-row class="about-row-container">
        <!-- third column -->
        <el-col :xl="12" :lg="12" :md="10" :sm="7" :xs="8" class="about-column">
          <div class="item-wrapper">
            <div class="item-header">
              <div class="circle">
                <img src="~/assets/images/delivery.png">
              </div>
              <div class="item-description">
                <div class="header-name-container">
                  <p class="header-name" id="number-3">Зручне та ефективне планування доставки</p>
                </div>
              </div>
            </div>
            <div class="item-text-container">
              <p class="item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            </div>
          </div>
        </el-col>
        
        <!-- fourth column -->
        <el-col :xl="12" :lg="12" :md="10" :sm="7" :xs="8" class="about-column">
          <div class="item-wrapper">
            <div class="item-header">
              <div class="circle">
                <img src="~/assets/images/help.png">
              </div>
              <div class="item-description">
                <div class="header-name-container">
                  <p class="header-name" id="number-4">Своєчасна допомога на кожному етапі</p>
                </div>
              </div>
            </div>
            <div class="item-text-container">
              <p class="item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    
    <!-- Counters -->
    <div class="counters" id="counters-section">
      <el-row type="flex" justify="space-around" class="counter-row container">
        <el-col class="counter-container">
          <h1 class="counter-number">+123</h1>
          <p class="counter-text">Задоволених клієнтів</p>
        </el-col>
        <el-col class="counter-container">
          <h1 class="counter-number">+4567</h1>
          <p class="counter-text">Перевезених товарів</p>
        </el-col>
        <el-col class="counter-container">
          <h1 class="counter-number">+5</h1>
          <p class="counter-text">Років досвіду</p>
        </el-col>
      </el-row>
    </div>

    <!-- ACTUAL RECEPTIONS MUST BE HERE -->

    <!-- Our app section -->
    <div class="our-app" id="app-section">

      <!-- Our app section header-->
      <el-row type="flex" class="app-header-row">
        <el-col :xl="24" :lg="24" :md="20" :sm="14" :xs="16" class="app-header-container">
          <h1 class="app-header">Наш додаток</h1>
        </el-col>
      </el-row>

      <el-row class="app-description container">
        
        <el-col :xl="10" :lg="10" :md="10" :sm="10" :xs="10" class="app-column">
          <div class="left-column">
            <div class="app-text-container">
              <p class="app-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div class="app-advantages-container">
              <p class="advantage" id="advantage-1">Lorem ipsum dolor sit amet, consectetur adipisicing</p>
              <p class="advantage" id="advantage-2">Lorem ipsum dolor sit amet, consectetur adipisicing</p>
              <p class="advantage" id="advantage-3">Lorem ipsum dolor sit amet, consectetur adipisicing</p>
              <p class="advantage" id="advantage-4">Lorem ipsum dolor sit amet, consectetur adipisicing</p>
            </div>
          </div>
        </el-col>

        <el-col :xl="14" :lg="14" :md="14" :sm="14" :xs="14" class="app-column">
          <div class="app-img-container">
            <img src="~/assets/images/app-img.png">
          </div>
        </el-col>

      </el-row>

    </div>

    <!-- Feedback section -->
    <!-- <div class="th-form"> 
      <el-row class="form-row" :gutter="80">
        <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10" class="form-container"> -->
            <!-- Form Contact Us -->
            <!-- <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="rule-form">
              <el-form-item >
                <span class="contact-form-title">
                  Написати нам
                </span>
              </el-form-item>

              <el-form-item prop="name">
                <el-input v-model="ruleForm.name" placeholder="Ваше ім'я та прізвище*" ></el-input>
              </el-form-item>

              <el-form-item prop="email">
                <el-input v-model="ruleForm.email" placeholder="Електронна пошта*" ></el-input>
              </el-form-item>

              <el-form-item prop="phoneNumber">
                <el-input v-model.number="ruleForm.phoneNumber" placeholder="Телефон*" ></el-input>
              </el-form-item>

              <el-form-item prop="topic">
                <el-input v-model="ruleForm.topic" placeholder="Тема повідомлення" ></el-input>
              </el-form-item>

              <el-form-item prop="desc">
                <el-input :rows="1" resize="none" class="text-description form-item" type="textarea" v-model="ruleForm.desc" placeholder="Ваше повідомлення*"></el-input>
              </el-form-item>

              <div class="th-btn-send-wrapper">
                <button class="th-btn-send" @click="submitForm('ruleForm')">Надіслати</button>
              </div>

            </el-form> -->
        <!-- </el-col>
      </el-row>
    </div> -->
  </div>
  
</template>

<script>
export default {
  layout: "public",
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
      centerDialogVisible: false,
      currentItem: {},
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
    toogleCardDialog: function(item) {
      this.centerDialogVisible = !this.centerDialogVisible;
      this.currentItem = item || {};
    },
    getMap: function(item) {
      return `https://www.google.com/maps/embed/v1/directions?origin=${
        item.point_from_code
      }&destination=${
        item.point_to_code
      }&key=AIzaSyC-NMwliNHhxomPQJaQeu24GPQablR-rDk&language=uk`;
    },
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
  },
};
</script>

<style lang="scss" scoped>

.container{
  max-width: 1760px;
  margin-left: auto;
  margin-right: auto;
}

// Banner
#banner {
  width: 100%;
  height: 100vh;
  background: url("~/assets/images/banner_bg.png") no-repeat center;
  background-size: cover;
  .th-header-text {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 60%;
    margin-right: auto;
    margin-bottom: 10%;
    margin-left: auto;
    color: #ffffff;
    font-size: 5vh;
    font-weight: 400;
    text-transform: uppercase;
    // Text style for first row
    #th-first-row{
      color: #f0b917;
      font-weight: 500;
      letter-spacing: -1.4px;
      line-height: 72px;
    }
    // Text style for second and third rows
    #th-second-row, #th-third-row{
      font-weight: 400;
      letter-spacing: -1.4px;
      line-height: 72px;
    }
  }
  .th-btn-cont {
    display: flex;
    justify-content: center;
    a {
      text-decoration: none;
      .el-icon-arrow-down {
        color: #ffffff;
        width: 40px;
        height: 22px;
        opacity: 0.87;
        border: 5px !important;
        padding: 12px 25px !important;
        &.btn-more {
          transition: all 0.5s;
          &:hover {
            background-color: #fbf0f0;
            color: #f0b917;
          }
        }
      }
    }
  }
}
@media (min-width: 1200px) and (max-width: 1919px){
  .th-main{
    .th-header-text{
      margin-top: 60%;
      #th-first-row, #th-second-row, #th-third-row{
        line-height: 45px;
      }
    }
  }
}

// About section styles
.th-about{
  .about-main-row{
    margin-bottom: 0;
    .th-about-name{
      text-align: center;
      margin: 6% auto;
      .about-text{
        color: #333333;
        font-size: 28px;
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 0.36px;
      }
    }
  }
  .about-row-container{
    margin-bottom: 5%;
    .about-column{
      display: flex;
      justify-content: center;
      .item-wrapper{
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 380px;
        .item-header{
          display: flex;
          justify-content: left;
          height: 122px;
          margin-bottom: 2%;
          .item-description{
            .header-name-container{
              .header-name{
                position: relative;
                color: #121212;
                font-size: 20px;
                font-weight: 500;
                letter-spacing: 0.24px;
                margin-left: 10%;
                margin-top: 20%;
                z-index: 1;
                &::after{
                  position: absolute;
                  opacity: 0.2;
                  color: #b0b0b0;
                  font-size: 80px;
                  font-weight: 400;
                  line-height: 28px;
                  letter-spacing: 1px;
                  top: 22%;
                  right: -15%;
                  z-index: -1;
                }
                &#number-1::after{
                  content: "01"
                }
                &#number-2::after{
                  content: "02"
                }
                &#number-3::after{
                  content: "03"
                }
                &#number-4::after{
                  content: "04"
                }
              }
            }
          }
        }
      }
      .item-text-container{
        .item-text{
          color: #4f4e4e;
          font-size: 14px;
          font-weight: 400;
          line-height: 28px;
          letter-spacing: 0.16px;
          margin-top: 5%;
        }
      }
    }
  }
}

// Counters section styles
.counters{
  display:flex;
  align-items: center;
  align-self: center;
  width: 100%;
  height: 510px;
  background-image: url("~/assets/images/counters_bg.png");
  background-position: center;
  background-size: cover;
  .counter-row{
    width: 100%;
    .counter-container{
      display: flex;
      justify-content: center;
      align-content: space-between;
      align-items: center;
      flex-direction: column;
      color: #ffffff;
      position: relative;
      &::after{
        content: "";
        width: 1px;
        height: 126px;
        background-color: #ffffff;
        position: absolute;
        left: 100%;
        bottom: 0;
      }
      &:last-child::after{
        display:none;
      }
      .counter-number{
        color: #ffffff;
        font-size: 48px;
        font-weight: 400;
        letter-spacing: 0.6px;
        line-height: 28px;
        margin-bottom: 5%;
      }
      .counter-text{
        font-size: 24px;
        font-weight: 300;
        letter-spacing: 0.3px;
        line-height: 48px;
        margin-top: 0;
      }
    }
  }
}

// Our app section
.our-app{
  height: auto;
  background-color: #ffffff;
  
  .app-header-row{
    margin: 5% 0;
  
    .app-header-container{
      text-align: center;
  
      .app-header{
        color: #333333;
        font-size: 30px;
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 0.36px;
      }
    }
  }
  
  .app-description{
  
    .app-column{
      display: flex;
      justify-content: center;
      margin-bottom: 6%;
  
      .left-column{
        display: flex;
        flex-direction: column;
        align-items: center;
  
        .app-text-container{
          margin: 10% 0;
  
          .app-text{
            align-self: center;
            margin: 6% auto;
            width: 633px;
            height: 108px;
            color: #333333;
            font-size: 16px;
            font-weight: 400;
            line-height: 30px;
            letter-spacing: 0.18px;
          }
        }
  
        .app-advantages-container{
          margin-top: 10%;
  
          .advantage{
            position: relative;
            color: #808080;
            font-size: 14px;
            font-weight: 400;
            line-height: 30px;
            letter-spacing: 0.16px;
            z-index: 1;
            &::before{
              position: absolute;
              width: 44px;
              height: 34px;
              opacity: 0.6;
              color: #ffe121;
              font-size: 48px;
              font-weight: 400;
              line-height: 13.41px;
              letter-spacing: 1px;
              top: 5%;
              left: -10%;
              z-index: -1;
            }
            &#advantage-1::before{
              content: "01"
            }
            &#advantage-2::before{
              content: "02"
            }
            &#advantage-3::before{
              content: "03"
            }
            &#advantage-4::before{
              content: "04"
            }
          }
        }
      }
    }
  } 
}

// Form styles must be here

</style>