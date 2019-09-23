<template>
<div
  class="RaceFormStepManualCreation"
  v-loading="loading"
>
  <Scaffold
    :title="title"
    :subtitle="subtitle"
    :percentage="percentage"
    :buttons="buttons"
    @close="$emit('close')"
  >

    <div>
      <Group :title="$t('forms.common.pointFrom')">
        <Select
          :title="form.pointFromName"
          :placeholder="$t('forms.common.pointPlaceholder')"
          @click="handleClickPoint(TYPES.FROM)"
          :icon-close="Boolean(form.pointFromKoatuu)"
          @clear="$emit('change-form', { ...form, pointFromName: '', pointFromKoatuu: '' })"
        />
      </Group>

      <Group
        :title="$t('forms.common.warehouseFrom')"
        :subtitle="$t('forms.common.warehouseFromHint')"
      >
        <Select
          :disabled="!form.pointFromKoatuu"
          :title="form.warehouseFromName"
          :placeholder="$t('forms.common.warehouseFrom')"
          @click="handleClickPQWarehouse(TYPES.FROM)"
          :icon-close="Boolean(form.warehouseFromCode)"
          @clear="$emit('change-form', { ...form, warehouseFromName: '', warehouseFromCode: '' })"
        />
      </Group>

      <Group :title="$t('forms.common.pointTo')">
        <Select
          :title="form.pointToName"
          :placeholder="$t('forms.common.pointPlaceholder')"
          @click="handleClickPoint(TYPES.TO)"
          :icon-close="Boolean(form.pointToKoatuu)"
          @clear="$emit('change-form', { ...form, pointToName: '', pointToKoatuu: '' })"
        />
      </Group>

      <Group
        :title="$t('forms.common.warehouseTo')"
        :subtitle="$t('forms.common.warehouseToHint')"
      >
        <Select
          :disabled="!form.pointToKoatuu"
          :title="form.warehouseToName"
          :placeholder="$t('forms.common.warehouseTo')"
          @click="handleClickPQWarehouse(TYPES.TO)"
          :icon-close="Boolean(form.warehouseToCode)"
          @clear="$emit('change-form', { ...form, warehouseToName: '', warehouseToCode: '' })"
        />
      </Group>

      <Group :title="$t('forms.common.carrier')">
        <RaceFormInput
          prop="carrierName"
          :placeholder="$t('forms.common.carrier')"
          :value="form.carrierName"
          @input="carrierName => $emit('change-form', { ...form, carrierName })"
        />
      </Group>

      <Group :title="$t('forms.common.sender')">
        <RaceFormInput
          prop="senderName"
          :placeholder="$t('forms.common.sender')"
          :value="form.senderName"
          @input="senderName => $emit('change-form', { ...form, senderName })"
        />
      </Group>

      <Group :title="$t('forms.common.goods')">
        <Select
          :title="form.goodsName"
          :placeholder="$t('forms.common.goods')"
          @click="handleClickGoods"
        />
      </Group>

      <Group :title="$t('forms.common.driver')">
        <RaceFormDriver
          :form="$store.state.driver"
          editable
        />
      </Group>

      <Group :title="$t('forms.common.transport')">
        <div class="RaceFormStepManualCreation__transport">

          <div class="RaceFormStepManualCreation__switch">
            <el-switch v-model="isWithTrailer" />

            <span :class="['RaceFormStepManualCreation__switch-text', { 'RaceFormStepManualCreation__switch-text--active': isWithTrailer }]">{{ $t('forms.driverWorkspace.newRace.labelIsWithTrailer') }}</span>
          </div>

          <div class="RaceFormStepManualCreation__inputs">
            <RaceFormInput
              prop="vehicleNumber"
              :label="$t('forms.common.truck')"
              :placeholder="$t('forms.common.vNumberPlaceholder')"
              :maxlength="8"
              v-mask="'YYYYYYYY'"
              :value="form.vehicleNumber"
              @input="vehicleNumber => $emit('change-form', { ...form, vehicleNumber })"
            />

            <RaceFormInput
              v-if="isWithTrailer"
              prop="trailerNumber"
              :label="$t('forms.common.trailer')"
              :placeholder="$t('forms.common.vNumberPlaceholder')"
              :maxlength="8"
              v-mask="'YYYYYYYY'"
              :value="form.trailerNumber"
              @input="trailerNumber => $emit('change-form', { ...form, trailerNumber })"
            />
          </div>

        </div>
      </Group>
    </div>
  </Scaffold>

  <RaceFormSelectLocation
    :init-value="pointKoatuu"
    :visible.sync="visibleSelectPoint"
    @select="handleSelectPoint"
  />

  <SelectListWarehouses
    :koatuu="warehouseKoatuu"
    :visible.sync="visibleSelectPQWarehouse"
    @select="handleSelectPQWarehouse"
  />

  <RaceFormSelectListGoods
    :init-value="form.goodsGuid"
    :visible.sync="visibleSelectGoods"
    @select="handleSelectGoods"
  />
</div>
</template>

<script>
import _ from 'lodash'

import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormScaffold'
import Group from '@/components/DriverWorkspace/RaceForm/RaceFormGroup'
import Select from '@/components/DriverWorkspace/RaceForm/RaceFormSelect'
import RaceFormSelectLocation from '@/components/DriverWorkspace/RaceForm/RaceFormSelectLocation'
import SelectListWarehouses from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListWarehouses'
import RaceFormSelectListGoods from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListGoods'
import RaceFormDriver from '@/components/DriverWorkspace/RaceForm/RaceFormDriver'
import RaceFormInput from '@/components/DriverWorkspace/RaceForm/RaceFormInput'

import { DIRECTIONS } from '@/utils/pq.queues'

const TYPES = Object.freeze({
  TO: 'TO',
  FROM: 'FROM'
})

export default {
  components: {
    Scaffold,
    Group,
    Select,
    RaceFormSelectLocation,
    SelectListWarehouses,
    RaceFormSelectListGoods,
    RaceFormDriver,
    RaceFormInput
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

  data: () => ({
    visibleSelectPoint: false,
    activePointType: null,

    visibleSelectPQWarehouse: false,
    activeWarehouseType: null,

    visibleSelectGoods: false,

    isWithTrailer: true,

    loading: false,
  }),

  watch: {
    isWithTrailer(value) {
      value ? null : this.$emit('change-form', { ...this.form, trailerNumber: '' })
    }
  },

  computed: {
    pointKoatuu() {
      const type = _.capitalize(this.activePointType)
      return this.form[`point${type}Koatuu`]
    },

    warehouseKoatuu() {
      const type = _.capitalize(this.activeWarehouseType)
      return this.form[`point${type}Koatuu`]
    }
  },

  methods: {
    handleClickPoint(type) {
      this.visibleSelectPoint = true
      this.activePointType = type
    },

    handleSelectPoint({ description, koatuu }) {
      this.visibleSelectPoint = false
      const type = _.capitalize(this.activePointType)

      this.$emit('change-form', {
        ...this.form,
        [`point${type}Name`]: description,
        [`point${type}Koatuu`]: koatuu,

        [`warehouse${type}Code`]: '',
        [`warehouse${type}Name`]: ''
      })
    },

    handleClickPQWarehouse(type) {
      this.visibleSelectPQWarehouse = true
      this.activeWarehouseType = type
    },

    handleSelectPQWarehouse({ classificatorCode, name }) {

      this.visibleSelectPQWarehouse = false
      const type = _.capitalize(this.activeWarehouseType)

      this.$emit('change-form', {
        ...this.form,
        [`warehouse${type}Code`]: classificatorCode,
        [`warehouse${type}Name`]: name
      })
    },

    handleClickGoods() {
      this.visibleSelectGoods = true
    },
    handleSelectGoods({ guid, name }) {
      this.visibleSelectGoods = false

      this.$emit('change-form', {
        ...this.form,
        goodsGuid: guid,
        goodsName: name
      })
    },
  },

  created() {
    this.TYPES = TYPES
    this.DIRECTIONS = DIRECTIONS
  },
}
</script>

<style lang='scss' scoped>
.RaceFormStepManualCreation {

    &__transport {
        display: flex;
        flex-direction: column;
    }

    &__switch {
      display: flex;
    }

    &__switch-text {
      margin-left: .5rem;

      display: block;

      color: $--color-info;

      &--active {
        color: $--color-primary;
      }
    }

    &__inputs {
        margin-top: 1rem;

        display: flex;
    }
}
</style>
