<template>
  <div
    class="RaceFormVehicleRegisterCard"
    @click="$emit('select', item)"
  >
    <Card :class="{ 'RaceFormVehicleRegisterCard__selected': selected }">
      <div class="RaceFormVehicleRegisterCard__content">

        <div class="RaceFormVehicleRegisterCard__content__row">
          <Status
            :title="$t(item.status.localeKey)"
            :color="item.status.color"
          />

          <span class="RaceFormVehicleRegisterCard__content__date">{{ item.requestScheduleDate }}</span>
        </div>

        <div class="RaceFormVehicleRegisterCard__content__row">
          <Route
            :point-from-name="item.pointFromName"
            :point-from-region="item.pointFromRegion"
            :point-to-name="item.pointToName"
            :point-to-region="item.pointToRegion"
            :distance="item.distance"
            :show-dialog-on-click="false"
          />
        </div>

        <div class="RaceFormVehicleRegisterCard__content__row">
          <div class="RaceFormVehicleRegisterCard__content__goods">{{ item.goodsName }}</div>
        </div>

      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Common/Card'
import Status from "@/components/Common/FormElements/Constituents/Status"
import Route from '@/components/Common/RouteVertical'

export default {
  name: 'th-driver-workspace-race-form-vehicle-register-card',

  components: { Card, Status, Route },

  props: {
    item: {
      type: Object,
      required: true,
    },
    selected: Boolean
  },
}
</script>

<style lang='scss' scoped>
.RaceFormVehicleRegisterCard {

  &__selected {
    background-color: $--color-primary;
  }

  &__content {
    display: flex;
    flex-direction: column;

    &__row {
      margin-bottom: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    :last-child {
      margin-bottom: 0px;
    }

    &__date {
      font-size: 16px;
      font-weight: 600;
      color: $--main-text-color;
    }

    &__goods {
      font-size: 16px;
      font-weight: 600;
      color: $--main-text-color;
    }
  }
}
</style>
