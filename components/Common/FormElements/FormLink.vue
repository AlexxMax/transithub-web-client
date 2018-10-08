<template>
  <div>
    <component
      :is="component"
      class="FormLink"
      :to="to">
      <div :class="{ 'FormLink__link': true, 'FormLink_link-hover': !!to }">
        <span class="FormLink__link-title">{{ title }}</span>
        <span v-if="subtitle" class="FormLink__link-subtitle">{{ subtitle }}</span>
        <span class="FormLink__link-subtitle">
          <slot/>
        </span>
      </div>
    </component>
  </div>
</template>

<script>
export default {
  name: 'th-form-link',

  props: {
    to: String,
    title: {
      type: String,
      required: true
    },
    subtitle: String
  },

  computed: {
    component() {
      return this.to ? 'nuxt-link' : 'div'
    }
  }
}
</script>

<style lang="scss" scoped>
.FormLink {
  text-decoration: none;
  color: inherit;

  .FormLink__link {
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;

    &.FormLink_link-hover {
      cursor: pointer;

      &:hover {
        background-color: #f8f8f8;
      }
    }

    .FormLink__link-title {
      font-size: 14px;
      font-weight: 500;
    }

    .FormLink__link-subtitle {
      font-size: 13px;
      color: #909399;
      margin-top: 5px;
    }
  }
}
</style>
