<template>
  <div>
    <div class="th-footer">
      <div class="th-back">
        <a @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>Скасувати
        </a>
      </div>
      <el-button type="danger" @click.prevent="removeDomain(item)">Видалити</el-button>
      <el-button class="th-chagne-data" type="primary" @click="saveMainData">Змінити дані</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.th-footer {
  position: fixed;
  bottom: 0;
  margin-bottom: 17px;

  .th-back {
    display: inline-block;
    margin-right: 40px;
    cursor: pointer;
  }
}
</style>
