<template>
  <div>

    <!-- Banner -->
    <div class="th-main">
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
    <div class="th-about" id="about-section">
      <!-- Section name-->
      <el-row type="flex" class="about-main-row">
        <el-col :xl="24" :lg="24" class="th-about-name">
          <h1 class="about-text">Про нас</h1>
        </el-col>
      </el-row>

      <!-- First row -->
      <el-row class="about-row-container">
        <!-- first column -->
        <el-col :xl="12" :lg="12" class="about-column">
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
        <el-col :xl="12" :lg="12" class="about-column">
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
        <el-col :xl="12" :lg="12" class="about-column">
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
        <el-col :xl="12" :lg="12" class="about-column">
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
      <el-row type="flex" justify="space-around" class="counter-row">
        <div class="counter-container">
          <h1 class="counter-number">+123</h1>
          <p class="counter-text">Задоволених клієнтів</p>
        </div>
        <div class="counter-container">
          <h1 class="counter-number">+4567</h1>
          <p class="counter-text">Перевезених товарів</p>
        </div>
        <div class="counter-container">
          <h1 class="counter-number">+5</h1>
          <p class="counter-text">Років досвіду</p>
        </div>
      </el-row>
    </div>

    <!-- ACTUAL RECEPTIONS MUST BE HERE -->

    <!-- Our app section -->
    <div class="our-app" id="app-section">
      <!-- Our app section header-->
      <el-row type="flex" class="app-header-row">
        <el-col :xl="24" :lg="24" class="app-header-container">
          <h1 class="app-header">Наш додаток</h1>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="app-content-row">
        <el-col :xl="10" :lg="10" class="app-column">
          <div class="left-column">
            <div class="app-text-container">
              <p class="app-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              </p>
            </div>
            <div class="app-advantages-container">
              <p class="advantage" id="advantage-1">Lorem ipsum dolor sit amet, consectetur adipisicing</p>
              <p class="advantage" id="advantage-2">Lorem ipsum dolor sit amet, consectetur adipisicing</p>
              <p class="advantage" id="advantage-3">Lorem ipsum dolor sit amet, consectetur adipisicing</p>
              <p class="advantage" id="advantage-4">Lorem ipsum dolor sit amet, consectetur adipisicing</p>
            </div>
          </div>
        </el-col>
        <el-col :xl="14" :lg="14" class="app-column">
          <div class="app-img-container">
            <img src="~/assets/images/app-img.png" alt="">
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="th-orders" id="orders">
      <!-- Card -->
      <el-row v-for="(item, index) in orders" v-bind:key="index" :gutter="20" type="flex" justify="center" style="margin-top: 60px">
        <el-col :xs="22" :sm="22" :md="20" :lg="16" :xl="16">

          <div @click="toogleCardDialog(item)" class="th-card-wrapper">

            <el-card :body-style="{ padding: '0px'}" class="th-card">
              <div class="order-hover">
                <div class="order-hover-content">
                  <i class="el-icon-plus"></i>
                </div>
              </div>

              <iframe width="100%" height="450" frameborder="0" style="border:0" :src="getMap(item)" allowfullscreen></iframe>

              <el-row>
                <div class="bottom clearfix">

                  <el-col :lg="8" :xl="8">
                    <p class="point">Пункт завантаження:
                      <br>
                      <span>{{ item.point_from_name || '' }} </span>
                    </p>
                  </el-col>

                  <el-col :lg="1" :xl="1">
                    <img src="~assets/images/Route.png" alt="">
                  </el-col>

                  <el-col :lg="8" :xl="8">
                    <p class="point">Пункт розвантаження:
                      <br>
                      <span>{{ item.point_to_name || '' }}</span>
                    </p>
                  </el-col>

                  <el-col :lg="7" :xl="8">
                    <img src="~assets/images/Box.png" alt="">
                    <p class="point-m-0  cdeg5yj">Вантаж:
                      <br>
                      <span>{{ item.goods_name || '' }}</span>
                    </p>
                  </el-col>

                </div>
              </el-row>
            </el-card>
          </div>
        </el-col>
      </el-row>

      <!-- Card Modal Dialog -->
      <el-dialog :title="currentItem.title" :visible.sync="centerDialogVisible" width="80%" center>

        <iframe width="80%" height="450" frameborder="0" style="border:0" :src="getMap(currentItem)" allowfullscreen></iframe>

        <el-form ref="form" label-width="100px" label-position="top" size="mini" :disabled="true">

          <el-form-item>
            <span>Вантаж</span>
            <p>{{ currentItem.goods_name || '' }} </p>
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item>
                <span>Власник</span>
                <p>{{ currentItem.owner || '' }} </p>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item>
                <span>Клієнт</span>
                <p>{{ currentItem.client || '' }} </p>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item>
                <span>Пункт завантаження</span>
                <p>{{ currentItem.point_from_name || '' }} </p>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item>
                <span>Пункт розвантаження</span>
                <p>{{ currentItem.point_to_name || '' }} </p>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item>
                <span>Пункт розвантаження</span>
                <p>{{ currentItem.warehouse_from_name || '' }} </p>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item>
                <span>Склад розвантаження</span>
                <p>{{ currentItem.warehouse_to_name || '' }} </p>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="toogleCardDialog(null)">Закрити</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
export default {
  layout: "public",
  data() {
    return {
      centerDialogVisible: false,
      currentItem: {}
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
    }
  },
  computed: {
    orders: function() {
      return this.$store.state.orders.list.slice();
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700');

.th-main {
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
    font-family: "Montserrat";
    font-size: 5vh;
    font-weight: 400;
    text-transform: uppercase;
    // Text style for first row
    #th-first-row{
      color: #f0b917;
      font-family: "Montserrat Medium";
      font-weight: 500;
      letter-spacing: -1.4px;
      line-height: 72px;
    }
    // Text style for second and third rows
    #th-second-row, #th-third-row{
      font-family: "Montserrat-Regular";
      font-weight: 400;
      letter-spacing: -1.4px;
      line-height: 72px;
    }
  }
  .th-btn-cont {
    margin-top: 80px;
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
        font-family: Montserrat;
        font-size: 36px;
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
        width: 459px;
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
                font-family: Montserrat;
                font-size: 24px;
                font-weight: 500;
                letter-spacing: 0.24px;
                margin-left: 10%;
                margin-top: 10%;
                z-index: 1;
                &::after{
                  position: absolute;
                  opacity: 0.2;
                  color: #b0b0b0;
                  font-family: Montserrat;
                  font-size: 100px;
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
          font-family: Montserrat;
          font-size: 16px;
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
        content: "|";
        width: 1px;
        height: 126px;
        background-color: #ffffff;
        position: absolute;
        left: 100%;
        margin-left: 200px;
        bottom: 0;
      }
      &:last-child::after{
        display:none;
      }
      .counter-number{
        color: #ffffff;
        font-family: "Montserrat - Regular";
        font-size: 60px;
        font-weight: 400;
        letter-spacing: 0.6px;
        line-height: 28px;
        margin-bottom: 5%;
      }
      .counter-text{
        font-size: 30px;
        font-family: "Montserrat Light";
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
    margin-bottom: 0;
    .app-header-container{
      text-align: center;
      margin: 6% auto;
      .app-header{
        color: #333333;
        font-family: Montserrat;
        font-size: 36px;
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 0.36px;
      }
    }
  }
  .app-content-row{
    .app-column{
      display: flex;
      justify-content: center;
      .left-column{
        display: flex;
        flex-direction: column;
        align-items: center;
        .app-text-container{
          .app-text{
            align-self: center;
            margin: 6% auto;
            width: 633px;
            height: 108px;
            color: #333333;
            font-family: Montserrat;
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            letter-spacing: 0.18px;
          }
        }
        .app-advantages-container{
          .advantage{
            position: relative;
            color: #808080;
            font-family: Montserrat;
            font-size: 16px;
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
              font-family: Montserrat;
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


.th-orders {
  padding: 100px 0;
  overflow: hidden !important;

  .th-section-text {
    text-align: center;

    .section-heading {
      font-size: 25px;
    }

    .section-subheading {
      font-size: 14px;
      line-height: 1.5 !important;
    }
  }
  .th-card-wrapper {
    white-space: normal;
    margin-bottom: 20px;

    .th-card {
      position: relative;
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(254, 209, 54, 0.9);
      } // .image-map {
      //   width: 100%;
      //   height: auto; //display: block;
      // }
      .bottom {
        padding: 10px 0 20px 0;
        margin-top: 10px;
        text-align: center;
        color: #464949;

        span {
          font-size: 15px;
          font-weight: 600;

          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        &.clearfix:before,
        &.clearfix:after {
          display: table;
          content: "";
        }

        &.clearfix:after {
          clear: both;
        }
      }

      .order-hover {
        z-index: 100;
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-transition: all ease 0.5s;
        -moz-transition: all ease 0.5s;
        transition: all ease 0.5s;
        opacity: 0;
        background: rgba(254, 209, 54, 0.4);
        border-radius: 4px;

        &:hover {
          opacity: 1;
        }

        .order-hover-content {
          font-size: 60px;
          position: absolute;
          top: 50%;
          width: 100%;
          height: 20px;
          margin-top: -30px;
          text-align: center;
          color: #fff;
        }
      }

      .point {
        margin-top: 21px;
      }

      .point-m-0 {
        margin-top: 21px;
      }
    }
  }

  .el-dialog {
    text-align: center !important;

    iframe {
      margin: 20px 0;
    }

    iframe,
    .el-form {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 80%;
    }

    span {
      font-size: 12px !important;
      color: #aeb4ba !important;
    }

    p {
      font-size: 16px;
      border-bottom: 1px solid #dcdfe6;
    }
  }
}



@media (min-width: 1200px) {
  .th-orders {
    .th-card-wrapper {
      .th-card {
        .point-m-0 {
          margin-top: 5px;
        }
      }
    }
    .el-dialog {
      width: 100%;
    }
  }
}
</style>