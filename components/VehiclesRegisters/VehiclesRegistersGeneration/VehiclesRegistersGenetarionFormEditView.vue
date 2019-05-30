<template>
  <div class="VehiclesRegistersGenerationFormEditView">

    <div class="VehiclesRegistersGenerationFormEditView__select">
      <div>
        <el-tabs v-model="activeTab">
          <el-tab-pane :label="$t('forms.common.vehiclesShort')" :name="TABS.VEHICLES">
            <div v-loading="vehiclesLoading">
              <div class="VehiclesRegistersGenerationFormEditView__select--vehicles">
                <Drag
                  v-for="vehicle of vehicles"
                  :key="vehicle.guid"
                  :transfer-data="handleCloneVehicle(vehicle)"
                >
                  <VehiclesCard
                    class="VehiclesRegistersGenerationFormEditView__select--vehicles--item"
                    draggable
                    :vehicle="vehicle"
                    show-open-button
                    @open="handleOpenVehicle"
                  />
                </Drag>
              </div>

              <VehicleFastView
                ref="vehicle-fast-view"
                :vehicle="currentVehicle"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('forms.common.drivers')" :name="TABS.DRIVERS">
            DRIVERS
          </el-tab-pane>
          <el-tab-pane :label="$t('forms.common.trailers')" :name="TABS.TRAILERS">
            TRAILERS
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

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

          <div
            class="VehiclesRegistersGenerationFormEditView__row"
            v-for="(row, index) in rows"
            :key="index"
          >

            <div class="VehiclesRegistersGenerationFormEditView__row--items">
              <Drop
                class="VehiclesRegistersGenerationFormEditView__row--items--item"
                @drop="(data) => handleAddOnRow(data, 'vehicle', index)"
              >
                <VehiclesCard
                  v-if="row.vehicle"
                  class="VehiclesSelectList__item"
                  :vehicle="row.vehicle"
                  show-remove-button
                  show-open-button
                  @open="handleOpenVehicle"
                />

                <div v-else>
                  <RowEmptyDrop/>
                </div>
              </Drop>

              <Drop
                class="VehiclesRegistersGenerationFormEditView__row--items--item"
                @drop="(data) => handleAddOnRow(data, 'trailer', index)"
              >
                <VehiclesCard
                  v-if="row.trailer"
                  class="VehiclesSelectList__item"
                  :vehicle="row.trailer"
                  show-remove-button
                  show-open-button
                  @open="handleOpenVehicle"
                />

                <div v-else>
                  <RowEmptyDrop/>
                </div>
              </Drop>

              <Drop
                class="VehiclesRegistersGenerationFormEditView__row--items--item"
                @drop="(data) => handleAddOnRow(data, 'driver', index)"
              >
                <VehiclesCard
                  v-if="row.driver"
                  class="VehiclesSelectList__item"
                  :vehicle="row.driver"
                  show-remove-button
                  show-open-button
                  @open="handleOpenVehicle"
                />

                <div v-else>
                  <RowEmptyDrop/>
                </div>
              </Drop>
            </div>

            <div class="VehiclesRegistersGenerationFormEditView__row--actions">
              <Button
                type=""
                round
              >
              {{ mainBtnTitle }}
              </Button>

              <Button
                type="danger"
                round
              >
              {{ $t('forms.common.delete') }}
              </Button>
            </div>

          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Drag, Drop } from 'vue-drag-drop';
import _uniqby from 'lodash.uniqby'

import Button from '@/components/Common/Buttons/Button'
import FormField from '@/components/Common/FormElements/FormField'
import VehicleFastView from '@/components/Vehicles/VehicleFastView'
import VehiclesCard from '@/components/Vehicles/VehiclesCard'
import RowEmptyDrop from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenerationFormRowEmptyDrop'

import {
  STORE_MODULE_NAME as VEHICLES_STORE_MODULE_NAME,
  ACTIONS_KEYS as VEHICLES_ACTIONS_KEYS
} from '@/utils/vehicles'

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
    Drag,
    Drop,
    Button,
    FormField,
    VehicleFastView,
    VehiclesCard,
    RowEmptyDrop
  },

  props: {
    request: {
      type: Object,
      required: true
    },
    items: Array
  },

  data: () => ({
    currentVehicle: {},
    rows: [ blankRow ],

    activeTab: TABS.VEHICLES,

    TABS
  }),

  computed: {
    mainBtnTitle() {
      return 'test'
    },

    vehicles() {
      return this.$store.state[VEHICLES_STORE_MODULE_NAME].list
    },

    vehiclesLoading() {
      return this.$store.state[VEHICLES_STORE_MODULE_NAME].loading
    }
  },

  methods: {
    handleOpenVehicle(vehicle) {
      this.currentVehicle = vehicle
      this.$refs['vehicle-fast-view'].show()
    },

    handleCloneVehicle(vehicle) {
      return {
        ...vehicle,
        _type: 'vehicle'
      }
    },

    handleAddOnRow(data, type, index) {
      if (type === data._type) {
        this.rows[index][type] = data
        if (!this.hasLastEmptyRow()) {
          this.rows.push([])
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

  &__select {
    width: calc(23% - 20px);
    margin-right: 20px;

    &--vehicles {
      padding: 5px;
      overflow-y: auto;
      height: 100vh;

      &--item {
        margin: 8px 0;
      }
    }
  }

  &__body {
    width: calc(77% - 30px);
  }

  &--request-info {
    // margin: {
    //   bottom: 30px;
    // }
  }

  &__row {
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    background-color: rgba(238, 238, 238, 0.2);
    display: flex;
    flex-direction: row;
    border-radius: 5px;

    &--items {
      display: flex;
      flex-direction: row;
      margin-right: 10px;
      width: calc(100% - 150px);

      &--item {
        width: 33%;
      }

      *:not(:last-child) {
        margin-right: 10px;
      }
    }

    &--actions {
      display: flex;
      flex-direction: column;
      width: 150px;
    }
  }
}
</style>
