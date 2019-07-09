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
      <el-form-item :label="$t('lists.filters.lastName')">
        <el-input
          v-model="filterLastName"
          :placeholder="$t('forms.common.lastNamePlaceholder')"
          clearable
        />
      </el-form-item>

      <el-form-item :label="$t('forms.common.certSerialNumber')">
        <el-input
          v-model="filterCertSerialNumber"
          :placeholder="$t('forms.common.certSerialNumberPlaceholder')"
          :maxlength="9"
          clearable
        />
      </el-form-item>

      <el-form-item :label="$t('forms.common.passData')">
        <el-input
          class="FilterMenu__input-serial"
          v-model="filterPassSerial"
          :placeholder="$t('forms.common.passSerialPlaceholder')"
          :maxlength="2"
          clearable
          @input="handlePassSerialInput"
        />

        <el-input
          class="FilterMenu__input-nr"
          v-mask="'######'"
          v-model="filterPassNr"
          :placeholder="$t('forms.common.passNumberPlaceholder')"
          :maxlength="6"
          clearable
        />
      </el-form-item>

      <el-form-item :label="$t('lists.filters.phone')">
        <el-input
          v-model="filterPhone"
          v-mask="phoneMask"
          type="tel"
          :placeholder="$t('forms.common.phonePlaceholder')"
          clearable
        />
      </el-form-item>
    </el-form>
  </FiltersMenu>
</template>

<script>
import FiltersMenu from '@/components/Common/Lists/FiltersMenu'
import { setFilter } from '@/utils/drivers'
import { PHONE_MASK } from '@/utils/constants'

export default {
  name: 'th-drivers-filter-menu',

  components: {
    FiltersMenu
  },

  data() {
    return {
      phoneMask: PHONE_MASK,
      loading: false,
      needSubscription: false
    }
  },

  computed: {
    filterLastName: {
      get() {
        return this.$store.state.drivers.filters.set.lastName
      },
      set(value) {
        this.setFilter('lastName', value)
      }
    },

    filterCertSerialNumber: {
      get() {
        return this.$store.state.drivers.filters.set.certSerialNumber
      },
      set(value) {
        this.setFilter('certSerialNumber', value)
      }
    },

    filterPassSerial: {
      get() {
        return this.$store.state.drivers.filters.set.passSerial
      },
      set(value) {
        this.setFilter('passSerial', value)
      }
    },

    filterPassNr: {
      get() {
        return this.$store.state.drivers.filters.set.passNr
      },
      set(value) {
        this.setFilter('passNr', value)
      }
    },

    filterPhone: {
      get() {
        return this.$store.state.drivers.filters.set.phone
      },
      set(value) {
        this.setFilter('phone', value)
      }
    },

    filterSet() {
      return this.$store.getters['drivers/LIST_FILTERS_SET']
    },

    loadingSavedFilters: {
      get() {
        return this.$store.state.drivers.filters.saved.loading
      },
      set(value) {
        this.$store.commit('drivers/SET_FILTERS_SAVED_LOADING', value)
      }
    },

    savedFilters() {
      return this.$store.state.drivers.filters.saved.list
    },

    savedFiltersLoaders() {
      return this.$store.state.drivers.filters.saved.loaders
    }
  },

  methods: {
    setFilter(key, value) {
      setFilter(this, key, value)
    },

    clearFilters() {
      this.$store.dispatch('drivers/CLEAR_FILTERS')
    },

    handlePassSerialInput() {
      if (!this.filterPassSerial) {
        return
      }
      const regex = /[a-zA-Zа-яА-Я]/gmu;
      const lastChar = this.filterPassSerial[
        this.filterPassSerial.length - 1
      ];
      if (!regex.test(lastChar)) {
        this.filterPassSerial = this.filterPassSerial.substr(
          0,
          this.filterPassSerial.length - 1
        );
      } else {
        this.filterPassSerial = this.filterPassSerial.toUpperCase();
      }
    },

    async saveFilters() {
      this.loadingSavedFilters = true
      this.$store.dispatch('drivers/CREATE_NEW_SAVED_FILTERS', await this.generateFiltersLabels())
    },

    async generateFiltersLabels() {
      let labels = []

      // Last Name
      if (this.filterLastName) {
        labels = [ ...labels, this.filterLastName ]
      }

      // CertSerial Number
      if (this.filterCertSerialNumber) {
        labels = [ ...labels, this.filterCertSerialNumber ]
      }

      // Pass Serial
      if (this.filterPassSerial) {
        labels = [ ...labels, this.filterPassSerial ]
      }

      // Pass Nr
      if (this.filterPassNr) {
        labels = [ ...labels, this.filterPassNr ]
      }

      // Phone
      if (this.filterPhone) {
        labels = [ ...labels, this.filterPhone ]
      }

      return labels
    },

    setFilters(filters) {
      this.$store.dispatch('drivers/SET_FILTERS', filters)
    },

    removeFilters(guid) {
      this.$store.dispatch('drivers/REMOVE_SAVED_FILTERS', guid)
    },

    async handleOpenFiltersMenu() {
      // if (!this.$store.state.drivers.filters.dataFetched) {
      //   this.loading = true
      //   await this.$store.dispatch('drivers/FETCH_FILTERS_DATA')
      //   this.loading = false
      // }

      // Saved Filters
      if (!this.$store.state.drivers.filters.saved.fetched && !this.loadingSavedFilters) {
        this.$store.dispatch('drivers/LOAD_SAVED_FILTERS')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.FilterMenu__input-serial {
  width: 20%;
  margin-right: 13px;
}

.FilterMenu__input-nr {
  width: 75%;
}
</style>