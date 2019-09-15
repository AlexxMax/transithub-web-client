<template>
  <div>
    <el-form
      ref="PQQueueProfilesEditDialogEssential__form"
      :model="form"
      :rules="rules"
      size="mini"
      status-icon
    >

      <el-form-item
        prop="name"
        :label="$t('forms.common.name')"
      >
        <el-input
          :placeholder="$t('forms.common.name')"
          v-model="form.name"
          clearable
        />
      </el-form-item>

      <el-form-item
        prop="description"
        :label="$t('forms.common.description')"
      >
        <el-input
          type="textarea"
          :rows="4"
          :placeholder="$t('forms.common.description')"
          v-model="form.description"
          clearable
        />
      </el-form-item>

    </el-form>

    <div class="mt-1 flex justify-center">
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

import { generateValidator } from '@/utils/validation'

export default {
  name: 'th-pq-queue-profiles-edit-essential',

  components: { Button },

  props: {
    form: {
      type: Object,
      required: true,
    },
  },

  created() {
    const formRef = 'PQQueueProfilesEditDialogEssential__form'

    this.buttons = [
      {
        text: this.$t('forms.common.cancel'),
        type: '',
        handler: () => {
          this.$refs[formRef].resetFields()
          this.$emit('cancel')
        }
      },
      {
        text: this.$t('forms.common.next'),
        type: 'primary',
        handler: () => {
          this.$refs[formRef].validate(valid => {
            if (valid) this.$emit('next')
          })
        }
      }
    ]

    this.rules = {
      name: [generateValidator(this, 'name')],
    }
  }
}
</script>
