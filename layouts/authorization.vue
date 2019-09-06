<template>
  <div>
    <div class="th-rectangle">
      <nuxt-link to="../">
        <h1 class="th-logo">Transithub</h1>
        <div class="Navbar__navbar-brand__sublogo">Driving agribusiness every day</div>
      </nuxt-link>
    </div>
    <nuxt></nuxt>
    <Cookies />
  </div>
</template>

<script>
import Cookies from '@/components/Common/Cookies'

export default {
  components: {
    Cookies
  },

  // methods: {
  //   handleSelect(key, keyPath) {
  //   }
  // }
};
</script>

<style scoped lang="scss">
$color-primary: #FFC854;

.Navbar__navbar-brand__sublogo {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 1px;
  color: white;
  text-align: center;
  margin-top: -20px;
}

.th-rectangle {
  width: 100%;
  height: 250px;
  background-color: $color-primary;

  h1 {
    padding-top: 50px;
  }
}

@media (max-width: 700px) {
  .Navbar__navbar-brand__sublogo {
    display: none;
  }

  .th-rectangle {
    height: 15vh;

    h1 {
      font-size: 2rem;
      font-weight: 500;
      padding-top: 2.7rem;
    }
  }
}

@media (max-width: 370px) {
  .th-rectangle {
    height: 20vh;
  }
}
</style>
