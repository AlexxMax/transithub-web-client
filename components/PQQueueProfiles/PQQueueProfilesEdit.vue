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

      <!-- <pre>{{ form }}</pre> -->

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

import EventBus from '@/utils/eventBus'


import {
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES
} from "@/utils/pq.queueProfiles"

import {
  QUEUE_PROFILES_STORE_MODULE_NAME,
  QUEUE_PROFILES_MUTATIONS_KEYS,
  QUEUE_PROFILES_ACTIONS_KEYS
} from "@/utils/pq.parkings"

const EssentialStep = () => ({
  component: import(/* webpackChunkName: 'PQQueueProfilesEditEssential' */ '@/components/PQQueueProfiles/PQQueueProfilesEditEssential'),
  loading: EmptyPlace,
  error: EmptyPlace
})

const AddressStep = () => ({
  component: import(/* webpackChunkName: 'PQQueueProfilesEditAddress' */ '@/components/PQQueueProfiles/PQQueueProfilesEditAddress'),
  loading: EmptyPlace,
  error: EmptyPlace
})

const MapStep = () => ({
  component: import('@/components/PQQueueProfiles/PQQueueProfilesEditMap'),
  loading: EmptyPlace,
  error: EmptyPlace
})

const STEPS = {
  essential: 0,
  address: 1,
  map: 2
}

const getBlankQueueProfile = store => {
  const creation = store.state[STORE_MODULE_NAME].editing.type === EDIT_DIALOG_TYPES.CREATE
  const item = creation ? null : store.state[STORE_MODULE_NAME].item
  return {
    guid: item ? item.guid : null,
    name: item ? item.name : '',
    description: item ? item.description : '',
    fullAddress: item ? item.fullAddress : '',
    lat: item ? item.lat : '',
    lng: item ? item.lng : '',
    koatuu: item ? item.koatuu : '',
    building: item ? item.building : '',
    street: item ? item.street : '',
    radius: item ? item.registrationZoneRadius : 5000,

    isFullAddressModified: false
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
      isBindListQueueProfiles: false
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
    }
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

      if (this.creation && this.isBindListQueueProfiles) {
        errorKey = await this.$store.dispatch(
          `${QUEUE_PROFILES_STORE_MODULE_NAME}/${QUEUE_PROFILES_ACTIONS_KEYS.CREATE_ITEM}`,
          this.formatPayload()
        )
      } 
      else if (this.creation && !this.isBindListQueueProfiles) {
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

      this.isBindListQueueProfiles = false
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
      { icon: 'home', text: this.$t('forms.common.essential') },
      { icon: 'map', text: this.$t('forms.common.address') },
      { icon: 'map-marker-alt', text: this.$t('forms.common.location') }
    ]

    this.stepsComponents = {
      [STEPS.essential]: EssentialStep,
      [STEPS.address]: AddressStep,
      [STEPS.map]: MapStep,
    },

    EventBus.$on('createQueueProfileClicked', (isBindListQueueProfiles) => {
      this.isBindListQueueProfiles = isBindListQueueProfiles;
    })
  }
}
</script>

<style lang="scss" scoped>
.PQQueueProfileEditDialog {
  &__steps {
    margin: 0 auto 40px;
  }
}
</style>
