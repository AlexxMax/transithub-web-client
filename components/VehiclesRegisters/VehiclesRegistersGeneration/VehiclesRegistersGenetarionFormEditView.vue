<template>
  <div class="VehiclesRegistersGenerationFormEditView">
    <p class="VehiclesRegistersGenerationFormEditView__title">
      {{ $t('forms.common.vehuclesRegistersGeneration') }}
    </p>

    <div class="VehiclesRegistersGenerationFormEditView__body">
      <div>
        <div class="VehiclesRegistersGenerationFormEditView--request-info">
          <el-row :gutter="20">
            <el-col :xs="24" :md="4">
              <FormField
                class="VehiclesRegistersGenerationFormEditView--request-info__point"
                :title="$t('forms.common.pointFrom')"
                :value="`${request.pointFromName}, ${request.pointFromRegion}`"
              />
            </el-col>

            <el-col :xs="24" :md="3">
              <FormField
                :title="$t('forms.common.maxHeight')"
                :value="request.warehouseFromMaxHeight"
              />
            </el-col>

            <el-col :xs="24" :md="2">
              <FormField
                :title="$t('forms.common.maxWeight')"
                :value="request.warehouseFromMaxWeight"
              />
            </el-col>

            <el-col :xs="24" :md="3">
              <FormField
                :title="$t('forms.common.autotrainType')"
                :value="request.warehouseFromAutotrainType"
              />
            </el-col>

            <el-col :xs="24" :md="4">
              <FormField
                class="VehiclesRegistersGenerationFormEditView--request-info__point"
                :title="$t('forms.common.pointTo')"
                :value="`${request.pointToName}, ${request.pointToRegion}`"
              />
            </el-col>

            <el-col :xs="24" :md="3">
              <FormField
                :title="$t('forms.common.distance')"
                :value="request.distance"
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
                class="VehiclesRegistersGenerationFormEditView--request-info__quantity"
                :title="$t('forms.request.quantityT')"
                :value="request.quantityT"
              />
            </el-col>
          </el-row>
        </div>

        <div class="VehiclesRegistersGenerationFormEditView__rows">

          <Row
            v-for="(row, index) in rows"
            :key="row.rowId"
            :row="row"
            :row-validation-method="rowValidationMethod"
            :disabled-buttons="index === (rows.length - 1)"
            :ready="row.ready"
            @drop-on-row="(data, type) => $emit('drop-on-row', data, type, row)"
            @open-vehicle="vehicle => $emit('open-vehicle', vehicle)"
            @open-driver="driver => $emit('open-driver', driver)"
            @delete-card="type => $emit('delete-card', type, row)"
            @delete="$emit('delete-row', row)"
            @ready="ready => $emit('ready-row', ready, row)"
            @select="type => $emit('open-select', type, row)"
          />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormField from '@/components/Common/FormElements/FormField'
import Row from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenerationFormEditViewRow'

export default {
  name: 'th-vehicles-registers-generation-form-edit-view',

  components: {
    FormField,
    Row
  },

  props: {
    request: {
      type: Object,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
    rowValidationMethod: Function
  }
}
</script>

<style lang='scss' scoped>
.VehiclesRegistersGenerationFormEditView {
  display: flex;
  flex-direction: column;

  &__title {
    font-weight: 500;
    margin-bottom: -5px;
  }

  &__body {
    width: calc(100% - 30px);
  }

  &--request-info {
    // margin: {
    //   bottom: 30px;
    // }

    &__point, &__quantity {
      font-weight: 500;
    }
  }
}
</style>
