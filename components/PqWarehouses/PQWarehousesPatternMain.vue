<template>
<div class="PQWarehousesPatternMain">

  <el-form
    ref="PQWarehousesPatternMain__form"
    :model="form"
    :rules="rules"
    status-icon
  >
    <el-form-item
      prop="name"
      label="Назва"
    >
      <el-input
        placeholder="Назва складу"
        v-model="form.name"
        clearable
      />
    </el-form-item>

    <el-form-item
      prop="organisation"
      label="Організація"
    >
      <OrganisationsSelect
        noDefaultValue
        :default="form.organisation"
        @change="value => form.organisation = value"
      />
    </el-form-item>
  </el-form>

  <div class="PQWarehousesPatternMain__footer">

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
import OrganisationsSelect from '@/components/Organisations/OrganisationsSelect'

export default {

  components: {
    Button,
    OrganisationsSelect
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
      //   name: '',
      //   organisation: '',
      // },

      buttons: [
        { text: 'Скасувати', type: '', function: this.handleBeforeCancel },
        { text: 'Далі', type: 'primary', function: this.handleClickNext }
      ],

      rules: {
        name: [{
          max: 200,
          required: true,
          trigger: VALIDATION_TRIGGER,
          validator: (rule, value, cb) => {
            if (!value) cb(new Error('Необхідно внести значення'))
            else cb()
          }
        }],
        organisation: [{
          required: true,
          trigger: 'change',
          validator: (rule, value, cb) => {
            console.log('organisation');
            if (!value) cb(new Error('Оберіть організацію'))
            else cb()
          }
        }]
      }

    }
  },

  methods: {
    handleClickNext() {
      this.$refs['PQWarehousesPatternMain__form'].validate(valid => {

        if (valid) this.$emit('next')

      })
    },

    handleBeforeCancel() {
      this.$refs['PQWarehousesPatternMain__form'].resetFields()
      this.$emit('cancel')
    }
  }

}
</script>

<style lang="scss" scoped>
.PQWarehousesPatternMain {
  &__footer {
      margin-top: 1rem;

      display: flex;
      justify-content: center;
  }
}
</style>
