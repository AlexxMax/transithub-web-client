<template>
<div class="PQWarehousesEditDialogMap">

  <div class="PQWarehousesEditDialogMap__input">
    <label
      class="PQWarehousesEditDialogMap__label"
      for="PQWarehousesEditDialogMap__input"
    >{{ $t('forms.pqWarehouses.pattern.steps.map.labelRadius') }}</label>

    <el-input-number
      id="PQWarehousesEditDialogMap__input"
      v-model="form.radius"
      :min="10"
      :max="10000"
    />
  </div>

  <span class="PQWarehousesEditDialogMap__or">{{ $t('forms.pqWarehouses.pattern.steps.map.labelRadiusOnMap') }}</span>

  <GoogleMap
    :zoom="zoom"
    :center="position"
    style="height: 500px"
  >
    <template v-slot:default="{ google, map }">
      <GoogleMapCircle
        editable
        :google="google"
        :map="map"
        :center="position"
        :radius="form.radius"
        @changeCenter="({ lat, lng }) => { form.lat = lat; form.lng = lng }"
        @changeRadius="value => form.radius = value"
      />
    </template>
  </GoogleMap>

  <div class="PQWarehousesEditDialogMap__footer">

    <Button
      round
      v-for="(button, index) in buttons"
      :type="button.type"
      :key="index"
      @click="button.function"
    >{{ button.text }}</Button>

  </div>

</div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import GoogleMap from '@/components/Common/GoogleMap/GoogleMap'
import GoogleMapCircle from '@/components/Common/GoogleMap/GoogleMapCircle'

export default {
  components: {
    Button,
    GoogleMap,
    GoogleMapCircle
  },

  props: {
    form: {
      type: Object,
      required: true
    },

    creating: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    position() {
      return {
        lat: Number(this.form.lat),
        lng: Number(this.form.lng)
      }
    }
  },

  data() {
    return {

      zoom: this.getZoomByRadius(),

      buttons: [{
          text: this.$t('forms.pqWarehouses.pattern.buttonPrev'),
          type: '',
          function: this.handleClickPrev
        },
        {
          text: this.creating ? this.$t('forms.pqWarehouses.pattern.buttonCreate') : this.$t('forms.pqWarehouses.pattern.buttonChange'),
          type: 'primary',
          function: this.handleClickSave
        }
      ]

    }
  },

  methods: {
    handleClickPrev() {
      this.$emit('prev')
    },

    handleClickSave() {
      this.$emit('save')
    },

    getZoomByRadius() {
      const r = this.form.radius

      return r <= 40 ? 19
        : r <= 75 ? 18
        : r <= 150 ? 17
        : r <= 300 ? 16
        : r <= 625 ? 15
        : r <= 1250 ? 14
        : r <= 2500 ? 13
        : r <= 5000 ? 12
        : r <= 7500 ? 11
        : 10
    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesEditDialogMap {

    &__label {
        margin-bottom: 0.5rem;

        display: block;
    }

    &__input {
        display: flex;
        flex-direction: column;

        user-select: none;
    }

    &__or {
        display: block;
        margin: 1rem 0;
    }

    &__footer {
        margin-top: 1rem;

        display: flex;
        justify-content: center;
    }
}
</style>
