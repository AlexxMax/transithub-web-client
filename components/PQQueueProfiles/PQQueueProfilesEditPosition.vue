<template>
  <div>
    <el-form
      ref="PQQueueProfilesEditPosition__form"
      :model="form"
      :rules="rules"
      size="mini"
      status-icon
    >

      <CommonSelectKoatuu
        settlement-prop-name="koatuu"
        :lat.sync="form.lat"
        :lng.sync="form.lng"
        :settlement.sync="form.koatuu"
        :address.sync="form.address"
        @select="clearInputs"
      />

      <div class="flex justify-between w-full">
        <el-form-item
          class="w-3/4"
          prop="street"
          :label="$t('forms.common.street')"
        >
          <el-input
            :placeholder="$t('forms.common.street')"
            :disabled="!form.koatuu"
            clearable
            v-model.lazy="form.street"
          />
        </el-form-item>

        <el-form-item
          class="w-1/4 ml-5"
          prop="building"
          :label="$t('forms.common.building')"
        >
          <el-input
            :placeholder="$t('forms.common.building')"
            :disabled="!form.street"
            clearable
            v-model.number="form.building"
          />
        </el-form-item>
      </div>

      <el-form-item
        class="PQQueueProfilesEditPosition__address"
        :label="$t('forms.pqWarehouses.general.labelFullAddress')"
      >
        <span v-if="fullAddress">{{ fullAddress }}</span>

        <span
          v-else
          class="PQQueueProfilesEditPosition__placeholder"
        >{{ $t('forms.pqWarehouses.general.placeholderFullAddress') }}</span>
      </el-form-item>

      <div class="PQQueueProfilesEditPosition__input">
        <label
          class="PQQueueProfilesEditPosition__label"
          for="PQQueueProfilesEditPosition__input"
        >{{ $t('forms.common.registrationZoneRadius') }}</label>

        <el-input-number
          id="PQQueueProfilesEditPosition__input"
          v-model="form.radius"
          size="mini"
          :min="5000"
          :max="50000"
        />
      </div>

      <div class="mt-5">
        <MapSearch
          :query="fullAddress"
          :zoom="zoom"
          :marker="position"
          @on-map-click="({ lat, lng }) => { form.lat = lat; form.lng = lng }"
        />
      </div>

    </el-form>

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
import CommonSelectKoatuu from '@/components/Common/CommonSelectKoatuu'
import MapSearch from '@/components/Common/MapSearch'

import { generateValidator } from '@/utils/validation'

export default {
  name: 'th-pq-queue-profiles-edit-position',

  components: {
    Button,
    CommonSelectKoatuu,
    MapSearch
  },

  props: {
    form: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      zoom: this.getZoomByRadius(),
    }
  },

  computed: {
    position() {
      return {
        lat: Number(this.form.lat),
        lng: Number(this.form.lng)
      }
    },

    fullAddress() {
      const streetShort = this.$t('forms.pqWarehouses.general.labelStreetShort')
      let fullAddress = ''

      if (this.form.address) fullAddress = this.form.address
      if (this.form.street) fullAddress += `, ${streetShort}. ${this.form.street}`
      if (this.form.building) fullAddress += `, ${this.form.building}`
      return fullAddress
    },
  },

  methods: {
    clearInputs(inputs = []) {
      ['street', 'building', 'lat', 'lng'].forEach(input => this.form[input] = '')
    },

    changeZoom(zoom) {
      setTimeout(() => this.zoom = zoom, 1000)
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
    },
  },

  watch: {
    'form.street'(value) {
      if (!value) this.form.building = ''
    },

    fullAddress(value) {
      this.form.fullAddress = value
    },

    form: {
      deep: true,
      immediate: true,
      handler(value) {
        const { region, district, koatuu } = this.form
        koatuu ? this.changeZoom(12) : district ? this.changeZoom(10) : region ? this.changeZoom(8) : this.changeZoom(6)
      }
    }
  },

  created() {
    const formRef = 'PQQueueProfilesEditPosition__form'

    let mainBtnLabel = this.$t("forms.common.create");
    if (this.form.guid) {
      mainBtnLabel = this.$t("forms.common.save");
    }

    this.buttons = [
      {
        text: this.$t('forms.common.back'),
        type: '',
        handler: () => {
          this.$emit('prev')
        }
      },
      {
        text: mainBtnLabel,
        type: 'primary',
        handler: () => {
          this.$refs[formRef].validate(valid => {
            if (valid) this.$emit('submit')
          })
        }
      }
    ]

    this.rules = {
      koatuu: [generateValidator(this, 'koatuu')],
      street: [generateValidator(this, 'street')],
      building: [generateValidator(this, 'building')],
    }
  },
}
</script>

<style lang="scss" scoped>
.PQQueueProfilesEditPosition {
  &__address {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    span {
      font-weight: 600;
    }
  }

  &__placeholder {
    color: $--color-info;
  }

  &__label {
    margin-bottom: 0.5rem;
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
}
</style>
