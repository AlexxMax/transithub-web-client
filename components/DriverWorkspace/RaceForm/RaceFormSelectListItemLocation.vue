<template>
<div
  class="RaceFormSelectListItemLocation"
  @click="$emit('select', item)"
>
  <span class="RaceFormSelectListItemLocation__name">{{ item.name }}</span>
  <div class="RaceFormSelectListItemLocation__hyphen">—</div>
  <div class="RaceFormSelectListItemLocation__type">{{ item.type }}</div>
</div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang='scss' scoped>

.RaceFormSelectListItemLocation {
    padding: .5rem 0;

    display: flex;
    align-items: center;

    border-bottom: $--driver-workspace-border;

    cursor: pointer;

    &:hover {
      .RaceFormSelectListItemLocation {
        &__name {
          color: $--color-primary;
        }
      }
    }

    &__name {
        max-width: 95%;

        white-space: nowrap;
        text-overflow: ellipsis;

        overflow: hidden;
    }

    &__hyphen {
      margin: 0 .5rem;
    }

    &__type {
        color: $--color-info;
    }
}
</style>
