<template>
<RightView
  class="pqWarehousesParking"
  width="80%"
  :visible="!!parking"
  @close="parking = null"
>

  <div
    class="pqWarehousesParking__content"
    v-if="parking"
  >

    <span class="pqWarehousesParking__title">{{ parking.name }}</span>

    <span class="pqWarehousesParking__subtitle">Стоянки</span>

    <Button
      round
      fa-icon="plus"
      type="primary"
    >Створити стоянку</Button>

  </div>

</RightView>
</template>

<script>
import { STORE_MODULE_NAME, MUTATIONS_KEYS } from '@/utils/pq.warehouses'

import Button from '@/components/Common/Buttons/Button'
import RightView from '@/components/Common/RightView'

export default {
  components: {
    Button,
    RightView
  },

  computed: {
    parking: {
      get() { return this.$store.state[STORE_MODULE_NAME].parking },
      set(value) { this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_PARKING}`, value) }
    }
  }
}
</script>

<style lang="scss" scoped>
.pqWarehousesParking {

    &__title {
        margin-bottom: 1rem;

        font-size: 1rem;
        color: $--color-info;
    }

    &__subtitle {
        margin-bottom: 1rem;
    }

    &__content {
        display: flex;
        flex-direction: column;
    }
}
</style>
