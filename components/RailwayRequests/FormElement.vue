<template>
  <div>
    <Form>
      <Header
        slot="header"
        ref="$_elementHeightMixin_ref_header"
        :title="`${$t('forms.railwayRequest.title')} №${railwayRequest.number}`"
        :status-title="$t(railwayRequest.status.localeKey)"
        :status-color="railwayRequest.status.color">

        <div class="RailwayRequestForm__header-subtitle">
          <div>
            {{ `${$t('forms.common.period')}: ${railwayRequest.periodFrom} - ${railwayRequest.periodTo}` }}
          </div>
        </div>

      </Header>

      <div slot="toolbar">
        <ButtonsGroup>
          <Button
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            type=""
            faIcon="pen"
            edit
            style="margin-right: 10px"
            @click="handleEditButton">
            {{ $t('forms.common.edit') }}
          </Button>

          <MainMenu>
            <Button
              type=""
              faIcon="pen"
              edit
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
        <Segment :minus="$_smallDeviceMixin_isDeviceSmall ? 88 : 45">
          <div class="RailwayRequestForm__form">
            <div class="RailwayRequestForm__form-left">
              <FormField
                style="padding-top: 0"
                :title="$t('forms.common.company')">
                <Company
                  :name="railwayRequest.companyName"
                  :email="railwayRequest.companyEmail"
                  :phone="railwayRequest.companyPhone"/>
              </FormField>

              <FormField
                :style="{ 'padding-top': 0, 'margin-top': '30px' }"
                :title="$t('forms.common.representative')">
                <User
                  :username="railwayRequest.userFullname"
                  :email="railwayRequest.userEmail"
                  :phone="railwayRequest.userPhone"/>
              </FormField>
            </div>

            <div class="RailwayRequestForm__form-right">

              <Group
                class="RailwayRequestForm__form-right-wagons-group"
                :title="$t('forms.common.wagons')">
                <div class="RailwayRequestForm__form-right-wagons">
                  <FormField
                    :title="$t('forms.railwayAggregator.wagonsType')"
                    :value="railwayRequest.wagonsTypeName"/>

                  <FormField
                    class="RailwayRequestForm__form-right-wagons-field RailwayRequestForm__form-right-wagons-field-accent"
                    :title="$t('forms.railwayAggregator.wagonsInRoute')"
                    :value="railwayRequest.wagons"/>
                </div>
              </Group>

              <Group style="margin-top: -10px">
                <FormField
                  :title="$t('forms.common.goods')"
                  :value="railwayRequest.goodsName"/>
              </Group>

              <Group style="margin-top: -10px">
                <div class="RailwayRequestForm__form-right-railway-stations">
                  <FormField
                    :title="$t('forms.common.stationFrom')">
                    <RailwayStation
                      :name="railwayRequest.stationFromName"
                      :road="railwayRequest.stationFromRoad"
                      :rwCode="railwayRequest.stationFromRWCode"/>
                  </FormField>

                  <FormField
                    class="RailwayRequestForm__form-right-railway-stations-station"
                    :title="$t('forms.common.stationTo')">
                    <RailwayStation
                      :name="railwayRequest.stationToName"
                      :road="railwayRequest.stationToRoad"
                      :rwCode="railwayRequest.stationToRWCode"/>
                  </FormField>
                </div>
              </Group>

              <Group style="margin-top: 0" v-if="railwayRequest.comment">
                <FormField :title="$t('forms.common.comment')">
                  <FormText :text="railwayRequest.comment"/>
                </FormField>
              </Group>
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
import RailwayStation from '@/components/Common/Railway/RailwayStation'
import Link from '@/components/Common/FormElements/FormLink'
import RailwayRequestEditForm from '@/components/RailwayRequests/RailwayRequestsEditForm'

import elementHeight from '@/mixins/elementHeight'
import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-railway-aggregation-form',

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
    RailwayStation,
    Link,
    RailwayRequestEditForm
  },

  computed: {
    railwayRequest() {
      return this.$store.getters['railwayRequests/getRailwayRequest']
    }
  },

  methods: {
    handleEditButton() {
      this.$refs['edit-form'].show()
    }
  }
}
</script>

<style lang="scss" scoped>
.RailwayRequestForm__header-subtitle {
  margin-top: 8px;
  color: #909399;
}

.RailwayRequestForm__form {
  display: flex;
  flex-direction: row;
  width: 100%;

  .RailwayRequestForm__form-left {
    width: 30%;
    display: flex;
    flex-direction: column;
  }

  .RailwayRequestForm__form-right {
    width: 70%;
    display: flex;
    flex-direction: column;

    .RailwayRequestForm__form-right-wagons-group {
      margin-top: 0;

      .RailwayRequestForm__form-right-wagons {
        display: flex;
        flex-direction: row;

        .RailwayRequestForm__form-right-wagons-field {
          margin-left: 45px;

          &.RailwayRequestForm__form-right-wagons-field-accent {
            font-weight: 500;
          }
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
    }

    .RailwayRequestForm__form-right {
      width: 100%;

      .RailwayRequestForm__form-right-wagons-group {
        margin-top: 40px;

        .RailwayRequestForm__form-right-wagons {
          flex-direction: column;

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
