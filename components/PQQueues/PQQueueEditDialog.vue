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
                  <el-form-item :label="$t('forms.queue.name')" prop="name">
                    <el-input
                      v-model="queue.name"
                      :placeholder="$t('forms.queue.name')"
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
                      :placeholder="$t('forms.queue.loading')"
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
                      :placeholder="$t('forms.queue.low')"
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
                      :placeholder="$t('forms.queue.mound')"
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
                    prop="organisation"
                  >
                    <OrganisationSelect
                      ref="organisation-select"
                      :organisation.sync="queue.organisationGuid"
                      @mounted-change="handleOrganisationCreatedSelect"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24">
                  <el-form-item
                    :label="$t('forms.common.pqWarehouse')"
                    prop="warehouse"
                  >
                    <PQWarehouseSelect
                      ref="warehouse-select"
                      :warehouse.sync="queue.warehouseGuid"
                      @mounted-change="handleWarehouseCreatedSelect"
                    />
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
import PQWarehouseSelect from '@/components/PQWarehouses/PQWarehouseSelect'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import closeDialog from '@/mixins/closeDialog'

import {
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES,
  DIRECTIONS,
  PRIORITIES,
  LOADING_TYPES,
} from "@/utils/pq.queues"

import {
  VALIDATION_TRIGGER
} from "@/utils/constants"

import * as notify from '@/utils/notifications'
import { getErrorMessage } from "@/utils/errors"

const getBlankPQQueue = store => {
  const creation =
    store.state[STORE_MODULE_NAME].editing.type === EDIT_DIALOG_TYPES.CREATE

  const pqQueueStoreItem = { ...store.state.pqQueues.item }

  return pqQueueStoreItem.guid && !creation
    ? pqQueueStoreItem
    : {
        name: '',
        direction: DIRECTIONS.LOADING,
        priority: PRIORITIES.LOW,
        loadingType: LOADING_TYPES.MOUND,
        outputRatio: 1,
        organisationGuid: '',
        warehouseGuid: ''
      }
}

export default {
  name: "th-pq-queue-edit-dialog",

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element), closeDialog('queue') ],

  components: {
    Button,
    Fade,
    OrganisationSelect,
    PQWarehouseSelect
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
      }
    }
  },

  computed: {
    currentRules() {
      const rules = { ...this.rules }
      return rules
    },

    pqDirections() {
      return [{
        value: DIRECTIONS.LOADING,
        label: this.$t('forms.queue.loading'),
      },{
        value: DIRECTIONS.UNLOADING,
        label: this.$t('forms.queue.unloading'),
      }]
    },

    pqPriorities() {
      return [{
        value: PRIORITIES.LOW,
        label: this.$t('forms.queue.low'),
      },{
        value: PRIORITIES.MEDIUM,
        label: this.$t('forms.queue.medium'),
      },{
        value: PRIORITIES.HIGH,
        label: this.$t('forms.queue.high'),
      }]
    },

    pqLoadingTypes() {
      return [{
        value: LOADING_TYPES.MOUND,
        label: this.$t('forms.queue.mound'),
      },{
        value: LOADING_TYPES.POURING,
        label: this.$t('forms.queue.pouring'),
      }]
    },

    dialogVisible: {
      get() {
        return this.$store.state[STORE_MODULE_NAME].editing.showEditDialog
      },
      set(value) {
        this.$store.commit(
          `${STORE_MODULE_NAME}/${
            MUTATIONS_KEYS.SHOW_EDIT_DIALOG
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
      return this.$store.state[STORE_MODULE_NAME].loading
    }
  },

  methods: {
    // handleOrganisationSelect(value) {
    //   this.queue.organisationGuid = value
    // },

    handleOrganisationCreatedSelect(value) {
      //this.queue.organisationGuid = value
      this.$_closeDialogMixin_reset()
    },

    handleWarehouseCreatedSelect(value) {
      this.$_closeDialogMixin_reset()
    },

    async submit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          if (this.queue.guid) {
            await this.changePQQueue()
          } else {
            await this.createPQQueue()
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
        companyGuid: this.$store. state.companies.currentCompany.guid
      }
    },

    async createPQQueue() {
      const errorKey = await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.CREATE_ITEM}`,
        this.generatePayload()
      )
      if (errorKey) {
        notify.error(getErrorMessage(this, errorKey));
      } else {
        this.dialogVisible = false
      }
    },

    async changePQQueue() {
      const errorKey = await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.CHANGE_ITEM}`, {
        guid: this.queue.guid,
        payload: this.generatePayload()
      })
      if (errorKey) {
        notify.error(getErrorMessage(this, errorKey));
      } else {
        this.dialogVisible = false
      }
    },

    handleBeforeClose() {
      this.$_closeDialogMixin_handleBeforeDialogClose(() => {
        this.dialogVisible = false
      })
    },

    reset() {
      this.clearValidate()
      this.queue = getBlankPQQueue(this.$store)

      const organisationSelect = this.$refs['organisation-select']
      if (organisationSelect && !this.queue.organisationGuid) {
        this.queue.organisationGuid = organisationSelect.getValue()
      }

      const warehouseSelect = this.$refs['warehouse-select']
      if (warehouseSelect && !this.queue.warehouseGuid) {
        this.queue.warehouseGuid = warehouseSelect.getValue()
      }

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

