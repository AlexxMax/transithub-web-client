<template>
  <div>
    <div class="flex flex-col">
      <span class="font-bold text-3xl">{{ item.name }}</span>
      <span class="text-gray-700">{{ item.description }}</span>
    </div>

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
        :title="$t('forms.pqQueueProfiles.general.labelFullAddress')"
        :value="item.fullAddress"
      />
    </div>

    <div class="mt-5">
      <GoogleMap
        :zoom="12"
        :center="position"
      >
        <template v-slot:default="{ google, map }">
          <GoogleMapCircle
            :google="google"
            :map="map"
            :center="position"
            :radius="item.registrationZoneRadius"
          />
        </template>
      </GoogleMap>
    </div>
  </div>
</template>

<script>
import FormField from '@/components/Common/FormElements/FormField'
import GoogleMap from '@/components/Common/GoogleMap/GoogleMap'
import GoogleMapCircle from '@/components/Common/GoogleMap/GoogleMapCircle'

export default {
  name: 'th-pq-queue-profiles-catalog-item-details',

  components: { FormField, GoogleMap, GoogleMapCircle },

  props: {
    item: {
      type: Object,
      required: true,
    }
  },

  computed: {
    position() {
      return {
        lat: this.item.lat,
        lng: this.item.lng,
      }
    },

    meta() {
      return [{
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
}
</script>
