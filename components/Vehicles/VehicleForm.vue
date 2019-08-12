<template>
  <Form no-header>

    <div slot="side-nav">
      <FormSideNav :title="$t('forms.common.vehicle')">
        <div>
          <VehicleAvatar
            style="{ 'margin-left': '2px' }"
            :size="78"
            :name="vehicle.brand"
          />

          <div class="VehicleForm__sidenav">
            <div class="VehicleForm__sidenav__item">
              <fa class="VehicleForm__sidenav__item__icon" icon="truck"/>
              <span>{{ vehicle.vNumber }}</span>
            </div>

            <div class="VehicleForm__sidenav__item">
              <fa class="VehicleForm__sidenav__item__icon" icon="list-alt"/>
              <span>{{ vehicle.techPassport }}</span>
            </div>

            <div class="VehicleForm__sidenav__last-items">
              <div v-if="vehicle.lastTrailer" class="VehicleForm__sidenav__last-items__item-last-trailer">
                <span>{{ `${$t('forms.common.vehicleLastTrailer')}` }}</span>

                <!-- <nuxt-link :to="$i18n.path(`workspace/vehicles/${vehicle.guid}`)">
                  <VehiclesCard
                    class="VehicleForm__sidenav__last-items__item-last-trailer__card"
                    :vehicle="vehicle"
                    show-open-button
                    @open="$emit('item-open', vehicle)"
                  />
                </nuxt-link> -->

                  <VehiclesCard
                    class="VehicleForm__sidenav__last-items__item-last-trailer__card"
                    :vehicle="vehicle.lastTrailer"
                    show-open-button
                    @open="handleOpenVehicle"
                  />
              </div>

              <div v-if="vehicle.lastDriver" class="VehicleForm__sidenav__last-items__item-last-driver">
                <span>{{ `${$t('forms.common.vehicleLastDriver')}` }}</span>

                <DriversCard
                  class="VehicleForm__sidenav__last-items__item-last-driver__card"
                  :driver="vehicle.lastDriver"
                  show-open-button
                  @open="handleOpenDriver"
                />
              </div>
            </div>
          </div>
        </div>
      </FormSideNav>
    </div>

    <div slot="content">
      <Segment style="min-height: calc(100vh - 110px)">
        <div class="VehicleForm__form">

           <div class="VehicleForm__form-main-group">
            <Group class="VehicleForm__form__top-group" :title="$t('forms.common.mainParams')" big-title>
              <div class="VehicleForm__form__row">
                <FormField
                  :title="$t('forms.common.brand')"
                  :value="vehicle.brand"
                />

                <FormField
                  :title="$t('forms.common.model')"
                  :value="vehicle.model"
                />

                <FormField
                  :title="$t('forms.common.type')"
                  :value="vehicle.typeName"
                />

                <FormField
                  :title="$t('forms.common.subtype')"
                  :value="vehicle.subtypeName"
                />
              </div>
            </Group>

            <div class="VehicleForm__toolbar">
              <ButtonsGroup>
                <ButtonAddToBookmarks
                  v-if="!$_smallDeviceMixin_isDeviceSmall"
                  :currentlyInBookmarks="vehicle.isFavorite"
                  :handle-click="handleAddToBookmarksButton"
                />

                <Button
                  v-if="!$_smallDeviceMixin_isDeviceSmall"
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
                    type=""
                    fa-icon="pen"
                    edit
                    round
                    flat
                    @click="handleEditButton">
                    {{ $t('forms.common.edit') }}
                  </Button>

                  <ButtonAddToBookmarks
                    :style="{ 'margin-left': 0 }"
                    flat
                    :currentlyInBookmarks="vehicle.isFavorite"
                    :handle-click="handleAddToBookmarksButton"
                  />
                </MainMenu>
              </ButtonsGroup>
            </div>
          </div>

          <Group :title="$t('forms.common.additionalParams')" big-title>
            <div class="VehicleForm__form__row">
              <FormField
                :title="$t('forms.common.gross')"
                :value="vehicle.gross"
              />

              <FormField
                :title="$t('forms.common.tara')"
                :value="vehicle.tara"
              />

              <FormField
                v-if="!vehicle.noUsefulSizes"
                :title="$t('forms.common.maxNet')"
                :value="vehicle.net"
              />

              <FormField
                v-if="!vehicle.noUsefulSizes"
                :title="$t('forms.common.cargoCapacity')"
                :value="vehicle.cargoCapacity"
              />
            </div>

            <div class="VehicleForm__form__row">
              <FormField
                :title="$t('forms.common.releaseYear')"
                :value="vehicle.year"
              />

              <FormField
                v-if="!vehicle.isTrailer"
                :title="$t('forms.common.cabin')"
                :value="color"
              />
            </div>
          </Group>

          <Group :title="$t('forms.common.overallDimensions')">
            <div class="VehicleForm__form__row">
              <FormField
                :title="$t('forms.common.length')"
                :value="vehicle.length"
              />

              <FormField
                :title="$t('forms.common.width')"
                :value="vehicle.width"
              />

              <FormField
                :title="$t('forms.common.height')"
                :value="vehicle.height"
              />
            </div>
          </Group>

          <Group
            v-if="!vehicle.noUsefulSizes"
            :title="$t('forms.common.usefulDimensions')"
          >
            <div class="VehicleForm__form__row">
              <FormField
                :title="$t('forms.common.length')"
                :value="vehicle.cLength"
              />

              <FormField
                :title="$t('forms.common.width')"
                :value="vehicle.cWidth"
              />

              <FormField
                :title="$t('forms.common.height')"
                :value="vehicle.cHeight"
              />
            </div>
          </Group>

          <Group v-if="vehicle.hasGps || vehicle.suitableForSealing">
            <div class="VehicleForm__form__row">
              <div class="VehicleForm__form__tags">
                <Tag v-if="vehicle.hasGps" :value="$t('forms.common.hasGps')"/>
                <Tag v-if="vehicle.suitableForSealing" :value="$t('forms.common.suitableForSealing')"/>
              </div>
            </div>
          </Group>

          <Group
            v-if="vehiclesRegistersCount > 0"
            :title="$t('forms.common.vehiclesRegisterOutfits')"
            big-title
          >
            <VehiclesRegistersPartisipantList
              :loading="vehiclesRegistersLoading"
              :count="vehiclesRegistersCount"
              :list="vehiclesRegistersList"
            />
          </Group>

        </div>
      </Segment>

      <VehicleFastView
        v-if="vehicle.lastTrailer"
        ref="vehicle-fast-view"
        :vehicle="vehicle.lastTrailer"
      />

      <DriverFastView
        v-if="vehicle.lastDriver"
        ref="driver-fast-view"
        :driver="vehicle.lastDriver"
      />
    </div>
  </Form>
</template>

<script>
import Form from "@/components/Common/Form"
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import Button from '@/components/Common/Buttons/Button'
import Segment from '@/components/Common/FormElements/FormSegment'
import Group from '@/components/Common/FormElements/FormGroup'
import FormField from '@/components/Common/FormElements/FormField'
import Tag from '@/components/Common/Tag'
import FormSideNav from '@/components/Common/FormElements/FormSideNav'
import VehicleAvatar from '@/components/Vehicles/VehicleAvatar'
import DriversCard from '@/components/Drivers/DriversCard'
import VehiclesCard from '@/components/Vehicles/VehiclesCard'
import VehicleFastView from '@/components/Vehicles/VehicleFastView'
import DriverFastView from '@/components/Drivers/DriverFastView'
import ButtonAddToBookmarks from '@/components/Common/Buttons/ButtonAddToBookmarks'
import MainMenu from '@/components/Common/FormElements/FormMainMenu'
import VehiclesRegistersPartisipantList from '@/components/VehiclesRegisters/VehiclesRegistersPartisipantList'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { STORE_MODULE_NAME, MUTATIONS_KEYS, ACTIONS_KEYS, EDIT_DIALOG_TYPES } from '@/utils/vehicles'
import { COLORS } from '@/utils/colors'

export default {
  name: 'th-vehicle-form',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    Form,
    ButtonsGroup,
    Button,
    Segment,
    Group,
    FormField,
    Tag,
    FormSideNav,
    VehicleAvatar,
    DriversCard,
    VehiclesCard,
    VehicleFastView,
    DriverFastView,
    ButtonAddToBookmarks,
    MainMenu,
    VehiclesRegistersPartisipantList
  },

  props: {
    visible: Boolean,
  },

  computed: {
    vehicle() {
      return this.$store.state.vehicles.item
    },

    color() {
      const color = Object.values(COLORS).find(item => item === this.vehicle.color)
      if (color) {
        return this.$t(`forms.colors.${color}`)
      }
      return ''
    },

    vehiclesRegistersList() {
      return this.$store.state[STORE_MODULE_NAME].vehiclesRegisters.list
    },

    vehiclesRegistersLoading() {
      return this.$store.state[STORE_MODULE_NAME].vehiclesRegisters.loading
    },

    vehiclesRegistersCount() {
      return this.$store.state[STORE_MODULE_NAME].vehiclesRegisters.count
    }
  },

  methods: {
    handleEditButton() {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: EDIT_DIALOG_TYPES.EDIT
      })
    },

    show() {
      this.visible = true
    },

    handleOpenVehicle() {
      this.$refs['vehicle-fast-view'].show()
    },

    handleOpenDriver() {
      this.$refs['driver-fast-view'].show()
    },

    async handleAddToBookmarksButton() {
      let listKey = this.vehicle.isTrailer ? 'listTrailers' : 'listTrucks'

      if (this.vehicle.isFavorite) {
        await this.$store.dispatch(
          `${STORE_MODULE_NAME}/${ACTIONS_KEYS.REMOVE_ITEM_FROM_BOOKMARKS}`,
          { guid: this.vehicle.guid, listKey }
        )
      } else {
        await this.$store.dispatch(
          `${STORE_MODULE_NAME}/${ACTIONS_KEYS.ADD_ITEM_TO_BOOKMARKS}`,
          { guid: this.vehicle.guid, listKey }
        )
      }
    },

    fetchVehiclesRegisters() {
      this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_VEHICLES_REGISTERS_LIST}`,
        {
          guid: this.vehicle.guid,
          name: this.vehicle.isTrailer ? 'trailer' : 'truck'
        }
      )
    }
  },

  mounted() {
    // Fetch vehicles registers
    this.fetchVehiclesRegisters()
  },

  beforeRouteLeave() {
    this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.CLEAR_ITEM}`)
  }
}
</script>

<style lang='scss' scoped>
.VehicleForm {

  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;

    &-main-group {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    &__top-group {
      margin-top: -5px;
    }

    &__row {
      display: flex;
      flex-direction: row;

      & *:not(:first-child) {
        margin-left: 45px;
      }
    }

    &__tags {
      // display: flex;
      // flex-direction: row;
      margin-top: 5px;

      & *:not(:first-child) {
        margin-left: 15px;
      }
    }
  }

  &__sidenav {
    margin-top: 25px;
    color: #606266;
    // min-height: calc(100vh - 60px);

    &__item {
      display: flex;
      flex-direction: row;

      &:not(:first-child) {
        margin-top: 10px;
      }

      & *:not(:first-child) {
        margin-left: 10px;
      }

      &__icon {
        width: 20px;
        font-size: initial;
      }
    }

    &__last-items {
      width: 115%;
      //cursor: pointer;
      display: flex;
      flex-direction: column;

      &__item-last-driver, &__item-last-trailer {
        &__card {
          margin-top: 8px;
        }
      }

      &__item-last-driver {
        margin-top: 15px;
      }

      &__item-last-trailer {
        margin-top: 45px;
      }
    }
  }

  &__toolbar {
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}

@media only screen and (max-width: 991px) {
  .VehicleForm {
    &__form {
       &-main-group {
        flex-direction: column-reverse;
      }

      &__top-group {
        margin-top: 10px;
      }
    }

    &__toolbar {
      flex-direction: row-reverse;
      margin-bottom: 30px;
    }
  }
}

@media only screen and (max-width: 600px) {
  .VehicleForm {
    &__form {
      &__row {
        flex-direction: column;

        & *:not(:first-child) {
          margin-left: 0;
          margin-top: -30px;
        }
      }

      &__tags {
        & *:not(:first-child) {
          margin-top: 5px;
          margin-left: 0px;
        }
      }
    }
  }
}

@media only screen and (max-width:700px) {
  .VehicleForm__sidenav {
    &__last-items {
      width: 83%;
    }
  }
}

@media only screen and (min-width:700px) and (max-width: 987px) {
  .VehicleForm__sidenav {
    &__last-items {
      display: flex;
      flex-direction: row;
      width: 100%;

      &__item-last-driver, &__item-last-trailer {
        width: 33%;
      }

      &__item-last-driver {
        margin: {
          left: 20px;
          top: 45px;
        }
      }
    }
  }
}
</style>
