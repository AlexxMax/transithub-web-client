<template>
  <div>

    <!-- Top -->
    <div id="Header">
      <el-row>
        <el-col :xs="24" :md="12">
          <div class="Header__outer left">
            <nuxt-link to="#">
              <div class="Header__outer__header-left"></div>
              <div class="Header__outer__header-content">
                <h1>{{ $t('forms.common.auto') }}</h1>
                <p>{{ $t('forms.common.transportation') }}</p>
              </div>
            </nuxt-link>
          </div>
        </el-col>

        <el-col :xs="24" :md="12">
          <div class="Header__outer right">
            <nuxt-link to="/railway-aggregations">
              <div class="Header__outer__header-right"></div>
              <div class="Header__outer__header-content">
                <h1>{{ $t('forms.common.railway') }}</h1>
                <p>{{ $t('forms.common.transportation') }}</p>
              </div>
            </nuxt-link>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Functional -->
    <div id="Functional">
      <el-container direction="vertical">
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <h1 class="Functional__title">{{ $t('forms.common.functionalTitle') }}</h1>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center" class="Functional__group">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <div class="Functional__group__item-wrapper">
              <img src="~/assets/images/functional/box-new.png">
              <p class="title" id="first">{{ $t('forms.common.searchingGoods') }}</p>
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8">
            <div class="Functional__group__item-wrapper">
              <img src="~/assets/images/functional/docs-new.png">
              <p class="title" id="second">{{ $t('forms.common.documentsFlow') }}</p>
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8">
            <div class="Functional__group__item-wrapper">
              <img src="~/assets/images/functional/trade-new.png">
              <p class="title" id="third">{{ $t('forms.common.tradesOfTransportation') }}</p>
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8">
            <div class="Functional__group__item-wrapper">
              <img src="~/assets/images/functional/talk-new.png">
              <p class="title" id="fourth">{{ $t('forms.common.dispatchingVehicleFleet') }}</p>
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8">
            <div class="Functional__group__item-wrapper">
              <img src="~/assets/images/functional/calc-new.png">
              <p class="title" id="fourth">{{ $t('forms.common.calculationOfCost') }}</p>
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8">
            <div class="Functional__group__item-wrapper">
              <img src="~/assets/images/functional/online-new.png">
              <p class="title" id="fourth">{{ $t('forms.common.onlineTracking') }}</p>
            </div>
          </el-col>
        </el-row>
      </el-container>
    </div>

    <!-- Counters -->
    <div id="Counters">
      <div class="Counters__row__wrapper">
        <h1 class="Counters__row__wrapper__number">+700</h1>
        <p class="Counters__row__wrapper__text">{{ $t('forms.common.tripsDaily') }}</p>
      </div>
      <div class="Counters__row__wrapper">
        <h1 class="Counters__row__wrapper__number">+500 000</h1>
        <p class="Counters__row__wrapper__text">{{ $t('forms.common.tonsOfCargoMonthly') }}</p>
      </div>
      <div class="Counters__row__wrapper">
        <h1 class="Counters__row__wrapper__number">+3 500</h1>
        <p class="Counters__row__wrapper__text">{{ $t('forms.common.pointsAcrossCountry') }}</p>
      </div>
    </div>

     <!-- Our app -->
    <div id="App">
      <el-row type="flex">
        <el-col :span="24">
          <div class="App__header">
            <h1 class="App__header__title">ТрекЧекБот</h1>
            <!-- <p class="App__header__desc">
              Для використання сервісу необхідно на смартфоні встановити мессенджер Telegram та знайти в ньому контакт ТрекЧекБот (TrackCheckBot)
            </p> -->
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :sm="24" :md="12">
          <div class="App__left-column">
            <div class="App__left-column__wrapper">
              <div class="App__left-column__advantages">
                <h1>{{ $t('forms.common.botHelpDriver') }}</h1>
                <p class="App__left-column__advantages__item">{{ $t('forms.common.getAndRegisterTrips') }}</p>
                <p class="App__left-column__advantages__item">{{ $t('forms.common.getInfoAboutWarehouse') }}</p>
                <p class="App__left-column__advantages__item">{{ $t('forms.common.seeMap') }}</p>
                <p class="App__left-column__advantages__item">{{ $t('forms.common.sendGeoposition') }}</p>
                <p class="App__left-column__advantages__item">{{ $t('forms.common.learnAboutLoadingUnloadingPoints') }}</p>
                <p class="App__left-column__advantages__item">{{ $t('forms.common.contactDispatcher') }}</p>
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

      <el-row type="flex" justify="center">
        <el-col :span="24">
          <div class="App__footer">
            <p class="App__footer__desc">
              {{ $t('forms.common.botInTelegram') }}
            </p>

            <a href="https://web.telegram.org/#/im?p=@TrackCheckBot" class="App__footer__btn-telegram">{{ $t('forms.common.findInTelegram') }}</a>
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
$dark-grey: #333333;

#Header {
  overflow-x: hidden;

  .Header__outer {
    height: 100vh;
    width: 70vw;
    overflow: hidden;
    position: relative;
    text-align: center;

    &.left {
      clip-path: polygon(0 0, 100% 0%, 91% 100%, 0% 100%);
      z-index: 100;
      width: 52.5vw;
    }

    &.right {
      //clip-path: polygon(9% 0, 100% 0%, 100% 100%, 0 100%);
      margin-left: -10vw;
    }

    &__header-left {
      background: url("~/assets/images/banner/img-left.jpg") no-repeat center center scroll;
      background-position-y: 65%;
    }

    &__header-right {
      background: url("~/assets/images/banner/img-right.jpg") no-repeat center center scroll;
    }

    &__header-left, &__header-right {
      display: table;
      width: 60vw;
      height: 100vh;
      background-size: cover;
      opacity: 1;
      transition: all 0.5s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.2);
      }
    }

    &__header-content {
      display: table-cell;
      color: white;
      // font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif !important;
      text-transform: uppercase;
      letter-spacing: 1px;
      line-height: 1.1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      h1 {
        font-weight: 700;
        color: white;
        font-size: 34px;
        margin: 0 !important;

        .__black-text {
          color: $dark-grey
        }
      }

      p {
        font-weight: 400;
        font-size: 30px;
        margin: 0 !important;
      }
    }
  }
}

#Functional {
  padding: 80px 0px;
  background-color: rgb(252, 252, 252);
  //background-color: #fbfbfb;
  color: #535353;

  .Functional__title {
    text-align: center;
    font-size: 24px;
    letter-spacing: 0.36px;
    text-transform: uppercase;
  }

  .Functional__group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 30px 20px 0 20px;
    padding-right: 15px;
    padding-left: 15px;

    &__item-wrapper {
      //background: linear-gradient(110deg, #FECD34 60%, #fed34d 60%);
      padding: 15px;
      border-radius: 5px;
      margin: 0 15px 30px 15px;
      //margin-bottom: 30px;
      min-height: 165px;
      max-height: 200px;
      font-size: 13px;
      text-align: center;
      box-shadow: 0 8px 24px 0 rgba(0,0,0,.07);
      background-color: white;
      transition: 0.5s;

      &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.05);
        transform:scale(1.05);
      }

      img {
        width: 18%;
        margin: 15px;
        height: auto;
      }

      .title {
        position: relative;
        font-size: 16px;
        padding: 0 10px;
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
  padding: 80px 0;
  background-image: url("~/assets/images/counters_bg.png");
  background-position: center;
  background-size: cover;

  .Counters__row__wrapper {
    width: 33%;
    color: white;
    position: relative;

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
  background-color: rgb(252, 252, 252);
  display: flex;
  flex-direction: column;
  padding: 80px 120px 80px 120px;

  .App__header {
    //width: 100%;
    text-align: center;
    margin-bottom: 60px;
    color: #333333;

    &__title {
      font-size: 24px;
      color: #333333;
      letter-spacing: 0.36px;
      // text-transform: uppercase;
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
        margin-left: 10px;

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
      width: 90%;
    }
  }

  .App__footer {
    margin-top: 40px;
    text-align: center;

    &__desc {
      text-align: center;
      font-size: 14px;
      color: #606266;
      letter-spacing: 0.18px;
      line-height: 30px;
      margin-bottom: 30px;
    }

    &__btn-telegram {
      color: #fff;
      border: none;
      border-radius: 30px;
      padding: 10px 18px;
      background-color: #FECD34;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      transition: all .15s ease-in-out;

      &:hover {
        box-shadow: 0 0 10px 0 #FECD34 inset, 0 0 10px 1px #FECD34;
      }
    }
  }
}

@media only screen and (max-width: 800px) {
  #Counters {
    flex-direction: column;
    padding: 70px 0 50px 0;

    .Counters__row__wrapper {
      width: 50%;
      margin-bottom: 40px;

      &:last-child {
        margin-bottom: 0px;
      }

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
        width: 100%;
      }

      &__header-left {
        background-position-y: 75%;
      }

      &.left, &.right {
        clip-path:none;
        width: 100%;
        margin-left: 0;
      }

      &__header-content {
        h1 {
          font-size: 20px;
        }

        p {
          font-size: 19px;
        }
      }

    }
  }

  #App {
    //padding: 80px 40px 50px 40px;
    padding: 80px 40px 80px 40px;

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

      &__advantages {
        &__item {
          margin-left: 0;
        }
      }
    }

    .App__img-wrapper {
      //margin-top: 30px;

      order: 1;

      img {
        width: 70%;
      }
    }

    .App__footer__desc {
      margin-bottom: 30px;
    }
  }
}

@media only screen and (min-width: 1096px) {
 #Functional {
  padding: 80px 180px;
 }
}
</style>
