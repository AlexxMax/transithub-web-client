<template>
  <div>
    <p class="VehiclesRegisterGenerationFormListView__list-title">{{ $t('lists.requestsEquipments') }}</p>

    <div class="VehiclesRegisterGenerationFormListView__list-toolbar">
      <Button
        round
        type="primary"
        fa-icon="plus"
        @click="handleGoToEditView"
      >
        {{ $t('forms.common.generateVehiclesRegister') }}
      </Button>
    </div>

    <VehiclesRegistersList
      instant-fill-up
      :request-guid="requestGuid"
    />
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import VehiclesRegistersList from "@/components/VehiclesRegisters/SubordinateList"

export default {
  name: 'th-vehicles-registers-genetarion-form-list-view',

  components: {
    Button,
    VehiclesRegistersList
  },

  props: {
    requestGuid: {
      type: String,
      required: true
    }
  },

  methods: {
    handleGoToEditView() {
      this.$emit('go-to-edit-view')
    }
  }
}
</script>

<style lang='scss' scoped>
.VehiclesRegisterGenerationFormListView {
  &__list {
    &-title {
      font-weight: 500;
    }

    &-toolbar {
      margin: {
        bottom: 20px;
      }
    }
  }
}

</style>
