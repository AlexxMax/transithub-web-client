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

      <Group title="Warehouse from">
        <Select
          :title="form.pqWarehouseFromName"
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

      <Group title="Warehouse to">
        <Select
          :title="form.pqWarehouseToName"
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

      <Group title="Goods">
        <Select
          :title="form.goodsName"
          placeholder="Goods"
          @click="handleClickGoods"
        />
      </Group>
    </div>
  </Scaffold>

  <RaceFormSelectLocation
    :init-values="pointProps"
    :visible.sync="visibleSelectPoint"
    @select="handleSelectPoint"
  />

  <SelectListPQWarehouses
    :title="$t('forms.common.pqWarehouses')"
    :visible.sync="visibleSelectPQWarehouse"
    :search="searchSelectListPQWarehouse"
    :handler-search="handleSearchPQWarehouses"
    :items="listPQWarehouses"
    :loading="loading"
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
import SelectListPQWarehouses from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListPQWarehouses'
import RaceFormSelectListCarriers from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListCarriers'
import RaceFormSelectListGoods from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListGoods'

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
    SelectListPQWarehouses,
    RaceFormSelectListCarriers,
    RaceFormSelectListGoods
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
    activePQWarehouseType: null,

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
      this.activePQWarehouseType = type
    },

    handleSelectPQWarehouse({ guid, name }) {
      this.visibleSelectPQWarehouse = false
      const type = _.capitalize(this.activePQWarehouseType)

      this.$emit('change-form', {
        ...this.form,
        [`pqWarehouse${type}Guid`]: guid,
        [`pqWarehouse${type}Name`]: name
      })
    },

    async handleSearchPQWarehouses(value) {
      this.searchSelectListPQWarehouse = value
      await this.fetchPQWarehouses()
    },

    async fetchPQWarehouses() {
      this.loading = true
      const { status, items } = await this.$api.parkingQueueWarehouses.searchWarehouses(this.searchSelectListPQWarehouse)
      if (status) {
        this.listPQWarehouses = [...items]
      }
      this.loading = false
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

  async created() {
    this.TYPES = TYPES
    this.DIRECTIONS = DIRECTIONS

    await this.fetchPQWarehouses()
  },
}
</script>

<style lang='scss' scoped>
.RaceFormStepManualCreation {
    &__transport {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        &__expander {
            width: 80px;
        }
    }

    &__form-item {
        margin-top: -10px;
        margin-bottom: 0;

        &--no-label {
            margin-top: 0;
        }
    }
}
</style>
