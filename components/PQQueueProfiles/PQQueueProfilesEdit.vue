<template>
  <component
    :is="component"
    append-to-body
    :title="title"
    :visible.sync="visible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '50%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    :before-close="handleBeforeClose"
    :z-index="4000"
  >

    <div>
      <CommonSteps
        class="PQQueueProfileEditDialog__steps"
        :active="activeStep"
        :steps="steps"
      />

      <component
        :is="stepComponent"
        :form.sync="form"
        @cancel="handleBeforeClose"
        @next="handleClickNext"
        @prev="handleClickPrev"
        @submit="handleClickSubmit"
      />
    </div>

  </component>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import CommonSteps from '@/components/Common/CommonSteps'
import EmptyPlace from '@/components/Common/EmptyPlace'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import closeDialog from '@/mixins/closeDialog'
import * as notify from '@/utils/notifications'

import {
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES
} from "@/utils/pq.queueProfiles"

const EssentialStep = () => ({
  component: import(/* webpackChunkName: 'PQQueueProfilesEditEssential' */ '@/components/PQQueueProfiles/PQQueueProfilesEditEssential'),
  loading: EmptyPlace,
  error: EmptyPlace,
})

const PositionStep = () => ({
  component: import(/* webpackChunkName: 'PQQueueProfilesEditPosition' */ '@/components/PQQueueProfiles/PQQueueProfilesEditPosition'),
  loading: EmptyPlace,
  error: EmptyPlace,
})

const STEPS = {
  essential: 0,
  position: 1
}

const getBlankQueueProfile = store => {
  const creation = store.state[STORE_MODULE_NAME].editing.type === EDIT_DIALOG_TYPES.CREATE
  const item = creation ? null : store.state[STORE_MODULE_NAME].item
  return {
    guid: item ? item.guid : null,
    name: item ? item.name : '',
    description: item ? item.description : '',
    address: item ? item.fullAddress : '',
    fullAddress: item ? item.fullAddress : '',
    lat: item ? item.lat || 0 : 0,
    lng: item ? item.lng || 0 : 0,
    koatuu: item ? item.koatuu : '',
    region: item ? item.regionCode : '',
    district: item ? item.districtCode : '',
    building: item ? item.building : '',
    street: item ? item.street : '',
    radius: item ? item.registrationZoneRadius : 5000,
  }
}

export default {
  name: 'th-pq-queue-profiles-edit',

  mixins: [
    screen(SCREEN_TRIGGER_SIZES.element),
    closeDialog('form')
  ],

  components: {
    Button,
    CommonSteps,
  },

  props: {
    embed: Boolean
  },

  data() {
    return {
      form: getBlankQueueProfile(this.$store),

      activeStep: STEPS.essential,
    }
  },

  computed: {
    component() {
      return this.embed ? 'div' : 'el-dialog'
    },

    stepComponent() {
      return this.stepsComponents[this.activeStep]
    },

    visible: {
      get() {
        return this.$store.state[STORE_MODULE_NAME].editing.showEditDialog
      },
      set(value) {
        this.$store.commit(
          `${STORE_MODULE_NAME}/${
            MUTATIONS_KEYS.SHOW_EDIT_DIALOG
          }`,
          value
        );
      }
    },

    title() {
      return this.form.guid
        ? this.$t("forms.pqQueueProfiles.pattern.editParkingDialog")
        : this.$t("forms.pqQueueProfiles.pattern.createParkingDialog")
    },

    creation() {
      return this.$store.state[STORE_MODULE_NAME].editing.type === EDIT_DIALOG_TYPES.CREATE
    },
  },

  methods: {
    handleBeforeClose() {
      this.$_closeDialogMixin_handleBeforeDialogClose(() => {
        this.visible = false
      })
    },

    reset() {
      this.form = getBlankQueueProfile(this.$store)
      this.activeStep = STEPS.essential

      this.$_closeDialogMixin_reset()
    },

    handleClickNext() {
      this.activeStep += 1
    },

    handleClickPrev() {
      this.activeStep -= 1
    },

    formatPayload() {
      return {
        ...this.form,
        registrationZoneRadius: this.form.radius,
        companyGuid: this.$store.state.companies.currentCompany.guid,
        authorUserGuid: this.$store.state.user.guid,
      }
    },

    async handleClickSubmit() {
      let errorKey

      if (this.creation) {
        errorKey = await this.$store.dispatch(
          `${STORE_MODULE_NAME}/${ACTIONS_KEYS.CREATE_ITEM}`,
          this.formatPayload()
        )
      } else {
        errorKey = await this.$store.dispatch(
          `${STORE_MODULE_NAME}/${ACTIONS_KEYS.CHANGE_ITEM}`,
          { guid: this.form.guid, payload: this.formatPayload() }
        )
      }

      this.visible = false
    }
  },

  watch: {
    visible(value) {
      if (value) {
        this.reset()
      }
    }
  },

  created() {
    this.steps = [
      {
        icon: 'home',
        text: this.$t('forms.common.essential'),
      },
      {
        icon: 'map',
        text: this.$t('forms.common.location'),
      }
    ]

    this.stepsComponents = {
      [STEPS.essential]: EssentialStep,
      [STEPS.position]: PositionStep,
    }
  },
}
</script>

<style lang="scss" scoped>
.PQQueueProfileEditDialog {
  &__steps {
    margin: 0 auto 40px;
  }
}
</style>
