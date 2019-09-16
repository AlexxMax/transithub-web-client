<template>
<div class="PQWarehousesEditDialogMain">

  <el-form
    ref="PQWarehousesEditDialogMain__form"
    :model="form"
    :rules="rules"
    size="mini"
    status-icon
  >
    <el-form-item
      prop="name"
      :label="$t('forms.pqWarehouses.pattern.steps.main.labelName')"
    >
      <el-input
        :placeholder="$t('forms.pqWarehouses.pattern.steps.main.placeholderName')"
        v-model="form.name"
        clearable
      />
    </el-form-item>

    <el-form-item :label="$t('forms.pqWarehouses.pattern.steps.main.labelOrganisation')">
      <OrganisationSelect
        :init-value="form.organisation"
        :organisation.sync="form.organisation"
        @change="value => form.organisation = value"
        @mounted-change="$emit('mounted-change')"
      />
    </el-form-item>

    <el-form-item
      :label="$t('forms.common.pqQueueProfile')"
      prop="queueProfileGuid"
    >
      <QueueProfileSelect
        ref="queue-profile-select"
        :queueProfile.sync="form.queueProfileGuid"
        @mounted-change="$emit('queue-profile-select')"
      />
    </el-form-item>

  </el-form>

  <div class="PQWarehousesEditDialogMain__footer">

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
import OrganisationSelect from '@/components/Organisations/OrganisationSelect'
import QueueProfileSelect from '@/components/PQQueues/PQQueueProfileSelect'

export default {

  components: {
    Button,
    OrganisationSelect,
    QueueProfileSelect
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
          text: this.$t('forms.pqWarehouses.pattern.buttonCancel'),
          type: '',
          function: this.handleBeforeCancel
        },
        {
          text: this.$t('forms.pqWarehouses.pattern.buttonNext'),
          type: 'primary',
          function: this.handleClickNext
        }
      ],

      rules: {
        name: [{
          max: 200,
          required: true,
          trigger: VALIDATION_TRIGGER,
          validator: (rule, value, cb) => {
            const required = this.$t('forms.pqWarehouses.pattern.steps.main.validationRequiredName')

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
    handleClickNext() {
      this.$refs['PQWarehousesEditDialogMain__form'].validate(valid => {
        if (valid) this.$emit('next')
      })
    },

    handleBeforeCancel() {
      this.$refs['PQWarehousesEditDialogMain__form'].resetFields()
      this.$emit('cancel')
    }
  }

}
</script>

<style lang="scss" scoped>
.PQWarehousesEditDialogMain {
    &__footer {
        margin-top: 1rem;

        display: flex;
        justify-content: center;
    }
}
</style>
