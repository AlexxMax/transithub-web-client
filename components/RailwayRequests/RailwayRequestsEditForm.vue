<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '40%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    :before-close="handleClose">

    <el-form
      ref="form"
      :model="railwayRequest"
      label-position="top"
      label-width="100px"
      size="mini"
      :rules="rules">

      <el-row :gutter="20">
        <el-col :xs="24" :md="12">
          <el-form-item :label="$t('forms.common.period')" prop="period">
            <el-date-picker
              class="RailwayRequestEditForm__item"
              v-model="railwayRequest.period"
              type="daterange"
              format="dd.MM.yyyy"
              :range-separator="$t('lists.filters.periodTo')"
              :start-placeholder="$t('lists.filters.periodStart')"
              :end-placeholder="$t('lists.filters.periodEnd')"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item :label="$t('forms.common.goods')">
            <el-select
              class="RailwayRequestEditForm__item"
              v-model="railwayRequest.goods"
              placeholder="Select">
              <el-option
                v-for="item in goods"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :md="24">
          <el-form-item
            ref="station"
            :label="$t('forms.common.stationFrom')"
            prop="station">
            <RailwayStationSelect
              ref="station-from"
              :init-value="station"
              @change="handleStationFromChange"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :md="12">
          <el-form-item :label="$t('forms.railwayRequest.wagonsType')">
            <el-select
              class="RailwayRequestEditForm__item"
              v-model="railwayRequest.wagonsType"
              placeholder="Select">
              <el-option
                v-for="item in railwayAffilations"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="12" :md="8">
          <el-form-item :label="$t('forms.railwayRequest.wagons')">
            <el-input-number
              class="RailwayRequestEditForm__item"
              v-model="railwayRequest.wagons"
              :min="1"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('forms.common.comment')">
            <el-input
              type="textarea"
              :rows="3"
              :placeholder="$t('forms.common.commentPlaceholder')"
              v-model="railwayRequest.comment">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <div slot="footer" class="RailwayRequestEditForm__footer">
      <Button type="primary" @click="handleConfirm">{{ buttonTitle }}</Button>
    </div>

  </el-dialog>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import RailwayStationSelect from '@/components/Common/Railway/RailwayStationSelect'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { VALIDATION_TRIGGER } from '@/utils/forms/constants'

const blankRailwayRequest = {
  guid: null,
  number: '',
  goods: null,
  station: null,
  wagonsType: null,
  wagons: 1,
  period: null,
  comment: ''
}

export default {
  name: 'th-railway-request-edit-form',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    Button,
    RailwayStationSelect
  },

  props: {
    creation: Boolean,
    parendId: [ Number, String ],
    dataIn: Object
  },

  data() {
    const validation = {
      period: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.common.validation.period')))
        }
        cb()
      },
      station: (rule, value, cb) => {
        if (!this.railwayRequest.station) {
          return cb(new Error(this.$t('forms.common.validation.stationFrom')))
        }
        cb()
      }
    }

    return {
      dialogVisible: false,

      railwayRequest: { ...blankRailwayRequest },

      station: null,

      pickerOptions: {
        firstDayOfWeek: 1
      },

      rules: {
        period: [{
          validator: validation.period,
          trigger: VALIDATION_TRIGGER
        }],
        station: [{
          validator: validation.station,
          trigger: VALIDATION_TRIGGER
        }]
      }
    }
  },

  computed: {
    title() {
      return this.creation
        ? this.$t('forms.railwayRequest.createPropositionDialog')
        : `${this.$t('forms.railwayRequest.editPropositionDialog')} №${this.railwayRequest.number}`
    },
    buttonTitle() {
      return this.creation
        ? this.$t('forms.common.create')
        : this.$t('forms.common.save')
    },
    goods() {
      return this.$store.state.goods.list.map(item => ({
        label: item.name,
        value: item.guid
      }))
    },
    railwayAffilations() {
      return this.$store.state.railwayAffilations.list.map(item => ({
        label: item.name,
        value: item.guid
      }))
    }
  },

  methods: {
    show() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$nextTick(async () => {
            this.$nuxt.$loading.start()

            let periodFrom = null, periodTo = null
            if (this.railwayRequest.period != null && this.railwayRequest.period.length > 0) {
              [ periodFrom, periodTo ] = this.railwayRequest.period
            }

            const payload = {
              createdAt: new Date().pFormatDateTime(),
              periodFrom: periodFrom.pFormatDate(),
              periodTo: periodTo.pFormatDate(),
              stationRWCode: this.railwayRequest.station,
              statusId: 2, // Actual
              companyGuid: this.$store.state.companies.currentCompany.guid,
              userGuid: this.$store.state.user.guid,
              wagons: this.railwayRequest.wagons,
              wagonsType: this.railwayRequest.wagonsType,
              goodsCode: this.railwayRequest.goods,
              parentId: this.parendId,
              comment: this.railwayRequest.comment
            }

            if (this.creation) {
              await this.$store.dispatch('railwayRequests/createRequest', payload)
            } else {
              await this.$store.dispatch('railwayRequests/changeRequest', {
                requestGuid: this.railwayRequest.guid,
                payload
              })
            }

            this.reset()
            this.dialogVisible = false

            this.$nuxt.$loading.finish()
          })
        }
      })
    },
    handleStationFromChange(value) {
      this.railwayRequest.station = value
      if (value) {
        this.$refs.station.clearValidate()
      }
    },
    reset() {
      this.railwayRequest = { ...blankRailwayRequest }

      if (this.goods.length > 0) {
        this.railwayRequest.goods = this.goods[0].value
      }

      if (this.railwayAffilations.length > 0) {
        this.railwayRequest.wagonsType = this.railwayAffilations[0].value
      }

      this.$refs['station-from'].reset()
    },
    init() {
      if (this.creation) {
        if (this.goods.length > 0) {
          this.railwayRequest.goods = this.goods[0].value
        }

        if (this.railwayAffilations.length > 0) {
          this.railwayRequest.wagonsType = this.railwayAffilations[0].value
        }
      } else {
        this.railwayRequest = {
          guid: this.dataIn.guid,
          number: this.dataIn.number || '',
          goods: this.dataIn.goodsGuid || (() => {
            if (this.goods.length > 0) {
            return this.goods[0].value
            }
            return null
          })(),
          station: this.dataIn.stationFromRWCode || null,
          wagonsType: this.dataIn.wagonsTypeGuid || (() => {
            if (this.railwayAffilations.length > 0) {
              return this.railwayAffilations[0].value
            }
            return null
          })(),
          wagons: this.dataIn.wagons || 1,
          period: [ (this.dataIn.periodFrom || '').pToDate(), (this.dataIn.periodTo || '').pToDate() ],
          comment: this.dataIn.comment || ''
        }

        try {
          this.$refs['station-from'].setValue(this.railwayRequest.station)
        } catch (e) {
          this.station = this.railwayRequest.station
        }
      }
    }
  },

  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.init()
      } else {
        this.reset()
      }
    }
  },

  async created() {
    await Promise.all([
      this.$store.dispatch('goods/load'),
      this.$store.dispatch('railwayAffilations/loadList')
    ])

    this.init()
  }
}
</script>

<style lang="scss" scoped>
.RailwayRequestEditForm__item {
  width: 100%;
}

.RailwayRequestEditForm__footer {
  text-align: center;
}
</style>
