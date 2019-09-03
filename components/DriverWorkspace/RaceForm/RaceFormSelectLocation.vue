<template>
<Scaffold
  title="Select location"
  :visible.sync="innerVisible"
>
  <div class="RaceFormSelectLocation">
    <el-form-item
      prop="region"
      :label="$t('forms.pqWarehouses.general.labelRegion')"
    >
      <LocalitySelect
        :kind="KIND.region"
        @change="handleSelectRegion"
      />
    </el-form-item>

    <el-form-item
      prop="district"
      :label="$t('forms.pqWarehouses.general.labelDistrict')"
    >
      <LocalitySelect
        :kind="KIND.district"
        :region="point.region"
        @change="handleSelectDistrict"
      />
    </el-form-item>

    <div
      v-if="items"
      class="RaceFormSelectLocation__list"
      v-loading="loading"
    >
      <RaceFormSelectListItemLocation
        v-for="(item, index) of items"
        :key="index"
        :item="item"
        @select="settlement => handleSelectSettlement(settlement)"
      />
    </div>

    <div
      v-if="isEmpty"
      class="RaceFormSelectLocation__empty"
    >
      <span>{{ $t('lists.emptyListMessage') }}</span>
    </div>

  </div>
</Scaffold>
</template>

<script>
import LocalitySelect from '@/components/Common/LocalitySelect'
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListScaffold'
import RaceFormSelectListItemLocation from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListItemLocation'

const KIND = Object.freeze({
  region: 2,
  district: 3,
  settlement: 4
})

export default {
  components: {
    Scaffold,
    LocalitySelect,
    RaceFormSelectListItemLocation
  },

  props: {
    initValues: {
      type: Object,
      default: () => null
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    point: {
      name: null,
      region: null,
      district: null,
      settlement: null
    },

    items: null,
    loading: false
  }),

  watch: {
    initValues: {
      immediate: true,
      handler(initValues) {
        this.point = initValues
      }
    },
    visible: {
      immediate: true,
      handler(visible) {
        visible ? this.handleSearch() : null
      }
    }
  },

  computed: {
    innerVisible: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) this.point = { name: null, region: null, district: null, settlement: null }
        this.$emit('update:visible', value)
      }
    },

    isActive() {
      return this.point.region && this.point.district && this.point.koatuu
    },

    isEmpty() {
      return this.items && !this.items.length && !this.loading
    }
  },

  created() {
    this.KIND = KIND
  },

  methods: {
    handleSelectRegion(region) {
      this.point.region = region.regionCode

      this.handleSearch()
      this.clearInputs(['district', 'koatuu'])
    },
    handleSelectDistrict(district) {
      this.point.district = district.districtCode

      this.handleSearch()
      this.clearInputs(['koatuu'])
    },
    handleSelectSettlement(settlement) {
      this.point.name = settlement.description
      this.point.koatuu = settlement.koatuu
      this.point.region = settlement.region
      this.point.district = settlement.district

      this.$emit('select', this.point)
      this.innerVisible = false
    },

    clearInputs(inputs = []) {
      [...inputs].forEach(input => this.point[input] = '')
    },

    async handleSearch() {
      this.loading = true

      const { status, items } = await this.$api.points.getPoints(
        50, // limit
        null, // offset
        4, // kind
        null, // country_code
        this.point.region, // region_code
        this.point.district, // district_code
      )

      this.items = status ? items.map(item => ({
        koatuu: item.koatuu,
        region: item.regionCode,
        district: item.districtCode,
        name: item.name,
        type: item.type,
        description: item.description
      })) : null

      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.RaceFormSelectLocation {
    .el-form-item {
        margin-bottom: 0;
    }
}
</style>

<style lang="scss" scoped>
.RaceFormSelectLocation {
    padding-top: 1rem;

    &__list {
        height: calc(100vh - 310px);

        margin: 1rem 0;

        overflow-y: auto;
    }

    &__empty {
        margin-top: 2rem;

        text-align: center;
        color: $--color-info;
    }
}
</style>
