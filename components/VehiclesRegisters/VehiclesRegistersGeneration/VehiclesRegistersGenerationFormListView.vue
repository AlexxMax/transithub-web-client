<template>
  <div>
    <p class="VehiclesRegisterGenerationFormListView__list-title">{{ $t('lists.requestsEquipments') }}</p>

    <div class="VehiclesRegisterGenerationFormListView__list-toolbar">
      <Button
        v-if="request.quantityT > 0 && !request.outdated"
        :loading="loading"
        round
        type="primary"
        fa-icon="plus"
        @click="handleGoToEditView"
      >
        {{ $t('forms.common.generateVehiclesRegister') }}
      </Button>

      <el-alert
        v-if="request.quantityT <= 0"
        show-icon
        type="info"
        :title="$t('messages.alertVehicleRegisterEditDisabledByRequestQuantity')"
        :description="$t('messages.alertVehicleRegisterEditDisabled')"
      />

      <el-alert
        v-if="request.outdated"
        style="margin-top: 5px"
        show-icon
        type="info"
        :title="$t('messages.alertVehicleRegisterEditDisabledByRequestOutdated')"
        :description="$t('messages.alertVehicleRegisterEditDisabled')"
      />
    </div>

    <VehiclesRegistersList :request-guid="request.guid" :request-date="request.createdAt"/>
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
    request: {
      type: Object,
      required: true
    }
  },

  computed: {
    loading() {
      return this.$store.state.vehiclesRegisters.subordinateListLoading
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
