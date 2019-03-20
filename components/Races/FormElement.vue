<template>
  <div>
    <Form>
      <Header
        slot="header"
        :title="`${$t('forms.race.title')} №${race.number}`"
        :status-title="$t(race.status.localeKey)"
        :status-color="race.status.color"
      >
        <div class="RaceForm__header-subtitle">
          <div>{{ `${$t('forms.race.date')}: ${race.date}` }}</div>
          <div>
            {{ `${$t('forms.race.lastEvent')}: ${race.lastEvent} - ${race.lastEventDate}` }}
            <span
              class="RaceForm__header-subtitle-events"
              @click="visibleEvents = true"
            >{{ $t('forms.race.events') }}</span>
          </div>
        </div>
      </Header>

      <div slot="toolbar">
        <MainMenu>
          <AddLink
            v-if="race.vehiclesRegisterGuid"
            :to="$i18n.path(`workspace/vehicles-registers/${race.vehiclesRegisterGuid}`)"
            :title="$t('forms.vehicleRegister.title')"
            :subtitle="`${$t('forms.common.period')}: ${race.vehiclesRegisterDateFrom} - ${race.vehiclesRegisterDateTo}`"
          />

          <AddLink
            v-if="race.requestGuid"
            :to="$i18n.path(`workspace/requests/${race.requestGuid}`)"
            :title="$t('forms.request.title') + ' №' + race.requestNumber"
            :subtitle="`${$t('forms.common.date')}: ${race.requestScheduleDate}`"
            :style="{ 'margin-top': '10px' }"
          />

          <AddLink
            v-if="race.waybillNumber"
            :title="$t('forms.race.waybill') + ' №' + race.waybillNumber"
            :subtitle="`${$t('forms.common.date')}: ${race.waybillDate}`"
            :style="{ 'margin-top': '40px' }"
          >{{ `${$t('forms.common.net')}: ${race.waybillNet}` }}</AddLink>
        </MainMenu>
      </div>

      <div slot="content">
        <Segment>
          <div class="RaceForm__form">
            <div class="RaceForm__form-right">
              <Group
                class="RaceForm__form-right-races-group"
                :title="$t('forms.common.driverGroup')"
                big-title
              >
                <div class="RaceForm__form-right-races">
                  <FormField
                    class="RaceForm__form-right-races-field"
                    :title="$t('forms.common.personCred')"
                    :value="race.driverFullname"
                  />

                  <FormField
                    class="RaceForm__form-right-races-field"
                    :title="$t('forms.common.driverCert')"
                    :value="race.driverCert"
                  />
                

                <ContactInfo class="RaceForm__contact-info" :value="race.phone" type="phone"/>
                </div>
              </Group>

              <Group
                class="RaceForm__form-right-races-group"
                :title="$t('forms.common.vehicleGroup')"
                big-title
              >
                <div class="RaceForm__form-right-races">
                  <FormField
                    class="RaceForm__form-right-races-field"
                    :title="$t('forms.common.vehicleNumber')"
                    :value="race.vehicleNumber"
                  />

                  <FormField
                    class="RaceForm__form-right-races-field"
                    :title="$t('forms.common.vehicleTechPass')"
                    :value="race.vehicleTechPass"
                  />

                  <FormField
                    class="RaceForm__form-right-races-field"
                    :title="$t('forms.common.vehicleModel')"
                    :value="race.vehicleBrand"
                  />
                </div>
              </Group>

              <Group
                class="RaceForm__form-right-races-group"
                :title="$t('forms.common.trailerGroup')"
                big-title
              >
                <div class="RaceForm__form-right-races">
                  <FormField
                    class="RaceForm__form-right-races-field"
                    :title="$t('forms.common.vehicleNumber')"
                    :value="race.trailerNumber"
                  />

                  <FormField
                    class="RaceForm__form-right-races-field"
                    :title="$t('forms.common.vehicleTechPass')"
                    :value="race.trailerTechPass"
                  />

                  <FormField
                    class="RaceForm__form-right-races-field"
                    :title="$t('forms.common.vehicleModel')"
                    :value="race.trailerBrand"
                  />
                </div>
              </Group>

              <Group class="RaceForm__form-right-races-group">
                <div class="RaceForm__form-right-races">
                  <FormField
                    class="RaceForm__form-right-races-field"
                    :title="$t('forms.common.goods')"
                    :value="race.goods"
                  />
                  <FormField
                    class="RaceForm__form-right-races-field"
                    :title="$t('forms.race.quantityT')"
                    :value="race.quantity"
                  />
                </div>
              </Group>
            </div>
          </div>

          <Group>
            <Warehouse :code="race.warehouseFromCode" :label="$t('forms.common.warehouseFrom')"/>

            <Warehouse :code="race.warehouseToCode" :label="$t('forms.common.warehouseTo')"/>
          </Group>

          <Group>
            <Point
              :name="race.pointFromName"
              :koatuu="race.pointFromKoatuu"
              :label="$t('forms.common.pointFrom')"
            />

            <Point
              :name="race.pointToName"
              :koatuu="race.pointToKoatuu"
              :label="$t('forms.common.pointTo')"
            />
          </Group>

          <Group :title="$t('forms.common.route')">
            <Map
              koatuu
              :pointFromKoatuu="race.pointFromKoatuu"
              :pointToKoatuu="race.pointToKoatuu"
            />
          </Group>
        </Segment>
      </div>
    </Form>

    <RightView
      :visible="visibleEvents"
      :title="$t('forms.race.events')"
      @close="visibleEvents = false"
    />
  </div>
</template>

<script>
import Form from "@/components/Common/Form";
import Header from "@/components/Common/FormElements/FormHeader";
import Segment from "@/components/Common/FormElements/FormSegment";
import AddLink from "@/components/Common/FormElements/FormLink";
import Group from "@/components/Common/FormElements/FormGroup";
import ContactInfo from "@/components/Common/ContactInfo";
import RightView from "@/components/Common/RightView";
import MainMenu from "@/components/Common/FormElements/FormMainMenu";
import Point from "@/components/Common/Point";
import Warehouse from "@/components/Common/Warehouse";
import Map from "@/components/Common/Map";
import FormField from "@/components/Common/FormElements/FormField";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";

export default {
  name: "th-race-form",

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    Form,
    Header,
    Segment,
    AddLink,
    Group,
    ContactInfo,
    RightView,
    MainMenu,
    Point,
    Warehouse,
    Map,
    FormField
  },

  data() {
    return {
      race: {},

      visibleEvents: false
    };
  },

  created() {
    this.race = this.$store.getters["races/getRace"];
  }
};
</script>

<style lang="scss" scoped>
.RaceForm__header-subtitle {
  margin-top: 8px;
  color: #909399;

  .RaceForm__header-subtitle-events {
    color: #fecd34;
    margin-left: 20px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.RaceForm__contact-info {
  margin: 30px;
}

.RaceForm__form {
  display: flex;
  flex-direction: row;
  width: 100%;

  .RaceForm__form-right {
    min-width: 70%;
    display: flex;
    flex-direction: column;

    .RaceForm__form-right-races-group {
      margin-top: 40px;

      &.RaceForm__form-right-races-group-small-margin {
        margin-top: 10px;
      }

      .RaceForm__form-right-races {
        display: flex;
        flex-direction: row;

        .RaceForm__form-right-races-field {
          margin-right: 45px;

          &.RaceForm__form-right-races-field-accent {
            font-weight: 500;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 991px) {
  .RaceForm__contact-info {
    margin: 15px 0;
  }
  .RaceForm__form {
    flex-direction: column;

    .RaceForm__form-right {
      width: 100%;

      .RaceForm__form-right-races-group {
        margin-top: 30px;

        &.RaceForm__form-right-races-group-small-margin {
          margin-top: 10px;
        }

        .RaceForm__form-right-races {
          flex-direction: column;
          width: fit-content;

          .RaceForm__form-right-races-field {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
