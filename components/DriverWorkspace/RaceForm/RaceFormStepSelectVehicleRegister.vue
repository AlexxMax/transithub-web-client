<template>
  <div class="RaceFormStepSelectVehicleRegister" v-loading="vehiclesRegistersLoading">
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
            v-for="item of vehiclesRegisters"
            :key="item.guid"
            :item="item"
            :selected="item.guid === form.vehiclesRegisterGuid"
            @select="item => $emit('select-vehicle-register', item)"
          />

          <Button
            v-if="showLoadMore"
            class="RaceFormStepSelectVehicleRegister__content__items__load-more"
            type="primary"
            round
            @click="$methods.driver.fetchRaceFormVehiclesRegisters(true)"
          >
            {{ $t('forms.common.loadMore') }}
          </Button>
        </div>
      </div>
    </Scaffold>
  </div>
</template>

<script>
import moment from 'moment'

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

  computed: {
    showLoadMore() {
      return this.vehiclesRegistersCount > this.vehiclesRegisters.length
    },

    isEmpty() {
      return this.vehiclesRegisters && !this.vehiclesRegisters.length && !this.vehiclesRegistersLoading
    },

    vehiclesRegisters(value) {
      return this.$store.state.driver.races.form.vehiclesRegisters.items
    },

    vehiclesRegistersLoading(value) {
      return this.$store.state.driver.races.form.vehiclesRegisters.loading
    },

    vehiclesRegistersCount(value) {
      return this.$store.state.driver.races.form.vehiclesRegisters.count
    },
  },

  async created() {
    if (this.vehiclesRegisters) return

    await this.$methods.driver.fetchRaceFormVehiclesRegisters()
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

      & > * {
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
