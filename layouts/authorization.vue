<template>
  <div>
    <div class="th-rectangle">
      <nuxt-link to="../">
        <h1 class="th-logo">Transithub</h1>
        <div class="Navbar__navbar-brand__sublogo">Driving agribusiness every day</div>
      </nuxt-link>
    </div>

    <div class="lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
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

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="scss">
$color-primary: #ffce00;

.lines {
  //position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  margin: auto;
  width: 90vw;
}
.lines .line {
  position: absolute;
  width: 2px;
  height: 100%;
  top: 0;
  left: 50%;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}
.lines .line::after {
  content: "";
  display: block;
  position: absolute;
  height: 15vh;
  width: 100%;
  top: -50%;
  left: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #ffffff 75%, #ffffff 100%);
  -webkit-animation: run 7s 0s infinite;
          animation: run 7s 0s infinite;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards;
  -webkit-animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97);
          animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97);
}
.lines .line:nth-child(1) {
  margin-left: -25%;
}
.lines .line:nth-child(1)::after {
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
}
.lines .line:nth-child(3) {
  margin-left: 25%;
}
.lines .line:nth-child(3)::after {
  -webkit-animation-delay: 2.5s;
          animation-delay: 2.5s;
}

@-webkit-keyframes run {
  0% {
    top: -50%;
  }
  100% {
    top: 110%;
  }
}

@keyframes run {
  0% {
    top: -50%;
  }
  100% {
    top: 110%;
  }
}


.Navbar__navbar-brand__sublogo {
  //font-family: 'Lobster', cursive;
  font-family: 'Darker Grotesque', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 1px;
  color: white;
  text-align: center;
  //margin-top: -20px;
}

.th-rectangle {
  width: 100%;
  height: 250px;
  background-color: $color-primary;
  //background: linear-gradient(123deg, #feef34, #ffab2c);
  // background-size: 400% 400%;
  // animation: AnimationName 5s ease infinite;


  h1 {
    padding-top: 50px;
  }
}

// @keyframes AnimationName { 
//     0%{background-position:10% 0%}
//     50%{background-position:91% 100%}
//     100%{background-position:10% 0%}
// }

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
