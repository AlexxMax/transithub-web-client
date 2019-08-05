<template>
  <ListWrapper
    :loading="loading"
    :list-is-empty="count === 0"
    :empty-list-title="$t('lists.vehiclesRegisterEmptyList')"
  >
    <ListItem
      v-for="r of list"
      :key="r.guid"
      :row="r"
      :outcome="r.outcome"
      show-less-info
      show-open-request-button
    />
  </ListWrapper>
</template>

<script>
import ListWrapper from "@/components/Common/Lists/ListWrapper"
import ListItem from "@/components/VehiclesRegisters/ListItem"

export default {
  name: 'th-vehicles-registers-partisipant-list',

  components: { ListWrapper, ListItem },

  props: {
    list: Array,
    loading: Boolean,
    count: Number
  }
}
</script>
