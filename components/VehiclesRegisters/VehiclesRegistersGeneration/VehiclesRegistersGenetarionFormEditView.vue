<template>
  <div class="VehiclesRegistersGenerationFormEditView">
    <div class="VehiclesRegistersGenerationFormEditView__body">
      <div>
        <div class="VehiclesRegistersGenerationFormEditView--request-info">
          <el-row :gutter="20">
            <el-col :xs="24" :md="5">
              <FormField
                :title="$t('forms.common.pointFrom')"
                :value="`${request.pointFromName}, ${request.pointFromRegion}`"
              />
            </el-col>

            <el-col :xs="24" :md="5">
              <FormField
                :title="$t('forms.common.pointTo')"
                :value="`${request.pointToName}, ${request.pointToRegion}`"
              />
            </el-col>

            <el-col :xs="24" :md="3">
              <FormField
                :title="$t('forms.common.goods')"
                :value="request.goodsName"
              />
            </el-col>

            <el-col :xs="24" :md="2">
              <FormField
                :title="$t('forms.request.quantityT')"
                :value="request.quantityT"
              />
            </el-col>
          </el-row>
        </div>

        <div class="VehiclesRegistersGenerationFormEditView__rows">

          <Row
            v-for="(row, index) in rows"
            :key="index"
            :row="row"
            @drop-on-row="handleAddOnRow"
            @open-vehicle="vehicle => $emit('open-vehicle', vehicle)"
            @open-driver="driver => $emit('open-driver', driver)"
          />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormField from '@/components/Common/FormElements/FormField'
import Row from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenerationFormEditViewRow'
// import Select from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenerationFormSelect'

const TABS = Object.freeze({
  VEHICLES: 'VEHICLES',
  DRIVERS: 'DRIVERS',
  TRAILERS: 'TRAILERS'
})

const blankRow = {
  vehicle: null,
  trailer: null,
  driver: null
}

export default {
  name: 'th-vehicles-registers-generation-form-edit-view',

  components: {
    FormField,
    Row,
    // Select
  },

  props: {
    request: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    rows: [ { ...blankRow } ],

    activeTab: TABS.VEHICLES,

    TABS
  }),

  methods: {
    handleAddOnRow(data, type, row) {
      if (type === data._type) {
        row[type] = data
        if (!this.hasLastEmptyRow()) {
          this.rows.push({ ...blankRow })
        }
      }
    },

    hasLastEmptyRow() {
      const emptyRow = this.rows[this.rows.length - 1]
      if (emptyRow) {
        return !emptyRow.vehicle && !emptyRow.driver && !emptyRow.trailer
      }
      return false
    }
  }
}
</script>

<style lang='scss' scoped>
.VehiclesRegistersGenerationFormEditView {
  display: flex;
  flex-direction: row;

  &__body {
    width: calc(100% - 30px);
  }

  &--request-info {
    // margin: {
    //   bottom: 30px;
    // }
  }
}
</style>
