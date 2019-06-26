<template>
  <el-dialog :visible.sync="dialogFormVisible" width="45%" :z-index="4000" append-to-body>
    <div class="OrganisationForm">
      <OrganisationAvatar class="OrganisationForm__avatar" :size="78" name="Kernel Green"/>

      <div class="OrganisationForm__organisation-name">
        <span>
          {{ organisation.fullname }}
        </span>
      </div>

      <div class="OrganisationForm__link-group">
        <div class="OrganisationForm__link-group-item">
          <fa style="margin-right: 7px; color: gray;" icon="globe"/>
          <a rel="noopener" target="_blank" :href="`//${organisation.webpage}`">{{ organisation.webpage }}</a>
        </div>
        <div class="OrganisationForm__link-group-item">
          <fa style="margin-right: 7px; color: gray;" :icon="['fab', 'telegram-plane']"/>
          <a rel="noopener" target="_blank" :href="`//t.me/${organisation.telegram}`">{{ organisation.telegram }}</a>
        </div>
        <div class="OrganisationForm__link-group-item">
          <fa style="margin-right: 7px; color: gray;" :icon="['fab', 'facebook-square']"/>
          <a rel="noopener" target="_blank" :href="`//facebook.com/${organisation.facebook}`">{{ organisation.facebook }}</a>
        </div>
      </div>

      <div class="OrganisationForm__items-group">

        <div class="OrganisationForm__row">
          <FormField
            class="margin-value"
            style="margin-right: 150px;"
            big-title
            :title="$t('forms.company.profile.shortname')"
            :value="organisation.shortname"
          />

          <FormField
            class="margin-value"
            big-title
            :title="$t('forms.company.profile.workname')"
            :value="organisation.workname"
          />
        </div>
        <hr>


        <FormField
          class="margin-value"
          big-title
          :title="$t('forms.company.common.organisationForm')"
          :value="organisation.organisationFormName"
        />
        <hr>


        <FormField
          class="margin-value"
          big-title
          :title="$t('forms.company.common.taxScheme')"
          :value="organisation.taxSchemeName"
        />
        <hr>

        <div class="OrganisationForm__row">
          <FormField
            class="margin-value"
            style="margin-right: 220px;"
            big-title
            :title="$t('forms.company.common.edrpou')"
            :value="organisation.edrpou"
          />
          <FormField
            class="margin-value"
            big-title
            :title="$t('forms.company.common.inn')"
            :value="organisation.inn"
          />
        </div>
      </div>
      <ButtonsGroup class="OrganisationForm__buttons-group">
        <Button
          append-to-body
          type
          faIcon="pen"
          edit
          round
          style="margin-right: 10px"
          @click="handleEditButton"
        >
          {{ $t('forms.common.edit') }}
        </Button>
      </ButtonsGroup>
    </div>
  </el-dialog>
</template>

<script>
import Group from "@/components/Common/FormElements/FormGroup";
import FormField from "@/components/Common/FormElements/FormField";
import OrganisationAvatar from "@/components/Organisations/OrganisationAvatar";
import Button from "@/components/Common/Buttons/Button";
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";

import {
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES
} from "@/utils/organisations";

export default {
  name: "th-organisation-dialog",

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    // Group,
    FormField,
    OrganisationAvatar,
    Button,
    ButtonsGroup
  },

  props: {
    organisation: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      dialogFormVisible: false,
      outerVisible: false,
      innerVisible: false,
      formLabelWidth: "120px",
    }
  },

  methods: {
    show() {
      this.dialogFormVisible = true
    },

    handleEditButton() {
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_ITEM}`, this.organisation)
      this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`,
        {
          show: true,
          type: EDIT_DIALOG_TYPES.EDIT
        }
      )

      this.dialogFormVisible = false
    }
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
    margin-bottom: 30px;
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
    margin-top: 20px;
  }
}
.margin-value {
  margin-top: -20px;
  margin-bottom: -10px;
}

hr {
  margin-top: 10px;
  margin-bottom: 30px;
  border: 0;
  border-top: 1px solid #eee;
}

@media only screen and (max-width: 700px) {
  .OrganisationForm {
    &__row {
      flex-direction: column;
    }
  }

  .margin-value {
    margin: {
      top: 0;
      bottom: 0;
    }
    padding: 0;
  }

  hr {
    margin-bottom: 10px;
  }
}
</style>
