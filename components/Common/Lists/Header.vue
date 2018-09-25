<template>
  <div :class="{ 'ListHeader': true, 'ListHeader__list-grouped': bigMargin }">
    <el-row :gutter="10">
      <el-col v-for="(col, index) of cols" :key="index" :xs="24" :md="col.width">
        <th-header-title
          :col="col.col"
          :title="col.title"
          :sort="col.sort || false"
          @click="sort"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HeaderTitle from '@/components/Common/Lists/HeaderTitle'

export default {
  name: 'th-list-header',

  components: {
    'th-header-title': HeaderTitle
  },

  props: {
    cols: {
      type: Array,
      required: true
    },
    sort: {
      type: Function,
      default: function() {}
    },
    "big-margin": Boolean
  }
}
</script>

<style lang="scss" scoped>
.ListHeader {
  margin: 0 25px;
  padding: 5px 0;

  &.ListHeader__list-grouped {
    margin: 0 45px;
  }
}

@media only screen and (max-width: 990px) {
  .ListHeader {
    display: none;
  }
}
</style>
