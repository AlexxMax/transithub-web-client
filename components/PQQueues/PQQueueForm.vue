<template>
  <Form no-header>

    <div slot="side-nav">
      <FormSideNav :title="$t('forms.queue.queue')">
        <div>

          <div class="PQQueueForm__sidenav">
            <div class="PQQueueForm__sidenav__item">
              <fa class="PQQueueForm__sidenav__item__icon" icon="user-friends"/>
              <span class="PQQueueForm__sidenav__item__name">{{ queue.name }}</span>
            </div>

            <div class="PQQueueForm__sidenav__item" style="margin-top: 30px;">
              <span>{{ `${$t('forms.queue.belongingToWarehouse')}` }}</span>
            </div>

            <div class="PQQueueForm__sidenav__item" style="margin-top: 10px;">
              <fa 
                class="PQQueueForm__sidenav__item__icon"
                style="font-size: 14px;"
                icon="warehouse"
              />

              <nuxt-link
                class="PQQueueForm__sidenav__item__link"
                v-if="queue.warehouseName"
                :to="$i18n.path(`workspace/pq-warehouses/${queue.warehouseGuid}`)"
              >
                <span>{{ queue.warehouseName }}</span>
              </nuxt-link>
            </div>

            <OrganisationWidget
              style="margin-top: 40px"
              :name="queue.organisationName"
            />

            <!-- <div class="PQQueueForm__sidenav__item" style="margin-top: 10px;">
              <Organisation :name="queue.organisationName" @change="handleOrganisationSelect" />
            </div> -->
          </div>
        </div>
      </FormSideNav>
    </div>

    <div slot="content">
      <Segment style="min-height: calc(100vh - 110px)">
        <div class="PQQueueForm__form">

          <div class="PQQueueForm__form-main-group">
            <Group class="PQQueueForm__form__top-group" :title="$t('forms.common.mainParams')" big-title>
              <div class="PQQueueForm__form__row">
                <FormField
                  :title="$t('forms.queue.direction')"
                  :value="loadingDirection"
                />

                <FormField
                  :title="$t('forms.queue.priority')"
                  :value="loadingPriority"
                />

                <FormField
                  :title="$t('forms.queue.loadingType')"
                  :value="loadingType"
                />

                <FormField
                  :title="$t('forms.queue.entryRatio')"
                  :value="queue.outputRatio"
                />
              </div>
            </Group>

            <div class="PQQueueForm__toolbar">
              <ButtonsGroup>
                <!-- <ButtonAddToBookmarks
                  v-if="!$_smallDeviceMixin_isDeviceSmall"
                  :currentlyInBookmarks="vehicle.isFavorite"
                  :handle-click="handleAddToBookmarksButton"
                /> -->

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

                  <!-- <ButtonAddToBookmarks
                    :style="{ 'margin-left': 0 }"
                    flat
                    :currentlyInBookmarks="vehicle.isFavorite"
                    :handle-click="handleAddToBookmarksButton"
                  /> -->
                </MainMenu>
              </ButtonsGroup>
            </div>
          </div>
        </div>
      </Segment>
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
import FormSideNav from '@/components/Common/FormElements/FormSideNav'
import MainMenu from '@/components/Common/FormElements/FormMainMenu'
import OrganisationWidget from '@/components/Organisations/OrganisationWidget'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

import { 
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES,
  DIRECTIONS,
  PRIORITIES,
  LOADING_TYPES
} from '@/utils/pq.queues'

export default {
  name: 'th-pq-queue-form',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    Form,
    ButtonsGroup,
    Button,
    Segment,
    Group,
    FormField,
    FormSideNav,
    MainMenu,
    OrganisationWidget
  },

  props: {
    // queue: {
    //   type: Object,
    //   required: true
    // },

    visible: Boolean,
  },

  computed: {
    queue() {
      return this.$store.state.pqQueues.item
    },

    loadingDirection() {
      const queueDirection = this.queue.direction
      if (queueDirection === DIRECTIONS.UNLOADING)
        return this.$t('forms.queue.unloading')
      else 
        return this.$t('forms.queue.loading')
      
      return queueDirection
    },

    loadingPriority() {
      const queueLoadingPriority = this.queue.priority
      if (queueLoadingPriority === PRIORITIES.LOW)
        return this.$t('forms.queue.low')
      else if (queueLoadingPriority === PRIORITIES.MEDIUM)
        return this.$t('forms.queue.medium')
      else 
        return this.$t('forms.queue.high')

      return queueLoadingPriority
    },

    loadingType() {
      const queueLoadingType = this.queue.loadingType
      if (queueLoadingType === LOADING_TYPES.MOUND)
        return this.$t('forms.queue.mound')
      else
        return this.$t('forms.queue.pouring')

      return queueLoadingType
    }
  },

  methods: {
    handleOrganisationSelect(organisationGuid) {
      this.queue.organisationGuid;
    },

    handleEditButton() {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: EDIT_DIALOG_TYPES.EDIT
      })
    },

    show() {
      this.visible = true
    }
  },

  beforeRouteLeave() {
    this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.CLEAR_ITEM}`)
  }
}
</script>

<style lang='scss' scoped>
.PQQueueForm {
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
  }

  &__sidenav {
    //margin-top: 25px;
    color: #606266;

    &__item {
      display: flex;
      flex-direction: row;

      &:not(:first-child) {
        margin-top: 20px;
      }

      & *:not(:first-child) {
        margin-left: 10px;
      }

      &__icon {
        width: 20px;
        font-size: initial;
      }

      &__name {
        font-weight: 500;
      }

      &__link {
        color: #606266;
        text-decoration: underline;
        font-weight: 500;
        transition: .3s ease;
        
        &:hover {
          color: #FFC854;
        }
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
  .PQQueueForm {
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
  .PQQueueForm {
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
