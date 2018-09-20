<template>
  <div class="th-list-header">
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
    }
  }
}
</script>

<style lang="scss" scoped>
.th-list-header {
  margin: 0 20px;
  padding: 5px 0;
}

@media only screen and (max-width: 990px) {
  .th-list-header {
    display: none;
  }
}
</style>
