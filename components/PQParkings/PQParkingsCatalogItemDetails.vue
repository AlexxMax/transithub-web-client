<template>
  <div>
    <span class="font-bold text-3xl">{{ item.name }}</span>
    <div class="text-gray-700 block lg:hidden xl:hidden">{{ item.organisationName }}</div>

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
        :title="$t('forms.common.address')"
        :value="item.address"
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
  name: 'th-pq-parkings-catalog-item-details',

  components: { FormField, GoogleMap, GoogleMapMarker },

  props: {
    item: {
      type: Object,
      required: true,
    }
  },

  computed: {
    position() {
      return {
        lat: this.item.geoParkingLat,
        lng: this.item.geoParkingLng
      }
    },

    marker() {
      return {
        position: this.position,
      }
    },

    meta() {
      return [{
          title: this.$t('forms.common.region'),
          text: this.item.regionName
        },
        {
          title: this.$t('forms.common.district'),
          text: this.item.districtName
        },
        {
          title: this.$t('forms.common.locality'),
          text: this.item.localityName
        }
      ]
    }
  },
}
</script>
