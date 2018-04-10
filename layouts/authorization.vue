<template>
  <div>
    <div class="th-rectangle">
      <nuxt-link to="../">
        <h1 class="th-logo">Transithub</h1>
      </nuxt-link>

    </div>
    <nuxt></nuxt>
  </div>

</template>

<style scoped lang="scss">
.th-rectangle {
  width: 100%;
  height: 250px;
  background-color: #f0b917;

  h1 {
    padding-top: 50px;
  }
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
