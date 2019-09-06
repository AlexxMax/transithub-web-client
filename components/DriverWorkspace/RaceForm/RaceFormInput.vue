<template>
<div class="RaceFormInput">

  <div
    class="RaceFormInput__label"
    v-if="label"
  >
    <span>{{ label }}</span>
  </div>

  <el-form-item
    :prop="prop"
    :show-message="false"
  >
    <el-input
      v-if="!number && input"
      :clearable="clearable"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      :minlength="minlength"
      :maxlength="maxlength"
      @input="localValue => $emit('input', localValue)"
    />

    <el-input-number
      v-if="number"
      :value="value"
      :disabled="disabled"
      :min="min"
      :max="max"
      @input="localValue => $emit('input', localValue)"
    ></el-input-number>

    <div v-if="!input">{{ value }}</div>
  </el-form-item>

</div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    input: {
      type: Boolean,
      default: true
    },
    number: {
      type: Boolean,
      default: false
    },
    prop: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    minlength: {
      type: [String, Number],
      default: 0
    },
    maxlength: {
      type: [String, Number],
      default: ''
    },
    min: {
      type: [String, Number],
      default: 0
    },
    max: {
      type: [String, Number],
      default: Infinity
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.RaceFormInput {
    .el-form-item {
        margin-bottom: 0;
    }
}
</style>

<style lang="scss" scoped>
.RaceFormInput {

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
