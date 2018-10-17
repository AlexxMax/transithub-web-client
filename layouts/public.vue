<template>
  <div>

    <!-- Header -->
    <el-header class="th-header" type="flex">
      <el-row type="flex" class="stick-navbar container">
        <el-col :xl="4" :lg="4" :md="4" :sm="4" :xs="4" class="th-logo-col">
          <h1 class="th-logo">Transithub</h1>
        </el-col>
        <el-col :xl="14" :lg="10" :md="12" :sm="12" :xs="12" class="navbar">
          <a class="nav-item" href="/">Головна</a>
          <a class="nav-item" v-scroll-to="'#about-section'">Про нас</a>
          <a class="nav-item" v-scroll-to="'#counters-section'">Замовлення</a>
          <a class="nav-item" v-scroll-to="'#app-section'">Додаток</a>
          <a class="nav-item" v-scroll-to="'#feedback-form'">Контакти</a>
        </el-col>
        <el-col :xl="6" :lg="10" :md="8" :sm="4" :xs="4" class="right-navbar">
          <a class="right-navbar-item">Авторизація <i class="el-icon-arrow-down"></i></a>
          <a class="right-navbar-item">Українська <i class="el-icon-arrow-down"></i></a>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <nuxt></nuxt>
    </el-main>

    <el-footer class="th-footer" height="439px">

      <el-row class="footer-info container" type="flex" justify="center">
        
        <el-col :xl="8" class="footer-info-col">
          <div class="item-title-wrapper">
            <span class="item-title">Зв'яжіться з нами</span>
          </div>
          <div class="footer-item-content">
            <div class="footer-circle">
              <img src="~/assets/images/contact-us.png">
            </div>
            <div class="item-desc">
              <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
              <span>example@example.com</span>
            </div>
          </div>
        </el-col>
        
        <el-col :xl="8" class="footer-info-col">
          <div class="item-title-wrapper">
            <span class="item-title">Години роботи</span>
          </div>
          <div class="footer-item-content">
            <div class="footer-circle">
              <img src="~/assets/images/time.png">
            </div>
            <div class="item-desc">
              <span>Понеділок - П’ятниця: <span class="highlight">9:00 - 18:00</span></span>
              <span>Субота, Неділя,</span>
              <span>Святкові дні: <span class="highlight">вихідні</span></span>
            </div>
          </div>
        </el-col>
        
        <el-col :xl="8" class="footer-info-col">
          <div class="item-title-wrapper">
            <span class="item-title">Посилання</span>
          </div>
          <div class="footer-item-content">
            <div class="footer-circle">
              <img src="~/assets/images/links.png">
            </div>
            <div class="item-desc-columns">
              <div class="col-nav">
                <a href="/" class="footer-link"><i class="el-icon-arrow-right"></i> Головна</a>
                <a v-scroll-to="'#about-section'" class="footer-link"><i class="el-icon-arrow-right"></i> Про нас</a>
                <a v-scroll-to="'#counters-section'" class="footer-link"><i class="el-icon-arrow-right"></i> Замовлення</a>
              </div>
              <div class="col-nav">
                <a v-scroll-to="'#app-section'" class="footer-link"><i class="el-icon-arrow-right"></i> Додаток</a>
                <a v-scroll-to="'#feedback-form'" class="footer-link"><i class="el-icon-arrow-right"></i> Контакти</a>
              </div>
            </div>
          </div>
        </el-col>

      </el-row>
      
      <el-row class="copiright-row" type="flex" justify="center">
        <el-col :xl="24" :lg="24" class="copiright-container">
          <span class="copiright-text">© Copyright 2018 - Transithub</span>
        </el-col>
      </el-row>

    </el-footer>

  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700');

.container{
  max-width: 1760px;
  margin-left: auto;
  margin-right: auto;
}

.highlight{
  color:#f0b917;
}

.th-header {
  display: flex;
  width: 100%;
  height: 100px !important;
  position: fixed;
  top: 0;
  background-color: rgba(255, 255, 255, 0.8);
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
        font-size: 36px;
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 0.36px;
        align-self: center;
      }
    }
    .navbar{
      width: 1188px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .nav-item{
        color: #333333;
        font-size: 1rem;
        font-weight: 400;
        letter-spacing: 0.16px;
        margin: 0 1%;
        cursor: pointer; 
        &:hover{
          color: #f0b917;
        }
      }
    }
    .right-navbar{
      display: flex;
      justify-content: flex-end;
      align-self: center;
      .right-navbar-item{
        color: #333333;
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
  .scrolled{
    background-color: #f0b917;
    color:#ffffff;
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

// Footer
.th-footer{
  padding:0;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #252525;

  .footer-info{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1260px;
    height: 339px;
    margin-bottom: 2%;
    border-bottom: 1px solid #909090;
    .footer-info-col{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .item-title-wrapper{
        margin-bottom: 5%;

        .item-title{
          color: #ffffff;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          text-transform: uppercase;
          letter-spacing: 0.2px;
        }
      }

      .footer-item-content{
        display: flex;
        justify-content: flex-start;
        width: 100%;
        max-width: 100%;
        height: 55px;
        color: #909090;
        font-size: 12px;
        font-weight: 300;
        letter-spacing: 0.12px;
        line-height: 18px;
        letter-spacing: 0.12px;
        line-height: 24px;

        .footer-circle{

        }

        .item-desc{
          width: 60%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          overflow-wrap: break-word;
          margin-left: 5%;
        }

        .item-desc-columns{
          display: flex;
          flex-direction: row;
          margin-left: 5%;

          .col-nav{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;

            .footer-link{
              color: #ffffff;
              cursor: pointer;
              &:hover{
                color:#f0b917;
              }
            }
          }
        }
      }
    }
  }

  .copiright-row{
    
    height: 100px;
    background-color: #1f1f1f;
    width: 100%;
    
    .copiright-container{
      display: flex;
      justify-content: center;
      align-items: center;
      
      .copiright-text{
        color: #808080;
        font-size: 14px;
        font-weight: 300;
        line-height: 16px;
        letter-spacing: 0.14px;
      }
    }
  }
}





// .el-footer{
//   padding:0;
//   margin-bottom: 0;
//   .footer-info{
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: #252525;
//     height: 339px;
//     .items-container{
//       display: flex;
//       justify-content: space-around;
//       width: 70%;
//       height: 80%;
//       border-bottom: 1px solid #909090;
//       .footer-info-col{
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         align-items: flex-start;
//         .item-title-wrapper{
//           margin-bottom: 5%;
//           .item-title{
//             color: #ffffff;
//             font-size: 20px;
//             font-weight: 500;
//             line-height: 28px;
//             text-transform: uppercase;
//             letter-spacing: 0.2px;
//           }
//         }
//         .footer-item-content{
//           display: flex;
//           justify-content: flex-start;
//           width: 100%;
//           max-width: 100%;
//           height: 55px;
//           color: #909090;
//           font-size: 12px;
//           font-weight: 300;
//           letter-spacing: 0.12px;
//           line-height: 18px;
//           letter-spacing: 0.12px;
//           line-height: 24px;
//           .item-desc{
//             width: 60%;
//             display: flex;
//             flex-direction: column;
//             justify-content: flex-start;
//             overflow-wrap: break-word;
//             margin-left: 5%;
//             .highlight{
//               color:#f0b917;
//             }
//           }
//           .item-desc-columns{
//             display: flex;
//             flex-direction: row;
//             margin-left: 5%;
//             .col-nav{
//               display: flex;
//               flex-direction: column;
//               justify-content: flex-start;
//               .footer-link{
//                 color: #ffffff;
//                 cursor: pointer;
//                 &:hover{
//                   color:#f0b917;
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   .copiright-row{
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 100px;
//     background-color: #1f1f1f;
//     .copiright-container{
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       .copiright-text{
//         color: #808080;
//         font-size: 14px;
//         font-weight: 300;
//         line-height: 16px;
//         letter-spacing: 0.14px;
//       }
//     }
//   }
// }
</style>