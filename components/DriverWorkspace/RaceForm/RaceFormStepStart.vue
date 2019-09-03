<template>
  <div class="RaceFormStepStart" v-loading="loading">
    <Scaffold
      :title="title"
      :subtitle="subtitle"
      :percentage="percentage"
      :buttons="buttons"
      @close="$emit('close')"
    >
      <div>
        <Group :title="$t('forms.common.pqWarehouse')">
          <Select
            :title="form.pqWarehouseName"
            :placeholder="$t('forms.common.selectPqWarehouse')"
            @click="handlePQWarehouseClick"
          />
        </Group>

        <Group :title="$t('forms.queue.direction')">
          <el-radio-group
            :value="form.direction"
            @input="(direction) => { handleInput('direction', direction) }"
          >
            <el-radio :label="DIRECTIONS.UNLOADING">
              {{ $t('forms.queue.unloading') }}
            </el-radio>
            <el-radio :label="DIRECTIONS.LOADING">
              {{ $t('forms.queue.loading') }}
            </el-radio>
          </el-radio-group>
        </Group>

        <Group :title="$t('forms.common.certSerialNumber')">
          <el-form-item
            class="RaceFormStepStart__form-item RaceFormStepStart__form-item--no-label"
            prop="certSerialNumber"
            :show-message="false"
          >
            <el-input
              clearable
              :placeholder="$t('forms.common.certSerialNumberPlaceholder')"
              :maxlength="9"
              :value="form.certSerialNumber"
              @input="(certSerialNumber) => { handleInput('certSerialNumber', certSerialNumber) }"
            />
          </el-form-item>
        </Group>

        <Group :title="$t('forms.common.transport')">
          <div class="RaceFormStepStart__transport">
            <el-form-item
              class="RaceFormStepStart__form-item"
              prop="vehicleNumber"
              :label="$t('forms.common.truck')"
              :show-message="false"
            >
              <el-input
                clearable
                :placeholder="$t('forms.common.vNumberPlaceholder')"
                :minlength="7"
                :maxlength="8"
                :value="form.vehicleNumber"
                @input="(vehicleNumber) => { handleInput('vehicleNumber', vehicleNumber) }"
              />
            </el-form-item>

            <div class="RaceFormStepStart__transport__expander"/>

            <el-form-item
              class="RaceFormStepStart__form-item"
              prop="trailerNumber"
              :label="$t('forms.common.trailer')"
              :show-message="false"
            >
              <el-input
                clearable
                :placeholder="$t('forms.common.vNumberPlaceholder')"
                :minlength="7"
                :maxlength="8"
                :value="form.trailerNumber"
                @input="(trailerNumber) => { handleInput('trailerNumber', trailerNumber) }"
              />
            </el-form-item>
          </div>
        </Group>
      </div>
    </Scaffold>

    <SelectListPQWarehouses
      :title="$t('forms.common.pqWarehouses')"
      :visible.sync="visibleSelectListPQWarehouse"
      :search="searchSelectListPQWarehouse"
      :handler-search="handleSearchPQWarehouses"
      :items="listPQWarehouses"
      :loading="loading"
      @select="handleSelectPQWarehouse"
    />
  </div>
</template>

<script>
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormScaffold'
import Group from '@/components/DriverWorkspace/RaceForm/RaceFormGroup'
import Select from '@/components/DriverWorkspace/RaceForm/RaceFormSelect'
import SelectListPQWarehouses from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListPQWarehouses'

import { DIRECTIONS } from '@/utils/pq.queues'

export default {
  name: 'th-driver-workspace-race-form-start',

  components: {
    Scaffold,
    Group,
    Select,
    SelectListPQWarehouses,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    percentage: Number,
    buttons: Array,
    form: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    visibleSelectListPQWarehouse: false,
    searchSelectListPQWarehouse: null,
    listPQWarehouses: [],

    loading: false,
  }),

  methods: {
    handlePQWarehouseClick() {
      this.visibleSelectListPQWarehouse = true
    },

    handleInput(key, value) {
      this.$emit('change-form', { ...this.form, [key]: value })
    },

    async handleSearchPQWarehouses(value) {
      this.searchSelectListPQWarehouse = value
      await this.fetchPQWarehouses()
    },

    handleSelectPQWarehouse({ guid, name }) {
      this.visibleSelectListPQWarehouse = false
      this.$emit('change-form', {
        ...this.form,
        pqWarehouseGuid: guid,
        pqWarehouseName: name
      })
    },

    async fetchPQWarehouses() {
      this.loading = true
      const { status, items } = await this.$api.parkingQueueWarehouses.searchWarehouses(this.searchSelectListPQWarehouse)
      if (status) {
        this.listPQWarehouses = [ ...items ]
      }
      this.loading = false
    },
  },

  async created() {
    this.DIRECTIONS = DIRECTIONS

    await this.fetchPQWarehouses()
  },
}
</script>

<style lang='scss' scoped>
.RaceFormStepStart {
  &__transport {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__expander {
      width: 80px;
    }
  }

  &__form-item {
    margin-top: -10px;
    margin-bottom: 0px;

    &--no-label {
      margin-top: 0px;
    }
  }
}
</style>
