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
        faIcon="plus"
        round
        @click="handleClickCreate"
      >{{ $t('forms.common.create') }}</Button>

      <Button
        v-else
        round
        type
        edit
        faIcon="pen"
        @click="editing = true"
      >{{ $t('forms.pqWarehouses.item.buttonChange') }}</Button>

      <Button
        style="margin: .5rem 0; display: flex; justify-content: center"
        class="PQWarehousesParkings__btn-add-existing"
        faIcon="plus"
        type="success"
        round
        @click="dialog = true"
      >Додати існуючу</Button>
    </div>

    <div class="PQWarehousesParkings__content">
      <PQWarehousesParkingsNotSubordinate
        v-if="editing"
        class="PQWarehousesParkings__not-subordinate"
      />

      <PQWarehousesParkingsSubordinate
        @handleClickCreate="editing = true"
        :editing="editing"
        class="PQWarehousesParkings__subordinate"
      />
    </div>

  </div>
</RightView>
</template>

<script>
import {
  STORE_MODULE_NAME as PQ_PARKINGS_STORE_MODULE_NAME,
  EDIT_DIALOG_TYPES as PQ_QUEUES_EDIT_DIALOG_TYPES,
  MUTATIONS_KEYS as PQ_PARKINGS_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_PARKINGS_ACTIONS_KEYS
} from '@/utils/pq.parkings'

import Button from '@/components/Common/Buttons/Button'
import RightView from '@/components/Common/RightView'
import PQWarehousesParkingsNotSubordinate from '@/components/pqWarehouses/PQWarehousesParkingsNotSubordinate'
import PQWarehousesParkingsSubordinate from '@/components/pqWarehouses/PQWarehousesParkingsSubordinate'

export default {
  components: {
    Button,
    RightView,
    PQWarehousesParkingsNotSubordinate,
    PQWarehousesParkingsSubordinate,
  },

  data: () => ({
    editing: false,
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
      this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: PQ_QUEUES_EDIT_DIALOG_TYPES.CREATE
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesParkings {

    height: 100%;

    &__header {
        margin-bottom: 1rem;

        @media (max-width: 360px) {
          flex-direction: column;
        }
    }

    &__btn-add-existing {
        display: none;

        @media (max-width: 800px) {
            display: flex;

            text-align: center;
        }

        @media (max-width: 360px) {
          margin: 0;
          margin-top: .5rem;
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
