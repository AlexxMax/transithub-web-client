<template>
<RightView
  :width="`${sidebarWidth}px`"
  :title="title"
  :visible="visible"
  @close="editing = false; visible = false"
>
  <div class="PQWarehousesParkings">

    <div class="PQWarehousesParkings__header">
      <Button
        v-if="editing"
        style="margin-rigth: .5rem;"
        type="primary"
        round
        @click="handleClickCreate"
      >{{ $t('forms.pqWarehouses.parkings.buttonCreateParking') }}</Button>

      <Button
        v-if="!editing && !isEmptySubordinateList"
        round
        type="primary"
        @click="editing = true"
      >{{ $t('forms.pqWarehouses.parkings.buttonEditList') }}</Button>

      <Button
        v-if="editing"
        class="PQWarehousesParkings__btn-add-existing"
        style="margin: .5rem 0;"
        type
        round
        @click="dialog = true"
      >{{ $t('forms.pqWarehouses.parkings.buttonSelectExistingParking') }}</Button>
    </div>

    <div class="PQWarehousesParkings__content">
      <PQWarehousesParkingsNotSubordinate
        v-if="editing"
        class="PQWarehousesParkings__not-subordinate"
      />

      <PQWarehousesParkingsSubordinate
        @handleClickCreate="handleClickCreate"
        :editing="editing"
        :isEmptySubordinateList.sync="isEmptySubordinateList"
        class="PQWarehousesParkings__subordinate"
      />
    </div>

  </div>
</RightView>
</template>

<script>
import {
  STORE_MODULE_NAME,
  EDIT_DIALOG_TYPES,
  MUTATIONS_KEYS,
  ACTIONS_KEYS
} from '@/utils/pq.warehouses'
import {
  STORE_MODULE_NAME as PQ_PARKINGS_STORE_MODULE_NAME,
  EDIT_DIALOG_TYPES as PQ_QUEUES_EDIT_DIALOG_TYPES,
  MUTATIONS_KEYS as PQ_PARKINGS_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_PARKINGS_ACTIONS_KEYS
} from '@/utils/pq.parkings'

import Button from '@/components/Common/Buttons/Button'
import RightView from '@/components/Common/RightView'
import PQWarehousesParkingsNotSubordinate from '@/components/PQWarehouses/PQWarehousesParkingsNotSubordinate'
import PQWarehousesParkingsSubordinate from '@/components/PQWarehouses/PQWarehousesParkingsSubordinate'

export default {
  components: {
    Button,
    RightView,
    PQWarehousesParkingsNotSubordinate,
    PQWarehousesParkingsSubordinate,
  },

  data: () => ({
    editing: false,
    isEmptySubordinateList: true
  }),

  computed: {
    visible: {
      set(value) {
        this.$store.commit(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE}`, value)
      },
      get() {
        return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].subordinate.visible
      }
    },
    dialog: {
      set(value) {
        this.$store.commit(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_MUTATIONS_KEYS.SET_NOT_SUBORDINATE_DIALOG}`, value)
      },
      get() {
        return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].notSubordinate.dialog
      }
    },

    title() {
      return this.warehouse ? `${this.$t('forms.common.pqParkings')} ${this.$t('forms.queue.warehouse')} «${this.warehouse.name}»` : this.$t('forms.common.pqParkings')
    },

    sidebarWidth() {
      const width = 600
      return this.editing ? width * 2 : width
    }
  },

  methods: {
    handleClickCreate() {
      if (this.editing)
        this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
          show: true,
          type: EDIT_DIALOG_TYPES.CREATE
        })

      else this.editing = true
    },
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesParkings {

    height: 100%;

    &__header {
        margin-bottom: 1rem;
    }

    &__btn-add-existing {
        display: none;

        @media (max-width: 800px) {
            display: flex;
            justify-content: center;

            text-align: center;
        }
    }

    &__content {
        display: flex;
        flex-direction: row;
    }

    &__not-subordinate {
        margin-right: 0.5rem;

        @media (max-width: 800px) {
            display: none;
        }
    }

    &__subordinate {}

}
</style>
