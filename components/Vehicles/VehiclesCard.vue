<template>
  <ManipulationCard
    :show-draggable="draggable"
    :show-open-button="showOpenButton"
    :show-remove-button="showRemoveButton"
    @open="handleOpen"
    @remove="handleRemove"
  >
    <div class="VehiclesCard">
      <VehicleAvatar
        class="VehiclesCard__avatar"
        :name="vehicle.brand"
      />

      <div class="VehiclesCard__list">
        <span>{{ vehicle.vNumber }}</span>
        <span class="VehiclesCard__list-sub">{{ vehicle.typeName }}</span>
      </div>
    </div>
  </ManipulationCard>
</template>

<script>
import ManipulationCard from '@/components/Common/ManipulationCard'
import VehicleAvatar from '@/components/Vehicles/VehicleAvatar'

export default {
  name: 'th-vehicles-card',

  components: {
    ManipulationCard,
    VehicleAvatar
  },

  props: {
    vehicle: {
      type: Object,
      required: true
    },
    draggable: Boolean,
    showOpenButton: Boolean,
    showRemoveButton: Boolean
  },

  methods: {
    handleOpen() {
      this.$emit('open', this.vehicle)
    },

    handleRemove() {
      this.$emit('remove', this.vehicle)
    }
  }
}
</script>

<style lang='scss' scoped>
.VehiclesCard {
  display: flex;
  flex-direction: row;

  &__avatar {
    margin-right: 10px;
    height: 44px;
    width: 44px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &-sub {
      font-size: 12px;
      color: #AFB0B2;
    }
  }
}
</style>
