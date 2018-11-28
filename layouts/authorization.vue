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

<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="scss">
.th-rectangle {
  width: 100%;
  height: 250px;
  background-color: #f0b917;

  h1 {
    padding-top: 50px;
  }
}

@media (max-width: 700px) {
  .th-rectangle {
    height: 15vh;

    h1 {
      padding-top: 2rem;
    }
  }
}

@media (max-width: 370px) {
  .th-rectangle {
    height: 6vh;

    h1 {
      font-size: 18px;
      padding-top: .5rem;
    }
  }
}
</style>
