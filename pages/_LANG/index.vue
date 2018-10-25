<template>
  <div id="top">

    <!-- Banner -->
    <div id="banner">
      <el-row type="flex" justify="center">
        <el-col :xl="16" :lg="16" :md="12" :sm="18" :xs="24" class="banner-text-wrapper">
          <div class="th-header-text">
            <span id="th-first-row">Найефективніша допомога </span>
            <span id="th-second-row">в прийнятті логістичних</span>
            <span id="th-third-row">рішень</span>
          </div>
          <div class="th-btn-cont">
            <a v-scroll-to="{el: '#about-section', offset: -60}"><i class="el-icon-arrow-down"></i></a>
          </div>
        </el-col>
      </el-row>
    </div>


    <!-- About us -->
    <!-- For example -->
    <section id="th-about">
      <el-container direction="vertical">
        <el-row type="flex">
          <el-col :span="24">
            <h1 class="th-title">Про нас</h1>
          </el-col>
        </el-row>

        <el-row :gutter="180" class="th-about-items">

          <el-col :xs="20" :sm="14" :md="10" :lg="9" class="th-about-item">
            <div class="th-about-item-wrapper">
              <div class="group-icon-title">
                <img src="~/assets/images/user.png">
                <p class="item-title" id="first">Ретельна перевірка кожного користувача</p>
              </div>
              <p class="item-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            </div>
          </el-col>

          <el-col :xs="20" :sm="14" :md="10" :lg="9" class="th-about-item">
            <div class="th-about-item-wrapper">
              <div class="group-icon-title">
                <img src="~/assets/images/document.png">
                <p class="item-title" id="second">Швидке оформлення необхідних документів</p>
              </div>
              <p class="item-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            </div>
          </el-col>

          <el-col :xs="20" :sm="14" :md="10" :lg="9" class="th-about-item">
            <div class="th-about-item-wrapper">
              <div class="group-icon-title">
                <img src="~/assets/images/delivery.png">
                <p class="item-title" id="third">Зручне та ефективне планування доставки</p>
              </div>  
              <p class="item-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            </div>
          </el-col>

          <el-col :xs="20" :sm="14" :md="10" :lg="9" class="th-about-item">
            <div class="th-about-item-wrapper">
              <div class="group-icon-title">
                <img src="~/assets/images/help.png">
                <p class="item-title" id="fourth">Своєчасна допомога на кожному етапі</p>
              </div>      
              <p class="item-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            </div>
          </el-col>
        </el-row>
      </el-container>
    </section>


     <!-- About us -->
    <div class="th-about" id="about-section">
      <el-container direction="vertical">
        <!-- Section name-->
        <el-row type="flex" class="about-main-row">
          <el-col :xl="24" :lg="24" :md="12"  :sm="12" :xs="24" class="th-about-name">
            <h1 class="about-text">Про нас</h1>
          </el-col>
        </el-row>

        <!-- First row -->
        <el-row class="about-row-container">
          
          <!-- first column -->
          <el-col :xl="7" :lg="10" :md="12"  :sm="10" :xs="24" class="about-column">
            <div class="item-wrapper">
              <div class="item-header">
                <div class="circle">
                  <img src="~/assets/images/user.png" class="resp-img">
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
          <el-col :xl="7" :lg="10" :md="12"  :sm="10" :xs="24" class="about-column">
            <div class="item-wrapper">
              <div class="item-header">
                <div class="circle">
                  <img src="~/assets/images/document.png" class="resp-img">
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
          <el-col :xl="7" :lg="10" :md="12"  :sm="10" :xs="24" class="about-column">
            <div class="item-wrapper">
              <div class="item-header">
                <div class="circle">
                  <img src="~/assets/images/delivery.png" class="resp-img">
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
          <el-col :xl="7" :lg="10" :md="12" :sm="10" :xs="24" class="about-column">
            <div class="item-wrapper">
              <div class="item-header">
                <div class="circle">
                  <img src="~/assets/images/help.png" class="resp-img">
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
      </el-container>
    </div>
    
    <!-- Counters -->
    <div class="counters" id="counters-section">
      <el-container>
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
      </el-container>
      
    </div>

    <!-- ACTUAL RECEPTIONS MUST BE HERE -->

    <!-- Our app section -->
    <div class="our-app container" id="app-section">

      <el-container direction="vertical">

        <!-- Our app section header-->
        <el-row type="flex" class="app-header-row">
          <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24" class="app-header-container">
            <h1 class="app-header">Наш додаток</h1>
          </el-col>
        </el-row>

        <el-row class="app-description">
          
          <el-col :xl="10" :lg="10" :md="10" :sm="10" :xs="24" class="app-column">
            
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

        </el-row>
      </el-container>
      

    </div>

    <!-- Feedback section -->
    <div class="th-form" id="feedback-form">
      <el-container>

        <el-row class="form-row container">

          <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8" class="form-container">
              
              <!-- Form Contact Us -->
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="rule-form">
                
                <div class="form-name">
                  <span class="contact-form-title">Написати нам</span>
                </div>

                <div>
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
                    <el-input :rows="1" resize="none" type="textarea" v-model="ruleForm.desc" placeholder="Ваше повідомлення*"></el-input>
                  </el-form-item>
                </div>
                

                <div class="th-btn-send-wrapper">
                  <button class="th-btn-send" @click="submitForm('ruleForm')">Надіслати</button>
                </div>

              </el-form>
          </el-col>
        </el-row>

      </el-container>

    </div>
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

$yellow-color: #f0b917;
$dark-grey: #333333;
$white-color: #ffffff;

@mixin font-style($size: false, $color: false, $weight: false, $ls: false, $lh: false) {
    @if $size { font-size: $size; }
    @if $color { color: $color; }
    @if $weight { font-weight: $weight; }
    @if $ls { letter-spacing: $ls }
    @if $lh { line-height: $lh; }
}

#th-about {
  .th-about-items {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    .th-about-item {
      margin-bottom: 60px;

      .th-about-item-wrapper {
        margin: 0 auto;

        .group-icon-title {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 13px;
      } 
    }
  }
}

 img {
    width: 20%;
    height: auto;
  }

 .item-title {
    position: relative;
    font-weight: bold;
    color: #121212;
    font-size: 16px;
    margin-left: 45px;

    &::after {
      position: absolute;
      opacity: 0.2;
      font-size: 65px;
      color: #b0b0b0;
      font-weight: lighter;
      letter-spacing: 1px;
      line-height: 0px;
      top: 45%;
      left: 65%;
      z-index: -1;
    }

    &#first::after {
      content: "01"
    }
    
    &#second::after {
      content: "02"
    }

    &#third::after {
      content: "03"
    }

    &#fourth::after {
      content: "04"
    }
  }

  .item-description {
    color: #4f4e4e;
  }
}

// Banner
#banner {
  width: 100%;
  height: 100vh;
  background: url("~/assets/images/banner_bg.png") no-repeat center;
  background-size: cover;
  
  .banner-text-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100vh;
    .th-header-text {
      display: flex;
      flex-direction: column;
      text-align: center;
      margin-bottom: 2%;
      margin-right: auto;
      margin-left: auto;
      text-transform: uppercase;
      // Text style for first row
      #th-first-row{
        @include font-style(2rem, $yellow-color, 500, -1.4px, 55px);
      }
      // Text style for second and third rows
      #th-second-row, #th-third-row{
        @include font-style(2rem, $white-color, 400, -1.4px, 55px);
      }
    }
    .th-btn-cont {
      margin-bottom: 5%;
      display: flex;
      justify-content: center;
      a {
        text-decoration: none;
        .el-icon-arrow-down {
          color: #ffffff;
          font-size: 50px;
          &:hover {
            color: $yellow-color;
          }      
        }
      }
    }
  }
}

// About section styles
.about-main-row{
  margin-bottom: 0;
  .th-about-name{
    text-align: center;
    margin: 3% auto;
    .about-text{
      @include font-style(24px, $dark-grey, 400, 0.36px);
      text-transform: uppercase;
    }
  }
}
.about-row-container{
  margin-bottom: 3%;
  display: flex;
  justify-content: space-around;
  .about-column{
    display: flex;
    justify-content: center;
    .item-wrapper{
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 350px;
      .item-header{
        display: flex;
        justify-content: left;
        margin-bottom: 1%;
        .circle{
          .resp-img{
            width:100%;
            height: auto;
          }
        }
        .item-description{
          .header-name-container{
            .header-name{
              position: relative;
              @include font-style(14px, #121212, 500, 0.24px);
              margin-left: 10%;
              margin-top: 20%;
              z-index: 1;
              &::after{
                position: absolute;
                opacity: 0.2;
                @include font-style(65px, #b0b0b0, 400, 1px, 28px);
                top: 25%;
                right: -5%;
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
        @include font-style(12px, #4f4e4e, 400, 0.16px, 24px);
        margin-top: 5%;
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
  height: 410px;
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
      color: $white-color;
      position: relative;
      &::after{
        content: "";
        width: 1px;
        height: 126px;
        background-color: $white-color;
        position: absolute;
        left: 100%;
        bottom: 0;
      }
      &:last-child::after{
        display:none;
      }
      .counter-number{
        @include font-style(36px, $white-color, 400, 0.6px, 28px);
      }
      .counter-text{
        @include font-style(18px, $white-color, 300, 0.3px, 48px);
        margin-top: 0;
      }
    }
  }
}

// Our app section
.app-header-row{
  margin-top: 3%;

  .app-header-container{
    text-align: center;
    width:100%;
    .app-header{
      @include font-style(24px, #333333, 400, 0.36px);
      text-transform: uppercase;
    }
  }
}
  
.app-description{
  display: flex;
  justify-content: flex-start;
  margin-left: 5%;
  margin-bottom: 6%;
  &::after{
    display: block;
    content: "";
    background-image: url("~/assets/images/app-img.png");
    background-size: cover;
    top: -10px;
    right: -10px;
    width: 600px;
    height: 400px;
  }

  .app-column{
    display: flex;
    justify-content: center;

    .left-column{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 400px;
      .app-text-container{
        margin: 10% 0;
 
        .app-text{
          align-self: center;
          margin: 6% auto;
          @include font-style(14px, #333333, 400, 0.18px, 30px);
        }
      }
  
      .app-advantages-container{
        margin-top: 10%;

        .advantage{
          position: relative;
          @include font-style(14px, #808080, 400, 0.16px, 30px);
          z-index: 1;
          &::before{
            position: absolute;
            opacity: 0.6;
            @include font-style(36px, #ffe121, 400, 1px, 13.41px);
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

// Form styles must be here
.th-form{
  display: flex;
  align-items: center;
  height: 700px;
  background-image: url("~/assets/images/form-bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .form-row{
    width: 100%;

    .form-container{
      width: 462px;
      height: 550px;
      border-radius: 4px;
      background: rgba(37, 37, 37, 0.72);
      margin-left:150px;
      .rule-form{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        padding: 0 60px;

        .form-name{
          display: flex;
          justify-content: center;

          .contact-form-title{
            @include font-style(24px, $white-color, 500, 0.3px, 28px);
            text-transform: uppercase;
          }
        }

        // for element items
        .el-input /deep/ .el-input__inner {
          margin-bottom: 3%;
          border: 0;
          outline: 0;
          background: transparent;
          border-radius: 0;
          border-bottom: 1px solid #ffe811;
          &::placeholder{
            @include font-style(14px, #767474, 300, 0.16px, 28px);
          }
          &:focus{
              color: $white-color;
          }
        }
        //for textarea
        .el-textarea /deep/ .el-textarea__inner{
          border: 0;
          outline: 0;
          background: transparent;
          border-radius: 0;
          border-bottom: 1px solid #ffe811;
          overflow:hidden;
          &::placeholder{
            @include font-style(14px, #767474, 300, 0.16px, 28px);
          }
          &:focus{
            color: $white-color;
          }
        }
      
        .th-btn-send-wrapper{
          text-align:center;
          .th-btn-send{
            width: 150px;
            height: 50px;
            border-color:#ffe121;
            border-radius: 4px;
            background-color: #ffe121;
            @include font-style(16px, #faf7f2, 400, 0.16px);
            &:hover{
              background: rgba(37, 37, 37, 0.72);
              color: #ffe121;
            }
          }
        }
      }
    }
  }
}

/************************************************************
                  MEDIA QUERIES
*************************************************************/

@media (min-width: 992px) and (max-width: 1119px){
  
  .th-header-text {
    margin-bottom: 15% !important;
  }

  .th-btn-cont {
    margin-bottom: 5%;
  }

}

@media (min-width: 768px) and (max-width: 991px){
  
  .th-header-text {
    margin-bottom: 25% !important;
  }
  .th-btn-cont {
    margin-bottom: 15%;
  }
   
  .app-description{
    &::after{
      display: block;
      content: "";
      background-image: url("~/assets/images/Tablet.png");
      background-size: contain;
      background-repeat: no-repeat;
      width: 600px;
      margin-top: 10%;
      margin-left: 10%;
    }

    .app-column{
      .left-column{
        .app-text-container{
          .app-text{
            @include font-style(12px, #333333, 400, 0.18px, 30px);
          }
        }
    
        .app-advantages-container{
          .advantage{
            @include font-style(12px, #808080, 400, 0.16px, 30px);
            &::before{
              @include font-style(30px, #ffe121, 400, 1px, 13.41px);
            }
          }
        }
      }
    }
  } 
  
}

/************************************************
              FOR PHONES
*************************************************/

@media (max-width: 767px) and (orientation: portrait){
  #banner {
    .banner-text-wrapper{
      .th-header-text {
        #th-first-row{
          @include font-style(1.5rem, $yellow-color, 500, -1.4px, 50px);
        }
        // Text style for second and third rows
        #th-second-row, #th-third-row{
          @include font-style(1.5rem, $white-color, 400, -1.4px, 50px);
        }
      }
    }
  }

  // About section styles
  .about-main-row{
    margin: 5% 0;
  }
  .about-row-container{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .about-column{
      .item-wrapper{
        margin: 5% 5%;
        .item-header{
          .item-description{
            .header-name-container{
              .header-name{
                @include font-style(16px, #121212, 500, 0.24px);
                margin-left: 10%;
                margin-top: 15%;
              }
            }
          }
        }
      }
      .item-text-container{
        .item-text{
          @include font-style(14px, #4f4e4e, 400, 0.16px, 24px);
          margin-top: 5%;
        }
      }
    }
  }

  // Counters section styles
  .counters{
    .counter-row{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .counter-container{
        margin-top: 10%;
        .counter-number{
          @include font-style(36px, $white-color, 400, 0.6px, 28px);
          margin-bottom: 0;
        }
        .counter-text{
          @include font-style(18px, $white-color, 300, 0.3px, 48px);
        }
      }
    }
  }

  // Our app section
    
  .app-header-row{
    margin: 5%;
  }
    
  .app-description{
    margin-bottom: 6%;
    &::after{
      display: none;
    }

    .app-column{
      .left-column{
        margin: 0 2%;
        .app-advantages-container{
          .advantage{
            margin: 3% 10%;
          }
        }
      }
    }
  } 

  // Form styles must be here
  .th-form{
    height: 700px;
    .form-row{
      .form-container{
        width:100%;
        margin-left: 0;
        .rule-form{
          .form-name{
            display: flex;
            justify-content: center;

            .contact-form-title{
              @include font-style(24px, $white-color, 500, 0.3px, 28px);
              text-transform: uppercase;
            }
          }

          // for element items
          .el-input /deep/ .el-input__inner {
            margin-bottom: 3%;
            border: 0;
            outline: 0;
            background: transparent;
            border-radius: 0;
            border-bottom: 1px solid #ffe811;
            &::placeholder{
              @include font-style(14px, #767474, 300, 0.16px, 28px);
            }
            &:focus{
                color: $white-color;
            }
          }
          //for textarea
          .el-textarea /deep/ .el-textarea__inner{
            border: 0;
            outline: 0;
            background: transparent;
            border-radius: 0;
            border-bottom: 1px solid #ffe811;
            overflow:hidden;
            &::placeholder{
              @include font-style(14px, #767474, 300, 0.16px, 28px);
            }
            &:focus{
              color: $white-color;
            }
          }
        
          .th-btn-send-wrapper{
            text-align:center;
            .th-btn-send{
              width: 150px;
              height: 50px;
              border-color:#ffe121;
              border-radius: 4px;
              background-color: #ffe121;
              @include font-style(16px, #faf7f2, 400, 0.16px);
              &:hover{
                // background-color: #faf7f2;
                background: rgba(37, 37, 37, 0.72);
                color: #ffe121;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 767px) and (orientation: landscape){
  
  #banner {
    .banner-text-wrapper{
      .th-header-text {
        margin-bottom: 0;
        margin-right: auto;
        margin-left: auto;
        text-transform: uppercase;
        // Text style for first row
        #th-first-row{
          @include font-style(1.5rem, $yellow-color, 500, -1.4px, 35px);
        }
        // Text style for second and third rows
        #th-second-row, #th-third-row{
          @include font-style(1.5rem, $white-color, 400, -1.4px, 35px);
        }
      }
      .th-btn-cont {
        margin-bottom: 2%;
        display: flex;
        justify-content: center;
        a {
          text-decoration: none;
          .el-icon-arrow-down {
            font-size: 35px;
          }
        }
      }
    }
  }

  // About section styles
  .about-main-row{
    margin: 5% 0;
  }
  .about-row-container{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .about-column{
      .item-wrapper{
        margin: 5% 5%;
        .item-header{
          .item-description{
            .header-name-container{
              .header-name{
                @include font-style(16px, #121212, 500, 0.24px);
                margin-left: 10%;
                margin-top: 15%;
              }
            }
          }
        }
      }
      .item-text-container{
        .item-text{
          @include font-style(14px, #4f4e4e, 400, 0.16px, 24px);
          margin-top: 5%;
        }
      }
    }
  }

  // Counters section styles
  .counters{
    .counter-row{
      width: 100%;
      display: flex;
      .counter-container{
        margin-top: 10%;
        .counter-number{
          @include font-style(30px, $white-color, 400, 0.6px, 28px);
          margin-bottom: 0;
        }
        .counter-text{
          @include font-style(16px, $white-color, 300, 0.3px, 48px);
        }
      }
    }
  }

  // Our app section
.app-header-row{
  margin-top: 3%;

  .app-header-container{
    text-align: center;
    width:100%;
    .app-header{
      @include font-style(24px, #333333, 400, 0.36px);
      text-transform: uppercase;
    }
  }
}
  
.app-description{
  display: flex;
  justify-content: flex-start;
  margin-left: 5%;
  margin-bottom: 6%;
  &::after{
    display: block;
    content: "";
    background-image: url("~/assets/images/Tablet.png");
    background-size: cover;
    background-repeat: no-repeat;
    margin-left: -150px;
    width: 600px;
    height: 400px;
    z-index: -1;
  }

  .app-column{
    display: flex;
    justify-content: center;

    .left-column{
      display: flex;
      flex-direction: column;
      align-items: center;
      .app-text-container{
        margin: 10% 0;
 
        .app-text{
          align-self: center;
          margin: 6% auto;
          @include font-style(14px, #333333, 400, 0.18px, 30px);
        }
      }
  
      .app-advantages-container{
        margin-top: 10%;

        .advantage{
          position: relative;
          @include font-style(14px, #808080, 400, 0.16px, 30px);
          z-index: 1;
          &::before{
            position: absolute;
            opacity: 0.6;
            @include font-style(36px, #ffe121, 400, 1px, 13.41px);
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

// Added by Yuliia
 @media only screen and (min-width: 720px) and (max-width: 991px) {
  #th-about {
    img{
      width: 15%;
    }
  }
}

 @media only screen and (max-width: 554px) {
  #th-about {
    img{
      width: 27%;
    }

    .title {
      margin-left: 25px;

      &::after {
        font-size: 50px;
      }
    }
  }
 }

  // Form styles must be here
  .th-form{
    height: 700px;
    .form-row{
      .form-container{
        width:70%;
        margin-left: 15%;
      }
    }
  }  
}
</style>