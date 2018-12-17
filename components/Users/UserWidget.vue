<template>
  <div class="th-user-widget-wrapper" @click="preventExpansion ? null : expanded = !expanded; preventExpansion = false">
    <div class="th-user-widget">
      <div class="th-user-widget-header">
        <div class="th-user-cred-avatar">
          <th-user-avatar :username="username" />
          <div class="th-user-cred">
            <span class="th-user-cred-username">
              {{ username }}
              <span :class="{
                'th-user-status': true,
                'th-user-status-active': userStatus === 1,
                'th-user-status-disabled': userStatus === 2,
              }">
                {{ userStatusTitle }}
              </span>
            </span>
            <span class="th-user-cred-email">{{ email }}</span>
          </div>
        </div>

        <div class="th-user-addin">
          <span>
            {{ role }}
            <i class="fas fa-caret-down" />
          </span>
        </div>
      </div>

      <div class="th-user-widget-body" v-if="expanded">
        <div class="th-user-widget-body-buttons">
          <th-button v-if="showRemoweButton" type="" @click="$emit('onUserRemove')">

          </th-button>
          <th-button type="" @click="preventExpansion = true; $emit('onOpenUserRole')">
            {{ $t('forms.user.dialog.changeRole') }}
          </th-button>
          <th-button v-if="!pending && !invitationAccepted" type="" @click="$emit('onSendInvitation')">
            {{ $t('forms.user.dialog.sendInvitation') }}
          </th-button>
        </div>

        <div class="th-user-widget-body-addin">
          <div>
            <span class="th-user-widget-body-msg">{{ additionalInfo() }}</span>
            <i v-if="!invitationAccepted && this.pending" class="fas fa-circle" :style="dotStyle"></i>
            <th-button
              v-if="showActivation"
              @click="preventExpansion = true; $emit('onUserActivation')">
              {{ active ? $t('forms.user.dialog.deactivateUser') : $t('forms.user.dialog.activateUser') }}
            </th-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from '@/components/Users/UserAvatar'
import Button from '@/components/Common/Buttons/Button'

export default {
  components: {
    "th-user-avatar": UserAvatar,
    "th-button": Button
  },

  props: {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    pending: {
      type: Boolean,
      default: false
    },
    invitationAccepted: {
      type: Boolean,
      default: false
    },
    showActivation: {
      type: Boolean,
      default: true
    },
    showRemoweButton: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      expanded: false,
      preventExpansion: false,
      dotStyle: {
        margin: '0px 5px 2.2px 5px',
        fontSize: '5px'
      }
    }
  },

  computed: {
    userStatus() {
      if (!this.invitationAccepted && this.pending && this.active) {
        return 0
      } else if (this.active) {
        return 1
      }
      return 2
    },
    userStatusTitle() {
      if (this.userStatus === 0) {
        return this.$t('forms.user.dialog.new')
      } else if (this.userStatus === 1) {
        return this.$t('forms.user.dialog.active')
      }
      return this.$t('forms.user.dialog.disabled')
    }
  },

  methods: {
    additionalInfo: function() {
      return !this.invitationAccepted && this.pending ? this.$t('forms.user.dialog.waitingTillUserAcceptInvitation') : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.th-user-widget-wrapper {
  margin-bottom: 10px;
  padding: 10px 0px;
  border-radius: 5px;

  &:hover {
    background-color: #f8f8f8
  }

  .th-user-widget {
    margin: 0 10px;
    color: #606266;

    .th-user-widget-header {
      display: flex;
      justify-content: space-between;
      flex-direction: row;

      .th-user-cred-avatar {
        display: inline-flex;
        flex-direction: row;

        .th-user-cred {
          display: flex;
          flex-direction: column;
          padding-left: 10px;

          .th-user-cred-username {
            font-size: 16px;
            font-weight: 500;

            .th-user-status {
              color: #909399;
              font-size: 12px;
              font-style: italic;
            }

            .th-user-status-active {
              color: #67C23A;
            }

            .th-user-status-disabled {
              color: #FECD34;
            }
          }

          .th-user-cred-email {
            margin-top: 5px;
            font-size: 14px;
            font-weight: 400;
          }
        }
      }

      .th-user-addin {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 13px;
      }
    }

    .th-user-widget-body {
      padding: 10px 0 0;
      display: flex;
      justify-content: space-between;
      flex-direction: row;

      .th-user-widget-body-buttons {
        display: flex;
        flex-direction: row;
      }

      .th-user-widget-body-msg {
        font-size: 13px;
        color: #67C23A;
      }

      .th-user-widget-body-addin {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }

  }
}
</style>
