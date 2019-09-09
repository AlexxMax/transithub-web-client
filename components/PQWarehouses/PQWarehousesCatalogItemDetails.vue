<template>
  <div class="">
    <span class="font-bold text-3xl">{{ item.name }}</span>

    <div class="mt-5">
      <div class="lg:flex lg:content-start lg:flex-wrap lg:justify-start">
        <FormField
          class="lg:mr-10"
          v-for="(item, index) in meta"
          :key="index"
          :title="item.title"
          :value="item.text"
        />
      </div>

      <FormField
        class=""
        :title="$t('forms.pqWarehouses.general.labelFullAddress')"
        :value="item.fullAddress"
      />
    </div>

    <div class="mt-5">
      <GoogleMap
        :zoom="12"
        :center="position"
      >
        <template v-slot:default="{ google, map }">
          <GoogleMapMarker
            :google="google"
            :map="map"
            :marker="marker"
          />
        </template>
      </GoogleMap>
    </div>
  </div>
</template>

<script>
import FormField from '@/components/Common/FormElements/FormField'
import GoogleMap from '@/components/Common/GoogleMap/GoogleMap'
import GoogleMapMarker from '@/components/Common/GoogleMap/GoogleMapMarker'

export default {
  name: 'th-pq-warehouses-catalog-item-details',

  components: { FormField, GoogleMap, GoogleMapMarker },

  props: {
    item: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
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
  },

  computed: {
    position() {
      return {
        lat: this.item.geoRegistrationLat,
        lng: this.item.geoRegistrationLng
      }
    },

    marker() {
      return {
        position: this.position,
      }
    },
  },
}
</script>
