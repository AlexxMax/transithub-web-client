<template>
  <div>
    <div class="th-main">
      <el-row type="flex" justify="center">
        <el-col :xs="16" :sm="14" :md="10" :lg="7" :xl="7">
          <div class="th-header-text">
            <span>Ми відкриваємо унікальні можливості перевезень</span>
          </div>
          <el-row class="th-btn-cont">
            <el-button class="btn btn-more">Дізнатися більше</el-button>
            <el-button class="btn btn-login">Ввійти</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="th-orders">
      <el-row type="flex" justify="center">
        <el-col :xs="20" :sm="18" :md="18" :lg="18" :xl="18">
          <div class="th-section-text">
            <p class="section-heading">Замовлення</p>

            <p class="section-subheading">Lorem ipsum pariatur exaperiam, e rat voluptatem exaperiam, e rat voluptatem. Lorem ipsum pariatur exaperiam,
              e rat voluptatem exaperiam, e rat voluptatem</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-row type="flex" justify="space-around" style="margin-top: 80px">
          <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="11" :xl="11">
            <el-card :body-style="{ padding: '0px' }">
              <img src="~assets/images/Map.png" class="image-map">
              <div class="bottom clearfix">
                <el-col :lg="8" :xl="8">
                  <p>Пункт завантаження:
                    <span>Вербичне </span>
                  </p>
                </el-col>
                <el-col :lg="8" :xl="8">
                  <p>Пункт розвантаження:
                    <span>Смоляри-Світязькі</span>
                  </p>
                </el-col>
                <el-col :lg="8" :xl="8">
                  <p>Вантаж:
                    <br>
                    <span>Соняшник </span>
                  </p>
                </el-col>
              </div>
            </el-card>
          </el-col>
           <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="11" :xl="11">
            <el-card :body-style="{ padding: '0px' }">
              <img src="~assets/images/Map.png" class="image-map">
              <div class="bottom clearfix">
                <el-col :lg="8" :xl="8">
                  <p>Пункт завантаження:
                    <span>Вербичне </span>
                  </p>
                </el-col>
                <el-col :lg="8" :xl="8">
                  <p>Пункт розвантаження:
                    <span>Смоляри-Світязькі</span>
                  </p>
                </el-col>
                <el-col :lg="8" :xl="8">
                  <p>Вантаж:
                    <br>
                    <span>Соняшник </span>
                  </p>
                </el-col>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.th-main {
  width: 100%;
  height: 850px !important;
  background: url("~/assets/images/truck.png") no-repeat center center;
  .th-header-text {
    text-align: center;
    margin-top: 200px;
    margin-left: auto;
    margin-right: auto;
    span {
      color: #464949;
      font-size: 40px;
      letter-spacing: 1px;
    }
  }
  .th-btn-cont {
    margin-top: 80px;
    display: flex;
    justify-content: center;
    .btn {
      margin-right: 20px;
      border: 5px !important;
      padding: 12px 25px !important;
      &.btn-more {
        color: #f0b917;
        &:hover {
          background-color: #fbf0f0;
        }
      }
      &.btn-login {
        color: white;
        background-color: #f0b917;
        &:hover {
          background-color: #f4c333;
        }
      }
    }
  }
}

.th-orders {
  padding: 100px;
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

  .bottom {
    padding: 12px;
    margin-top: 10px;
    text-align: center;
    color: #464949;
    span {
      font-size: 15px;
      font-weight: 600;
    }
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
}

.image-map {
  width: 100%;
}
</style>
<script>
export default {
  layout: "public"
};
</script>
