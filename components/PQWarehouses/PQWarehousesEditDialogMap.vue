<template>
<div class="PQWarehousesEditDialogMap">

  <div class="PQWarehousesEditDialogMap__label">
    <span>{{ $t('forms.pqWarehouses.general.labelSelectPointOnMap') }}</span>
  </div>

  <MapSearch
    :query="query"
    :zoom="17"
    :marker="position"
    @on-search="handleSearch"
    @on-map-click="handleClick"
  />

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
import MapSearch from '@/components/Common/MapSearch'

export default {

  components: {
    Button,
    MapSearch
  },

  props: {
    form: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      buttons: [{
          text: this.$t(`forms.pqWarehouses.pattern.buttonPrev`),
          type: '',
          function: this.handleClickPrev
        },
        {
          text: this.creating ? this.$t('forms.pqWarehouses.pattern.buttonCreate') : this.$t('forms.pqWarehouses.pattern.buttonChange'),
          type: 'primary',
          function: this.handleClickSave
        }
      ],

    }
  },

  computed: {
    query(query) {
      return this.form.isFullAddressModified ? this.form.fullAddress : null
    },
    position() {
      return {
        lat: Number(this.form.lat),
        lng: Number(this.form.lng)
      }
    },
  },

  methods: {
    handleClickPrev() {
      this.$emit('prev')
    },

    handleClickSave() {
      this.$emit('save')
    },

    handleSearch(results) {
      if (results) {
        const { lat, lng } = results[0].geometry.location
        this.handleClick({ lat: lat(), lng: lng() })
      }
    },

    handleClick({ lat, lng }) {
       this.form.lat = lat;
       this.form.lng = lng
    }
  }

}
</script>

<style lang="scss" scoped>
.PQWarehousesEditDialogMap {

    &__label {
        margin-bottom: 0.5rem;
    }

    &__footer {
        margin-top: 1rem;

        display: flex;
        justify-content: center;
    }

}
</style>
