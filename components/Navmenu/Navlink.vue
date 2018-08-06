<template>
  <div
    class="th-navmenu-link"
    @click="go(link)">
    <div class="th-navmenu-link-title">
      <span :class="{ 'th-navmenu-link-icon-wrapper': !collapse }" style="width: 100%;">
        <fa class="th-navmenu-link-icon" :icon="icon" />
      </span>
      <span v-show="!collapse" >{{ $t(title) }}</span>
    </div>
    <div v-if="menu" class="th-navmenu-link-cur">
      <fa v-show="toggled" icon="angle-left" />
      <fa v-show="!toggled" icon="angle-right" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: String,
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    menu: Boolean,
    toggled: Boolean,
    collapse: Boolean
  },

  methods: {
    go: function(link) {
      if (link) {
        this.$router.push(this.$i18n.path(link))
      }
      this.$emit('clicked')
    }
  }
}
</script>

<style lang="scss" scoped>
.th-navmenu-link {
  padding: 10px 10px;
  margin: 10px;
  border-radius: 5px;
  color: #303133;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }

  .th-navmenu-link-title {
    width: 100%;

    .th-navmenu-link-icon-wrapper {
      margin-right: 10px;
    }

    .th-navmenu-link-icon {
      width: 25px;
    }
  }
}
</style>


