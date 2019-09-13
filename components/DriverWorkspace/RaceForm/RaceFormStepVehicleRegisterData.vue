<template>
<div class="RaceFormStepVehicleRegisterData">
  <Scaffold
    :title="title"
    :subtitle="subtitle"
    :percentage="percentage"
    :buttons="buttons"
    @close="$emit('close')"
  >
    <div>

      <!-- <Group :title="$t('forms.common.driver')">
        <div class="RaceFormStepVehicleRegisterData__driver">
          <span>{{ form.driverFullName || '—' }}</span>
          <span>{{ form.driverCert || '—' }}</span>
        </div>
      </Group> -->

      <Group :title="$t('forms.common.driver')">
        <RaceFormDriver :form="form" />
      </Group>

      <Group :title="$t('forms.common.transport')">
        <div class="RaceFormStepVehicleRegisterData__transport">
          <div class="RaceFormStepVehicleRegisterData__block">
            <span class="RaceFormStepVehicleRegisterData__subtitle">{{ $t('forms.common.vehicle') }}</span>
            <span>{{ form.vehicleNumber }}</span>
          </div>

          <div class="RaceFormStepVehicleRegisterData__block">
            <span class="RaceFormStepVehicleRegisterData__subtitle">{{ $t('forms.common.trailer') }}</span>
            <span>{{ form.trailerNumber }}</span>
          </div>
        </div>
      </Group>

      <div
        class="RaceFormStepVehicleRegisterData__message"
        v-html="$t('forms.driverWorkspace.newRace.contactDispatcher')"
      />

    </div>
  </Scaffold>
</div>
</template>

<script>
import RaceFormDriver from '@/components/DriverWorkspace/RaceForm/RaceFormDriver'
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormScaffold'
import Group from '@/components/DriverWorkspace/RaceForm/RaceFormGroup'

export default {
  name: 'th-driver-workspace-race-form-step-vehicle-register-data',

  components: { RaceFormDriver, Scaffold, Group },

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
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
.RaceFormStepVehicleRegisterData {

    &__block {
        margin-right: 4rem;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    &__subtitle {
        margin-bottom: 0.5rem;

        display: block;

        font-weight: 600;
    }

    &__driver {
        display: flex;
        flex-direction: column;
    }

    &__transport {
        display: flex;
        flex-direction: row;
    }

    &__message {
        margin: 5rem 0;
        padding: 0 0.5rem;

        text-align: center;
        font-weight: bold;
    }
}
</style>
