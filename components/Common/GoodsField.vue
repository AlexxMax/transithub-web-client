<template>
  <div
    class="GoodsField"
    :style="{ 'flex-direction': this.horizontal ? 'row' : 'column' }">
    <el-form-item :label="$t('forms.common.goods')">
      <el-input
        size="mini"
        :placeholder="$t('forms.common.goods')"
        :value="goods"
        readonly/>
    </el-form-item>

    <component
      v-if="desc"
      :class="{
        'GoodsField__desc': true,
        'GoodsField__desc-horizontal': this.horizontal,
        'GoodsField__desc-vertical': !this.horizontal
      }"
      :is="component">
      <span>{{ `${$t('forms.common.goodsDesc')}: ${desc}` }}</span>
    </component>
  </div>
</template>

<script>
export default {
  name: 'th-goods-field',

  props: {
    goods: String,
    desc: String,
    horizontal: Boolean,

  },

  computed: {
    component() {
      return this.horizontal ? 'span' : 'div'
    }
  }
}
</script>

<style lang="scss" scoped>
.GoodsField {
  display: flex;

  .GoodsField__desc {
    color: #606266;
    font-size: 13px;

    &.GoodsField__desc-vertical {
      margin-top: -10px;
      margin-left: 17px;
    }

    &.GoodsField__desc-horizontal {
      margin-top: 45px;
      margin-left: 20px;
    }
  }
}
</style>
