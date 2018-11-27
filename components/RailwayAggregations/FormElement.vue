<template>
  <div>
    <Form>
      <Header
        slot="header"
        ref="$_elementHeightMixin_ref_header"
        :title="`${$t('forms.railwayAggregator.title')} №${railwayAggregation.number}`"
        :status-title="$t(railwayAggregation.status.localeKey)"
        :status-color="railwayAggregation.status.color">

        <div class="RailwayAggregationForm__header-subtitle">
          <div>
            {{ `${$t('forms.common.period')}: ${railwayAggregation.periodFrom} - ${railwayAggregation.periodTo}` }}
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
          </MainMenu>
        </ButtonsGroup>
      </div>

      <div slot="content">
        <Segment :minus="$_smallDeviceMixin_isDeviceSmall ? 88 : 45">
          <div class="RailwayAggregationForm__form">
            <div class="RailwayAggregationForm__form-left">
              <FormField
                style="padding-top: 0"
                :title="$t('forms.railwayAggregator.companyAggregator')">
                <Company
                  :name="railwayAggregation.companyName"
                  :email="railwayAggregation.companyEmail"
                  :phone="railwayAggregation.companyPhone"/>
              </FormField>

              <FormField
                :style="{ 'padding-top': 0, 'margin-top': '30px' }"
                :title="$t('forms.railwayAggregator.representative')">
                <User
                  :username="railwayAggregation.userFullname"
                  :email="railwayAggregation.userEmail"
                  :phone="railwayAggregation.userPhone"/>
              </FormField>
            </div>

            <div class="RailwayAggregationForm__form-right">

              <Group
                class="RailwayAggregationForm__form-right-wagons-group"
                :title="$t('forms.common.wagons')">
                <div class="RailwayAggregationForm__form-right-wagons">
                  <FormField
                    :title="$t('forms.railwayAggregator.wagonsType')"
                    :value="railwayAggregation.wagonsAffilationName"/>

                  <FormField
                    class="RailwayAggregationForm__form-right-wagons-field RailwayAggregationForm__form-right-wagons-field-accent"
                    :title="$t('forms.railwayAggregator.wagonsInRoute')"
                    :value="railwayAggregation.wagonsInRoute"/>

                  <FormField
                    class="RailwayAggregationForm__form-right-wagons-field"
                    :title="$t('forms.railwayAggregator.wagonsAggregator')"
                    :value="railwayAggregation.wagonsAggregator"/>

                  <FormField
                    class="RailwayAggregationForm__form-right-wagons-field RailwayAggregationForm__form-right-wagons-field-accent"
                    :title="$t('forms.railwayAggregator.wagonsDeficit')"
                    :value="railwayAggregation.wagonsDeficit"/>
                </div>
              </Group>

              <Group style="margin-top: -10px">
                <FormField
                  :title="$t('forms.common.goods')"
                  :value="railwayAggregation.goodsName"/>
              </Group>

              <Group style="margin-top: -10px">
                <div class="RailwayAggregationForm__form-right-railway-stations">
                  <FormField
                    :title="$t('forms.common.stationFrom')">
                    <RailwayStation
                      :name="railwayAggregation.stationFromName"
                      :road="railwayAggregation.stationFromRoad"
                      :rwCode="railwayAggregation.stationFromRWCode"/>
                  </FormField>

                  <FormField
                    class="RailwayAggregationForm__form-right-railway-stations-station"
                    :title="$t('forms.common.stationTo')">
                    <RailwayStation
                      :name="railwayAggregation.stationToName"
                      :road="railwayAggregation.stationToRoad"
                      :rwCode="railwayAggregation.stationToRWCode"/>
                  </FormField>
                </div>
              </Group>

              <Group style="margin-top: 0" v-if="railwayAggregation.comment">
                <FormField :title="$t('forms.common.comment')">
                  <FormText :text="railwayAggregation.comment"/>
                </FormField>
              </Group>
            </div>
          </div>

          <div class="RailwayAggregationForm__requests">
            <RailwayRequestsSubordinateList
              :aggregation="$route.params.guid"
              :aggregation-goods="railwayAggregation.goodsGuid"
              :aggregation-wagons-type="railwayAggregation.wagonsAffilationId"/>
          </div>
        </Segment>
      </div>
    </Form>

    <RailwayAggregationEditForm
      ref="edit-form"
      :data-in="railwayAggregation"/>
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
import RailwayRequestsSubordinateList from '@/components/RailwayRequests/SubordinateList'
import RailwayAggregationEditForm from '@/components/RailwayAggregations/RailwayAggregationEditForm'

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
    RailwayRequestsSubordinateList,
    RailwayAggregationEditForm
  },

  computed: {
    railwayAggregation() {
      return this.$store.getters['railwayAggregations/getRailwayAggregation']
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
.RailwayAggregationForm__header-subtitle {
  margin-top: 8px;
  color: #909399;
}

.RailwayAggregationForm__form {
  display: flex;
  flex-direction: row;
  width: 100%;

  .RailwayAggregationForm__form-left {
    width: 30%;
    display: flex;
    flex-direction: column;
  }

  .RailwayAggregationForm__form-right {
    width: 70%;
    display: flex;
    flex-direction: column;

    .RailwayAggregationForm__form-right-wagons-group {
      margin-top: 0;

      .RailwayAggregationForm__form-right-wagons {
        display: flex;
        flex-direction: row;

        .RailwayAggregationForm__form-right-wagons-field {
          margin-left: 45px;

          &.RailwayAggregationForm__form-right-wagons-field-accent {
            font-weight: 500;
          }
        }
      }
    }

    .RailwayAggregationForm__form-right-railway-stations {
      display: flex;
      flex-direction: row;

      .RailwayAggregationForm__form-right-railway-stations-station {
        margin-left: 45px;
      }
    }
  }
}

.RailwayAggregationForm__requests {
  margin-top: 30px;
}

@media only screen and (max-width: 991px) {
  .RailwayAggregationForm__form {
    flex-direction: column;

    .RailwayAggregationForm__form-left {
      width: 100%;
    }

    .RailwayAggregationForm__form-right {
      width: 100%;

      .RailwayAggregationForm__form-right-wagons-group {
        margin-top: 40px;

        .RailwayAggregationForm__form-right-wagons {
          flex-direction: column;

          .RailwayAggregationForm__form-right-wagons-field {
            margin-left: 0;
          }
        }
      }

      .RailwayAggregationForm__form-right-railway-stations {
        flex-direction: column;

        .RailwayAggregationForm__form-right-railway-stations-station {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
