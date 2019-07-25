<template>
  <ItemCard>
    <div class="th-user-widget-wrapper">
      <div class="th-user-widget">
        <div class="th-user-widget-header">
          <div class="th-user-cred-avatar">
            <UserAvatar :name="username" />
            <div class="th-user-cred">
              <span class="th-user-cred-username">
                {{ username }}
                <span :class="{
                  'th-user-status': true,
                  'th-user-status-active': userStatus === 1 || userStatus === 0,
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

        <div class="th-user-widget-body" v-if="editable && expanded">
          <div class="th-user-widget-body-buttons">
            <!-- <th-button v-if="showRemoweButton" type="" @click="$emit('onUserRemove')">

            </th-button> -->
            <th-button
              v-if="!hideRoleSelect"
              round
              type=""
              @click="preventExpansion = true; $emit('onOpenUserRole')"
            >
              {{ $t('forms.user.dialog.changeRole') }}
            </th-button>
            <!-- <th-button v-if="!pending && !invitationAccepted" type="" @click="$emit('onSendInvitation')">
              {{ $t('forms.user.dialog.sendInvitation') }}
            </th-button> -->
          </div>

          <div class="th-user-widget-body-addin">
            <div>
              <!-- <span class="th-user-widget-body-msg">{{ additionalInfo() }}</span>
              <i v-if="!invitationAccepted && this.pending" class="fas fa-circle" :style="dotStyle"></i> -->
              <th-button
                v-if="showActivation"
                @click="preventExpansion = true; $emit('onUserActivation')">
                {{ active ? $t('forms.user.dialog.deactivateUser') : $t('forms.user.dialog.activateUser') }}
              </th-button>
            </div>
          </div>
        </div>

        <div class="th-user-widget-section" v-if="editable && expanded">
          <span class="th-user-widget-section-title">{{ $t('forms.common.sectionsAccess') }}</span>
          <el-switch
            :value="accessAuto"
            :active-text="$t('forms.common.sectionAuto')"
            @change="value => { preventExpansion = true; $emit('onUserAccessAuto', value) }"
            style="margin-bottom: 10px;"
          />
          <el-switch
            :value="accessRailway"
            :active-text="$t('forms.common.sectionRailway')"
            @change="value => { preventExpansion = true; $emit('onUserAccessRailway', value) }"
          />
        </div>
      </div>
    </div>
  </ItemCard>
</template>

<script>
import UserAvatar from '@/components/Users/UserAvatar'
import Button from '@/components/Common/Buttons/Button'
import ItemCard from "@/components/Common/Lists/ItemCard"

export default {
  components: {
    UserAvatar,
    "th-button": Button,
    ItemCard
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
    },
    editable: Boolean,
    hideRoleSelect: Boolean,
    accessAuto: Boolean,
    accessRailway: Boolean
  },

  data() {
    return {
      expanded: true,
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
        // return this.$t('forms.user.dialog.new')
        return this.$t('forms.user.dialog.active')
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

  .th-user-widget {
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
              color: #FFD74D;
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

    .th-user-widget-section {
      padding: 10px 0 0;
      display: flex;
      flex-direction: column;

      .th-user-widget-section-title {
        margin-bottom: 10px;
      }
    }

  }
}
</style>
