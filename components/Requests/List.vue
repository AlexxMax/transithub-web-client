<template>
  <div class="th-requests-list" v-loading="$store.state.requests.loading">
    <div class="th-requests-list-header">
      <el-row :gutter="10">
        <el-col :xs="24" :md="2">
          <th-header-title col="number" :title="$t('lists.number')" sort @click="sort" />
        </el-col>
        <el-col :xs="24" :md="3">
          <th-header-title col="scheduleDate" :title="$t('lists.scheduleDate')" sort @click="sort" />
        </el-col>
        <el-col :xs="24" :md="5">
          <th-header-title col="client" :title="$t('lists.client')" />
        </el-col>
        <el-col :xs="24" :md="4">
          <th-header-title col="goods" :title="$t('lists.goods')" />
        </el-col>
        <el-col :xs="24" :md="4">
          <th-header-title col="pointFrom" :title="$t('lists.pointFrom')" />
        </el-col>
        <el-col :xs="24" :md="4">
          <th-header-title col="pointTo" :title="$t('lists.pointTo')" />
        </el-col>
        <el-col :xs="24" :md="2">
          <th-header-title col="status" :title="$t('lists.status')" />
        </el-col>
      </el-row>
    </div>

    <div class="th-requests-list-items">
      <th-list-item
        v-for="(request, index) of requests"
        :key="index"
        :data="request" />
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/Requests/ListItem'
import HeaderTitle from '@/components/Common/TableHeaderTitle'

export default {
  components: {
    "th-list-item": ListItem,
    'th-header-title': HeaderTitle
  },

  props: {
    requests: {
      type: Array,
      required: true
    }
  },

  methods: {
    open: function(row) {
      this.$router.push(`/workspace/requests/${row.guid}`);
    },
    sort: function(direction, col) {
      if (col === 'number') {
        this.$store.dispatch('requests/setSortingNumber', direction)
      } else if (col === 'scheduleDate') {
        this.$store.dispatch('requests/setSortingDate', direction)
      }
    }
  }
};
</script>

<style scoped lang="scss">
.th-requests-list {

  .th-requests-list-header {
    margin: 0 20px;
    padding: 5px 0;

    .th-request-list-item-column-title {
      font-size: 12px;
      font-weight: 500;
      color: #606266;
    }
  }

  .th-requests-list-items {
    overflow-y: auto;
    height: calc(100vh - 209px);
  }
}

@media only screen and (max-width: 990px) {
  .th-requests-list {

    .th-requests-list-header {
      display: none;
    }

    .th-requests-list-items {
      overflow-y: auto;
      height: calc(100vh - 189px);
    }
  }
}
</style>
