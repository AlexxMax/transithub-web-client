<template>
  <div class="RaceFromStepStart">
    <Scaffold
      :title="title"
      :subtitle="subtitle"
      :percentage="percentage"
      :buttons="buttons"
      @close="$emit('close')"
    >
      <Group :title="$t('forms.queue.direction')">
        <el-radio-group
          :value="form.direction"
          @change="(direction) => { handleInput('direction', direction) }"
        >
          <el-radio :label="DIRECTIONS.UNLOADING">
            {{ $t('forms.queue.unloading') }}
          </el-radio>
          <el-radio :label="DIRECTIONS.LOADING">
            {{ $t('forms.queue.loading') }}
          </el-radio>
        </el-radio-group>
      </Group>

      <Group :title="$t('forms.common.certSerialNumber')">
        <el-input
          clearable
          :placeholder="$t('forms.common.certSerialNumberPlaceholder')"
          :maxlength="9"
          :value="form.certSerialNumber"
          @input="(certSerialNumber) => { handleInput('certSerialNumber', certSerialNumber) }"
        />
      </Group>

      <Group :title="$t('forms.common.transport')">
        <div class="RaceFromStepStart__transport">
          <el-input
            clearable
            :placeholder="$t('forms.common.vNumberPlaceholder')"
            :minlength="7"
            :maxlength="8"
            :value="form.vehicleNumber"
            @input="(vehicleNumber) => { handleInput('vehicleNumber', vehicleNumber) }"
          />

          <div class="RaceFromStepStart__transport__expander"/>

          <el-input
            clearable
            :placeholder="$t('forms.common.vNumberPlaceholder')"
            :minlength="7"
            :maxlength="8"
            :value="form.trailerNumber"
            @input="(trailerNumber) => { handleInput('trailerNumber', trailerNumber) }"
          />
        </div>
      </Group>
    </Scaffold>
  </div>
</template>

<script>
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormScaffold'
import Group from '@/components/DriverWorkspace/RaceForm/RaceFormGroup'

import { DIRECTIONS } from '@/utils/pq.queues'

export default {
  name: 'th-driver-workspace-race-form-start',

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

  methods: {
    handleInput(key, value) {
      console.log("TCL: handleInput -> value", value)
      this.$emit('change-form', { ...this.form, [key]: value })
    },
  },

  created() {
    this.DIRECTIONS = DIRECTIONS
  },
}
</script>

<style lang='scss' scoped>
.RaceFromStepStart {
  &__transport {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__expander {
      width: 80px;
    }
  }
}
</style>
