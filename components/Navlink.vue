<template>
  <div>
    <el-menu-item index="1">
      <i class="" v-bind:class="{ icon }"></i>
      <span slot="title">{{title}}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  props: ["icon", "title", "id"]
};
</script>
