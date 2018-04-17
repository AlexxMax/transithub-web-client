<template>
  <div>
    <el-row type="flex" justify="center">
      <!-- Card -->
      <el-col :xs="24" :sm="18" :md="14" :lg="10" :xl="10">

        <el-card class="box-card">
          <div class="th-congratulations">
            <h1>Реєстрація пройшла успішно!</h1>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

//
<style lang="scss" scoped>
// .th-congratulations {
//   margin-top: 50px;
//   min-height: 100%;
//   h1 {
//     font-size: 27px;
//   }
// }
//
</style>

<style lang="scss" scoped>
.el-row {
  margin: 0 !important;
}

.el-card {
  padding: 20px 40px;
  background: white;
  z-index: 100;
  margin-top: -80px;
  text-align: center;
}

@media (max-width: 700px) {
  .el-card {
    padding: 0;
    margin-top: 0;
    border: none;
  }
}

@media (max-width: 370px) {
  .el-card {
    padding: 0;
    margin-top: 0;
    border: none;
  }
}
</style>
