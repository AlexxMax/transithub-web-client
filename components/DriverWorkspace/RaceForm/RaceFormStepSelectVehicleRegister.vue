<template>
  <div class="RaceFormStepSelectVehicleRegister" v-loading="loading">
    <Scaffold
      :title="title"
      :subtitle="subtitle"
      :percentage="percentage"
      :buttons="buttons"
      @close="$emit('close')"
    >
      <div class="RaceFormStepSelectVehicleRegister__content">
        <span class="RaceFormStepSelectVehicleRegister__content__title">{{ $t('forms.common.vehiclesRegisterOutfits') }}</span>

        <div
          class="RaceFormStepSelectVehicleRegister__empty"
          v-if="isEmpty"
        >
          <span>{{ $t('lists.emptyListMessage') }}</span>
        </div>

        <div class="RaceFormStepSelectVehicleRegister__content__items">
          <Item
            v-for="item of items"
            :key="item.guid"
            :item="item"
            :selected="item.guid === form.vehiclesRegisterGuid"
            @select="handleItemSelect"
          />

          <Button
            v-if="showLoadMore"
            class="RaceFormStepSelectVehicleRegister__content__items__load-more"
            type="primary"
            round
            @click="handleLoadMore"
          >
            {{ $t('forms.common.loadMore') }}
          </Button>
        </div>
      </div>
    </Scaffold>
  </div>
</template>

<script>
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormScaffold'
import Item from '@/components/DriverWorkspace/RaceForm/RaceFormVehicleRegisterCard'
import Button from '@/components/Common/Buttons/Button'

import { PAGE_SIZE, OFFSET } from "@/utils/defaultValues";

export default {
  name: 'th-driver-workspace-race-form-select-vehicle-register',

  components: {
    Scaffold,
    Item,
    Button,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    percentage: Number,
    buttons: Array,
    form: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    loading: false,
    offset: OFFSET,
    count: 0,
    items: []
  }),

  computed: {
    showLoadMore() {
      return this.count > this.items.length
    },

    isEmpty() {
      return this.items && !this.items.length && !this.loading
    }
  },

  methods: {
    async fetchVehicleRegisters(more = false) {
      if (more) {
        this.offset += PAGE_SIZE
      }

      this.loading = true

      const { status, count, items } = await this.$api.vehiclesRegisters.getVehiclesRegistersForDriver(
        PAGE_SIZE,
        this.offset
      )
      if (status) {
        this.count = count
        this.items = [ ...this.items, ...items ]
      }
      this.loading = false
    },

    async handleLoadMore() {
      await this.fetchVehicleRegisters(true)
    },

    handleItemSelect(item) {
      this.$emit('select-vehicle-register', item)
    },
  },

  async created() {
    await this.fetchVehicleRegisters()
  }
}
</script>

<style lang='scss' scoped>
.RaceFormStepSelectVehicleRegister {

  &__empty {
      margin-top: 2rem;

      text-align: center;
      color: $--color-info;
  }

  &__content {
    padding: 0px $--driver-workspace-padding;

    &__title {
      @include mobile-driver-workspace--title;
    }

    &__items {
      margin-top: 15px;

      &>* {
        margin-bottom: 10px;
      }

      :last-child {
        margin-bottom: 0px;
      }

      &__load-more {
        width: 100%;
      }
    }
  }
}
</style>
