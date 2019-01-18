<template>
  <div>
    <Form>
      <Header
        slot="header"
        ref="$_elementHeightMixin_ref_header"
        :title="`${$t('forms.railwayRequest.title')} №${railwayRequest.number}`"
        :status-title="$t(railwayRequest.status.localeKey)"
        :status-color="railwayRequest.status.color"
        :editable-status="userCanEdit"
        @edit-status="handleEditStatus"
      >

        <div class="RailwayRequestForm__header-subtitle">
          <div>
            {{ `${$t('forms.common.creationDate')}: ${railwayRequest.date} - ${railwayRequest.authorFullname}` }}
          </div>
        </div>

        <div class="RailwayRequestForm__pill-link" v-if="!$_smallDeviceMixin_isDeviceSmall">
          <PillLink
            v-if="railwayRequest.aggregationGuid"
            :color="railwayRequest.aggregationStatus.color"
            :to="$i18n.path(`workspace/railway-aggregations/${railwayRequest.aggregationGuid}`)"
            :title="`${$t('forms.railwayAggregator.shortTitle')} №${railwayRequest.aggregationNumber}`"/>
        </div>
      </Header>

      <div slot="toolbar">
        <ButtonsGroup>
          <Button
            v-if="!$_smallDeviceMixin_isDeviceSmall && userCanEdit"
            type=""
            faIcon="pen"
            edit
            round
            style="margin-right: 10px"
            @click="handleEditButton">
            {{ $t('forms.common.edit') }}
          </Button>

          <MainMenu v-if="$_smallDeviceMixin_isDeviceSmall">
            <Button
              v-if="userCanEdit"
              type=""
              faIcon="pen"
              edit
              round
              flat
              @click="handleEditButton">
              {{ $t('forms.common.edit') }}
            </Button>

            <Link
              v-if="railwayRequest.aggregationGuid"
              :to="$i18n.path(`workspace/railway-aggregations/${railwayRequest.aggregationGuid}`)"
              :title="$t('forms.railwayAggregator.title')"/>
          </MainMenu>
        </ButtonsGroup>
      </div>

      <div slot="content">
        <Segment :minus="$_smallDeviceMixin_isDeviceSmall ? 104 : 45">
          <div class="RailwayRequestForm__form">
            <div class="RailwayRequestForm__form-right">

              <Group :title="$t('forms.common.route')" big-title>
                <RailwayRoute
                  style="margin-top: 25px"
                  :station-from-name="railwayRequest.stationFromName"
                  :station-from-code="railwayRequest.stationFromRWCode"
                  :station-from-road="railwayRequest.stationFromRoad"
                  :station-to-name="railwayRequest.stationToName"
                  :station-to-code="railwayRequest.stationToRWCode"
                  :station-to-road="railwayRequest.stationToRoad"
                  :polygon-name="railwayRequest.polygonName"
                  :polygon-code="railwayRequest.polygonRWCode"
                  :polygon-number="railwayRequest.polygonNumber"
                />
              </Group>

              <Group
                class="RailwayRequestForm__form-right-wagons-group"
                :title="$t('forms.common.stationFromShort')"
                big-title>
                <div class="RailwayRequestForm__form-right-wagons">
                  <FormField
                    :title="$t('forms.railwayAggregator.wagonsProposed')"
                    :value="railwayRequest.wagons"
                  />

                  <FormField
                    class="RailwayRequestForm__form-right-wagons-field"
                    :title="$t('forms.common.wagons')"
                    :value="railwayRequest.wagonsTypeName"
                  />

                  <FormField
                    class="RailwayRequestForm__form-right-wagons-field"
                    :title="$t('forms.common.goods')"
                    :value="railwayRequest.goodsName"
                  />

                  <FormField
                    class="RailwayRequestForm__form-right-wagons-field"
                    :title="$t('forms.common.shipmentPeriod')"
                    :value="`${railwayRequest.periodFrom} - ${railwayRequest.periodTo}`"
                  />

                  <FormField
                    class="RailwayRequestForm__form-right-wagons-field"
                    :title="$t('forms.common.loadingRate')"
                    :value="`${railwayRequest.loadingRate}, ${$t('forms.common.loadingRatePtc')}`"
                  />
                </div>
              </Group>

              <Group style="margin-top: 0" v-if="railwayRequest.comment">
                <FormField :title="$t('forms.common.comment')" big-title>
                  <FormText :text="railwayRequest.comment"/>
                </FormField>
              </Group>
            </div>

            <div class="RailwayRequestForm__form-left">
              <FormField
                style="padding-top: 0"
                :title="$t('forms.common.companyInitiator')"
                big-title>
                <Company :name="railwayRequest.companyName"/>
              </FormField>

              <FormField
                :style="{ 'padding-top': 0, 'margin-top': '30px' }"
                :title="$t('forms.common.representative')"
                big-title>
                <User
                  username-only
                  :username="railwayRequest.userFullname"
                  :email="railwayRequest.userEmail"
                  :phone="railwayRequest.userPhone"/>
              </FormField>
            </div>
          </div>
        </Segment>
      </div>
    </Form>

    <RailwayRequestEditForm
      ref="edit-form"
      :parend-id="railwayRequest.aggregationGuid"
      :data-in="railwayRequest"/>
  </div>
</template>

<script>
import Header from '@/components/Common/FormElements/FormHeader'
import Form from "@/components/Common/Form"
import Segment from '@/components/Common/FormElements/FormSegment'
import Button from '@/components/Common/Buttons/Button'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import MainMenu from '@/components/Common/FormElements/FormMainMenu'
import Company from '@/components/Companies/Company'
import User from '@/components/Users/User'
import Group from '@/components/Common/FormElements/FormGroup'
import FormField from '@/components/Common/FormElements/FormField'
import FormText from '@/components/Common/FormElements/FormText'
import Link from '@/components/Common/FormElements/FormLink'
import PillLink from '@/components/Common/FormElements/FormPillLink'
import RailwayRequestEditForm from '@/components/RailwayRequests/RailwayRequestsEditForm'
import RailwayRoute from '@/components/Common/Railway/RailwayRoute'

import elementHeight from '@/mixins/elementHeight'
import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { showErrorMessage } from '@/utils/messages'
import { getOppositeStatus } from '@/utils/railway-aggregations'

export default {
  name: 'th-railway-request-form',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element), elementHeight ],

  components: {
    Header,
    Form,
    Segment,
    Button,
    ButtonsGroup,
    MainMenu,
    Company,
    User,
    Group,
    FormField,
    FormText,
    Link,
    PillLink,
    RailwayRequestEditForm,
    RailwayRoute
  },

  computed: {
    railwayRequest() {
      return this.$store.getters['railwayRequests/getRailwayRequest']
    },
    userCanEdit() {
      return this.$rights.railwayRequests.userCanEdit()
    }
  },

  methods: {
    handleEditButton() {
      this.$refs['edit-form'].show()
    },
    async handleEditStatus() {
      const oppositeStatus = getOppositeStatus(this.railwayRequest.status.localeKey)

      const h = this.$createElement;
      const m = {
        title: this.$t('forms.common.statusChangingTitle'),
        message: h('p', null, [
          h('span', null, this.$t('forms.common.statusChangingText')),
          h('span', { style: `color: ${oppositeStatus.color}` }, this.$t(oppositeStatus.localeKey))
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t('forms.common.changeStatus'),
        cancelButtonText: this.$t('forms.common.cancel'),
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = this.$t('forms.common.changeStatusLoading')

            const { status, message } = await this.$store.dispatch('railwayRequests/setStatus', {
              guid: this.railwayRequest.guid,
              currentStatusId: this.railwayRequest.statusId
            })

            if (!status) {
              showErrorMessage(message)
            }

            instance.confirmButtonLoading = false

            done();
          } else {
            done();
          }
        }
      }

      this.$msgbox(m)
    }
  }
}
</script>

<style lang="scss" scoped>
.RailwayRequestForm__header-subtitle {
  margin-top: 8px;
  color: #909399;
}

.FormLink .FormLink__link .FormLink__link-title {
  font-weight: 400 !important;
}

.RailwayRequestForm__form {
  display: flex;
  flex-direction: row;
  width: 100%;

  .RailwayRequestForm__form-left {
    min-width: 25%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding-left: 5%;
  }

  .RailwayRequestForm__form-right {
    min-width: 70%;
    display: flex;
    flex-direction: column;

    .RailwayRequestForm__form-right-wagons-group {
      margin-top: 50px;

      .RailwayRequestForm__form-right-wagons {
        display: flex;
        flex-direction: row;

        .RailwayRequestForm__form-right-wagons-field {
          margin-left: 45px;
        }
      }
    }

    .RailwayRequestForm__form-right-railway-stations {
      display: flex;
      flex-direction: row;

      .RailwayRequestForm__form-right-railway-stations-station {
        margin-left: 45px;
      }
    }
  }
}

@media only screen and (max-width: 991px) {
  .RailwayRequestForm__form {
    flex-direction: column;

    .RailwayRequestForm__form-left {
      width: 100%;
      padding-left: 0;
    }

    .RailwayRequestForm__form-right {
      width: 100%;

      .RailwayRequestForm__form-right-wagons-group {
        margin-top: 40px;

        .RailwayRequestForm__form-right-wagons {
          flex-direction: column;
          width: fit-content;

          .RailwayRequestForm__form-right-wagons-field {
            margin-left: 0;
          }
        }
      }

      .RailwayRequestForm__form-right-railway-stations {
        flex-direction: column;

        .RailwayRequestForm__form-right-railway-stations-station {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
