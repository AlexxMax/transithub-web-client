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
        <el-col :xs="20" :sm="18" :md="18" :lg="12" :xl="12">
          <div class="th-section-text">
            <span class="section-heading">Замовлення</span>
            <br>
            <span class="section-subheading">Lorem ipsum pariatur exaperiam, e rat voluptatem exaperiam, e rat voluptatem. Lorem ipsum pariatur exaperiam,
              e rat voluptatem exaperiam, e rat voluptatem</span>
          </div>
        </el-col>
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
  padding: 6.25rem 0;
  .th-section-text {
    text-align: center;
    .section-heading {
      font-size: 25px;
    }
    .section-subheading {
      font-size: 15px;
    }
  }
}
</style>
<script>
export default {
  layout: "public"
};
</script>
