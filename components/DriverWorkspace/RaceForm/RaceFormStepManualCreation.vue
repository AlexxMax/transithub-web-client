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
      <!-- <pre>{{ form }}</pre> -->

      <Group title="Point from">
        <Select
          :title="form.pointFromName"
          placeholder="Select region, district, settelment"
          @click="handleClickPoint(TYPES.FROM)"
        />
      </Group>

      <Group
        title="Warehouse from"
        subtitle="Firstly select point from"
      >
        <Select
          :disabled="!form.pointFromKoatuu"
          :title="form.warehouseFromName"
          placeholder="Select region, district, settelment"
          @click="handleClickPQWarehouse(TYPES.FROM)"
        />
      </Group>

      <Group title="Point to">
        <Select
          :title="form.pointToName"
          placeholder="Select region, district, settelment"
          @click="handleClickPoint(TYPES.TO)"
        />
      </Group>

      <Group
        title="Warehouse to"
        subtitle="Firstly select point to"
      >
        <Select
          :disabled="!form.pointToKoatuu"
          :title="form.warehouseToName"
          placeholder="Select region, district, settelment"
          @click="handleClickPQWarehouse(TYPES.TO)"
        />
      </Group>

      <Group title="Carriers">
        <Select
          :title="form.carrierName"
          placeholder="Carriers"
          @click="handleClickCarriers"
        />
      </Group>

      <Group title="Sender">
        <RaceFormInput
          prop="senderName"
          placeholder="Sender"
          :value="form.senderName"
          @input="senderName => $emit('change-form', { ...form, senderName })"
        />
      </Group>

      <Group title="Goods">
        <Select
          :title="form.goodsName"
          placeholder="Goods"
          @click="handleClickGoods"
        />
      </Group>

      <Group title="Driver">
        <RaceFormDriver />
      </Group>

      <Group :title="$t('forms.common.transport')">
        <div class="RaceFormStepManualCreation__transport">
          <RaceFormInput
            prop="vehicleNumber"
            :label="$t('forms.common.truck')"
            :placeholder="$t('forms.common.vNumberPlaceholder')"
            :minlength="7"
            :maxlength="8"
            :value="form.vehicleNumber"
            @input="vehicleNumber => $emit('change-form', { ...form, vehicleNumber })"
          />

          <RaceFormInput
            prop="trailerNumber"
            :label="$t('forms.common.trailer')"
            :placeholder="$t('forms.common.vNumberPlaceholder')"
            :minlength="7"
            :maxlength="8"
            :value="form.trailerNumber"
            @input="trailerNumber => $emit('change-form', { ...form, trailerNumber })"
          />
        </div>
      </Group>
    </div>
  </Scaffold>

  <RaceFormSelectLocation
    :init-values="pointProps"
    :visible.sync="visibleSelectPoint"
    @select="handleSelectPoint"
  />

  <SelectListWarehouses
    :koatuu="warehouseKoatuu"
    :visible.sync="visibleSelectPQWarehouse"
    @select="handleSelectPQWarehouse"
  />

  <RaceFormSelectListCarriers
    :init-value="form.carrierName"
    :visible.sync="visibleSelectCarriers"
    @select="handleSelectCarriers"
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
import RaceFormSelectListCarriers from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListCarriers'
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
    RaceFormSelectListCarriers,
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

    visibleSelectCarriers: false,

    visibleSelectGoods: false,

    searchSelectListPQWarehouse: null,
    listPQWarehouses: [],

    loading: false,
  }),

  computed: {
    pointProps() {
      const type = _.capitalize(this.activePointType)

      return {
        name: this.form[`point${type}Name`],
        region: this.form[`point${type}Region`],
        district: this.form[`point${type}District`],
        koatuu: this.form[`point${type}Koatuu`],
      }
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

    handleSelectPoint({ name, region, district, koatuu }) {
      this.visibleSelectPoint = false
      const type = _.capitalize(this.activePointType)

      this.$emit('change-form', {
        ...this.form,
        [`point${type}Name`]: name,
        [`point${type}Region`]: region,
        [`point${type}District`]: district,
        [`point${type}Koatuu`]: koatuu
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

    handleClickCarriers() {
      this.visibleSelectCarriers = true
    },
    handleSelectCarriers({ guid, fullname }) {
      this.visibleSelectCarriers = false

      this.$emit('change-form', {
        ...this.form,
        carrierGuid: guid,
        carrierName: fullname
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
    }
}
</style>
