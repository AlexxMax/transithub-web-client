<template>
  <div>
    <Form>
      <Header
        slot="header"
        :title="$t('forms.vehicleRegister.title')"
        :status-title="$t(vehicleRegister.status.localeKey)"
        :status-color="vehicleRegister.status.color"
      >
        <div class="VehicleRegisterForm__header-subtitle">
          <div>{{ `${$t('forms.race.lastEvent')}: ${vehicleRegister.lastEventName} - ${vehicleRegister.lastEventDate}` }}</div>
        </div>
      </Header>

      <div slot="toolbar">
        <MainMenu>
          <Link
            v-if="vehicleRegister.requestGuid"
            :to="$i18n.path(`workspace/requests/${vehicleRegister.requestGuid}`)"
            :title="$t('forms.request.title') + ' №' + vehicleRegister.requestNumber"
            :subtitle="`${$t('forms.common.date')}: ${vehicleRegister.requestScheduleDate}`"
          />

          <Link
            v-if="vehicleRegister.orderGuid"
            :to="$i18n.path(`workspace/orders/${vehicleRegister.orderGuid}`)"
            :title="$t('forms.order.title') + ' №' + vehicleRegister.orderNumber"
            :subtitle="`${$t('forms.common.date')}: ${vehicleRegister.orderDate}`"
            :style="{ 'margin-top': '10px' }"
          />
        </MainMenu>
      </div>

      <div slot="content">
        <Segment>
          <div class="VehicleRegisterForm__form">
            <div class="VehicleRegisterForm__form-right">
              <Group class="VehicleRegisterForm__form-right-vehicles-group">
                <div class="VehicleRegisterForm__form-right-vehicles">
                  <FormField
                    class="VehicleRegisterForm__form-right-vehicles-field"
                    :title="$t('forms.common.period')"
                    :value="`${vehicleRegister.periodFrom} - ${vehicleRegister.periodTo}`"
                  />

                  <FormField
                    class="VehicleRegisterForm__form-right-vehicles-field"
                    :title="$t('forms.vehicleRegister.tripsQuantity')"
                    v-model="vehicleRegister.tripsQuantity"
                  />
                </div>
              </Group>

              <Group
                class="VehicleRegisterForm__form-right-vehicles-group"
                :title="$t('forms.common.driverGroup')"
                big-title
              >
                <div class="VehicleRegisterForm__form-right-vehicles">
                  <FormField
                    class="VehicleRegisterForm__form-right-vehicles-field"
                    :title="$t('forms.common.personCred')"
                    :value="vehicleRegister.driverFullname"
                  />

                  <FormField
                    class="VehicleRegisterForm__form-right-vehicles-field"
                    :title="$t('forms.common.driverCert')"
                    :value="vehicleRegister.driverCert"
                  />

                  <ContactInfo
                    class="VehicleRegisterForm__contact-info"
                    :value="vehicleRegister.phone"
                    type="phone"
                  />
                </div>
              </Group>

              <Group
                class="VehicleRegisterForm__form-right-vehicles-group"
                :title="$t('forms.common.vehicleGroup')"
                big-title
              >
                <div class="VehicleRegisterForm__form-right-vehicles">
                  <FormField
                    class="VehicleRegisterForm__form-right-vehicles-field"
                    :title="$t('forms.common.vehicleNumber')"
                    :value="vehicleRegister.vehicleNumber"
                  />

                  <FormField
                    class="VehicleRegisterForm__form-right-vehicles-field"
                    :title="$t('forms.common.vehicleTechPass')"
                    :value="vehicleRegister.vehicleTechPass"
                  />

                  <FormField
                    class="VehicleRegisterForm__form-right-vehicles-field"
                    :title="$t('forms.common.vehicleModel')"
                    :value="vehicleRegister.vehicleBrand"
                  />
                </div>
              </Group>

              <Group
                class="VehicleRegisterForm__form-right-vehicles-group"
                :title="$t('forms.common.trailerGroup')"
                big-title
              >
                <div class="VehicleRegisterForm__form-right-vehicles">
                  <FormField
                    class="VehicleRegisterForm__form-right-vehicles-field"
                    :title="$t('forms.common.vehicleNumber')"
                    :value="vehicleRegister.trailerNumber"
                  />

                  <FormField
                    class="VehicleRegisterForm__form-right-vehicles-field"
                    :title="$t('forms.common.vehicleTechPass')"
                    :value="vehicleRegister.trailerTechPass"
                  />

                  <FormField
                    class="VehicleRegisterForm__form-right-vehicles-field"
                    :title="$t('forms.common.vehicleModel')"
                    :value="vehicleRegister.trailerBrand"
                  />
                </div>
              </Group>
            </div>
          </div>

          <Group>
            <Point
              :name="vehicleRegister.pointFromName"
              :koatuu="vehicleRegister.pointFromKoatuu"
              :label="$t('forms.common.pointFrom')"
            />

            <Point
              :name="vehicleRegister.pointToName"
              :koatuu="vehicleRegister.pointToKoatuu"
              :label="$t('forms.common.pointTo')"
            />
          </Group>

          <Group :title="$t('forms.common.route')">
            <Map
              koatuu
              :pointFromKoatuu="vehicleRegister.pointFromKoatuu"
              :pointToKoatuu="vehicleRegister.pointToKoatuu"
            />
          </Group>

          <GroupCollapse
            v-if="vehicleRegister.guid"
            :title="$t('lists.races')"
            :style="{ 'margin-top': $_smallDeviceMixin_isDeviceSmall ? '20px' : '-10px', 'padding-bottom': '10px' }"
          >
            <RacesSubordinateList
              instant-fill-up
              no-events
              :vehicle-register-guid="vehicleRegister.guid"
            />
          </GroupCollapse>
        </Segment>
      </div>
    </Form>
  </div>
</template>

<script>
import Form from "@/components/Common/Form";
import Header from "@/components/Common/FormElements/FormHeader";
import Segment from "@/components/Common/FormElements/FormSegment";
import Link from "@/components/Common/FormElements/FormLink";
import Group from "@/components/Common/FormElements/FormGroup";
import GroupCollapse from "@/components/Common/FormElements/FormGroupCollapse";
import ContactInfo from "@/components/Common/ContactInfo";
import MainMenu from "@/components/Common/FormElements/FormMainMenu";
import Point from "@/components/Common/Point";
import RacesSubordinateList from "@/components/Races/SubordinateList";
import Map from "@/components/Common/Map";
import FormField from "@/components/Common/FormElements/FormField";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";

export default {
  name: "th-vehicles-registers-form",

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    Form,
    Header,
    Segment,
    Link,
    Group,
    GroupCollapse,
    ContactInfo,
    MainMenu,
    Point,
    RacesSubordinateList,
    Map,
    FormField
  },

  data() {
    return {
      vehicleRegister: {}
    };
  },

  created() {
    this.vehicleRegister = this.$store.getters[
      "vehiclesRegisters/getVehicleRegister"
    ];
  }
};
</script>

<style lang="scss" scoped>
.VehicleRegisterForm__header-subtitle {
  margin-top: 8px;
  color: #909399;
}

.VehicleRegisterForm__contact-info {
  margin: 30px;
}

.VehicleRegisterForm__form {
  display: flex;
  flex-direction: row;
  width: 100%;

  .VehicleRegisterForm__form-right {
    min-width: 70%;
    display: flex;
    flex-direction: column;

    .VehicleRegisterForm__form-right-vehicles-group {
      margin-top: 40px;

      &.VehicleRegisterForm__form-right-vehicles-group-small-margin {
        margin-top: 10px;
      }

      .VehicleRegisterForm__form-right-vehicles {
        display: flex;
        flex-direction: row;

        .VehicleRegisterForm__form-right-vehicles-field {
          margin-right: 45px;

          &.VehicleRegisterForm__form-right-vehicles-field-accent {
            font-weight: 500;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 991px) {
  .VehicleRegisterForm__contact-info {
    margin: 15px 0;
  }
  .VehicleRegisterForm__form {
    flex-direction: column;

    .VehicleRegisterForm__form-right {
      width: 100%;

      .VehicleRegisterForm__form-right-vehicles-group {
        margin-top: 30px;

        &.VehicleRegisterForm__form-right-vehicles-group-small-margin {
          margin-top: 10px;
        }

        .VehicleRegisterForm__form-right-vehicles {
          flex-direction: column;
          width: fit-content;

          .VehicleRegisterForm__form-right-vehicles-field {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
