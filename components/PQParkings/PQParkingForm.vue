<template>
  <div class="PQParkingForm">
    <Form no-header>

      <div slot="side-nav">
        <FormSideNav :title="$t('forms.common.pqParking')">
          <div>
            <div class="PQParkingForm__sidenav">
              <div class="PQParkingForm__sidenav__item">
                <fa class="PQParkingForm__sidenav__item__icon" icon="parking"/>
                <span class="PQParkingForm__sidenav__name">{{ parking.name }}</span>
              </div>
            </div>

            <OrganisationWidget
              style="margin-top: 40px"
              :name="parking.organisationName"
            />
          </div>
        </FormSideNav>
      </div>

      <div slot="content">
        <Segment style="min-height: calc(100vh - 110px)">

          <div class="PQParkingForm__form">

            <div class="PQParkingForm__form__main-group">
              <Group
                class="PQParkingForm__form__top-group"
                :title="$t('forms.common.position')"
                big-title
              >
                <div class="PQParkingForm__form__row">
                  <FormField
                    :title="$t('forms.common.region')"
                    :value="parking.regionName"
                  />

                  <FormField
                    :title="$t('forms.common.district')"
                    :value="parking.districtName"
                  />

                  <FormField
                    :title="$t('forms.common.locality')"
                    :value="parking.localityName"
                  />
                </div>

                <div class="PQParkingForm__form__row">
                  <FormField
                    :title="$t('forms.common.address')"
                    :value="parking.address"
                  />
                </div>

                <div class="PQParkingForm__form__row">
                  <FormField
                    style="width: 100%;"
                    :title="$t('forms.common.mapRegistrationPoint')"
                  >
                    <Map
                      :lat="parking.geoParkingLat"
                      :lng="parking.geoParkingLng"
                    />
                  </FormField>
                </div>
              </Group>

              <div class="PQParkingForm__toolbar">
                <ButtonsGroup>
                  <Button
                    v-if="!$_smallDeviceMixin_isDeviceSmall"
                    type=""
                    faIcon="pen"
                    edit
                    round
                    style="margin-right: 10px"
                    @click="handleEditButton"
                  >
                    {{ $t('forms.common.edit') }}
                  </Button>

                  <MainMenu v-if="$_smallDeviceMixin_isDeviceSmall">
                    <Button
                      type=""
                      fa-icon="pen"
                      edit
                      round
                      flat
                      @click="handleEditButton"
                    >
                      {{ $t('forms.common.edit') }}
                    </Button>
                  </MainMenu>
                </ButtonsGroup>
              </div>

            </div>

          </div>

        </Segment>
      </div>

    </Form>
  </div>
</template>

<script>
import Form from '@/components/Common/Form'
import FormSideNav from '@/components/Common/FormElements/FormSideNav'
import OrganisationWidget from '@/components/Organisations/OrganisationWidget'
import Segment from '@/components/Common/FormElements/FormSegment'
import Group from '@/components/Common/FormElements/FormGroup'
import FormField from '@/components/Common/FormElements/FormField'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import Button from '@/components/Common/Buttons/Button'
import MainMenu from '@/components/Common/FormElements/FormMainMenu'
import Map from '@/components/Common/Map'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-pq-parking-form',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    Form,
    FormSideNav,
    OrganisationWidget,
    Segment,
    Group,
    FormField,
    ButtonsGroup,
    Button,
    MainMenu,
    Map
  },

  props: {
    parking: {
      type: Object,
      required: true
    }
  },

  methods: {
    handleEditButton() {
      this.$emit('edit')
    }
  }
}
</script>

<style lang='scss' scoped>
.PQParkingForm {
  &__sidenav {
    color: #606266;

    &__name {
      font-weight: 500;
    }

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

  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__main-group {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: inherit;
    }

    &__top-group {
      margin-top: -5px;
      width: inherit;
    }

    &__row {
      display: flex;
      flex-direction: row;
      width: inherit;

      & *:not(:first-child) {
        margin-left: 45px;
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
  .PQParkingForm {
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
  .PQParkingForm {
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
