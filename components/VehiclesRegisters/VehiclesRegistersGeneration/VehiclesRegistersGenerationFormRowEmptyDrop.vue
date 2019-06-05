<template>
  <div class="VehiclesRegistersGenerationFormRowEmptyDrop">
    <fa class="VehiclesRegistersGenerationFormRowEmptyDrop__icon" icon="plus"/>
    <span class="VehiclesRegistersGenerationFormRowEmptyDrop__text">
      {{ $t('test') }}
    </span>
    <Button
      type="text"
      @click="handleOpen"
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

  methods: {
    handleOpen() {
      this.$emit('open')
    }
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

  &__icon {
    font-size: 16px;
    margin-bottom: 5px;
  }

  &__text {
    font-size: 12px;
  }
}
</style>
