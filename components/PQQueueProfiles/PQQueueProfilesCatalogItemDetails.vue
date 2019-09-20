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
          v-for="(field, index) in meta"
          :key="index"
          :title="field.title"
          :value="field.text"
        />
      </div>

      <FormField
        :title="$t('forms.pqQueueProfiles.general.labelFullAddress')"
        :value="item.fullAddress"
      />

      <FormField
        :title="$t('forms.common.registrationZoneRadius')"
        :value="item.registrationZoneRadius"
      />
    </div>

    <div class="mt-5">
      <GoogleMap
        :zoom="17"
        :center="position"
        :key="googleMapCircleKey"
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

  data: () => ({
    googleMapCircleKey: 0
  }),

  watch: {
    position(value) {
      this.googleMapCircleKey += 1
    }
  },

  computed: {
    position() {
      return {
        lat: Number(this.item.lat),
        lng: Number(this.item.lng),
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
