<template>
<RightView
  :width="`${sidebarWidth}px`"
  :title="$t('lists.pqParkings.sidebarTitle')"
  :visible="visible"
  @close="editing = false; visible = false"
>
  <div class="PQParkingsWarehouses">

    <div class="PQParkingsWarehouses__header">
      <Button
        v-if="editing"
        style="margin-rigth: .5rem;"
        type="primary"
        round
        @click="handleClickCreate"
      >{{ $t('lists.pqParkings.sidebarButtonCreateWarehouse') }}</Button>

      <Button
        v-if="!editing && !isEmptySubordinateList"
        round
        type="primary"
        @click="editing = true"
      >{{ $t('forms.pqWarehouses.parkings.buttonEditList') }}</Button>

      <Button
        v-if="editing"
        class="PQParkingsWarehouses__btn-add-existing"
        style="margin: .5rem 0;"
        type
        round
        @click="dialog = true"
      >{{ $t('lists.pqParkings.sidebarSelectExisting') }}</Button>
    </div>

    <div class="PQParkingsWarehouses__content">
      <PQParkingsWarehousesNotSubordinate
        v-if="editing"
        class="PQParkingsWarehouses__not-subordinate"
      />

      <PQParkingsWarehousesSubordinate
        @handleClickCreate="handleClickCreate"
        :editing="editing"
        :isEmptySubordinateList.sync="isEmptySubordinateList"
        class="PQParkingsWarehouses__subordinate"
      />
    </div>

  </div>
</RightView>
</template>

<script>
import {
  STORE_MODULE_NAME as PQ_WAREHOUSES_STORE_MODULE_NAME,
  EDIT_DIALOG_TYPES as PQ_WAREHOUSES_EDIT_DIALOG_TYPES,
  MUTATIONS_KEYS as PQ_WAREHOUSES_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_WAREHOUSES_ACTIONS_KEYS
} from '@/utils/pq.warehouses'
import {
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
} from '@/utils/pq.parkings'

import Button from '@/components/Common/Buttons/Button'
import RightView from '@/components/Common/RightView'
import PQParkingsWarehousesNotSubordinate from '@/components/PQParkings/PQParkingsWarehousesNotSubordinate'
import PQParkingsWarehousesSubordinate from '@/components/PQParkings/PQParkingsWarehousesSubordinate'

export default {
  components: {
    Button,
    RightView,
    PQParkingsWarehousesNotSubordinate,
    PQParkingsWarehousesSubordinate,
  },

  data: () => ({
    editing: false,
    isEmptySubordinateList: true
  }),

  computed: {
    visible: {
      set(value) {
        this.$store.commit(`${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_MUTATIONS_KEYS.SET_SUBORDINATE_VISIBILE}`, value)
      },
      get() {
        return this.$store.state[PQ_WAREHOUSES_STORE_MODULE_NAME].subordinate.visible
      }
    },
    dialog: {
      set(value) {
        this.$store.commit(`${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_MUTATIONS_KEYS.SET_NOT_SUBORDINATE_DIALOG}`, value)
      },
      get() {
        return this.$store.state[PQ_WAREHOUSES_STORE_MODULE_NAME].notSubordinate.dialog
      }
    },

    sidebarWidth() {
      const width = 600
      return this.editing ? width * 2 : width
    }
  },

  methods: {
    handleClickCreate() {
      if (this.editing)
        this.$store.dispatch(`${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
          show: true,
          type: PQ_WAREHOUSES_EDIT_DIALOG_TYPES.CREATE
        })

      else this.editing = true
    },
  }
}
</script>

<style lang="scss" scoped>
.PQParkingsWarehouses {

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
