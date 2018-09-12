<template>
  <SlideRight>
    <div
      class="th-right-view-wrapper"
      :style="{ 'width': width }"
      v-show="visible">
      <div class="th-right-view">
        <div class="th-right-view-header">
          <span class="th-right-view-title">{{ title }}</span>
          <i class="el-icon-close th-right-view-header-close" @click="$emit('close')"></i>
        </div>

        <div class="th-right-view-body">
          <slot/>
        </div>
      </div>
    </div>
  </SlideRight>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import SlideRight from '@/components/Common/Transitions/SlideRight'

export default {
  name: 'th-right-view',

  components: {
    'th-button': Button,
    SlideRight
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: String
  },

  data() {
    return {
      width: '380px'
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
.th-right-view-wrapper {
  z-index: 2001;
  top: 0;
  right: 0;
  position: absolute;
  background-color: white;
  border-left: 1px solid rgb(235, 238, 245);
  height: 100vh;
  position: fixed;
  -webkit-box-shadow: -1px 0px 5px 0px rgb(235, 238, 245);
  -moz-box-shadow: -1px 0px 5px 0px rgb(235, 238, 245);
  box-shadow: -1px 0px 5px 0px rgb(235, 238, 245);

  .th-right-view {
    padding: 20px;

    .th-right-view-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 16px;

      .th-right-view-title {
        font-weight: 500;
      }
    }

    .th-right-view-body {
      margin: 20px 0;
      overflow-y: auto;
      height: calc(100vh - 99px);
    }
  }
}
</style>
