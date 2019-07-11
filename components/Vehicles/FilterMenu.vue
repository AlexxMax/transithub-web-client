<template>
  <FiltersMenu
    ref="filters-menu"
    v-bind="$attrs"
    use-save-filters
    :filter-set="filterSet"
    :saved-filters-loading="loadingSavedFilters"
    :saved-filters-items="savedFilters"
    :loaders="savedFiltersLoaders"
    :needSubscription="needSubscription"
    @clear-filters="clearFilters"
    @save-filters="saveFilters"
    @remove-filters="removeFilters"
    @set-filters="setFilters"
    @open="handleOpenFiltersMenu"
    @close="$emit('close')"
  >
    <el-form 
      ref="form" 
      v-loading="loading" 
      label-width="120px" 
      label-position="top" 
      size="mini" 
      @submit.native.prevent
    >
      <el-form-item :label="$t('forms.common.vNumber')">
        <el-input
          v-model="filterVehicleNr"
          :placeholder="$t('forms.common.vNumberPlaceholder')"
          :maxlength="8"
          clearable
        />
      </el-form-item>

      <el-form-item :label="$t('forms.common.techPassport')">
        <el-input
          v-model="filterTechPassport"
          v-mask="techPassportMask"
          :placeholder="$t('forms.common.techPassportPlaceholder')"
          :maxlength="9"
          clearable
        />
      </el-form-item>

      <el-form-item :label="$t('forms.common.brand')">
        <el-autocomplete
          style="width: 100%"
          v-model="filterBrand"
          :fetch-suggestions="handleBrandSearch"
          :placeholder="$t('forms.common.brandPlaceholder')"
          :trigger-on-focus="false"
          clearable
        />
      </el-form-item>

      <el-form-item :label="$t('forms.common.type')">
        <el-select
          style="width: 100%"
          v-model="filterType"
          :placeholder="$t('forms.common.typePlaceholder')"
          :loading="typesLoading"
          filterable
          clearable
        >
          <el-option
            v-for="option in typesSelectOptions"
            :key="option.id"
            :label="option.name"
            :value="option.name"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </FiltersMenu>
</template>

<script>
import FiltersMenu from '@/components/Common/Lists/FiltersMenu'
import { setFilter } from '@/utils/vehicles'

import { TECH_PASSPORT_MASK } from "@/utils/constants"

import {
  STORE_MODULE_NAME as VEHICLES_TYPES_STORE_MODULE_NAME,
  ACTIONS_KEYS as VEHICLES_TYPES_ACTIONS_KEYS
} from "@/utils/vehiclesTypes"

export default {
  name: 'th-vehicles-filter-menu',

  components: {
    FiltersMenu
  },

  data() {
    return {
      techPassportMask: TECH_PASSPORT_MASK,
      loading: false,
      needSubscription: false
    }
  },

  computed: {
    filterVehicleNr: {
      get() {
        return this.$store.state.vehicles.filters.set.vehicleNr
      },
      set(value) {
        this.setFilter('vehicleNr', value)
      }
    },

    filterTechPassport: {
      get() {
        return this.$store.state.vehicles.filters.set.techPassport
      },
      set(value) {
        this.setFilter('techPassport', value)
      }
    },

    filterBrand: {
      get() {
        return this.$store.state.vehicles.filters.set.brand
      },
      set(value) {
        this.setFilter('brand', value)
      }
    },

    filterType: {
      get() {
        return this.$store.state.vehicles.filters.set.type
      },
      set(value) {
        this.setFilter('type', value)
      }
    },

    filterSet() {
      return this.$store.getters['vehicles/LIST_FILTERS_SET']
    },

    typesLoading() {
      return this.$store.state.vehiclesTypes.loading
    },

    typesSelectOptions() {
      return this.$store.state.vehiclesTypes.list
      //return this.$store.state.vehiclesTypes.list.map(({ id, name }) => ({ id, name }))

      // return [{
      //   id: 1,
      //   name: 'Vasa'
      // }, {
      //   id: 2,
      //   name: 'Petia'
      // }]
    },

    loadingSavedFilters: {
      get() {
        return this.$store.state.vehicles.filters.saved.loading
      },
      set(value) {
        this.$store.commit('vehicles/SET_FILTERS_SAVED_LOADING', value)
      }
    },

    savedFilters() {
      return this.$store.state.vehicles.filters.saved.list
    },

    savedFiltersLoaders() {
      return this.$store.state.vehicles.filters.saved.loaders
    }
  },

  methods: {
    fetch() {
      // Vehicles Types
      const {
        fetched: vehiclesTypesFetched,
        loading: vehiclesTypesLoading
      } = this.$store.state.vehiclesTypes;
      if (!vehiclesTypesFetched && !vehiclesTypesLoading) {
        this.$store.dispatch(
          `${VEHICLES_TYPES_STORE_MODULE_NAME}/${
            VEHICLES_TYPES_ACTIONS_KEYS.FETCH_LIST
          }`
        )
      }
    },

    setFilter(key, value) {
      setFilter(this, key, value)
    },

    clearFilters() {
      this.$store.dispatch('vehicles/CLEAR_FILTERS')
    },

    async saveFilters() {
      this.loadingSavedFilters = true
      this.$store.dispatch('vehicles/CREATE_NEW_SAVED_FILTERS', await this.generateFiltersLabels())
    },

    async generateFiltersLabels() {
      let labels = []

      // Vehicle Nr
      if (this.filterVehicleNr) {
        labels = [ ...labels, this.filterVehicleNr ]
      }

      // TechPassport
      if (this.filterTechPassport) {
        labels = [ ...labels, this.filterTechPassport ]
      }

      // Brand
      if (this.filterBrand) {
        labels = [ ...labels, this.filterBrand ]
      }

      // Type
      if (this.filterType) {
        labels = [ ...labels, this.filterType ]
      }

      return labels
    },

    setFilters(filters) {
      this.$store.dispatch('vehicles/SET_FILTERS', filters)
    },

    removeFilters(guid) {
      this.$store.dispatch('vehicles/REMOVE_SAVED_FILTERS', guid)
    },

    async handleBrandSearch(search, cb) {
      if (!search) {
        return;
      }
      const { status, items } = await this.$api.vehicles.getBrands(search);
      if (status) {
        cb(items.map(item => ({ value: item.name })))
      }
    },

    async handleOpenFiltersMenu() {
      // if (!this.$store.state.drivers.filters.dataFetched) {
      //   this.loading = true
      //   await this.$store.dispatch('drivers/FETCH_FILTERS_DATA')
      //   this.loading = false
      // }

      // Saved Filters
      if (!this.$store.state.vehicles.filters.saved.fetched && !this.loadingSavedFilters) {
        await this.$store.dispatch('vehicles/LOAD_SAVED_FILTERS')
      }

      //this.fetch()
    }
  },

  // created() {
  //   this.fetch()
  // }
}
</script>
