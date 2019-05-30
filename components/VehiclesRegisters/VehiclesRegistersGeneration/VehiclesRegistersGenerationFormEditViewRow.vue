<template>
  <div>
<!--
    <Draggable
      :list="vehicles"
      :group="{ name: 'vehreg', pull: 'clone', put: false }"
      :clone="handleClone"
    >
      <VehiclesCard
        class="VehiclesSelectList__item"
        v-for="vehicle of vehicles"
        :key="vehicle.guid"
        :vehicle="vehicle"
        show-open-button
      />
    </Draggable> -->

    <div class="VehiclesRegistersGenerationFormEditViewRow">

      <Draggable :list="items" group="vehreg" @change="log">
        <VehiclesCard
          v-if="vehicle"
          class="VehiclesSelectList__item"
          :vehicle="vehicle"
          show-remove-button
          show-open-button
        />
      </Draggable>

      <div class="VehiclesRegistersGenerationFormEditViewRow__actions">
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
</template>

<script>
import Draggable from 'vuedraggable'

import Button from '@/components/Common/Buttons/Button'
import VehiclesCard from '@/components/Vehicles/VehiclesCard'

export default {
  name: 'th-vehicles-registers-generation-form-edit-view-row',

  components: {
    Draggable,
    Button,
    VehiclesCard
  },

  props: {
    items: Array
  },

  computed: {
    mainBtnTitle() {
      return 'test'
    },

    vehicles() {
      return this.$store.state['vehicles'].list
    },

    vehicle() {
      return this.items.find(element => element._type === 'vehicle')
    }
  },

  methods: {
    log(evt) {
      console.log('2222', evt);
    },

    handleClone(vehicle) {
      return {
        ...vehicle,
        _type: 'vehicle'
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.VehiclesRegistersGenerationFormEditViewRow {
  width: 100%;
  padding: 15px;
  margin: 5px 0;
  background-color: rgba(238, 238, 238, 0.2);
  display: flex;
  flex-direction: row;
  border-radius: 5px;

  :not(:last-child) {
    margin-right: 10px;
  }

  &__actions {
    display: flex;
    flex-direction: column;
  }
}
</style>
