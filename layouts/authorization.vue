<template>
  <div>
    <div class="th-rectangle">
      <nuxt-link to="../">
        <h1 class="th-logo">Transithub</h1>
        <div class="Navbar__navbar-brand__sublogo">Driving agribusiness every day</div>
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
.Navbar__navbar-brand__sublogo {
  font-family: 'Lobster', cursive;
  font-size: 13px;
  letter-spacing: 1px;
  color: white;
  text-align: center;
  margin-top: -20px;
}

.th-rectangle {
  width: 100%;
  height: 250px;
  //background-color: #f0b917;
  background: linear-gradient(123deg, #fecd34, #ffab2c);
  background-size: 400% 400%;
  animation: AnimationName 5s ease infinite;


  h1 {
    padding-top: 50px;
  }
}

@keyframes AnimationName { 
    0%{background-position:10% 0%}
    50%{background-position:91% 100%}
    100%{background-position:10% 0%}
}

@media (max-width: 700px) {
  .th-rectangle {
    height: 17vh;

    h1 {
      padding-top: 2rem;
    }
  }
}

@media (max-width: 370px) {
  .Navbar__navbar-brand__sublogo {
    display: none;
  }

  .th-rectangle {
    height: 6vh;

    h1 {
      font-size: 18px;
      padding-top: .5rem;
    }
  }
}
</style>
