<template>
<div>
  <el-form
    ref="PQQueueProfilesEditAddress__form"
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
      :address.sync="address"
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

        <small :class="['PQQueueProfilesEditAddress__hint', {'PQQueueProfilesEditAddress__hint--error' : !isInUkrainian}]">{{ $t('forms.pqWarehouses.general.useOnlyUkranian') }}</small>
      </el-form-item>

      <el-form-item
        class="w-1/4 ml-5"
        prop="building"
        :label="$t('forms.common.building')"
      >
        <!-- 8, 78, 99А, 3/4, 3а/4, 3/4а, а5 -->
        <el-input
          :placeholder="$t('forms.common.building')"
          :disabled="!form.street"
          clearable
          v-model.trim="form.building"
        />
      </el-form-item>
    </div>

    <el-form-item
      class="PQQueueProfilesEditAddress__address"
      :label="$t('forms.pqWarehouses.general.labelFullAddress')"
    >
      <span v-if="address">{{ fullAddress }}</span>

      <span
        v-else
        class="PQQueueProfilesEditAddress__placeholder"
      >{{ $t('forms.pqWarehouses.general.placeholderFullAddress') }}</span>
    </el-form-item>
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

import { generateValidator } from '@/utils/validation'

export default {
  name: 'th-pq-queue-profiles-edit-position',

  components: {
    Button,
    CommonSelectKoatuu,
  },

  props: {
    form: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    address: '',
    isInUkrainian: true,
  }),

  computed: {
    fullAddress() {
      // const streetShort = this.$t('forms.pqWarehouses.general.labelStreetShort')
      let fullAddress = ''

      if (this.address) fullAddress = this.address
      if (this.form.street) fullAddress += `, вул. ${this.form.street}`
      if (this.form.building) fullAddress += `, ${this.form.building}`

      return fullAddress
    },
  },

  methods: {
    clearInputs(inputs = []) {
      ['street', 'building', 'lat', 'lng'].forEach(input => this.form[input] = '')
    }
  },

  watch: {
    'form.street'(value) {
      if (!value) this.form.building = ''
    },

    fullAddress(value) {
      this.form.fullAddress = value

      this.form.isFullAddressModified = !_.isEqual(this.initialFullAddress, this.form.fullAddress)
    }
  },

  created() {
    this.initialFullAddress = this.form.fullAddress

    const formRef = 'PQQueueProfilesEditAddress__form'

    this.buttons = [{
        text: this.$t('forms.common.back'),
        type: '',
        handler: () => this.$emit('prev')
      },
      {
        text: this.$t('forms.common.next'),
        type: 'primary',
        handler: () => this.$refs[formRef].validate(valid => valid ? this.$emit('next') : null)
      }
    ]

    this.rules = {
      koatuu: [generateValidator(this, 'koatuu')],
      street: [{
        validator: (rule, value, cb) => {
          if (value.pIsUkranian()) {

            this.isInUkrainian = true
            cb()

          } else {

            this.isInUkrainian = false
            cb(' ')

          }
        },
        trigger: 'change'
      }]
    }
  },
}
</script>

<style lang="scss" scoped>
.PQQueueProfilesEditAddress {

    &__hint {
        color: $--color-info;

        &--error {
            color: $--color-danger;
        }
    }

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
