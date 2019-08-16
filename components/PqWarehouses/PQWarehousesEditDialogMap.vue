<template>
<div class="PQWarehousesPatternMap">

  <div class="PQWarehousesPatternMap__input">
    <label for="PQWarehousesPatternMap__label">Радиус, м</label>

    <el-input-number
      id="PQWarehousesPatternMap__input"
      v-model.number="form.radius"
      :min="10"
      :max="10000"
    />
  </div>

  <span class="PQWarehousesPatternMap__or">или выберите на карте</span>

  <GoogleMap
    :zoom="17"
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

  <div class="PQWarehousesPatternMap__footer">

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

      console.log(Number(this.form.lat));

      return {
        lat: Number(this.form.lat),
        lng: Number(this.form.lng)
      }
    }
  },

  data() {
    return {

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

    handleChangeZone(data) {
      console.log(data);
    }
  }
}
</script>

<style lang="scss" scoped>
.PQWarehousesPatternMap {

    &__label {
      margin-bottom: .5rem;

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

      text-align: center;
      font-weight: 600;
    }

    &__footer {
        margin-top: 1rem;

        display: flex;
        justify-content: center;
    }
}
</style>
