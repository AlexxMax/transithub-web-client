<template>
  <div class="Company">
    <Avatar
      v-if="name"
      :style="'margin-right: 5px'"
      :name="name || ' '" />

    <p class="Company__title">
      {{ name }}
    </p>
  </div>
</template>

<script>
import Avatar from '@/components/Companies/CompanyAvatar'

export default {
  name: 'th-company',

  components: {
    Avatar
  },

  props: {
    name: String
  }
}
</script>

<style lang="scss" scoped>
.Company {
  display: flex;
  flex-direction: row;

  .Company__title {
    margin-top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 40px;
    width: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
}
</style>
