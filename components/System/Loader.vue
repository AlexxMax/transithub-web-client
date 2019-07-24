<template lang="html">
  <Fade>
    <div class="Loader" v-if="loading">
      <h1>TRANSITHUB</h1>
      <span>Driving agribusiness every day</span>
    </div>
  </Fade>
</template>

<script>
import Fade from '@/components/Common/Transitions/Fade'

export default {
  name: 'th-loading',

  components: { Fade },

  data() {
    return {
      loading: false
    }
  },

  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.Loader {
  position: fixed;
  z-index: 100000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(90, 89, 83, 0.9);

  h1 {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 36px;
    color: #FFD74D;
    font-weight: 300;
    animation: blinker 3s linear infinite;
  }

  span {
    margin-top: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    //font-family: 'Lobster', cursive;
    font-family: 'Darker Grotesque', sans-serif;
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 1px;
    color: white;
    text-align: center;
    animation: blinker 3s linear infinite;
  }
}

@keyframes blinker {
  50% { opacity: 0; }
}
</style>
