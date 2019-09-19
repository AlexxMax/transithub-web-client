<template>
<div>

  <div class="PQQueueProfilesEditMap__input">
    <label
      class="PQQueueProfilesEditMap__label"
      for="PQQueueProfilesEditMap__input"
    >{{ $t('forms.common.registrationZoneRadius') }}</label>

    <el-input-number
      id="PQQueueProfilesEditMap__input"
      v-model="form.radius"
      size="mini"
      :min="5000"
      :max="50000"
    />
  </div>

  <div class="mt-5">
    <MapSearch
      :query="query"
      :zoom="17"
      :marker="position"
      @on-search="handleSearch"
      @on-map-click="handleClick"
    />
  </div>

  <div class="mt-5 flex justify-center">
    <Button
      round
      v-for="(button, index) in buttons"
      :type="button.type"
      :key="index"
      @click="button.handler"
    >
      {{ button.text }}
    </Button>
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
      required: true,
    },
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

  created() {
    this.buttons = [{
        text: this.$t('forms.common.back'),
        type: '',
        handler: () => this.$emit('prev')
      },
      {
        text: this.form.guid ? this.$t('forms.common.save') : this.$t('forms.common.create'),
        type: 'primary',
        handler: () => this.$emit('submit')
      }
    ]
  },

  methods: {
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
.PQQueueProfilesEditMap {
    &__address {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        span {
            font-weight: 600;
        }
    }

    &__label {
        margin-bottom: 0.5rem;
    }

    &__input {
        display: flex;
        flex-direction: column;

        user-select: none;
    }
}
</style>
