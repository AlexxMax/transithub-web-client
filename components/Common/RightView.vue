<template>
  <div>
    <Fade>
      <div
        v-if="visible"
        class="RightView__front"
        :style="{ 'width': `calc(100% - ${windowWidth})` }"
        @click="$emit('close')"/>
    </Fade>

    <SlideRight>
      <div
        class="RightView__wrapper"
        :style="{ 'width': windowWidth }"
        v-if="visible"
        v-loading="loading"
      >
        <div class="RightView">
          <div class="RightView__header">
            <span class="RightView__title">{{ title }}</span>
            <i class="el-icon-close RightView__header-close" @click="$emit('close')"></i>
          </div>

          <div class="RightView__body" :class="{ 'RightView__body-overflow-y': bodyOverflowY, 'RightView__body-with-footer': showFooter }">
            <slot/>
          </div>

          <div v-if="showFooter" class="RightView__footer">
            <slot name="footer"/>
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
    },
    width: {
      type: String,
      default: '380px'
    },
    showFooter: Boolean,
    loading: Boolean
  },

  data() {
    return {
      windowWidth: this.width
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
      this.windowWidth = this.width
      if (window.innerWidth < 380) {
        this.windowWidth = `${(window.innerWidth / 100) * 90}px`
      }
    }
  },

  watch: {
    width() {
      this.windowWidth = this.width
    }
  }
}
</script>

<style lang="scss" scoped>
.RightView__wrapper {
  z-index: 10;
  top: 0;
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

      .RightView__header-close {
        cursor: pointer;
      }
    }

    .RightView__body {
      margin: 20px 0;
      height: calc(100vh - 99px);

      &.RightView__body-overflow-y {
        overflow-y: auto;
      }

      &.RightView__body-with-footer {
        height: calc(100vh - 129px);
      }
    }

    .RightView__footer {

    }
  }
}

.RightView__front {
  z-index: 2001;
  top: 0;
  left: 0;
  background-color: rgba(90, 89, 83, 0.10);
  height: 100vh;
  position: fixed;
}
</style>
