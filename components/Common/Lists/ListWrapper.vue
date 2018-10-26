<template>
  <div v-loading="loading">
    <div v-if="listIsEmpty && !loading" class="ListWrapper__empty-list">
      <span>{{ emptyListTitle || $t('lists.emptyList') }}</span>
    </div>

    <div v-else>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-list-wrapper',

  props: {
    loading: Boolean,
    listIsEmpty: Boolean,
    emptyListTitle: String
  }
}
</script>

<style lang="scss" scoped>
.ListWrapper__empty-list {
  text-align: center;
}
</style>
