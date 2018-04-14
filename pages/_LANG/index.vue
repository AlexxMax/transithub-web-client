<template>
  <div>

    <!-- Banner -->
    <div class="th-main">
      <el-row type="flex" justify="center">
        <el-col :xs="16" :sm="14" :md="10" :lg="7" :xl="7">
          <div class="th-header-text">
            <span>Ми відкриваємо унікальні можливості перевезень</span>
          </div>
          <el-row class="th-btn-cont">
            <a class="btn btn-more el-button" v-scroll-to="'#orders'">Дізнатися більше</a>
            <a class="btn btn-login el-button" href="/login">Ввійти</a>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="th-orders" id="orders">
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="20" :md="18" :lg="18" :xl="18">

          <div class="th-section-text">
            <p class="section-heading">Замовлення</p>
            <p class="section-subheading">Lorem ipsum pariatur exaperiam, e rat voluptatem exaperiam, e rat voluptatem. Lorem ipsum pariatur exaperiam,
              e rat voluptatem exaperiam, e rat voluptatem</p>
          </div>

        </el-col>
      </el-row>

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
.th-main {
  width: 100%;
  height: 100vh;
  background: url("~/assets/images/truck.png") no-repeat center center;
  background-color: rgba(1,1,1,0.7);

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

    a {
      text-decoration: none;
      color: #f0b917;
      &.btn {
        margin-right: 20px;
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

    .btn {
      margin-right: 20px;
      border: 5px !important;
      padding: 12px 25px !important;
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
