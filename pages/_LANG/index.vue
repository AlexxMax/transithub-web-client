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

    <!-- Calculation -->
    <div id="Calculation">
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
            <!-- <i class="fas fa-map-marker-alt"></i> -->
            <el-input
              :placeholder="$t('forms.common.enterPointFrom')">
            </el-input>
          </div>
        </el-col>

        <el-col :xs="18" :sm="14" :lg="6">
          <div class="Calculation__input-inline">
            <!-- <i class="fas fa-map-marker-alt"></i> -->
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

#Calculation {
  padding: 100px 20px 70px 20px;

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
}
</style>
