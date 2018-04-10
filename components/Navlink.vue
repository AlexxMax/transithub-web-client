<template>
  <div>
    <el-menu-item index="1">
      <i class="el-icon-goods"></i>
      <span slot="title">{{title}}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Замовлення"
    };
  }
};
</script>
