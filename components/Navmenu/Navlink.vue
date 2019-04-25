<template>
  <component
    :is="component"
    class="Navlink"
    :to="$i18n.path(link)"
    @click="go(link)">
    <div :class="{ 'Navlink__title': true }">
      <!-- <span v-show="!collapse">{{ $t(title) }}</span> -->
      <span>{{ $t(title) }}</span>

       <span :class="{ 'Navlink__icon-wrapper': collapse }" style="width: 100%;" @click="expand = !expand">
        <fa class="Navlink__icon" :icon="icon" />
      </span>
    </div>

    <!-- <div v-if="menu">
      <fa v-show="toggled" icon="angle-left" />
      <fa v-show="!toggled" icon="angle-right" />
    </div> -->
  </component>
</template>

<script>
export default {
  name: 'th-navlink',

  props: {
    link: String,
    // icon: {
    //   type: String,
    //   required: true
    // },
    title: {
      type: String,
      required: true
    },
    menu: Boolean,
    //toggled: Boolean,
    collapse: Boolean
  },

  data: () => ({
    expand: false
  }),

  computed: {
    component() {
      return 'div'
      // return this.menu ? 'div' : 'nuxt-link'
    },

    icon() {
      return this.expand ? 'angle-up' : 'angle-down'
    }
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
.Navlink {
  padding: 10px 10px;
  //margin: 5px;
  border-radius: 5px;
  color: #606266;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;

  // &:hover {
  //   background-color: #f8f8f8;
  //   // background-color: #FFD74D;
  //   // color: white;
  // }

  .Navlink__title {
    width: 100%;

    &.Navlink__title-align {
      text-align: center;
    }

    .Navlink__icon-wrapper {
      margin-left: 8px;
    }

    // .Navlink__icon {
    //   width: 25px;
    // }
  }
}
</style>


