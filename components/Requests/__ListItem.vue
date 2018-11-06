<template>
  <div class="th-request-list-item-wrapper" @click="$emit('click')">
    <div class="th-request-list-item">
      <el-row :gutter="10">
        <el-col :xs="24" :md="2">
          <span class="th-request-list-item-column-title">{{ $t('lists.number') + ': ' }}</span>
          <p class="th-request-list-item-number th-request-list-item-column-value">{{ data.number }}</p>
        </el-col>
        <el-col :xs="24" :md="3">
          <span class="th-request-list-item-column-title">{{ $t('lists.scheduleDate') + ': ' }}</span>
          <p class="th-request-list-item-column-value">{{ data.scheduleDate }}</p>
        </el-col>
        <el-col :xs="24" :md="5">
          <span class="th-request-list-item-column-title">{{ $t('lists.client') + ': ' }}</span>
          <div class="th-requests-list-item-column-client">
            <th-company-avatar
              v-if="data.clientName"
              :style="'margin-right: 5px;'"
              :name="data.clientName || ' '" />
            <p class="th-request-list-item-column-value">
              {{ data.clientName }}
            </p>
          </div>
        </el-col>
        <el-col :xs="24" :md="4">
          <span class="th-request-list-item-column-title">{{ $t('lists.goods') + ': ' }}</span>
          <p class="th-request-list-item-column-value">{{ data.goodsName }}</p>
        </el-col>
        <el-col :xs="24" :md="4">
          <span class="th-request-list-item-column-title">{{ $t('lists.pointFrom') + ': ' }}</span>
          <p class="th-request-list-item-column-value">{{ data.pointFromName }}</p>
        </el-col>
        <el-col :xs="24" :md="4">
          <span class="th-request-list-item-column-title">{{ $t('lists.pointTo') + ': ' }}</span>
          <p class="th-request-list-item-column-value">{{ data.pointToName }}</p>
        </el-col>
        <el-col :xs="24" :md="2">
          <span class="th-request-list-item-column-title">{{ $t('lists.status') + ': ' }}</span>
          <p class="th-request-list-item-column-value" :style="{ 'text-transform': 'capitalize', 'color': statusColor }">{{ $t(statusTitle) }}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Companies/CompanyAvatar'

import { getStatusPresentation } from '@/utils/requests'

export default {
  components: {
    "th-company-avatar": Avatar
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    status: function() {
      return getStatusPresentation(this.data.statusCode)
    },
    statusColor: function() {
      return this.status.color
    },
    statusTitle: function() {
      return this.status.localeKey
    }
  }
}
</script>

<style lang="scss" scoped>
.th-request-list-item-wrapper {
  margin: 10px 0;
  padding: 0 5px;

  .th-request-list-item {
    padding: 10px 20px;
    background-color: white;
    border: 1px solid #bebebe1a;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    .th-request-list-item-number {
      color: #FECD34;
    }

    .th-requests-list-item-column-client {
      display: flex;
      flex-direction: row;
    }

    .th-request-list-item-column-title {
      display: none;
    }

    .th-request-list-item-column-value {
      margin-top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 40px;
    }
  }
}

@media only screen and (max-width: 990px) {
  .th-request-list-item-wrapper {
    .th-request-list-item {
      .th-requests-list-item-column-client {
        margin-bottom: 10px;

        .th-request-list-item-column-value {
          margin-top: 0;
          height: 40px;
          margin-bottom: 0;
        }
      }

      .th-request-list-item-column-title {
        font-size: 12px;
        font-weight: 200;
        color: #606266;
        display: block;
      }

      .th-request-list-item-column-value {
        margin-top: 0;
        height: 20px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>


