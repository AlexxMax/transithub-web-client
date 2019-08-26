<template>
<RightView
  :width="`${sidebarWidth}px`"
  :title="title"
  :visible="visible"
  @close="editing = false; visible = false"
>
  <div class="PQWarehousesParkings">

    <div class="PQWarehousesParkings__content">

      <PQWarehousesParkingsNotSubordinate v-if="editing" />

      <PQWarehousesParkingsSubordinate :editing.sync="editing" />

    </div>

  </div>
</RightView>
</template>

<script>
import {
  STORE_MODULE_NAME as PQ_PARKINGS_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_PARKINGS_MUTATIONS_KEYS,
  ACTIONS_KEYS as PQ_PARKINGS_ACTIONS_KEYS
} from '@/utils/pq.parkings'


import RightView from '@/components/Common/RightView'
import PQWarehousesParkingsNotSubordinate from '@/components/pqWarehouses/PQWarehousesParkingsNotSubordinate'
import PQWarehousesParkingsSubordinate from '@/components/pqWarehouses/PQWarehousesParkingsSubordinate'

export default {
  components: {
    RightView,
    PQWarehousesParkingsNotSubordinate,
    PQWarehousesParkingsSubordinate
  },

  data: () => ({
    editing: false
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
      this.editing = true

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

  &__content {
    display: flex;
    flex-direction: row;
  }

  // &__list {
  //   flex: 1;
  //   display: flex;
  // }

}
</style>
