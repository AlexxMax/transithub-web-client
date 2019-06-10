<template>
  <div
    class="VehiclesRegistersGenerationFormRowEmptyDrop"
    :class="{ 'VehiclesRegistersGenerationFormRowEmptyDrop-shake': shake }"
    @animationend="$emit('stop-shaking')"
  >
    <fa class="VehiclesRegistersGenerationFormRowEmptyDrop__icon" icon="plus"/>
    <span class="VehiclesRegistersGenerationFormRowEmptyDrop__text">
      {{ placeholder }}
    </span>
    <Button
      type="text"
      @click="$emit('select')"
    >
      {{ $t('forms.common.select') }}
    </Button>
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'

export default {
  name: 'th-vehicles-registers-generation-form-row-empty-drop',

  components: { Button },

  props: {
    placeholder: {
      type: String,
      required: true
    },
    shake: Boolean
  }
}
</script>

<style lang='scss' scoped>
.VehiclesRegistersGenerationFormRowEmptyDrop {
  border: 1px solid #EBEEF5;
  border-radius: 10px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: #909399;
  background-color: white;

  &:hover {
    background-color: rgb(252, 252, 252);
  }

  &-shake {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  &__icon {
    font-size: 16px;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  &__text {
    font-size: 12px;
  }
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
