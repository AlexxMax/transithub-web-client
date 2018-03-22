<template>
  <div>
    <el-header>
      <el-menu
        :router="true"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1" route="/">
          TransitHub
        </el-menu-item>
        <el-menu-item index="2" route="/orders">
          Orders
        </el-menu-item>
        <el-menu-item index="3" route="/goods">
          Goods
        </el-menu-item>

        <el-menu-item index="4" class="el-menu-item-right">
          <nuxt-link to="/">Log in</nuxt-link>
        </el-menu-item>
      </el-menu>
    </el-header>

    <el-container>
      <el-main>
        <nuxt></nuxt>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
  #nav-logo {
    // color: grey;
    font-weight: 600;
  }

  .el-header {
    padding: 0;
    text-align: center;
    line-height: 60px;
  }

  .el-menu-item-right {
    float: right;
  }
</style>

<script>
  export default {};
</script>
