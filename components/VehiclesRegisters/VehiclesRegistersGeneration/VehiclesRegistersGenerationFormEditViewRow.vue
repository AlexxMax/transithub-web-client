<template>
  <div>
    <Fade>
      <div
        class="VehiclesRegistersGenerationFormEditViewRow"
        :class="{
          'VehiclesRegistersGenerationFormEditViewRow-ready': ready,
          'VehiclesRegistersGenerationFormEditViewRow-sent': row.sentToClient
        }"
      >

        <div class="VehiclesRegistersGenerationFormEditViewRow--items">
          <Drop
            class="VehiclesRegistersGenerationFormEditViewRow--items--item"
            @drop="(data) => handleDrop(data, 'truck')"
          >
            <VehiclesCard
              v-if="row.truck"
              :vehicle="row.truck"
              show-remove-button
              show-open-button
              @open="$emit('open-vehicle', row.truck)"
              @remove="handleRemoveCard('truck')"
            />

            <div v-else>
              <RowEmptyDrop
                :shake="shakeTruckPlaceholder"
                :placeholder="$t('forms.common.applyTruck')"
                @select="handleSelect('truck')"
                @stop-shaking="shakeTruckPlaceholder = false"
              />
            </div>
          </Drop>

          <Drop
            class="VehiclesRegistersGenerationFormEditViewRow--items--item"
            @drop="(data) => handleDrop(data, 'trailer')"
          >
            <VehiclesCard
              v-if="row.trailer"
              :vehicle="row.trailer"
              show-remove-button
              show-open-button
              @open="$emit('open-vehicle', row.trailer)"
              @remove="handleRemoveCard('trailer')"
            />

            <div v-else>
              <RowEmptyDrop
                :show-no-trailer="ready && row.trailer === null"
                :shake="shakeTrailerPlaceholder"
                :placeholder="$t('forms.common.applyTrailer')"
                @select="handleSelect('trailer')"
                @stop-shaking="shakeTrailerPlaceholder = false"
              />
            </div>
          </Drop>

          <Drop
            class="VehiclesRegistersGenerationFormEditViewRow--items--item"
            @drop="(data) => handleDrop(data, 'driver')"
          >
            <DriversCard
              v-if="row.driver"
              :driver="row.driver"
              show-remove-button
              show-open-button
              @open="$emit('open-driver', row.driver)"
              @remove="handleRemoveCard('driver')"
            />

            <div v-else>
              <RowEmptyDrop
                :shake="shakeDriverPlaceholder"
                :placeholder="$t('forms.common.applyDriver')"
                @select="handleSelect('driver')"
                @stop-shaking="shakeDriverPlaceholder = false"
              />
            </div>
          </Drop>
        </div>

        <div class="VehiclesRegistersGenerationFormEditViewRow--actions">
          <Button
            type=""
            round
            :disabled="disabledButtons"
            @click="handleRowReadyChange"
          >
          {{ mainBtnTitle }}
          </Button>

          <Button
            type="danger"
            round
            :disabled="disabledButtons"
            @click="$emit('delete', row)"
          >
          {{ $t('forms.common.remove') }}
          </Button>
        </div>

      </div>
    </Fade>
  </div>
</template>

<script>
import { Drop } from 'vue-drag-drop'

import Button from '@/components/Common/Buttons/Button'
import VehiclesCard from '@/components/Vehicles/VehiclesCard'
import DriversCard from '@/components/Drivers/DriversCard'
import RowEmptyDrop from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenerationFormRowEmptyDrop'
import Fade from '@/components/Common/Transitions/Fade'

export default {
  name: 'th-vehicles-registers-generation-form-edit-view-row',

  components: {
    Drop,
    Button,
    VehiclesCard,
    DriversCard,
    RowEmptyDrop,
    Fade
  },

  props: {
    row: Object,
    rowValidationMethod: Function,
    disabledButtons: Boolean,
    ready: Boolean
  },

  data: function() {
    return {
      shakeTruckPlaceholder: false,
      shakeTrailerPlaceholder: false,
      shakeDriverPlaceholder: false
    }
  },

  computed: {
    mainBtnTitle() {
      return this.ready ? this.$t('forms.common.discard') : this.$t('forms.common.ready')
    }
  },

  methods: {
    handleDrop(data, type) {
      this.$emit('drop-on-row', data, type, this.row)
      // this.ready = false
    },

    handleSelect(type) {
      this.$emit('select', type, this.row)
      // this.ready = false
    },

    handleRemoveCard(type) {
      this.$emit('delete-card', type, this.row)
      // this.ready = false
    },

    handleRowReadyChange() {
      // Use this aproach becose Vue don't react on array changes passed by props
      if (this.rowValidationMethod) {
        const validRow = this.rowValidationMethod(this.row)
        if (validRow) {
          if (!this.ready) {
            if (!this.row.trailer) {
              this.$confirm(
                this.$t('forms.common.vehicleRegisterRowHandleReadyConfirmBoxText'),
                this.$t('forms.common.vehicleRegisterRowHandleReadyConfirmBoxTitle'),
                {
                  confirmButtonText: this.$t('forms.common.yes'),
                  cancelButtonText: this.$t('forms.common.no'),
                  roundButton: true,
                  zIndex: 4000
                }
              )
              .then(_ => {
                this.$emit('ready', true, this.row)
              })
              .catch(_ => {
                this.$emit('ready', false, this.row)
              })
            } else {
              this.$emit('ready', true, this.row)
            }
          } else {
            this.$emit('ready', false, this.row)
          }
        } else {
          if (!this.row.truck) {
            this.shakeTruckPlaceholder = true
          }

          if (!this.row.trailer) {
            this.shakeTrailerPlaceholder = true
          }

          if (!this.row.driver) {
            this.shakeDriverPlaceholder = true
          }
        }
      }
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

  &-ready {
    background-color: rgba(255, 216, 77, 0.164);
  }

  &-sent {
    background-color: rgba(94, 184, 114, 0.26);
  }
}
</style>
