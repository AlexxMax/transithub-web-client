<template>
  <div>
    
    <!-- Top -->
    <div id="Header">
      <el-row>
        <el-col :xs="24" :md="12">
          <div class="Header__outer left">
            <a href="#">
              <div class="Header__outer__header-left"></div>
              <div class="Header__outer__header-content">
                <h1>Автомобільні</h1>
                <p>перевезення</p>
              </div>
            </a>
          </div>
        </el-col>

        <el-col :xs="24" :md="12">
          <div class="Header__outer right">
            <a href="#">
              <div class="Header__outer__header-right"></div>
              <div class="Header__outer__header-content">
                <h1>Залізничні</h1>
                <p>перевезення</p>
              </div>
            </a>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- About us -->
    <div id="About">
      <el-container direction="vertical">
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <h1 class="About__title">Про нас</h1>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center" class="About__group">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="About__group__item-wrapper">
              <img src="~/assets/images/about/box.png">
              <p class="title" id="first">Пошук і розміщення вантажів до перевезення</p>
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8">
            <div class="About__group__item-wrapper">
              <img src="~/assets/images/about/docs.png">
              <p class="title" id="second">Електронний документообіг</p>
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8">
            <div class="About__group__item-wrapper">
              <img src="~/assets/images/about/trade.png">
              <p class="title" id="third">Проведення торгів за вартістю перевезення</p>
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8">
            <div class="About__group__item-wrapper">
              <img src="~/assets/images/about/talk.png">
              <p class="title" id="fourth">Диспетчеризація транспортного парку</p>    
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8">
            <div class="About__group__item-wrapper">
              <img src="~/assets/images/about/calc.png">
              <p class="title" id="fourth">Попередній розрахунок вартості перевезення</p>
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8">
            <div class="About__group__item-wrapper">
              <img src="~/assets/images/about/online.png">
              <p class="title" id="fourth">Онлайн-трекінг транспорту за допомогою ТрекЧекБот</p>
            </div>
          </el-col>
        </el-row>
      </el-container>
    </div>

    <!-- Counters -->
    <div id="Counters">
      <div class="Counters__row__wrapper">
        <h1 class="Counters__row__wrapper__number">+700</h1>
        <p class="Counters__row__wrapper__text">Рейсів щодня</p>
      </div>
      <div class="Counters__row__wrapper">
        <h1 class="Counters__row__wrapper__number">+500 000 т </h1>
        <p class="Counters__row__wrapper__text">Перевезеного вантажу щомісяця</p>
      </div>
      <div class="Counters__row__wrapper">
        <h1 class="Counters__row__wrapper__number">+3500</h1>
        <p class="Counters__row__wrapper__text">Пунктів завантаження по всій країні</p>
      </div>
    </div>

     <!-- Our app -->
    <div id="App">
      <el-row type="flex">
        <el-col :span="24">
          <div class="App__header">
            <h1 class="App__header__title">Наш додаток</h1>
            <p class="App__header__desc">
              Для використання сервісу необхідно на смартфоні встановити мессенджер Telegram та знайти в ньому контакт ТрекЧекБот (TrackCheckBot)
            </p>
          </div>
        </el-col>
      </el-row>
        
      <el-row>
        <el-col :xs="24" :sm="24" :md="12">
          <div class="App__left-column">
            <div class="App__left-column__wrapper">
              <div class="App__left-column__advantages">
                <h1>За допомогою бота водій зможе</h1>
                <p class="App__left-column__advantages__item" id="advantage-1">
                  Отримати актуальні наряди та зареєструвати свій рейс
                </p>
                <p class="App__left-column__advantages__item" id="advantage-2">
                  Отримати інформацію про склад навантаження
                </p>
                <p class="App__left-column__advantages__item" id="advantage-3">
                  Продивитись маршрут на карті, що затверджений замовником
                </p>
                <p class="App__left-column__advantages__item" id="advantage-4">
                  Передати свою геопозицію та події на маршруті
                </p>
                <p class="App__left-column__advantages__item" id="advantage-5">
                  Дізнатись про черги в точках навантаження/розвантаження
                </p>
                <p class="App__left-column__advantages__item" id="advantage-6">
                  Зв'язатись з диспетчером замовника в чаті
                </p>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xs="24" :md="12">
          <div class="App__img-wrapper">
              <img src="~/assets/images/app-img.png" alt="">
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Calculation -->
    <!-- <div id="Calculation">
      <el-row>
        <el-col :span="24">
          <div class="Calculation__section-heading">
            <h1>Розрахувати вартість перевезення</h1>
            <p>Розрахунок коштів - основа успішного введення транспортної діяльності</p>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" style="flex-wrap: wrap;" :gutter="20">
        <el-col :xs="18" :sm="14" :lg="6">
          <div class="Calculation__input-inline">
            <el-input
              :placeholder="$t('forms.common.enterPointFrom')">
            </el-input>
          </div>
        </el-col>

        <el-col :xs="18" :sm="14" :lg="6">
          <div class="Calculation__input-inline">
            <el-input
              :placeholder="$t('forms.common.enterPointTo')">
            </el-input>
          </div>
        </el-col>

        <el-col :xs="10" :sm="11" :lg="3">
          <el-input
            :placeholder="$t('forms.common.enterWeight')">
          </el-input>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="24">
          <div class="Calculation__btn-center">
            <a href="#" class="Calculation__btn-center__calculate">{{ $t('forms.common.calculate') }}</a>
          </div>
        </el-col>
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

#Header {
  overflow-x: hidden;

  .Header__outer {
    height: 100vh;
    width: 54.5vw;
    overflow: hidden; 
    position: relative;
    text-align: center;

    &.left {
      clip-path: polygon(0 0, 100% 0%, 91% 100%, 0% 100%);
    }

    &.right {
      clip-path: polygon(9% 0, 100% 0%, 100% 100%, 0 100%);
    }

    &__header-left {
      background: url("~/assets/images/banner/img-left.jpg") no-repeat center center scroll;
    }

    &__header-right {
      background: url("~/assets/images/banner/img-right.jpg") no-repeat center center scroll;
    }

    &__header-left, &__header-right {
      display: table;
      width: 55vw;
      height: 100vh;
      background-size: cover;
      opacity: .9;
      transition: all 0.5s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.2);
        opacity: .8;
      }
    }

    &__header-content {
      display: table-cell;
      color: white;
      font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif !important; 
      text-transform: uppercase;
      letter-spacing: 1px;
      line-height: 1.1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      h1 {
        font-weight: 700;
        color: white !important;
        font-size: 34px; 
        margin: 0 !important;
      }

      p {
        font-weight: 400;
        font-size: 30px; 
        margin: 0 !important;
      }
    }
  }
}

#About {
  padding: 80px 0px;
  background-color: #FAFAFA;

  .About__title {
    text-align: center;
    font-size: 24px;
    color: #333333;
    letter-spacing: 0.36px;
    text-transform: uppercase;
  }

  .About__group {  
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 30px 20px 0 20px;
    padding-right: 15px;
    padding-left: 15px;

    &__item-wrapper {
      //margin: 0 20px;
      background: #FECD34;
      padding: 15px;
      border-radius: 5px;
      margin: 0 15px 30px 15px;
      //margin-bottom: 30px;
      min-height: 165px;
      max-height: 200px;
      font-size: 13px;
      text-align: center;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
      transition: 0.5s;

      &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.1);
        transform:scale(1.05);

      }
      // &__icon-title {
      //   display: flex;
      //   flex-direction: row;
      //   align-items: center;
        
      // } 

      img {
        width: 15%;
        margin: 15px;
        height: auto;
      }

      .title {
        position: relative;
        color: white;
        font-size: 16px;
        padding: 0 10px;
        //margin-left: 35px;

        // &::after {
        //   position: absolute;
        //   opacity: 0.2;
        //   font-size: 65px;
        //   color: #b0b0b0;
        //   font-weight: lighter;
        //   letter-spacing: 1px;
        //   line-height: 0px;
        //   top: 45%;
        //   left: 65%;
        //   z-index: -1;
        // }

        // &#first::after {
        //   content: "01"
        // }
        
        // &#second::after {
        //   content: "02"
        // }

        // &#third::after {
        //   content: "03"
        // }

        // &#fourth::after {
        //   content: "04"
        // }
      }
    }
  }
}

#Counters {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  justify-content: space-around;
  width: 100%;
  height: 300px;
  background-image: url("~/assets/images/counters_bg.png");
  background-position: center;
  background-size: cover;

  .Counters__row__wrapper {
    width: 33%;
    color: white;
    position: relative;
    //justify-content: space-around;

    &::after {
      content: "";
      width: 1px;
      height: 100px;
      opacity: .3;
      background-color: white;
      position: absolute;
      left: 100%;
      top: -20px;
    }

    &:last-child::after {
      display:none;
    }

    &__number {
      font-size: 30px;
      color: white;
      letter-spacing: 0.6px;
      line-height: 10px;
    }

    &__text {
      font-size: 16px;
      letter-spacing: 0.3px;
      line-height: 25px;
      margin-top: 0;
    }
  }
}

#Calculation {
  padding: 80px 20px 70px 20px;

  .Calculation__section-heading {
    text-align: center;

    h1 {
      font-size: 22px;
      font-weight: 600;
      color: #242424;
      letter-spacing: .2px;
    }

    p {
      font-size: 16px;
      color: #AAAAAA;
      margin-bottom: 40px;
    }
  } 

  .Calculation__input-inline {
    margin-bottom: 15px;
  }

  .Calculation__btn-center {
    text-align: center;
    margin-top: 25px;

    &__calculate {
      color: #fff;
      border: none;
      border-radius: 30px;
      padding: 10px 55px;
      white-space: nowrap;
      vertical-align: middle;
      transition: background-position 0.5s;
      background: linear-gradient(to right, #fad35f 0%, #FECD34 50%, #fdbf42 100%);
      background-size: 200% auto;

      &:hover {
        background-position: right center;
      }
    }
  }
}

#App {
  display: flex;
  flex-direction: column;
  padding: 100px 120px;

  .App__header {
    //width: 100%;
    text-align: center;
    margin-bottom: 60px;
    color: #333333;

    &__title {
      font-size: 24px;
      color: #333333;
      letter-spacing: 0.36px;
      text-transform: uppercase;
    }

    &__desc {
      padding: 0 20px;
      font-size: 14px;
      color: #AAAAAA;
      letter-spacing: 0.18px;
      line-height: 30px;
    }
  }

  .App__left-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    //width: 400px;

    &__advantages {
      counter-reset: App-counter;

      h1 {
        padding-bottom: 15px;
      }

      &__item {
        position: relative;
        font-size: 14px;
        color: #AAAAAA;
        letter-spacing: 0.16px;
        padding-bottom: 10px;
        
        &:before {
          content: counter(App-counter);
          counter-increment: App-counter;
          position: absolute;
          left: -10px;
          top: 0;
          z-index: -1;
          opacity: .4;
          color: #FECD34;
          font: lighter 35px/1.2 Sans-Serif;
        }
      }
    }
  }

  .App__img-wrapper {
    justify-content: center;
    align-items: center;
    display: flex;

    img {
      width: 70%;
    }
  }
}

@media only screen and (max-width: 800px) {
  #Counters {
    flex-direction: column;
    padding: 100px 0 80px 0;

    .Counters__row__wrapper {
      width: 50%;

      &::after {
        display: none;
      }

       &__number {
        font-size: 23px;
      }

      &__text {
        font-size: 14px;
      }
    }
  }
}

@media only screen and (max-width: 992px) {
  #Header {
    .Header__outer {
      height: 50vh;
      width: 100vw;

      &__header-left, &__header-right {
        height: 100%;
        background-position-y: 75%;
        width: 100%;
      }

      &.left, &.right {
        clip-path:none;
      }
    }
  }

  #App {
    padding: 100px 40px;
    
    .App__header {

      &__title {
      }

      &__desc {
      }
    }

    .App__left-column {
      &__advantages {
        &__item {  
          &:before {
            display: none;
          }
        }
      }
    }

    .App__left-column {
      text-align: center;
      align-items: center;
    }

    .App__img-wrapper {
      margin-top: 30px;

      order: 1;

      img {
        width: 60%;
      }
    }
  }
}

@media only screen and (min-width: 1096px) {
 #About {
  padding: 80px 180px;
 }
}
</style>
