<template>
    <div class="DriversForm">
      <div slot="side-nav">
        <div>
          <OrganisationAvatar class="DriversForm__avatar" :size="78" name="Kernel Green"/>
          <div class="DriversForm__sidenav">
            <div class="DriversForm__sidenav__item-name">
              <span>
                Товариство з обмеженою відповідальністю
                <br>"Kernel Green"
              </span>
            </div>
            <div class="OrganisationForm__link-group">
              <div class="OrganisationForm__link">
                <fa style="margin-right: 7px; color: gray;" icon="globe"/>
                <a href="#">kernel-green.com</a>
              </div>
              <div class="OrganisationForm__link">
                <fa style="margin-right: 7px; color: gray;" :icon="['fab', 'telegram-plane']"/>
                <a href="#">Kernel Green</a>
              </div>
              <div class="OrganisationForm__link">
                <fa style="margin-right: 7px; color: gray;" :icon="['fab', 'facebook-square']"/>
                <a href="#">Kernel Green</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="content">
        <Segment style="min-height: calc(100vh - 110px)">
          <div class="DriversForm__row">
            <Group title="Скорочена назва">
              <FormField class="DriversForm__form-right-driver-field" value="ТОВ 'Kernel Green'"/>
            </Group>
            <Group title="Робоча назва" style="margin-left: 100px;">
              <FormField value="Princip, ТОВ"/>
            </Group>
          </div>
          <hr>
          <Group title="Організаційна форма">
            <div class="DriversForm__form-right-driver">
              <FormField
                class="DriversForm__form-right-driver-field"
                value="Товариство з обмеженою відповідальністю (ТОВ)"
              />
            </div>
            <hr>
          </Group>
          <Group title="Схема оподаткування">
            <div class="DriversForm__form-right-driver">
              <FormField
                class="DriversForm__form-right-driver-field"
                value="Товариство з обмеженою відповідальністю (ТОВ)"
              />
            </div>
            <hr>
          </Group>
          <div class="DriversForm__row">
            <Group title="ЄДРПОУ">
              <div class="DriversForm__form-right-driver">
                <FormField class="DriversForm__form-right-driver-field" value="12396578"/>
              </div>
            </Group>
            <Group title="ІНН" style="margin-left: 170px;">
              <div class="DriversForm__form-right-driver">
                <FormField class="DriversForm__form-right-driver-field" value="6239657897"/>
              </div>
            </Group>
          </div>
          <ButtonsGroup style="display: flex; justify-content: center; margin-top: 20px;">
            <Button
              type
              edit
              round
              style="margin-right: 10px; width: 22%;"
              @click="handleEditButton"
            >Закрити</Button>
            <Button
              type
              faIcon="pen"
              edit
              round
              style="margin-right: 10px"
              @click="handleEditButton"
            >{{ $t('forms.common.edit') }}</Button>
          </ButtonsGroup>
        </Segment>
      </div>
    </div>
</template>

<script>
// import Form from "@/components/Common/Form";
// import Header from "@/components/Common/FormElements/FormHeader";
// import ButtonAddToBookmarks from "@/components/Common/Buttons/ButtonAddToBookmarks";
import Segment from "@/components/Common/FormElements/FormSegment";
import Group from "@/components/Common/FormElements/FormGroup";
import FormField from "@/components/Common/FormElements/FormField";
// import Avatar from "@/components/Common/Avatar.vue";
import Button from "@/components/Common/Buttons/Button";
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup";
// import FormSideNav from "@/components/Common/FormElements/FormSideNav";
import OrganisationAvatar from "@/components/Organisations/OrganisationAvatar";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";
import {
  STORE_MODULE_NAME,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES
} from "@/utils/drivers";

export default {
  name: "th-driver-form",

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    // Form,
    Segment,
    Group,
    FormField,
    // Avatar,
    // Header,
    // ButtonAddToBookmarks,
    ButtonsGroup,
    Button,
    // FormSideNav,
    OrganisationAvatar
  },

  computed: {
    driver() {
      return this.$store.state.drivers.item;
    },

    phones() {
      const phones = [this.driver.phone.pMaskPhone()];
      if (this.driver.phone1) {
        phones.push(this.driver.phone1.pMaskPhone());
      }
      if (this.driver.phone2) {
        phones.push(this.driver.phone2.pMaskPhone());
      }
      return phones;
    }
  },
  methods: {
    handleEditButton() {
      this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`,
        {
          show: true,
          type: EDIT_DIALOG_TYPES.EDIT
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.DriversForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgb(161, 160, 160);
  border-radius: 20px;
  width: 40%;
  margin: 0 auto;
  &__row {
    display: flex;
    flex-direction: row;
  }

  &__avatar {
    margin: 70px auto 0 auto;
  }
  &__sidenav {
    &__item-name {
      margin-top: 30px;
      font-size: 16px;
      font-weight: 500;
      color: #7a7a7a;
      display: flex;
      justify-content: center;
      text-align: center;
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
}
.OrganisationForm__link-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  color: black;
}
.OrganisationForm__link {
  margin-top: 15px;
}
.OrganisationForm__link a {
  color: black;
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
