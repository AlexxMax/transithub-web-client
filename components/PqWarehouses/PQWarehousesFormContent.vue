<template>
<Segment class="PQWarehousesFormContent">

  <div class="PQWarehousesFormContent__panel">
    <span class="PQWarehousesFormContent__title">{{ $t('forms.pqWarehouses.item.titleLocation') }}</span>

    <!-- <pre>{{ warehouse }}</pre> -->

    <PQWarehousesFormButtons class="PQWarehousesFormContent__buttons">
      <Button
        round
        v-for="(button, index) in buttons"
        type
        :key="index"
        @click="button.function"
      >{{ button.text }}</Button>

      <Button
        round
        type
        edit
        faIcon="pen"
        @click="handleClickEdit"
      >{{ $t('forms.pqWarehouses.item.buttonChange') }}</Button>
    </PQWarehousesFormButtons>
  </div>

  <div class="PQWarehousesFormContent__form">

    <div class="PQWarehousesFormContent__block">
      <FormField
        class="PQWarehousesFormContent__field"
        v-for="(item, index) in meta"
        :key="index"
        :title="item.title"
        :value="item.text"
      />
    </div>

    <div class="PQWarehousesFormContent__block">
      <FormField
        class="PQWarehousesFormContent__field"
        :title="$t('forms.pqWarehouses.general.labelFullAddress')"
        :value="warehouse.fullAddress"
      />
    </div>

    <div class="PQWarehousesFormContent__block">
      <FormField
        style="width: 100%"
        class="PQWarehousesFormContent__field"
        :title="$t('forms.pqWarehouses.item.labelMap')"
      >
        <GoogleMap
          :zoom="zoom"
          :center="position"
        >
          <template v-slot:default="{ google, map }">
            <GoogleMapCircle
              :google="google"
              :map="map"
              :center="position"
              :radius="warehouse.registrationZoneRadius"
            />
          </template>
        </GoogleMap>
      </FormField>
    </div>

  </div>

</Segment>
</template>

<script>
import {
  STORE_MODULE_NAME,
  EDIT_DIALOG_TYPES,
  MUTATIONS_KEYS,
  ACTIONS_KEYS
} from "@/utils/pq.warehouses"
import {
  STORE_MODULE_NAME as GOODS_STORE_MODULE_NAME,
  MUTATIONS_KEYS as GOODS_MUTATIONS_KEYS,
  ACTIONS_KEYS as GOODS_ACTIONS_KEYS,
} from '@/utils/goods'

import Button from '@/components/Common/Buttons/Button'
import Segment from '@/components/Common/FormElements/FormSegment'
import FormField from '@/components/Common/FormElements/FormField'
import PQWarehousesFormButtons from '@/components/pqWarehouses/PQWarehousesFormButtons'
import GoogleMap from '@/components/Common/GoogleMap/GoogleMap'
import GoogleMapCircle from '@/components/Common/GoogleMap/GoogleMapCircle'

export default {
  components: {
    Button,
    Segment,
    FormField,
    PQWarehousesFormButtons,
    GoogleMap,
    GoogleMapCircle
  },

  props: {
    warehouse: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {

      buttons: [{
          text: this.$t('forms.pqWarehouses.item.buttonParking'),
          function: this.handleClickParking
        },
        {
          text: this.$t('forms.pqWarehouses.item.buttonQueue'),
          function: this.handleClickQueue
        },
        {
          type: '',
          text: this.$t('forms.pqWarehouses.goods.goods'),
          function: this.handleClickGoods
        }
      ],

      meta: [{
          title: this.$t('forms.pqWarehouses.general.labelRegion'),
          text: this.warehouse.regionName
        },
        {
          title: this.$t('forms.pqWarehouses.general.labelDistrict'),
          text: this.warehouse.districtName
        },
        {
          title: this.$t('forms.pqWarehouses.general.labelSettlement'),
          text: this.warehouse.localityName
        }
      ]

    }
  },

  computed: {
    position() {
      return {
        lat: this.warehouse.geoRegistrationLat,
        lng: this.warehouse.geoRegistrationLng
      }
    },

    zoom() {
      const r = this.warehouse.registrationZoneRadius

      return r <= 40 ? 20 :
        r <= 75 ? 19 :
        r <= 150 ? 18 :
        r <= 300 ? 17 :
        r <= 625 ? 16 :
        r <= 1250 ? 15 :
        r <= 2500 ? 14 :
        r <= 5000 ? 13 :
        r <= 7500 ? 12 :
        11
    }
  },

  methods: {
    handleClickParking() {
      this.$emit('openParking')
    },
    handleClickQueue() {
      this.$emit('openQueue')
    },
    async handleClickGoods() {
      await this.$store.commit(`${GOODS_STORE_MODULE_NAME}/${GOODS_MUTATIONS_KEYS.SET_SUBORDINATE_WAREHOUSE}`, this.row)

      this.$store.dispatch(`${GOODS_STORE_MODULE_NAME}/${GOODS_ACTIONS_KEYS.FETCH_LIST}`)

      this.$store.dispatch(`${GOODS_STORE_MODULE_NAME}/${GOODS_ACTIONS_KEYS.FETCH_SUBORDINATE_LIST}`)
    },
    handleClickEdit() {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: EDIT_DIALOG_TYPES.EDIT
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesFormContent {

    &__title {
        color: $--color-info;
        font-size: 1.75rem;
    }

    &__panel {
        margin-bottom: 1rem;

        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        line-height: 1;
    }

    &__buttons {}

    &__block {
        width: 100%;

        display: flex;
        flex-wrap: wrap;
    }

    &__field {
        &:not(:last-child) {
            margin-right: 3rem;
        }
    }

}
</style>
