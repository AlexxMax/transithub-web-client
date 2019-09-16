<template>
  <div>
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

       <FormField
          :title="$t('forms.common.pqQueueProfile')"
        >
          <nuxt-link :to="$i18n.path(`workspace/pq-queue-profiles/${item.queueProfileGuid}`)">
            {{ item.queueProfileName }}
          </nuxt-link>
        </FormField>
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
