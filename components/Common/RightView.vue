<template>
  <div>
    <Fade>
      <div
        v-show="visible"
        class="RightView__front"
        :style="{ 'width': `calc(100% - ${width})` }"
        @click="$emit('close')"/>
    </Fade>

    <SlideRight>
      <div
        class="RightView__wrapper"
        :style="{ 'width': width }"
        v-show="visible">
        <div class="RightView">
          <div class="RightView__header">
            <span class="RightView__title">{{ title }}</span>
            <i class="el-icon-close RightView__header-close" @click="$emit('close')"></i>
          </div>

          <div class="RightView__body" :class="{ 'RightView__body-overflow-y': bodyOverflowY }">
            <slot/>
          </div>
        </div>
      </div>
    </SlideRight>
  </div>
</template>

<script>
import SlideRight from '@/components/Common/Transitions/SlideRight'
import Fade from '@/components/Common/Transitions/Fade'

export default {
  name: 'th-right-view',

  components: {
    SlideRight,
    Fade
  },

  props: {
    visible: Boolean,
    title: String,
    bodyOverflowY: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      width: '380px'
    }
  },

  created() {
    if (process.browser) {
      this.handleWindowResize()
      window.addEventListener('resize', this.handleWindowResize)
    }
  },

  destroyed() {
    if (process.browser) {
      window.removeEventListener('resize', this.handleWindowResize)
    }
  },

  methods: {
    handleWindowResize: function() {
      this.width = '380px'
      if (window.innerWidth < 380) {
        this.width = `${(window.innerWidth / 100) * 90}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.RightView__wrapper {
  z-index: 2001;
  top: 61px;
  right: 0;
  position: fixed;
  background-color: white;
  border-left: 1px solid rgb(235, 238, 245);
  height: 100vh;
  -webkit-box-shadow: -1px 0px 5px 0px rgb(235, 238, 245);
  -moz-box-shadow: -1px 0px 5px 0px rgb(235, 238, 245);
  box-shadow: -1px 0px 5px 0px rgb(235, 238, 245);

  .RightView {
    padding: 20px;

    .RightView__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 16px;
      color: #606266;

      .RightView__title {
        font-weight: 500;
      }
    }

    .RightView__body {
      margin: 20px 0;
      height: calc(100vh - 99px);

      &.RightView__body-overflow-y {
        overflow-y: auto;
      }
    }
  }
}

.RightView__front {
  z-index: 2001;
  top: 0;
  left: 0;
  background-color: rgba(90, 89, 83, 0.10);
  height: 100vw;
  position: fixed;
}
</style>
