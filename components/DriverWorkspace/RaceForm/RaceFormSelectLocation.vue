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
        :init-value="point.region"
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
        :init-value="point.district"
      />
    </el-form-item>

    <el-form-item
      prop="settlement"
      :label="$t('forms.pqWarehouses.general.labelSettlement')"
    >
      <LocalitySelect
        :kind="KIND.settlement"
        :region="point.region"
        :district="point.district"
        @change="handleSelectSettlement"
        :init-value="point.koatuu"
      />
    </el-form-item>

    <el-form-item>
      <Button
        :disabled="!isActive"
        style="width: 100%;"
        round
        size="medium"
        type="primary"
        @click="handleClickSave"
      >Save</Button>
    </el-form-item>

  </div>
</Scaffold>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListScaffold'
import LocalitySelect from '@/components/Common/LocalitySelect'

const KIND = Object.freeze({
  region: 2,
  district: 3,
  settlement: 4
})

export default {
  components: {
    Button,
    Scaffold,
    LocalitySelect
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
    }
  }),

  watch: {
    initValues: {
      immediate: true,
      handler(initValues) {
        this.point = initValues
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
    }
  },

  created() {
    this.KIND = KIND
  },

  methods: {
    handleSelectRegion(region) {
      this.point.region = region.regionCode
      this.point.name = region.description

      this.clearInputs(['district', 'koatuu'])
    },
    handleSelectDistrict(district) {
      this.point.district = district.districtCode
      this.point.name = district.description

      this.clearInputs(['koatuu'])
    },
    handleSelectSettlement(settlement) {
      this.point.koatuu = settlement.koatuu
      this.point.name = settlement.description
    },
    handleClickSave() {
      this.$emit('select', this.point)
      this.innerVisible = false
    },

    clearInputs(inputs = []) {
      [...inputs].forEach(input => this.point[input] = '')
    },
  }
}
</script>

<style lang="scss" scoped>
.RaceFormSelectLocation {
    padding-top: 1rem;
}
</style>
