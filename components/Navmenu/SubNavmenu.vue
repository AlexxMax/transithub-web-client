<template>
  <div>
    <Fade>
      <div
        v-show="show"
        class="Subnavmenu__front"
        :style="{ 'width': `calc(100% - ${width})` }"
        @click="$emit('close')"/>
    </Fade>

    <SlideLeft>
      <div
        class="th-subnavmenu"
        v-show="show"
        :class="{ 'th-subnavmenu-margin-left-60px': collapse }"
        :style="{ 'width': width }">
        <div class="th-subnavmenu-container">
          <div class="th-subnavmenu-header">
            <span class="th-subnavmenu-header-title">{{ $t(title) }}</span>
            <i class="el-icon-close th-subnavmenu-header-close" @click="$emit('close')"></i>
          </div>
        </div>

        <div class="th-subnavmenu-container">
          <pre>{{ items }}</pre>
          <th-navlink
            v-for="(item, index) in items"
            :key="index"
            :link="item.link"
            :icon="item.icon"
            :title="item.title"
            @clicked="handleNavlinkClicked">
          </th-navlink>
        </div>
      </div>
    </SlideLeft>
  </div>
</template>

<script>
import Navlink from '@/components/Navmenu/Navlink'
import SlideLeft from '@/components/Common/Transitions/SlideLeft'
import Fade from '@/components/Common/Transitions/Fade'

export default {
  components: {
    "th-navlink": Navlink,
    SlideLeft,
    Fade
  },

  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    items: Array,
    collapse: Boolean
  },

  data() {
    return {
      width: '300px'
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
      this.width = '300px'
      if (window.innerWidth < 500) {
        this.width = `${((window.innerWidth - 60) / 100) * 90}px`
      }
    },
    handleNavlinkClicked() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.th-subnavmenu {
  z-index: 2001;
  top: 0;
  position: absolute;
  margin-left: 200px;
  background-color: white;
  border-right: 1px solid rgb(235, 238, 245);
  height: 100vh;

  &.th-subnavmenu-margin-left-60px {
    margin-left: 64px;
  }

  .th-subnavmenu-container {
    margin: 20px;

    .th-subnavmenu-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: #A3A2A2;

      .th-subnavmenu-header-title {
        text-transform: uppercase;
        font-size: 11px;
        font-weight: 500;
      }

      .th-subnavmenu-header-close {
        font-size: 16px;
      }
    }

  }
}

.Subnavmenu__front {
  z-index: 2001;
  top: 0;
  right: 0;
  background-color: rgba(90, 89, 83, 0.10);
  height: 100vw;
  position: fixed;
}
</style>
