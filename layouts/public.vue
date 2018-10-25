<template>
  <div>

    <!-- Header -->
    <el-header class="th-header" v-bind:class="{ changed: scrolled }" type="flex">
      <el-row type="flex" class="stick-navbar">

        <el-col :xl="4" :lg="4" :md="6" :sm="6" :xs="10" class="th-logo-col">
          <h1 class="th-logo" v-bind:class="{ whitetext: scrolled }">Transithub</h1>
        </el-col>

        <el-col class="navbar">
          <el-menu mode="horizontal" menu-trigger="click">
            <el-menu-item index="1" v-bind:class="{ whitetext: scrolled }" v-scroll-to="{el: '#banner'}">Головна</el-menu-item>
            <el-menu-item index="2" v-bind:class="{ whitetext: scrolled }" v-scroll-to="{el: '#about-section', offset: -60}">Про нас</el-menu-item>
            <el-menu-item index="3" v-bind:class="{ whitetext: scrolled }" v-scroll-to="{el: '#counters-section', offset: -60}">Замовлення</el-menu-item>
            <el-menu-item index="4" v-bind:class="{ whitetext: scrolled }" v-scroll-to="{el: '#app-section', offset: -60}">Додаток</el-menu-item>
            <el-menu-item index="5" v-bind:class="{ whitetext: scrolled }" v-scroll-to="{el: '#feedback-form', offset: -60}">Контакти</el-menu-item>
           
            <el-submenu index="6">
              <template slot="title">Українська</template>
              <el-menu-item index="6-1">Українська</el-menu-item>
              <el-menu-item index="6-2">Русский</el-menu-item>
            </el-submenu>

            <el-submenu index="7">
              <template slot="title">Авторизація</template>
              <el-menu-item index="7-1"><a href="/login">Логування</a></el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>

<!--
        <el-col class="right-navbar" v-bind:class="{ whitetext: scrolled }">

          <a href="/login" class="right-navbar-item" v-bind:class="{ whitetext: scrolled }">Авторизація <i class="el-icon-arrow-down"></i></a>
          <a href="#" class="right-navbar-item" v-bind:class="{ whitetext: scrolled }" >Українська <i class="el-icon-arrow-down"></i></a>
        </el-col>
-->
        <el-col class="burger-container">
          <a href="#" class="burger-menu" @click="showMenu = !showMenu">
            <fa icon="bars" class="el-icon-menu" v-bind:class="{ whitetext: scrolled }"/>
          </a>
          <div class="menu-links" v-show="showMenu">
            <a class="menu-links-item" v-scroll-to="{el: '#banner'}">Головна</a>
            <a class="menu-links-item" v-scroll-to="{el: '#about-section', offset: -60}">Про нас</a>
            <a class="menu-links-item" v-scroll-to="{el: '#counters-section', offset: -60}">Замовлення</a>
            <a class="menu-links-item" v-scroll-to="{el: '#app-section', offset: -60}">Наш додаток</a>
            <a class="menu-links-item" v-scroll-to="{el: '#feedback-form', offset: -60}">Контакти</a>
            <a class="menu-links-item" href="/login">Авторизація</a>
            <a class="menu-links-item" href="#">Українська</a>
          </div>
       </el-col>
      </el-row>
    </el-header>

    <el-main>
      <nuxt></nuxt>
    </el-main>

    <el-footer class="th-footer">

      <el-row class="footer-info" type="flex" justify="center">
        
        <el-col :xl="8" :lg="8" :md="6" :sm="8" :offset="2" class="footer-info-col">
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
        
        <el-col :xl="8" :lg="8" :md="6" :sm="8" :offset="2" class="footer-info-col">
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
        
        <el-col :xl="8" :lg="8" :md="6" :sm="8" :offset="2" class="footer-info-col">
          <div class="item-title-wrapper">
            <span class="item-title">Посилання</span>
          </div>
          <div class="footer-item-content">
            <div class="footer-circle">
              <img src="~/assets/images/links.png">
            </div>
            <div class="item-desc-columns">
              <div class="col-nav">
                <a href="/" class="footer-link" v-scroll-to="{el: '#banner'}"><i class="el-icon-arrow-right"></i> Головна</a>
                <a v-scroll-to="{el: '#about-section', offset: -60}" class="footer-link"><i class="el-icon-arrow-right"></i> Про нас</a>
                <a v-scroll-to="{el: '#counters-section', offset: -60}" class="footer-link"><i class="el-icon-arrow-right"></i> Замовлення</a>
              </div>
              <div class="col-nav">
                <a v-scroll-to="{el: '#app-section', offset: -60}" class="footer-link"><i class="el-icon-arrow-right"></i> Додаток</a>
                <a v-scroll-to="{el: '#feedback-form', offset: -60}" class="footer-link"><i class="el-icon-arrow-right"></i> Контакти</a>
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

export default {
  data () {
    return {
      scrolled: false,
      showMenu: false,
      activeIndex: '1',
    }
  },
  methods: {
    handleScroll () {
      this.scrolled = window.pageYOffset || document.documentElement.scrollTop;;
      if(this.scrolled > 100) {
          this.scrolled= true;
      } 
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700');

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

.changed{
  background-color: $yellow-color !important;
}

.whitetext{
  color:white!important;
}

.highlight{
  color: $yellow-color;
}

.th-header {
  display: flex;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  position: fixed;
  top: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;

  .stick-navbar{
    width: 100%;
    margin: 0 auto !important; 
    display: flex;
    justify-content: space-between;
    align-items: center;

    .th-logo-col{
      justify-content: center;
      align-items: center;
      align-self: center;

      .th-logo{
        @include font-style(1.75rem, $yellow-color, 400, 0.36px);
        text-transform: uppercase;
        align-self: center;
      }
    }

    .navbar{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-right: auto !important;

      .el-menu{
        background-color: transparent;
        border-bottom: none;
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        width: 100%;

        .el-submenu-container{
          display: flex;
          flex-direction: row;

          .el-menu-item{
            @include font-style(0.875rem, $dark-grey, 400, 0.16px);
            cursor: pointer; 
            border-bottom: none;

            &:focus{
              background-color: transparent;
              border-bottom: none;
            }

            &:hover{
              background-color: transparent;
            }
          }
          .el-submenu{
            align-self: flex-end;
          }
        }
      }
    }
    .right-navbar{
      display: flex;
      justify-content: flex-end;
      align-self: center;
      
      .right-navbar-item{
        @include font-style(0.875rem, $dark-grey, 400, 0.16px);
        margin: 0 3%;
        cursor: pointer;

        &:hover{
          color: $yellow-color;
        }
      }
    }
    .burger-container{
      display: none;
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
  height: 320px !important;

  .footer-info{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1260px;
    height: 250px;
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
          @include font-style(18px, $white-color, 500, 0.2px, 28px);
          text-transform: uppercase;
        }
      }

      .footer-item-content{
        display: flex;
        justify-content: flex-start;
        width: 100%;
        max-width: 100%;
        height: 55px;
        @include font-style(10px, #909090, 300, 0.12px, 24px);

        .item-desc{
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
              color: $white-color;
              cursor: pointer;

              &:hover{
                color:$yellow-color;
              }
            }
          }
        }
      }
    }
  }

  .copiright-row{
    
    height: 70px;
    background-color: #1f1f1f;
    width: 100%;
    
    .copiright-container{
      display: flex;
      justify-content: center;
      align-items: center;
      
      .copiright-text{
        @include font-style(12px, #808080, 300, 0.14px, 16px);
      }
    }
  }
}

/*************************************
            MEDIA QUERIES
*************************************/

// Landscape orientation
@media (min-width: 992px)and (max-width: 1119px) and (orientation: landscape){
  .th-footer{
    height: 250px !important;
    .footer-info{
      height: 200px;
      .footer-info-col{
        .item-title-wrapper{
          .item-title{
            @include font-style(18px, $white-color, 500, 0.2px, 28px);
            text-transform: uppercase;
          }
        }
        .footer-item-content{
          @include font-style(10px, #909090, 300, 0.12px, 24px);
        }
      }
    }
    .copiright-row{
      height: 50px;
      .copiright-container{
        .copiright-text{
          @include font-style(10px, #808080, 300, 0.14px, 16px);
        }
      }
    }
  }
}

@media (max-width: 886px){
  .th-header {
   
    .stick-navbar{
      display: flex;
      justify-content: space-around;

      .navbar, .right-navbar{
        display: none;
      }
      
      .burger-container{
        display: flex;
        justify-content: flex-end;
        .burger-menu {
          
          .el-icon-menu{
            font-size: 24px;
            color: $yellow-color;
          }
        }
        .menu-links {
          position: fixed;
          display: flex;
          flex-direction: column;
          align-items:center;
          top: 0;
          right: 0;
          left: 0;
          margin-top: 60px;
          background-color: rgba(255, 255, 255, 0.8);
          z-index: 1000;
          overflow: auto;
         
          .menu-links-item {
            width: 100%;
            display: block;
            height: 20px;
            padding: 10px 0;
            font-size: 1rem;
            text-align: center;
            color: $yellow-color;
          }
        }
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 991px){
    .th-footer{
    .footer-info{
      .footer-info-col{
        .item-title-wrapper{
          .item-title{
            @include font-style(14px, $white-color, 500, 0.2px, 28px);
          }
        }

        .footer-item-content{
          @include font-style(7px, #909090, 300, 0.12px, 24px);
        }
      }
    }

    .copiright-row{
      .copiright-container{
        .copiright-text{
          @include font-style(12px, #808080, 300, 0.14px, 16px);
        }
      }
    }
  }
}

/*************************************************************
                  FOR PHONES
*************************************************************/
@media (max-width: 767px) and (orientation: portrait){
  .th-footer{
    height: 100% !important;
    .footer-info{
      flex-wrap: wrap;
      margin: 5% 10%;
      border: none;
      height: 100%;
      .footer-info-col{
        margin: 5%;
        .item-title-wrapper{
          align-self: center;
        }
        .footer-item-content{
          display: flex;
          align-self: center;
          justify-content: flex-start;
          @include font-style(10px, #909090, 300, 0.12px, 24px);
          
        }
      }
    }

    .copiright-row{
      
      height: 70px;
      background-color: #1f1f1f;
      width: 100%;
      
      .copiright-container{
        display: flex;
        justify-content: center;
        align-items: center;
        
        .copiright-text{
          @include font-style(12px, #808080, 300, 0.14px, 16px);
        }
      }
    }
  }
}

@media (max-width: 767px) and (orientation: landscape){
    
  .th-footer{
    height: 70px !important;
    .footer-info{
      display: none;
    }
  }
}

</style>