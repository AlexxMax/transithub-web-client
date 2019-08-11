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
      label="Населений пункт (КОАТУУ)"
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
      label="Повна адреса"
    >
      <el-input
        placeholder="Назва області, назва району, назва н/п, вулиця, номер будівлі"
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

      // form: {
      //   location: '',
      //   address: '',
      // },

      buttons: [
        { text: 'Назад', type: '', function: this.handleClickPrev },
        { text: 'Далі', type: 'primary', function: this.handleClickNext }
      ],

      meta: [],
      // meta: [
      //   { title: 'Область', text: 'Область' },
      //   { title: 'Район', text: 'Район' },
      //   { title: 'Назва населеного пункту', text: 'Назва населеного пункту' },
      // ],

      rules: {
        location: [{
          required: true,
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (!value) cb(new Error('Оберіть населений пункт'))
            else cb()
          }
        }],
        address: [{
          max: 300,
          required: true,
          trigger: VALIDATION_TRIGGER,
          validator: (rule, value, cb) => {
            if (!value) cb(new Error('Вкажіть повну адресу'))
            else cb()
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
        title: 'Область',
        text: getName('regionName')
      }, {
        title: 'Район',
        text: getName('districtName')
      }, {
        title: 'Назва населеного пункту',
        text: getName('name')
      }]

      this.form.location = locality.koatuu

    },
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
