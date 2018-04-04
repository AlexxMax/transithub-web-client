<template>
  <div>
      <div class="th-rectangle"></div>
      <nuxt></nuxt>
  </div>

</template>

<style scoped>
.th-rectangle {
  width: 100%;
  height: 300px;
  background-color: #f0b917;
}
</style>

<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>


