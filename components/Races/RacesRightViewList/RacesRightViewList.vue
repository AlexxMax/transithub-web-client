<template>
  <div>
    <p class="RacesRightListView__list-title">{{ $t('lists.requestsRaces') }}</p>
    <RacesList :request-guid="request.guid" />
  </div>
</template>

<script>
import RacesList from "@/components/Races/SubordinateList"

export default {
  name: 'th-races-form-list-view',

  components: {
    RacesList
  },

  props: {
    request: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
.RacesRightListView {
  &__list {
    &-title {
      font-weight: 500;
    }
  }
}

</style>
