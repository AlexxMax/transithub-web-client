<template>
<div class="PQWarehousesPatternAddress">

  <el-form
    ref="PQWarehousesPatternAddress__form"
    :model="form"
    :rules="rules"
    status-icon
  >
    <!-- <el-form-item
      prop="location"
      label="Населений пункт (КОАТУУ)"
    >
      <el-select
        style="width: 100%"
        placeholder="Вибрати населений пункт"
        v-model="form.location"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item> -->

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
import { VALIDATION_TRIGGER } from '@/utils/constants'

import Button from '@/components/Common/Buttons/Button'

export default {

  components: {
    Button
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

      meta: [
        { title: 'Область', text: 'Область' },
        { title: 'Район', text: 'Район' },
        { title: 'Назва населеного пункту', text: 'Назва населеного пункту' },
      ],

      rules: {
        location: [{
          required: true,
          trigger: VALIDATION_TRIGGER,
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
      margin-bottom: .5rem;

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
