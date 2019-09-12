<template>
  <div class="RaceFormDatePicker">

    <div
      class="RaceFormDatePicker__label"
      v-if="label"
    >
      <span>{{ label }}</span>
    </div>

    <el-form-item
      :prop="prop"
      :show-message="false"
    >
    <el-date-picker
      style="width: 100%"
      type="date"
      :picker-options="pickerOptions"
      :format="format"
      :value-format="valueFormat"
      :clearable="clearable"
      :placeholder="placeholder"
      :value="value"
      @input="localValue => $emit('input', localValue)"
    />
    </el-form-item>

  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Date],
      default: new Date()
    },
    prop: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: 'dd.MM.yyyy'
    },
    valueFormat: {
      type: String,
      default: 'dd.MM.yyyy'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    pickerOptions: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.RaceFormDatePicker {

    &:not(:last-child) {
        margin-right: 1rem;
    }

    display: flex;
    flex-direction: column;

    &__label {
        margin-bottom: 0.5rem;

        font-weight: 600;
    }
}
</style>
