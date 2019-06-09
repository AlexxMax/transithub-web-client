<template>
  <ManipulationCard
    :show-draggable="draggable"
    :show-open-button="showOpenButton"
    :show-remove-button="showRemoveButton"
    @open="handleOpen"
    @remove="handleRemove"
  >
    <div class="DriversCard">
      <DriverAvatar
        class="DriversCard__avatar"
        :name="driver.firstName"
      />

      <div class="DriversCard__list">
        <span>{{ driver.fullName }}</span>
        <span class="DriversCard__list-sub">{{ driver.phone }}</span>
      </div>
    </div>
  </ManipulationCard>
</template>

<script>
import ManipulationCard from '@/components/Common/ManipulationCard'
import DriverAvatar from '@/components/Drivers/DriverAvatar'

export default {
  name: 'th-drivers-card',

  components: {
    ManipulationCard,
    DriverAvatar
  },

  props: {
    driver: {
      type: Object,
      required: true
    },
    draggable: Boolean,
    showOpenButton: Boolean,
    showRemoveButton: Boolean
  },

  methods: {
    handleOpen() {
      this.$emit('open', this.driver)
    },

    handleRemove() {
      this.$emit('remove', this.driver)
    }
  }
}
</script>

<style lang='scss' scoped>
.DriversCard {
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
