<template>
<ItemCard noFooter>

  <div class="pPQWarehousesListItem">

    <div
      class="pPQWarehousesListItem__meta"
      v-for="(item, index) in info"
      :key="index"
    >
      <fa
        class="pPQWarehousesListItem__icon"
        :icon="item.icon"
      />
      <span>{{ item.name }}</span>
    </div>

    <div class="pPQWarehousesListItem__footer">
      <Button
        round
        v-for="(button, index) in buttons"
        :type="button.type"
        :key="index"
        @click="button.function"
      >{{ button.text }}</Button>
    </div>

  </div>

</ItemCard>
</template>

<script>
import { STORE_MODULE_NAME, MUTATIONS_KEYS } from '@/utils/pq.warehouses'

import Button from '@/components/Common/Buttons/Button'
import ItemCard from '@/components/Common/Lists/ItemCard'

export default {
  components: {
    Button,
    ItemCard
  },

  props: {
    row: {
      type: Object,
      required: true
    }
  },

  data() {
    return {

      buttons: [{
          type: 'primary',
          text: this.$t('forms.pqWarehouses.item.buttonReview'),
          function: this.handleClickReview
        },
        {
          type: '',
          text: this.$t('forms.pqWarehouses.item.buttonParking'),
          function: this.handleClickParking
        },
        {
          type: '',
          text: this.$t('forms.pqWarehouses.item.buttonQueue'),
          function: this.handleClickQueue
        }
      ],

      info: [
        { icon: 'parking', name: this.row.name },
        { icon: 'map-marker-alt', name: this.row.fullAddress },
        { icon: 'building', name: this.row.organisationName }
      ]

    }
  },

  methods: {
    handleClickReview() {
      this.$router.push(this.$i18n.path(`workspace/pq-warehouses/${this.row.guid}`))
    },

    handleClickParking() {
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_PARKING}`, this.row)
    },

    handleClickQueue() {},
    // handleClickAddToBookmarks() {}
  }
}
</script>

<style lang="scss" scoped>
.pPQWarehousesListItem {

    display: flex;
    align-items: flex-start;
    flex-direction: column;

    &__meta {
        margin-bottom: 1rem;

        display: flex;
        align-items: flex-start;
        line-height: 1rem;
    }

    &__icon {
        margin: 0 2rem 0 .5rem;

        font-size: 16px;
        font-weight: 600;
    }

    &__footer {

      margin-top: 1rem;

        @include for-small-and-less {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;

            button {
                margin: 0;

                &:not(:last-child) {
                    margin: 0 0.5rem 0.5rem 0;
                }
            }
        }
    }

}
</style>
