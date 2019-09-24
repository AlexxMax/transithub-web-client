<template>
  <div>
    <Fade>
      <div
        v-show="visible"
        class="LeftView__front"
        :style="{ 'width': `calc(100% - ${windowWidth})` }"
        @click="$emit('close')"/>
    </Fade>

    <SlideLeft>
      <div
        class="LeftView"
        v-show="visible"
        :style="{ 'width': windowWidth }">
        <div class="LeftView__container">
          <div class="LeftView__header">
            <span class="LeftView__title">{{ title }}</span>
          </div>

          <div class="LeftView__body" :class="{ 'LeftView__body-overflow-y': bodyOverflowY }">
            <slot/>
          </div>
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
    title: String,
    visible: {
      type: Boolean,
      default: false
    },
    bodyOverflowY: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '300px'
    }
  },

  data() {
    return {
      windowWidth: this.width
    }
  },

  methods: {
    handleWindowResize: function() {
      this.windowWidth = this.width
      if (window.innerWidth < 300) {
        this.windowWidth = `${(window.innerWidth / 100) * 90}px`
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
  z-index: 1995; // https://github.com/ElemeFE/element/blob/dev/src/utils/popup/popup-manager.js has initial zIndex of 2000
  top: 0;
  position: fixed;
  margin-left: 0;
  background-color: white;
  border-right: 1px solid rgb(235, 238, 245);
  height: 100vh;

  .LeftView__container {
    margin: 20px;

    .LeftView__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 16px;
      color: #606266;

      .LeftView__title {
        font-weight: 500;
      }
    }

    .LeftView__body {
      margin: 20px 0 10px;
      height: calc(100vh - 59px);

      &.LeftView__body-overflow-y {
        overflow-y: auto;
      }
    }
  }
}

.LeftView__front {
  z-index: 1990; // https://github.com/ElemeFE/element/blob/dev/src/utils/popup/popup-manager.js has initial zIndex of 2000
  top: 0;
  right: 0;
  background-color: rgba(90, 89, 83, 0.10);
  height: 100vh;
  position: fixed;
}
</style>


