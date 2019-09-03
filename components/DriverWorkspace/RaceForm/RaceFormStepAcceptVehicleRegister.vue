<template>
  <div class="RaceFromAcceptVehicleRegister">
    <Scaffold
      :title="title"
      :subtitle="subtitle"
      :percentage="percentage"
      :buttons="buttons"
      @close="$emit('close')"
    >
      <div class="RaceFromAcceptVehicleRegister__content">
        <div class="RaceFromAcceptVehicleRegister__content__title">
          <span>{{ outfitNumber }}</span>
        </div>

        <div class="RaceFromAcceptVehicleRegister__content__data">
          <Group :title="$t('forms.common.pointFrom')">
            <span>{{ pointFromFullPath }}</span>
          </Group>

          <Group :title="$t('forms.common.sender')">
            <span>{{ form.senderName }}</span>
          </Group>

          <Group :title="$t('forms.common.carrier')">
            <span>{{ form.carrierName }}</span>
          </Group>

          <Group :title="$t('forms.common.goods')">
            <span>{{ form.goodsName }}</span>
          </Group>
        </div>
      </div>
    </Scaffold>
  </div>
</template>

<script>
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormScaffold'
import Group from '@/components/DriverWorkspace/RaceForm/RaceFormGroup'

export default {
  name: 'th-driver-workspace-race-form-accept-vehicle-register',

  components: {
    Scaffold,
    Group,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    percentage: Number,
    buttons: Array,
    form: {
      type: Object,
      required: true,
    },
  },

  computed: {
    outfitNumber() {
      return `${this.$t('forms.common.vehiclesRegisterOutfit')}: ${this.form.requestNumber}`
    },

    pointFromFullPath() {
      return `${this.form.pointFromRegion}, ${this.form.pointFromName}`
    },
  }
}
</script>

<style lang='scss' scoped>
.RaceFromAcceptVehicleRegister {
  &__content {

    &__title {
      @include mobile-driver-workspace--title;
      padding: 0px $--driver-workspace-padding;
    }

    &__data {
      margin-top: 25px;

    }
  }
}
</style>
