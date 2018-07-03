<template>
  <div class="th-company-widget-wrapper" @click="preventExpansion ? null : expanded = !expanded; preventExpansion = false">
    <div class="th-company-widget">
      <div class="th-company-widget-header">
        <div class="th-company-cred-avatar">
          <th-company-avatar :name="getName()" />
          <div class="th-company-cred">
            <span class="th-company-cred-name">
              {{ getName() }}
              <span class="th-company-status">
                {{active ? $t('forms.company.dialog.active') : $t('forms.company.dialog.disabled')}}
              </span>
            </span>
            <span class="th-company-cred-description">{{ description }}</span>
          </div>
        </div>

        <div class="th-company-addin">
          <span>
            {{ getLeftTime() }}
            <i class="fas fa-caret-down" />
          </span>
        </div>
      </div>

      <div class="th-company-widget-body" v-if="expanded">
        <div class="th-company-widget-body-buttons">
          <th-button type="">{{ $t('forms.company.dialog.accredCompany') }}</th-button>
        </div>

        <div class="th-company-widget-body-addin">
          <div>
            <th-button @click="preventExpansion = true; $emit('onCompanyActivation')">
              {{ active ? $t('forms.company.dialog.deactivateCompany') : $t('forms.company.dialog.activateCompany') }}
            </th-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import CompanyAvatar from '@/components/Companies/CompanyAvatar'
import Button from '@/components/Common/Buttons/Button'

export default {
  components: {
    "th-company-avatar": CompanyAvatar,
    "th-button": Button
  },

  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    period: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      expanded: false,
      preventExpansion: false
    }
  },

  methods: {
    getName: function() {
      return this.name
    },
    getLeftTime: function() {
      let left = ''
      if (this.date) {
        left = moment(this.date).add(this.period, 'days').fromNow()
      }
      return left
    }
  }
}
</script>

<style lang="scss" scoped>
.th-company-widget-wrapper {
  margin-bottom: 10px;
  padding: 10px 0px;
  border-radius: 5px;

  &:hover {
    background-color: #f8f8f8
  }

  .th-company-widget {
    margin: 0 10px;
    color: #606266;

    .th-company-widget-header {
      display: flex;
      justify-content: space-between;
      flex-direction: row;

      .th-company-cred-avatar {
        display: inline-flex;
        flex-direction: row;

        .th-company-cred {
          display: flex;
          flex-direction: column;
          padding-left: 10px;

          .th-company-cred-name {
            font-size: 16px;
            font-weight: 500;

            .th-company-status {
              color: #909399;
              font-size: 12px;
              font-style: italic;
            }
          }

          .th-company-cred-description {
            margin-top: 5px;
            font-size: 14px;
            font-weight: 400;
          }
        }
      }

      .th-company-addin {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 13px;
      }
    }

    .th-company-widget-body {
      padding: 10px 0 0;
      display: flex;
      justify-content: space-between;
      flex-direction: row;

      .th-company-widget-body-buttons {
        display: flex;
        flex-direction: row;
      }

      .th-company-widget-body-msg {
        font-size: 13px;
        color: #67C23A;
      }

      .th-company-widget-body-addin {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }

  }
}
</style>

