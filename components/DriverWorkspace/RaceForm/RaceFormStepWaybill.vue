<template>
  <div class="RaceFormStepWaybill">
    <Scaffold
      :title="title"
      :subtitle="subtitle"
      :percentage="percentage"
      :buttons="buttons"
      @close="$emit('close')"
    >
      <div class="RaceFormStepWaybill__content">
        <Group :title="$t('forms.common.waybill')">
          <div class="RaceFormStepWaybill__content__input-group">
            <el-form-item
              class="RaceFormStepWaybill__content__form-item"
              prop="waybillNumber"
              :label="$t('forms.common.number')"
              :show-message="false"
            >
              <el-input
                clearable
                :placeholder="$t('forms.common.waybillNumberPlaceholder')"
                :value="form.waybillNumber"
                @input="(waybillNumber) => { handleInput('waybillNumber', waybillNumber) }"
                style="width: 140px;"
              />
            </el-form-item>

            <div class="RaceFormStepWaybill__content__expander"/>

            <el-form-item
              class="RaceFormStepWaybill__content__form-item"
              prop="waybillDate"
              :label="$t('forms.common.date')"
              :show-message="false"
            >

              <el-date-picker
                type="date"
                format="dd.MM.yyyy"
                :clearable="false"
                :value="form.waybillDate"
                :placeholder="$t('forms.common.waybillDatePlaceholder')"
                @input="(waybillDate) => { handleInput('waybillDate', waybillDate) }"
                style="width: 140px;"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </Group>

        <Group :title="$t('forms.common.waybillWeight')">
          <div class="RaceFormStepWaybill__content__input-group">
            <el-form-item
              class="RaceFormStepWaybill__content__form-item"
              prop="waybillNumber"
              :label="$t('forms.common.number')"
              :show-message="false"
            >
              <el-input
                clearable
                :placeholder="$t('forms.common.waybillNumberPlaceholder')"
                :value="form.waybillNumber"
                @input="(waybillNumber) => { handleInput('waybillNumber', waybillNumber) }"
                style="width: 140px;"
              />
            </el-form-item>

            <el-form-item
              class="RaceFormStepWaybill__content__form-item"
              prop="waybillNumber"
              :label="$t('forms.common.number')"
              :show-message="false"
            >
              <el-input
                clearable
                :placeholder="$t('forms.common.waybillNumberPlaceholder')"
                :value="form.waybillNumber"
                @input="(waybillNumber) => { handleInput('waybillNumber', waybillNumber) }"
                style="width: 140px;"
              />
            </el-form-item>

            <el-form-item
              class="RaceFormStepWaybill__content__form-item"
              prop="waybillNumber"
              :label="$t('forms.common.number')"
              :show-message="false"
            >
              <el-input
                clearable
                :placeholder="$t('forms.common.waybillNumberPlaceholder')"
                :value="form.waybillNumber"
                @input="(waybillNumber) => { handleInput('waybillNumber', waybillNumber) }"
                style="width: 140px;"
              />
            </el-form-item>
          </div>
        </Group>
      </div>
    </Scaffold>
  </div>
</template>

<script>
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormScaffold'
import Group from '@/components/DriverWorkspace/RaceForm/RaceFormGroup'

export default {
  name: 'th-driver-workspace-race-form-waybill',

  components: {
    Scaffold,
    Group,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    percentage: Number,
    buttons: Array,
    form: {
      type: Object,
      required: true,
    },
  },

  methods: {
    handleInput(key, value) {
      this.$emit('change-form', { ...this.form, [key]: value })
    },
  },
}
</script>

<style lang='scss' scoped>
.RaceFormStepWaybill {
  &__content {


    &__input-group {
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
    }

    &__expander {
      width: 80px;
    }

    &__form-item {
      margin-top: -10px;
      margin-bottom: 0px;
    }
  }
}
</style>
