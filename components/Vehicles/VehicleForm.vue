<template>
  <Form no-header>


    <!-- <div slot="toolbar">
      <ButtonsGroup>

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

        <MainMenu v-else>
          <Button
            type=""
            fa-icon="pen"
            edit
            round
            flat
            @click="handleEditButton">
            {{ $t('forms.common.edit') }}
          </Button>
        </MainMenu>
      </ButtonsGroup>
    </div> -->

    <div slot="side-nav">
      <FormSideNav :title="$t('forms.common.vehicles')">
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
              <fa class="VehicleForm__sidenav__item__icon" icon="address-card"/>
              <span>{{ vehicle.techPassport }}</span>
            </div>
          </div>
        </div>
      </FormSideNav>
    </div>

    <div slot="content">
      <Segment>
        <div class="VehicleForm__toolbar">
          <ButtonsGroup>
            <Button
              type=""
              faIcon="pen"
              edit
              round
              style="margin-right: 10px"
              @click="handleEditButton">
              {{ $t('forms.common.edit') }}
            </Button>

            <!-- <MainMenu v-else>
              <Button
                type=""
                fa-icon="pen"
                edit
                round
                flat
                @click="handleEditButton">
                {{ $t('forms.common.edit') }}
              </Button>
            </MainMenu> -->
          </ButtonsGroup>
        </div>

        <div class="VehicleForm__form">

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
                :value="vehicle.type"
              />

              <FormField
                :title="$t('forms.common.subtype')"
                :value="vehicle.subtype"
              />
            </div>
          </Group>

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
                :title="$t('forms.common.net')"
                :value="vehicle.net"
              />

              <FormField
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
                :title="$t('forms.common.cabin')"
                :value="vehicle.color"
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

          <Group :title="$t('forms.common.usefulDimensions')">
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

        </div>
      </Segment>
    </div>

  </Form>
</template>

<script>
import Form from "@/components/Common/Form"
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
// import MainMenu from '@/components/Common/FormElements/FormMainMenu'
import Button from '@/components/Common/Buttons/Button'
import Segment from '@/components/Common/FormElements/FormSegment'
import Group from '@/components/Common/FormElements/FormGroup'
import FormField from '@/components/Common/FormElements/FormField'
import Tag from '@/components/Common/Tag'
import FormSideNav from '@/components/Common/FormElements/FormSideNav'
import VehicleAvatar from '@/components/Vehicles/VehicleAvatar'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-vehicle-form',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    Form,
    ButtonsGroup,
    // MainMenu,
    Button,
    Segment,
    Group,
    FormField,
    Tag,
    FormSideNav,
    VehicleAvatar
  },

  computed: {
    vehicle() {
      return this.$store.state.vehicles.item
    }
  },

  methods: {
    handleEditButton() {
      // this.$refs['edit-form'].show()
    },
  }
}
</script>

<style lang='scss' scoped>
.VehicleForm {

  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__top-group {
      margin-top: -35px;
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
  }

  &__toolbar {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}

@media only screen and (max-width: 991px) {
  .VehicleForm {
    &__form {
      &__top-group {
        margin-top: 0;
      }
    }

    &__toolbar {
      flex-direction: row-reverse;
      justify-content: center;
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
</style>
