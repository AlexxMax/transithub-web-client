<template>
  <div>
    <nuxt-link
      class="FormLink"
      :to="to">
      <div class="FormLink__link">
        <span class="FormLink__link-title">{{ title }}</span>
        <span v-if="subtitle" class="FormLink__link-subtitle">{{ subtitle }}</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'th-form-link',

  props: {
    to: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: String
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
    cursor: pointer;
    display: flex;
    flex-direction: column;

    &:hover {
      background-color: #f8f8f8;
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
