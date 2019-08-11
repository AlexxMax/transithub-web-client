<template>
<div class="PQWarehousesGuidContent">

  <div class="PQWarehousesGuidContent__panel">
    <span class="PQWarehousesGuidContent__title">{{ $t('forms.pqWarehouses.item.titleLocation') }}</span>

    <PQWarehousesGuidHeader @openPattern="$emit('openPattern')" />
  </div>

  <div class="PQWarehousesGuidContent__address">
    <span class="PQWarehousesGuidContent__subtitle">{{ $t('forms.pqWarehouses.general.labelFullAddress') }}</span>

    <el-input
      :placeholder="$t('forms.pqWarehouses.general.placeholderFullAddress')"
      clearable
      v-model="address"
    />
  </div>

  <div class="PQWarehousesGuidContent__info">
    <span class="PQWarehousesGuidContent__title">{{ $t('forms.pqWarehouses.item.titleMoreInfo') }}</span>

    <div class="PQWarehousesGuidContent__wrapper-meta">

      <div
        class="PQWarehousesGuidContent__meta"
        v-for="(item, index) in meta"
        :key="index"
      >
        <span class="PQWarehousesGuidContent__subtitle">{{ item.title }}</span>

        <span>{{ item.text }}</span>
      </div>

    </div>
  </div>

  <div class="PQWarehousesGuidContent__map">
    <span class="PQWarehousesGuidContent__subtitle">{{ $t('forms.pqWarehouses.item.labelMap') }}</span>

    <Map
      :lat="item.geoRegistrationLat"
      :lng="item.geoRegistrationLng"
    />
  </div>

</div>
</template>

<script>
import Map from '@/components/Common/Map'
import PQWarehousesGuidHeader from '@/components/PQWarehouses/PQWarehousesGuidHeader'

export default {
  components: {
    Map,
    PQWarehousesGuidHeader
  },

  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {

      address: this.item.fullAddress,

      meta: [{
          title: this.$t('forms.pqWarehouses.general.labelRegion'),
          text: this.item.regionName
        },
        {
          title: this.$t('forms.pqWarehouses.general.labelDistrict'),
          text: this.item.districtName
        },
        {
          title: this.$t('forms.pqWarehouses.general.labelSettlement'),
          text: this.item.localityName
        }
      ]

    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesGuidContent {

    padding: 2.75rem 4rem;

    &__title {
        // margin-bottom: 1.5rem;

        color: $--color-info;
        font-size: 1.75rem;
    }

    &__subtitle {
        margin-bottom: 0.75rem;

        display: block;

        color: $--color-info;
        font-size: 0.75rem;
    }

    &__panel {
        margin-bottom: 2rem;

        display: flex;
        align-items: center;
        justify-content: space-between;

        line-height: 1;
    }

    &__input {
        width: 100%;
        max-width: 620px;

        padding: 0.95rem;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 1rem;

        border-radius: 4px;
        border: 1px solid $--color-info;
    }

    &__address {
        margin-bottom: 3rem;
    }

    &__info {
        margin-bottom: 3rem;
    }

    &__wrapper-meta {
        margin-top: 2rem;

        display: flex;
        flex-direction: row;
    }

    &__meta {

        &:not(:last-child) {
            margin-right: 2rem;
        }

        display: flex;
        flex-direction: column;
    }

}
</style>
