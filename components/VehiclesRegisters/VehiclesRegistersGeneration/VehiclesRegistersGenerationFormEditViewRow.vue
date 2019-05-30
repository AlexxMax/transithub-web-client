<template>
  <div>
    <div
      class="VehiclesRegistersGenerationFormEditViewRow"
    >

      <div class="VehiclesRegistersGenerationFormEditViewRow--items">
        <Drop
          class="VehiclesRegistersGenerationFormEditViewRow--items--item"
          @drop="(data) => $emit('drop-on-row', data, 'vehicle', row)"
        >
          <VehiclesCard
            v-if="row.vehicle"
            :vehicle="row.vehicle"
            show-remove-button
            show-open-button
            @open="$emit('open-vehicle', row.vehicle)"
          />

          <div v-else>
            <RowEmptyDrop/>
          </div>
        </Drop>

        <Drop
          class="VehiclesRegistersGenerationFormEditViewRow--items--item"
          @drop="(data) => $emit('drop-on-row', data, 'trailer', row)"
        >
          <VehiclesCard
            v-if="row.trailer"
            :vehicle="row.trailer"
            show-remove-button
            show-open-button
            @open="$emit('open-trailer', row.trailer)"
          />

          <div v-else>
            <RowEmptyDrop/>
          </div>
        </Drop>

        <Drop
          class="VehiclesRegistersGenerationFormEditViewRow--items--item"
          @drop="(data) => $emit('drop-on-row', data, 'driver', row)"
        >
          <DriversCard
            v-if="row.driver"
            :driver="row.driver"
            show-remove-button
            show-open-button
            @open="$emit('open-driver', row.driver)"
          />

          <div v-else>
            <RowEmptyDrop/>
          </div>
        </Drop>
      </div>

      <div class="VehiclesRegistersGenerationFormEditViewRow--actions">
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
        {{ $t('forms.common.remove') }}
        </Button>
      </div>

    </div>
  </div>
</template>

<script>
import { Drop } from 'vue-drag-drop'

import Button from '@/components/Common/Buttons/Button'
import VehiclesCard from '@/components/Vehicles/VehiclesCard'
import DriversCard from '@/components/Drivers/DriversCard'
import RowEmptyDrop from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenerationFormRowEmptyDrop'

export default {
  name: 'th-vehicles-registers-generation-form-edit-view-row',

  components: {
    Drop,
    Button,
    VehiclesCard,
    DriversCard,
    RowEmptyDrop
  },

  props: {
    row: Object
  },

  computed: {
    mainBtnTitle() {
      return this.row.ready ? this.$t('forms.common.notReady') : this.$t('forms.common.ready')
    }
  }
}
</script>

<style lang='scss' scoped>
.VehiclesRegistersGenerationFormEditViewRow {
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
    width: calc(100% - 100px);

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
    width: 100px;
    justify-content: space-around;

    *:not(:first-child) {
      margin-left: 0px;
    }
  }
}
</style>
