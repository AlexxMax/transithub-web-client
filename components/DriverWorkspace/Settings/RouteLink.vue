<template>
  <div>
    <component :is="component" :href="href" :to="to" exact :rel="rel" :target="target">

      <div class="RouteLink__wrapper">

        <div class="RouteLink__wrapper__left">
          <span class="RouteLink__wrapper__left-icon">
            <fa 
              v-if="faIcon"
              :icon="faIcon"
              class="RouteLink__wrapper__left-icon-fa"
              v-bind:style="{ color: logOutColor }"/>
          </span>

          <span class="RouteLink__wrapper__left-title">{{ title }}</span>
        </div>
        
        <span class="RouteLink__wrapper__icon-arrow">
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
    </component>
  </div>
</template>

<script>
export default {
  name: "th-route-link",

  props: {
    faIcon: [ String, Array ],
    title: {
      type: String,
      default: ''
    },
    to: String,
    href: String,
    rel: String,
    target: String,
    component: String,
    logOutColor: String
  }
}
</script>

<style lang="scss" scoped>
.RouteLink__wrapper {
  display: flex;
  justify-content: space-between;
  color: $--main-text-color;
  background: #fff;
  padding: 18px 25px;

  &__left {
    display: flex;
    flex-direction: row;
    flex: 1;

    &-icon {
      margin-right: 7px;
      flex: 0 0 1.7em;
      color: $--color-primary;
    }

    &-title {
      flex: 1;
    }
  }

  &__icon-arrow {
    flex: 0 0 1em;
    margin-left: 6px;
  }
}
</style>