<template>
  <el-dialog
    append-to-body
    :title="title"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '50%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    :before-close="handleBeforeClose"
    :z-index="4000"
  >
    <div class="PQQueueEditForm">
      <el-form
        ref="form"
        :model="queue"
        label-position="top"
        label-width="100px"
        size="mini"
        :validate-on-rule-change="false"
        :rules="currentRules"
      >
        <div>
          <Fade>
            <div>
              <el-row :gutter="20">
                <el-col :xs="24">
                  <el-form-item :label="$t('forms.queue.pqName')" prop="name">
                    <el-input
                      v-model="queue.name"
                      :placeholder="$t('forms.queue.pqName')"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24" :md="12">
                  <el-form-item :label="$t('forms.queue.direction')" prop="direction">
                    <el-select
                      style="width: 100%;"
                      v-model="queue.direction"
                      :placeholder="$t('forms.queue.pqLoading')"
                      filterable
                      default-first-option
                    >
                      <el-option
                        v-for="direction in pqDirections"
                        :key="direction.value"
                        :label="direction.label"
                        :value="direction.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :md="12">
                  <el-form-item :label="$t('forms.queue.priority')" prop="priority">
                    <el-select
                      style="width: 100%;"
                      v-model="queue.priority"
                      :placeholder="$t('forms.queue.pqLow')"
                      filterable
                      default-first-option
                    >
                      <el-option
                        v-for="priority in pqPriorities"
                        :key="priority.value"
                        :label="priority.label"
                        :value="priority.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24" :md="12">
                  <el-form-item :label="$t('forms.queue.loadingType')" prop="loadingType">
                    <el-select
                      style="width: 100%;"
                      v-model="queue.loadingType"
                      :placeholder="$t('forms.queue.pqMound')"
                      filterable
                      default-first-option
                    >
                      <el-option
                        v-for="loadingType in pqLoadingTypes"
                        :key="loadingType.value"
                        :label="loadingType.label"
                        :value="loadingType.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :md="12">
                  <el-form-item 
                    :label="$t('forms.queue.entryRatio')" 
                    prop="outputRatio"
                    :min="1"
                    :max="99"
                  >
                    <el-input-number
                      v-model="queue.outputRatio"
                      :placeholder="$t('forms.queue.entryRatiolaceholder')"
                      :min="1"
                      :step="1"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24">
                  <el-form-item 
                    :label="$t('forms.organisation.organisation')"
                    prop="organisationNme"
                  >
                    <OrganisationSelect @change="handleOrganisationSelect"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </Fade>
        </div>
      </el-form>

      <div class="PQQueueEditForm__footer">
        <Button
          round
          type=""
          :disabled="disabledButtons"
          @click="discard"
        >
          {{ $t('forms.common.discard') }}
        </Button>

        <Button 
          round
          type="primary"
          :loading="loading"
          @click="submit"
        >
          {{ mainBtnLabel }}
        </Button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import Fade from '@/components/Common/Transitions/Fade'
import OrganisationSelect from "@/components/Organisations/OrganisationSelect"

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import closeDialog from '@/mixins/closeDialog'

import {
  STORE_MODULE_NAME as QUEUES_STORE_MODULE_NAME,
  MUTATIONS_KEYS as QUEUES_MUTATIONS_KEYS,
  ACTIONS_KEYS as QUEUES_ACTIONS_KEYS,
  EDIT_DIALOG_TYPES,
  DIRECTIONS as QUEUES_DIRECTIONS,
  PRIORITIES as QUEUES_PRIORITIES,
  LOADING_TYPES as QUEUES_LOADING_TYPES,
} from "@/utils/pq.queues"

import {
  VALIDATION_TRIGGER
} from "@/utils/constants"

import * as notify from '@/utils/notifications'
import { getErrorMessage } from "@/utils/errors"

const getBlankPQQueue = store => {
  const creation =
    store.state[QUEUES_STORE_MODULE_NAME].editing.type === EDIT_DIALOG_TYPES.CREATE

  const pqQueueStoreItem = { ...store.state.pqQueues.item }

  return pqQueueStoreItem.guid && !creation
    ? pqQueueStoreItem
    : {
        name: '',
        direction: '',
        priority: '',
        loadingType: '',
        outputRatio: '',
        //organisationName: ''
      }
}

export default {
  name: "th-pq-queue-edit-dialog",

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element), closeDialog('queue') ],

  components: {
    Button,
    Fade,
    // FromGroup,
    // CompanySelect
    OrganisationSelect
  },

  props: {
    disabledButtons: Boolean
  },

  data() {
    const validation = {
      name: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.pqName")));
        } 
        cb()
      },

      direction: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.pqDirection")));
        } 
        cb()
      },

      priority: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.pqPriority")));
        } 
        cb()
      },
      
      loadingType: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.pqLoadingType")));
        } 
        cb()
      },

      outputRatio: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.pqEntryRatio")));
        } 
        cb()
      }
    }
    
    return {
      queue: getBlankPQQueue(this.$store),
      pqDirectionsModel: null,
      pqPrioritiesModel: null,
      pqLoadingTypesModel: null,

      rules: {
        name: [
          {
            validator: validation.name,
            trigger: VALIDATION_TRIGGER,
            required: true
          }
        ],

        direction: [
          {
            validator: validation.direction,
            trigger: VALIDATION_TRIGGER,
            required: true
          }
        ],

        priority: [
          {
            validator: validation.priority,
            trigger: VALIDATION_TRIGGER,
            required: true
          }
        ],

        loadingType: [
          {
            validator: validation.loadingType,
            trigger: VALIDATION_TRIGGER,
            required: true
          }
        ],

        outputRatio: [
          {
            validator: validation.outputRatio,
            trigger: VALIDATION_TRIGGER,
            required: true
          }
        ]
      },

      loadingChange: false
    }
  },

  computed: {
    currentRules() {
      const rules = { ...this.rules }
      return rules
    },

    pqDirections() {
      return [{
        value: QUEUES_DIRECTIONS.LOADING,
        label: this.$t('forms.queue.pqLoading'),
      },{
        value: QUEUES_DIRECTIONS.UNLOADING,
        label: this.$t('forms.queue.pqUnloading'),
      }]
    },

    pqPriorities() {
      return [{
        value: QUEUES_PRIORITIES.LOW,
        label: this.$t('forms.queue.pqLow'),
      },{
        value: QUEUES_PRIORITIES.MEDIUM,
        label: this.$t('forms.queue.pqMenium'),
      },{
        value: QUEUES_PRIORITIES.HIGH,
        label: this.$t('forms.queue.pqHigh'),
      }]
    },

    pqLoadingTypes() {
      return [{
        value: QUEUES_LOADING_TYPES.MOUND,
        label: this.$t('forms.queue.pqMound'),
      },{
        value: QUEUES_LOADING_TYPES.POURING,
        label: this.$t('forms.queue.pqPouring'),
      }]
    },

    dialogVisible: {
      get() {
        return this.$store.state[QUEUES_STORE_MODULE_NAME].editing.showEditDialog
      },
      set(value) {
        this.$store.commit(
          `${QUEUES_STORE_MODULE_NAME}/${
            QUEUES_MUTATIONS_KEYS.SHOW_EDIT_DIALOG
          }`,
          value
        )
      }
    },

    title() {
      return this.queue.guid
        ? this.$t("forms.queue.editQueueDialog")
        : this.$t("forms.queue.createQueueDialog")
    },

    mainBtnLabel() {
      if (this.queue.guid) {
        return this.$t("forms.common.save");
      } else {
        return this.$t("forms.common.create");
      }
    },

    loading() {
      return this.$store.state[QUEUES_STORE_MODULE_NAME].loading || this.loadingChange
    }
  },

  methods: {
    handleOrganisationSelect(value) {
      this.parking.organisationGuid = value
      this.$_closeDialogMixin_reset()
    },

    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.queue.guid) {
            this.changePQQueue()
          } else {
            this.createPQQueue()
          }
        } else {
          return false
        }
      })
    },

    discard() {
      return this.handleBeforeClose()
    },

    clearValidate() {
      if (this.$refs["form"]) {
        this.$refs["form"].clearValidate()
      }
    },

    generatePayload() {
      return {
        ...this.queue,
        //companyGuid: this.$store. state.companies.currentCompany.guid
      }
      // const {
      //   ...queueData
      // } = this.queue
      // let payload = { ...queueData }
      // // const payload = { ...this.queue }
      // return payload
    },

    async createPQQueue() {
      const errorKey = await this.$store.dispatch(`${QUEUES_STORE_MODULE_NAME}/${QUEUES_ACTIONS_KEYS.CREATE_ITEM}`, {
        //companyGuid: this.$store.state.companies.currentCompany.guid,
        payload: this.generatePayload()
      })
      if (errorKey) {
        notify.error(getErrorMessage(this, errorKey));
      } else {
        this.dialogVisible = false
      }
    },

    async changePQQueue() {
      this.loadingChange = true

      const errorKey = await this.$store.dispatch(`${QUEUES_STORE_MODULE_NAME}/${QUEUES_ACTIONS_KEYS.CHANGE_ITEM}`, {
        queueGuid: this.queue.guid,
        payload: this.generatePayload()
      })
      if (errorKey) {
        notify.error(getErrorMessage(this, errorKey));
      } else {
        this.dialogVisible = false
      }

      this.loadingChange = false
    },

    handleBeforeClose() {
      this.$_closeDialogMixin_handleBeforeDialogClose(() => {
        this.dialogVisible = false
      })
    },

    reset() {
      this.queue = getBlankPQQueue(this.$store)
      this.clearValidate()
      this.$_closeDialogMixin_reset()
    }
  },

  watch: {
    async dialogVisible() {
      if (this.dialogVisible) {
        this.reset()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.PQQueueEditForm {
  &__alert {
    margin-bottom: 20px;
  }

  &__input {
    &-number {
      width: 100%;
    }
  }

  &__footer {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    *:not(:first-child) {
      padding: 0 40px;
    }
  }
}
</style>

