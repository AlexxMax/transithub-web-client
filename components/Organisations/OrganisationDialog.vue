<template>
  <div class="OrganisationForm">
    <el-dialog :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <OrganisationAvatar class="OrganisationForm__avatar" :size="78" name="Kernel Green"/>

        <div class="OrganisationForm__organisation-name">
          <span>
            Товариство з обмеженою відповідальністю
            <br>"Kernel Green"
          </span>
        </div>

        <div class="OrganisationForm__link-group">
          <div class="OrganisationForm__link-group-item">
            <fa style="margin-right: 7px; color: gray;" icon="globe"/>
            <a href="#">kernel-green.com</a>
          </div>
          <div class="OrganisationForm__link-group-item">
            <fa style="margin-right: 7px; color: gray;" :icon="['fab', 'telegram-plane']"/>
            <a href="#">Kernel Green</a>
          </div>
          <div class="OrganisationForm__link-group-item">
            <fa style="margin-right: 7px; color: gray;" :icon="['fab', 'facebook-square']"/>
            <a href="#">Kernel Green</a>
          </div>
        </div>

        <div class="OrganisationForm__items-group">
          <el-form-item>
            <div class="OrganisationForm__row">
              <Group :title="$t('forms.company.profile.shortname')" style="margin-right: 150px;">
                <FormField value="ТОВ 'Kernel Green'" class="margin-value"/>
              </Group>
              <Group
                :title="$t('forms.company.profile.workname')"
                class="OrganisationForm__right-col"
              >
                <FormField value="Princip, ТОВ" class="margin-value"/>
              </Group>
            </div>
            <hr>
          </el-form-item>

          <el-form-item>
            <Group :title="$t('forms.company.common.organisationForm')" class="margin-value">
              <div>
                <FormField
                  value="Товариство з обмеженою відповідальністю (ТОВ)"
                  class="margin-value"
                />
              </div>
              <hr>
            </Group>
          </el-form-item>

          <el-form-item>
            <Group :title="$t('forms.company.common.taxScheme')" class="margin-value">
              <div>
                <FormField
                  value="Товариство з обмеженою відповідальністю (ТОВ)"
                  class="margin-value"
                />
              </div>
              <hr>
            </Group>
          </el-form-item>
          <el-form-item>
            <div class="OrganisationForm__row">
              <Group
                :title="$t('forms.company.common.edrpou')"
                style="margin-right: 220px;"
                class="margin-value"
              >
                <div>
                  <FormField value="12396578" class="margin-value"/>
                </div>
              </Group>
              <Group :title="$t('forms.company.common.inn')" class="margin-value">
                <FormField value="6239657897" class="margin-value"/>
              </Group>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <!-- <el-dialog width="30%" title="Inner Dialog" :visible.sync="innerVisible" append-to-body>
        <OrganisationEditDialog/>
      </el-dialog>-->
      <ButtonsGroup class="OrganisationForm__buttons-group">
        <Button
          type
          edit
          round
          style="margin-right: 10px; width: 20%;"
          @click="dialogFormVisible = false"
        >Закрити</Button>
        <Button
          append-to-body
          type
          faIcon="pen"
          edit
          round
          style="margin-right: 10px"
          @click="innerVisible = true"
        >{{ $t('forms.common.edit') }}</Button>
      </ButtonsGroup>
    </el-dialog>
    <el-dialog width="30%" title="Inner Dialog" :visible.sync="innerVisible" append-to-body>
      <OrganisationEditDialog/>
    </el-dialog>
  </div>
</template>

<script>
import Group from "@/components/Common/FormElements/FormGroup";
import FormField from "@/components/Common/FormElements/FormField";
import OrganisationAvatar from "@/components/Organisations/OrganisationAvatar";
import OrganisationEditDialog from "@/components/Organisations/OrganisationEditDialog";
import Button from "@/components/Common/Buttons/Button";
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";
import {
  STORE_MODULE_NAME,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES
} from "@/utils/drivers";
export default {
  name: "th-organisation-dialog",

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    Group,
    FormField,
    OrganisationAvatar,
    Button,
    ButtonsGroup,
    OrganisationEditDialog
  },
  data() {
    return {
      dialogFormVisible: true,
      outerVisible: false,
      innerVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
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
  }
};
</script>

<style lang="scss" scoped>
.OrganisationForm {
  &__row {
    display: flex;
    flex-direction: row;
  }
  &__avatar {
    margin: 15px auto 0 auto;
  }
  &__organisation-name {
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
    color: #7a7a7a;
    text-align: center;
  }

  &__link-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 5px;
    color: black;
  }
  &__link-group-item {
    margin-top: 15px;
  }
  &__link-group-item a {
    color: black;
  }
  &__items-group {
    margin-left: 5px;
  }
  &__buttons-group {
    justify-content: center;
    margin-bottom: 10px;
  }
}
.margin-value {
  margin-top: -20px;
  margin-bottom: -10px;
}
@media only screen and (max-width: 991px) {
}
@media only screen and (max-width: 600px) {
}
</style>
