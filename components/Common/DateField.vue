<template>
  <div
    class="DateField"
    :style="{ 'flex-direction': this.horizontal ? 'row' : 'column' }">
    <el-form-item :label="$t('forms.common.warehouseLoadDate')">
      <el-input
        size="mini"
        :placeholder="$t('forms.common.warehouseLoadDate')"
        :value="loadDate"
        readonly/>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'th-load-date-field',

  props: {
    loadDate: String,
    horizontal: Boolean,
  }
}
</script>

<style lang="scss" scoped>
.DateField {
  //display: flex;
}
</style>