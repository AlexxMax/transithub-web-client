<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '50%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    :before-close="handleClose">

    <el-form
      ref="form"
      :model="railwayAggregation"
      label-position="top"
      label-width="100px"
      size="mini"
      :rules="rules">

      <el-row :gutter="20">
        <el-col :xs="24" :md="12">
          <el-form-item
            ref="station-from"
            :label="$t('forms.common.stationFrom')"
            prop="stationFrom">
            <RailwayStationSelect
              ref="station-from-select"
              :init-value="stationFrom"
              @change="handleStationFromChange"/>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item
            ref="station-to"
            :label="$t('forms.common.stationTo')"
            prop="stationTo">
            <RailwayStationSelect
              ref="station-to-select"
              no-fetch
              :init-value="stationTo"
              @change="handleStationToChange"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :md="12">
          <el-form-item
            :label="$t('forms.common.stationMiddle')">
            <el-input
              readonly
              :value="stationMiddleFullname"
            />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item
            v-loading="loadingRailwayAffilations"
            :label="$t('forms.common.polygon')">
            <el-input
              readonly
              :value="railwayAggregation.polygonNumber == 0 ? '' : railwayAggregation.polygonNumber"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :md="12">
          <el-form-item
            v-loading="loadingRailwayAffilations"
            :label="$t('forms.common.wagons')">
            <el-select
              class="RailwayAggregationEditForm__item"
              v-model="wagonsTypeModel"
              placeholder="Select"
              @change="handleAffilationSelect">
              <el-option
                v-for="item in railwayAffilations"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item
            v-loading="loadingGoods"
            :label="$t('forms.common.goods')">
            <el-select
              class="RailwayAggregationEditForm__item"
              v-model="railwayAggregation.goods"
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
        <el-col :xs="24" :md="12">
          <el-form-item :label="$t('forms.common.shipmentPeriod')" prop="period">
            <el-date-picker
              class="RailwayAggregationEditForm__item"
              v-model="railwayAggregation.period"
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
          <el-form-item :label="`${$t('forms.common.loadingRate')}, ${$t('forms.common.loadingRatePtc')}`">
            <el-input-number
              class="RailwayAggregationEditForm__item"
              v-model="railwayAggregation.loadingRate"
              :min="1"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :md="12">
          <el-form-item :label="$t('forms.railwayAggregator.wagonsInRoute')">
            <el-input-number
              class="RailwayAggregationEditForm__item"
              v-model="railwayAggregation.wagonsInRoute"
              :min="1"/>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item :label="$t('forms.railwayAggregator.wagonsAggregator')">
            <el-input-number
              class="RailwayAggregationEditForm__item"
              v-model="railwayAggregation.wagonsAggregator"
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
              v-model="railwayAggregation.comment">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div style="margin-top: 20px"></div>

      <el-row :gutter="20">
        <el-col :xs="24" :md="8">
          <el-form-item :label="$t('forms.common.representative')" prop="userName">
            <el-input
              type='text'
              v-model="railwayAggregation.userName"
              :placeholder="$t('forms.common.representative')">
              <fa class="input-internal-icon" icon="user" slot="prefix" />
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="8"
          :class="{ 'RailwayAggregationEditForm__contacts':  !$_smallDeviceMixin_isDeviceSmall}">
          <el-form-item prop="userEmail">
            <el-input
              :class="{
                'RailwayAggregationEditForm__contact-input-margin': !$_smallDeviceMixin_isDeviceSmall,
              }"
              type='email'
              v-model="railwayAggregation.userEmail"
              :placeholder="$t('forms.common.email')">
              <fa class="input-internal-icon" icon="envelope" slot="prefix" />
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="8"
          :class="{ 'RailwayAggregationEditForm__contacts':  !$_smallDeviceMixin_isDeviceSmall}">
          <el-form-item prop="userPhone">
            <el-input
              :class="{ 'RailwayAggregationEditForm__contact-input-margin': !$_smallDeviceMixin_isDeviceSmall }"
              type='text'
              v-mask="phoneMask"
              v-model="railwayAggregation.userPhone"
              :placeholder="$t('forms.common.phone')">
              <fa class="input-internal-icon" icon="phone" slot="prefix" />
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :md="24">
          <el-form-item :label="$t('forms.common.companyInitiator')">
            <CompanySelect ref="company-select" :init-value="companyGuid"/>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <div slot="footer" class="RailwayAggregationEditForm__footer">
      <Button round type="primary" @click="handleConfirm">{{ buttonTitle }}</Button>
    </div>

  </el-dialog>
</template>

<script>
import RailwayStationSelect from '@/components/Common/Railway/RailwayStationSelect'
import Button from '@/components/Common/Buttons/Button'
import CompanySelect from '@/components/Companies/CompanySelect'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { VALIDATION_TRIGGER, PHONE_MASK } from '@/utils/constants'
import datetime, { onlyCurrentDateSelector } from '@/utils/datetime'

const getBlankRailwayAggregation = store => ({
  period: null,
  stationFrom: null,
  stationTo: null,
  polygonName: null,
  polygonRWCode: null,
  polygonNumber: null,
  goods: null,
  wagonsType: null,
  wagonsInRoute: 54,
  wagonsAggregator: 1,
  loadingRate: 1,
  comment: '',
  userPhone: (store.state.user.phone || '').pMaskPhone(),
  userEmail: store.state.user.email || '',
  userName: store.getters['user/username']
})

export default {
  name: 'th-railway-aggregation-edit-form',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    RailwayStationSelect,
    Button,
    CompanySelect
  },

  props: {
    creation: Boolean,
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
      stationFrom: (rule, value, cb) => {
        if (!this.railwayAggregation.stationFrom) {
          return cb(new Error(this.$t('forms.common.validation.stationFrom')))
        }
        cb()
      },
      stationTo: (rule, value, cb) => {
        if (!this.railwayAggregation.stationTo) {
          return cb(new Error(this.$t('forms.common.validation.stationTo')))
        }
        cb()
      },
      userName: (rule, value, cb) => {
        if (!this.railwayAggregation.userName) {
          return cb(new Error(this.$t('forms.common.validation.representative')))
        }
        cb()
      },
      userPhone: (rule, value, cb) => {
        if (!this.railwayAggregation.userPhone) {
          return cb(new Error(this.$t('forms.common.validation.phone')))
        }
        cb()
      },
      userEmail: (rule, value, cb) => {
        if (!this.railwayAggregation.userEmail) {
          return cb(new Error(this.$t('forms.common.validation.email')))
        }
        cb()
      }
    }

    return {
      dialogVisible: false,
      railwayAggregation: getBlankRailwayAggregation(this.$store),

      stationFrom: null,
      stationFromIsRouteStation: false,
      // stationMiddle: { name: '', rwCode: '' },
      // stationPolygon: null,
      stationTo: null,

      phoneMask: PHONE_MASK,

      wagonsTypeModel: null,

      pickerOptions: datetime(onlyCurrentDateSelector),

      rules: {
        period: [{
          validator: validation.period,
          trigger: VALIDATION_TRIGGER
        }],
        stationFrom: [{
          validator: validation.stationFrom,
          trigger: VALIDATION_TRIGGER
        }],
        stationTo: [{
          validator: validation.stationTo,
          trigger: VALIDATION_TRIGGER
        }],
        userName: [{
          validator: validation.userName,
          trigger: VALIDATION_TRIGGER
        }],
        userPhone: [{
          validator: validation.userPhone,
          trigger: VALIDATION_TRIGGER
        }],
        userEmail: [{
          validator: validation.userEmail,
          trigger: VALIDATION_TRIGGER
        }, {
          type: 'email',
          message: this.$t('forms.user.validation.incorrectEmail'),
          trigger: ['blur', 'change']
        }]
      }
    }
  },

  computed: {
    title() {
      return this.creation
        ? this.$t('forms.railwayAggregator.createAggregationDialog')
        : `${this.$t('forms.railwayAggregator.editAggregationDialog')} №${this.railwayAggregation.number}`
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
        value: item.guid,
        notForRoute: item.notForRoute
      }))
    },
    loadingGoods() {
      return this.$store.state.goods.loading
    },
    loadingRailwayAffilations() {
      return this.$store.state.railwayAffilations.loading
    },
    companyGuid() {
      if (this.dataIn) {
        return this.dataIn.companyGuid
      }
      return null
    },
    stationMiddleFullname() {
      let fullname = ''
      if (this.railwayAggregation.polygonName) {
        fullname = this.railwayAggregation.polygonName
        if (this.railwayAggregation.polygonRWCode) {
          fullname = `${fullname} (${this.railwayAggregation.polygonRWCode})`
        }
      }
      return fullname
    }
  },

  methods: {
    show() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    initWagonsType() {
      this.railwayAggregation.wagonsType = this.parentWagonsType
        ? this.parentWagonsType
        : (this.railwayAffilations.length > 0
          ? this.railwayAffilations[1].value
          : null)
      this.wagonsTypeModel = this.railwayAggregation.wagonsType
    },
    handleAffilationSelect(affilationGuid) {
      const affilation = this.railwayAffilations.find(item => item.value === affilationGuid)
      if (affilation && affilation.notForRoute && this.stationFromIsRouteStation) {
        this.$confirm(this.$t('messages.onWagonsTypeSelectRailwayRequestNoForRoute'), this.$t('forms.common.confirm'), {
          confirmButtonText: this.$t('forms.common.yes'),
          cancelButtonText: this.$t('forms.common.no'),
          type: 'warning'
        }).then(() => {
          this.railwayAggregation.wagonsType = affilationGuid
        }).catch(() => {
          this.wagonsTypeModel = this.railwayAggregation.wagonsType
        })
      } else {
        this.railwayAggregation.wagonsType = affilationGuid
      }
    },
    handleStationFromChange(value) {
      this.railwayAggregation.stationFrom = value
      if (value) {
        this.$refs['station-from'].clearValidate()

        this.stationFromIsRouteStation = this.$store.getters['railwayStations/isRouteStation'](value)
        const stationMiddle = this.$store.getters['railwayStations/getMiddleStation'](value)
        this.railwayAggregation.polygonName = stationMiddle.name
        this.railwayAggregation.polygonRWCode = stationMiddle.rwCode
        this.railwayAggregation.polygonNumber = this.$store.getters['railwayStations/getStationPolygon'](value)
      }
    },
    handleStationToChange(value) {
      this.railwayAggregation.stationTo = value
      if (value) {
        this.$refs['station-to'].clearValidate()
      }
    },
    handleConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$nextTick(async () => {
            this.$nuxt.$loading.start()

            let periodFrom = null, periodTo = null
            if (this.railwayAggregation.period != null && this.railwayAggregation.period.length > 0) {
              [ periodFrom, periodTo ] = this.railwayAggregation.period
            }

            const payload = {
              created_at: new Date().pFormatDateTime(),
              period_from: periodFrom.pFormatDate(),
              period_to: periodTo.pFormatDate(),
              station_from_code: this.railwayAggregation.stationFrom,
              station_to_code: this.railwayAggregation.stationTo,
              status_id: 2, // Actual
              company_guid: this.$refs['company-select'].getCompanyGuid(),
              user_guid: this.$store.state.user.guid,
              wagons_in_route: this.railwayAggregation.wagonsInRoute,
              wagons_aggregator: this.railwayAggregation.wagonsAggregator,
              wagons_type: this.railwayAggregation.wagonsType,
              goods_classificator_code: this.railwayAggregation.goods,
              comment: this.railwayAggregation.comment,
              user_phone: this.railwayAggregation.userPhone,
              user_email: this.railwayAggregation.userEmail,
              user_name: this.railwayAggregation.userName,
              loading_rate: this.railwayAggregation.loadingRate,
              station_reference_code: this.railwayAggregation.polygonRWCode,
              station_reference_polygone: this.railwayAggregation.polygonNumber
            }

            if (this.creation) {
              await this.$store.dispatch('railwayAggregations/createAggregation', payload)
            } else {
              await this.$store.dispatch('railwayAggregations/changeAggregation', {
                aggregationGuid: this.railwayAggregation.guid,
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
    init() {
      if (this.creation) {
        if (this.goods.length > 0) {
          this.railwayAggregation.goods = this.goods[0].value
        }

        this.initWagonsType()
      } else {
        this.railwayAggregation = {
          ...getBlankRailwayAggregation(this.$store),
          guid: this.dataIn.guid,
          number: this.dataIn.number || '',
          goods: this.dataIn.goodsGuid || (() => {
            if (this.goods.length > 0) {
            return this.goods[0].value
            }
            return null
          })(),
          stationFrom: this.dataIn.stationFromRWCode || null,
          stationTo: this.dataIn.stationToRWCode || null,
          polygonName: this.dataIn.polygonName || null,
          polygonRWCode: this.dataIn.polygonRWCode || null,
          polygonNumber: this.dataIn.polygonNumber || null,
          wagonsType: this.dataIn.wagonsAffilationId || (() => {
            if (this.railwayAffilations.length > 0) {
              return this.railwayAffilations[0].value
            }
            return null
          })(),
          wagonsInRoute: this.dataIn.wagonsInRoute || 1,
          wagonsAggregator: this.dataIn.wagonsAggregator || 1,
          loadingRate: this.dataIn.loadingRate || 1,
          period: [ (this.dataIn.periodFrom || '').pToDate(), (this.dataIn.periodTo || '').pToDate() ],
          comment: this.dataIn.comment || ''
        }

        this.wagonsTypeModel = this.railwayAggregation.wagonsType

        try {
          this.$refs['station-from-select'].setValue(this.railwayAggregation.stationFrom)
        } catch (e) {
          this.stationFrom = this.railwayAggregation.stationFrom
        }

        try {
          this.$refs['station-to-select'].setValue(this.railwayAggregation.stationTo)
        } catch (e) {
          this.stationTo = this.railwayAggregation.stationTo
        }
      }
    },
    reset() {
      this.railwayAggregation = getBlankRailwayAggregation(this.$store)

      this.initWagonsType()

      if (this.goods.length > 0) {
        this.railwayAggregation.goods = this.goods[0].value
      }

      if (this.railwayAffilations.length > 0) {
        this.railwayAggregation.wagonsType = this.railwayAffilations[0].value
      }

      this.$refs['station-from-select'].reset()
      this.$refs['station-to-select'].reset()
      this.$refs['company-select'].reset()
    },
    async fetchData() {
      const promises = []
      if (!this.$store.state.goods.fetched && !this.loadingGoods) {
        promises.push(this.$store.dispatch('goods/load'))
      }
      if (!this.$store.state.railwayAffilations.fetched && !this.loadingRailwayAffilations) {
        promises.push(this.$store.dispatch('railwayAffilations/loadList'))
      }
      await Promise.all(promises)
    }
  },

  watch: {
    async dialogVisible() {
      if (this.dialogVisible) {
        await this.fetchData()
        this.init()
      } else {
        this.reset()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.RailwayAggregationEditForm__item {
  width: 100%;
}

.RailwayAggregationEditForm__contacts {
  margin-top: 34px;
}

.RailwayAggregationEditForm__contact-input-margin {
  margin-top: 5px;
}

.RailwayAggregationEditForm__footer {
  text-align: center;
}
</style>
