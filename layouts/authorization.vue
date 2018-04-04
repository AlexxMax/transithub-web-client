<template>
  <div>
      <div class="th-rectangle">
        <h1>Transithub</h1>
      </div>
      <nuxt></nuxt>
  </div>

</template>

<style scoped>
.th-rectangle {
  width: 100%;
  height: 250px;
  background-color: #f0b917;
}

h1 {
  font-size: 36px;
  letter-spacing: 1px;
  font-family: "Bebas Neue" !important;
  text-transform: uppercase;
  color: white;
  text-align: center;
  padding-top: 50px;
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


