<template>
  <ManipulationCard
    :show-draggable="draggable"
    :show-open-button="showOpenButton"
    :show-remove-button="showRemoveButton"
    :show-select-button="showSelectButton"
    @open="handleOpen"
    @remove="handleRemove"
    @select="handleSelect"
  >
    <div class="DriversCard">
      <DriverAvatar
        class="DriversCard__avatar"
        :name="driver.firstName"
      />

      <div class="DriversCard__list">
        <span>{{ driver.fullName }}</span>
        <span class="DriversCard__list-sub">{{ driver.certSerialNumber }}</span>
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
    showRemoveButton: Boolean,
    showSelectButton: Boolean
  },

  methods: {
    handleOpen() {
      this.$emit('open', this.driver)
    },

    handleRemove() {
      this.$emit('remove', this.driver)
    },

    handleSelect() {
      this.$emit('select', this.driver)
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
