<template>
  <div class="DriversForm">
    <Form no-header>
      <div slot="side-nav">
        <FormSideNav :title="$t('forms.common.driver')">
          <div>
            <DriverAvatar
              class="DriversForm__avatar"
              :size="78"
              :name="driver.firstName"
              :status-title="driver.shortName"
            />

            <div class="DriversForm__sidenav">
              <div class="DriversForm__sidenav__item-name">
                <fa style="margin-right: 7px;" icon="user"/>
                <span style>{{ driver.shortName }}</span>
              </div>
              <div class="DriversForm__sidenav__item-phone">
                <ContactInfoGroup
                  type="phone"
                  :values="phones"
                />
              </div>
              <div v-if="driver.email" class="DriversForm__sidenav__item-email">
                <ContactInfo type="mail" :value="driver.email"/>
              </div>
            </div>
          </div>
        </FormSideNav>
      </div>
      <div slot="content">
        <Segment style="min-height: calc(100vh - 110px)">
          <ButtonsGroup class="DriversForm__buttons-group-right-top">
            <Button
              type=""
              faIcon="pen"
              edit
              round
              style="margin-right: 10px"
              @click="handleEditButton"
            >
              {{ $t('forms.common.edit') }}
            </Button>
          </ButtonsGroup>
          <div class="DriversForm__form-right">
            <Group :title="$t('forms.driver.personalData')" big-title>
              <div class="DriversForm__form-right-driver">
                <FormField
                  class="DriversForm__form-right-driver-field"
                  :title="$t('forms.driver.lastName')"
                  :value="driver.lastName"
                />
                <FormField
                  class="DriversForm__form-right-driver-field"
                  :title="$t('forms.driver.firstName')"
                  :value="driver.firstName"
                />
                <FormField
                  class="DriversForm__form-right-driver-field"
                  :title="$t('forms.driver.middleName')"
                  :value="driver.middleName"
                />
              </div>
            </Group>

            <Group :title="$t('forms.driver.documents')" big-title>
              <div class="DriversForm__form-right-driver">
                <FormField
                  v-if="driver.personDocsType === PERSON_DOCS_TYPE.PASSPORT"
                  class="DriversForm__form-right-driver-field"
                  :title="$t('forms.driver.passNumber')"
                  :value="`${driver.passSerial} ${driver.passNumber}`"
                />

                <FormField
                  v-if="driver.personDocsType === PERSON_DOCS_TYPE.PASSPORT"
                  class="DriversForm__form-right-driver-field"
                  :title="$t('forms.driver.passDate')"
                  :value="driver.passDate"
                />

                <FormField
                  v-if="driver.personDocsType === PERSON_DOCS_TYPE.PASSPORT"
                  class="DriversForm__form-right-driver-field"
                  :title="$t('forms.driver.passIssued')"
                  :value="driver.passIssued"
                />

                <FormField
                  v-if="driver.personDocsType === PERSON_DOCS_TYPE.ID_CARD"
                  class="DriversForm__form-right-driver-field"
                  :title="$t('forms.common.idCard')"
                  :value="driver.idCard"
                />

                <FormField
                  v-if="driver.personDocsType === PERSON_DOCS_TYPE.ID_CARD"
                  class="DriversForm__form-right-driver-field"
                  :title="$t('forms.common.idCardDate')"
                  :value="driver.idCardDate"
                />

                <FormField
                  v-if="driver.personDocsType === PERSON_DOCS_TYPE.ID_CARD"
                  class="DriversForm__form-right-driver-field"
                  :title="$t('forms.common.idCardIssued')"
                  :value="driver.idCardIssued"
                />

                <FormField
                  class="DriversForm__form-right-driver-field"
                  :title="$t('forms.driver.driverCert')"
                  :value="driver.certSerialNumber"
                />
              </div>
            </Group>
          </div>
        </Segment>
      </div>
    </Form>
  </div>
</template>

<script>
import Form from "@/components/Common/Form";
// import Header from "@/components/Common/FormElements/FormHeader";
// import ButtonAddToBookmarks from "@/components/Common/Buttons/ButtonAddToBookmarks";
import Segment from "@/components/Common/FormElements/FormSegment";
import Group from "@/components/Common/FormElements/FormGroup";
import FormField from "@/components/Common/FormElements/FormField";
// import Avatar from "@/components/Common/Avatar.vue";
import Button from "@/components/Common/Buttons/Button";
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup";
import ContactInfo from "@/components/Common/ContactInfo";
import ContactInfoGroup from "@/components/Common/ContactInfoGroup";
import FormSideNav from "@/components/Common/FormElements/FormSideNav";
import DriverAvatar from "@/components/Drivers/DriverAvatar";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";
import {
  STORE_MODULE_NAME,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES,
  PERSON_DOCS_TYPE
} from '@/utils/drivers'

export default {
  name: "th-driver-form",

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    Form,
    Segment,
    Group,
    FormField,
    // Avatar,
    // Header,
    // ButtonAddToBookmarks,
    ButtonsGroup,
    Button,
    ContactInfo,
    ContactInfoGroup,
    FormSideNav,
    DriverAvatar
  },

  data: () => ({ PERSON_DOCS_TYPE }),

  computed: {
    driver() {
      return this.$store.state.drivers.item
    },

    phones() {
      const phones = [ this.driver.phone.pMaskPhone() ]
      if (this.driver.phone1) {
        phones.push(this.driver.phone1.pMaskPhone())
      }
      if (this.driver.phone2) {
        phones.push(this.driver.phone2.pMaskPhone())
      }
      return phones
    }
  },
  methods: {
    handleEditButton() {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: EDIT_DIALOG_TYPES.EDIT
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.DriversForm {
  // display: flex;
  // flex-direction: row;

  &__sidenav {
    color: #606266;
    // min-height: calc(100vh - 60px);

    &__item-name {
      margin-top: 35px;
      font-size: 16px;
      font-weight: 500;
      color: #7a7a7a;
    }
    &__item-phone, &__item-email {
      margin-top: 25px;
      margin-left: -8px;
    }

    &__item-email {
      margin-top: 10px;
    }
  }

  &__form-right {
    display: flex;
    flex-direction: column;
    margin-top: -25px;

    &-driver {
      display: flex;
      flex-direction: row;

      &-group {
        margin-top: 0;
      }
      &-field {
        margin-right: 45px;
      }
    }
  }
  &__buttons-group-right-top {
    display: flex;
    position: absolute;
    right: 35px;
  }
}
@media only screen and (max-width: 991px) {
  .DriversForm {
    display: flex;
    flex-direction: column;
    &__avatar {
      // margin-left: -400px;
    }
    &__sidenav {
      min-height: calc(100vh - 100vh);
      // margin-left: -400px;
    }
  }
  .DriversForm__form {
    flex-direction: column;
  }
  .DriversForm__form-right {
    width: 100%;
    margin-top: 45px;
  }
  .DriversForm__form-right-driver-group {
    margin-top: 30px;
  }
  .DriversForm__form-right-driver {
    flex-direction: column;
    width: fit-content;
  }
  .DriversForm__form-right-driver-field {
    margin-left: 0;
  }

  .DriversForm__buttons-group-right-top {
    left: 37px;
    margin: 5px 5px;
  }
}
@media only screen and (max-width: 600px) {
  .DriversForm {
    display: flex;
    flex-direction: column;
  }
  .DriversForm__form {
    flex-direction: column;

    .DriversForm__form-right {
      width: 100%;

      .DriversForm__form-right-driver-group {
        margin-top: 30px;

        &.DriversForm__form-right-driver-group-small-margin {
          margin-top: 10px;
        }

        .DriversForm__form-right-driver {
          flex-direction: column;
          width: fit-content;

          .DriversForm__form-right-driver-field {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
