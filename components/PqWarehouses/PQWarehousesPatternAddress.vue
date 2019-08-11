<template>
<div class="PQWarehousesPatternAddress">

  <el-form
    ref="PQWarehousesPatternAddress__form"
    :model="form"
    :rules="rules"
    status-icon
  >
    <el-form-item
      prop="location"
      :label="$t('forms.pqWarehouses.pattern.steps.location.labelSettlement')"
    >
      <LocalitySelect
        style="width: 100%"
        :init-value="form.location"
        @change="handleSelectLocation"
        @mounted-change="handleSelectLocation"
      />
      <!-- @change="({ koatuu }) => form.location = koatuu" -->
    </el-form-item>

    <div class="PQWarehousesPatternAddress__block">

      <div
        class="PQWarehousesPatternAddress__meta"
        v-for="(item, index) in meta"
        :key="index"
      >
        <span class="PQWarehousesPatternAddress__title">{{ item.title }}</span>

        <span class="PQWarehousesPatternAddress__text">{{ item.text }}</span>
      </div>

    </div>

    <el-form-item
      prop="address"
      :label="$t('forms.pqWarehouses.general.labelFullAddress')"
    >
      <el-input
        :placeholder="$t('forms.pqWarehouses.general.placeholderFullAddress')"
        clearable
        v-model="form.address"
      />
    </el-form-item>
  </el-form>

  <div class="PQWarehousesPatternAddress__footer">

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
import _ from 'lodash'

import { VALIDATION_TRIGGER } from '@/utils/constants'

import Button from '@/components/Common/Buttons/Button'
import LocalitySelect from '@/components/Common/LocalitySelect'

export default {

  components: {
    Button,
    LocalitySelect
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
          text: this.$t('forms.pqWarehouses.pattern.buttonPrev'),
          type: '',
          function: this.handleClickPrev
        },
        {
          text: this.$t('forms.pqWarehouses.pattern.buttonNext'),
          type: 'primary',
          function: this.handleClickNext
        }
      ],

      meta: [],

      rules: {
        location: [{
          required: true,
          trigger: 'change',
          validator: (rule, value, cb) => {
            const required = this.$t('forms.pqWarehouses.pattern.steps.location.validationRequiredSettlement')
            
            if (!value)
              cb(new Error(required))
            else
              cb()
          }
        }],
        address: [{
          max: 300,
          required: true,
          trigger: VALIDATION_TRIGGER,
          validator: (rule, value, cb) => {
            const required = this.$t('forms.pqWarehouses.pattern.steps.location.validationRequiredFullAddress')

            if (!value)
              cb(new Error(required))
            else
              cb()
          }
        }]
      }

    }
  },

  methods: {
    handleClickPrev() {
      this.$emit('prev')
    },

    handleClickNext() {
      this.$refs['PQWarehousesPatternAddress__form'].validate(valid => {

        if (valid) this.$emit('next')

      })
    },

    handleSelectLocation(locality) {
      const locale = this.$store.state.locale
      const getName = name => locality[`${name}${_.capitalize(locale)}`] || locality[name] || '?'

      this.meta = [{
        title: this.$t('forms.pqWarehouses.general.labelRegion'),
        text: getName('regionName')
      }, {
        title: this.$t('forms.pqWarehouses.general.labelDistrict'),
        text: getName('districtName')
      }, {
        title: this.$t('forms.pqWarehouses.general.labelSettlement'),
        text: getName('name')
      }]

      this.form.location = locality.koatuu
    }
  }

}
</script>

<style lang="scss" scoped>
.PQWarehousesPatternAddress {

    &__blocks {
        margin: 1rem 0;

        display: flex;
        flex-direction: column;
    }

    &__meta {
        margin-bottom: 1rem;
    }

    &__title {
        margin-bottom: 0.5rem;

        display: block;
    }

    &__text {
        font-weight: 600;
    }

    &__footer {
        margin-top: 1rem;

        display: flex;
        justify-content: center;
    }

}
</style>
