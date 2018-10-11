<template>
  <div>
    <Fade>
      <div
        v-show="show"
        class="LeftView__front"
        :style="{ 'width': `calc(100% - ${width})` }"
        @click="$emit('close')"/>
    </Fade>

    <SlideLeft>
      <div
        class="LeftView"
        v-show="show"
        :class="{ 'LeftView__margin-left-60px': collapse }"
        :style="{ 'width': width }">
        <div class="LeftView__container">
          <slot/>
        </div>
      </div>
    </SlideLeft>
  </div>
</template>

<script>
import SlideLeft from '@/components/Common/Transitions/SlideLeft'
import Fade from '@/components/Common/Transitions/Fade'

export default {
  components: {
    SlideLeft,
    Fade
  },

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      width: '300px'
    }
  },

  computed: {
    collapse() {
      return this.$store.state.userSettings.navmenu.collapse
    }
  },

  methods: {
    handleWindowResize: function() {
      this.width = '300px'
      if (window.innerWidth < 500) {
        this.width = `${((window.innerWidth - 60) / 100) * 90}px`
      }
    }
  },

  created() {
    if (process.browser) {
      window.addEventListener('resize', this.handleWindowResize)
    }
  },

  destroyed() {
    if (process.browser) {
      window.removeEventListener('resize', this.handleWindowResize)
    }
  }
}
</script>

<style lang="scss" scoped>
.LeftView {
  z-index: 2001;
  top: 0;
  position: absolute;
  margin-left: 200px;
  background-color: white;
  border-right: 1px solid rgb(235, 238, 245);
  height: 100vh;

  &.LeftView__margin-left-60px {
    margin-left: 64px;
  }

  .LeftView__container {
    margin: 20px;
  }
}

.LeftView__front {
  z-index: 2001;
  top: 0;
  right: 0;
  background-color: rgba(90, 89, 83, 0.10);
  height: 100vw;
  position: fixed;
}
</style>


