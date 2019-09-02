<template>
  <div class="RaceFormSelect" @click="$emit('click')">
    <div class="RaceFormSelect__title">{{ field }}</div>
    <div class="RaceFormSelect__arrow">
      <fa icon="chevron-right"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-driver-warehouse-race-form-select',

  props: {
    title: String,
    placeholder: String,
  },

  computed: {
    field() {
      return this.title || this.placeholder
    },
  },
}
</script>

<style lang='scss' scoped>
.RaceFormSelect {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: -$--driver-workspace-padding;
  padding: $--driver-workspace-padding;

  &__title {
    max-width: 90%;

    // white-space: nowrap;
    // text-overflow: ellipsis;
    //
    // overflow: hidden;
  }

  &_arrow {
    font-size: 16px;
  }
}
</style>
