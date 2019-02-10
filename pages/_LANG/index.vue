<template>
  <div>

    <!-- Top -->
    <div id="Header">
      <el-row>
        <el-col :xs="24" :md="12">
          <div class="Header__outer left">
            <nuxt-link to="/auto-transportations">
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
          <el-col :xs="24" :sm="12" :md="8">
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
              <img class="Functional__group__item-wrapper__fifth" src="~/assets/images/functional/calc-new.png">
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
                <h1>{{ $t('forms.common.botHelpDriver') }}:</h1>
                <p class="App__left-column__advantages__item">{{ $t('forms.common.getAndRegisterTrips') }}.</p>
                <p class="App__left-column__advantages__item">{{ $t('forms.common.getInfoAboutWarehouse') }}.</p>
                <p class="App__left-column__advantages__item">{{ $t('forms.common.seeMap') }}.</p>
                <p class="App__left-column__advantages__item">{{ $t('forms.common.sendGeoposition') }}.</p>
                <p class="App__left-column__advantages__item">{{ $t('forms.common.learnAboutLoadingUnloadingPoints') }}.</p>
                <p class="App__left-column__advantages__item">{{ $t('forms.common.contactDispatcher') }}.</p>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xs="24" :md="12">
          <div class="App__img-wrapper">
              <img src="~/assets/images/app-img.jpg" alt="">
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="24" :md="18">
          <div class="App__footer">
            <p class="App__footer__desc">
              {{ $t('forms.common.botInTelegram') }}
            </p>

            <a rel="noopener" href="https://t.me/TrackCheckBot" class="App__footer__btn-telegram" target="_blank">
              <fa :icon="['fab', 'telegram-plane']"></fa>
              {{ $t('forms.common.subscribeToPageOnTelegram') }}</a>
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
  layout: "public"
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
      background: url("~assets/images/banner/img-left.jpg") no-repeat center center scroll;
      background-position-y: 65%;
    }

    &__header-right {
      background: url("~assets/images/banner/img-right.jpg") no-repeat center center scroll;
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
  padding: 80px 0px 60px;
  background-color: #fff;
  //background-color: #fbfbfb;
  color: #535353;

  .Functional__title {
    text-align: center;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    font-weight: 600;
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
      padding: 20px 30px;
      font-size: 13px;
      text-align: center;

      img {
        width: 18%;
        margin: 15px;
        height: auto;
        // background-color: transparent;
        // border: 1px solid #FECD34;
        // border-radius: 50%;
        // padding: 20px;
      }

      &__fifth {
        width: 25% !important;
        margin: 6px !important;
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
  background-image: url("~assets/images/counters_bg.jpg");
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
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 80px 120px 80px 120px;
  color: #333333 !important;

  .App__header {
    text-align: center;
    margin-bottom: 60px;

    &__title {
      font-size: 24px;
      letter-spacing: 0.36px;
      letter-spacing: 0.2rem;
      font-weight: 600;
    }
  }

  .App__left-column {
    display: flex;
    flex-direction: column;
    align-items: center;

     &__advantages {

      h1 {
        padding-bottom: 15px;
        color:#535353;
      }

      &__item {
        position: relative;
        font-size: 14px;
        color: #AAAAAA;
        padding-bottom: 5px;
        counter-increment: my-awesome-counter;

        &:before {
          content: "0" counter(my-awesome-counter);
          font-weight: 500;
          font-size: 2rem;
          margin-right: -0.5rem;
          margin-bottom: 1rem;
          line-height: 1;
          opacity: .15;
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
      color: #535353;
      letter-spacing: 0.18px;
      line-height: 30px;
      margin-bottom: 30px;
    }

    &__btn-telegram {
      color: #fff;
      border-color: #27A5E7;
      border-radius: 3px;
      padding: 9px 15px;
      background-color: #27A5E7;;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      transition: all .3s ease-in-out;
      font-size: .75rem;

      &:hover {
        box-shadow: 1px 1px 5px #27A5E7; 
        //box-shadow: 0 0 7px 0 #27A5E7 inset, 0 0 7px 1px #27A5E7;
      }

      .svg-inline--fa {
        border-right: 1px solid rgba(255,255,255,0.35);
        margin-right: 5px;
        padding-right: 10px;
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
