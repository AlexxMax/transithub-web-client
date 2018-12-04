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
        <el-col :xs="24" :sm="24" :md="8">
          <el-form-item
            v-loading="loadingRailwayAffilations"
            :label="$t('forms.railwayAggregator.wagonsType')">
            <el-select
              class="RailwayAggregationEditForm__item"
              v-model="railwayAggregation.wagonsType"
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

        <el-col :xs="12" :sm="12" :md="8">
          <el-form-item :label="$t('forms.railwayAggregator.wagonsInRoute')">
            <el-input-number
              class="RailwayAggregationEditForm__item"
              v-model="railwayAggregation.wagonsInRoute"
              :min="1"/>
          </el-form-item>
        </el-col>

        <el-col :xs="12" :sm="12" :md="8">
          <el-form-item :label="$t('forms.railwayAggregator.wagonsAggregator')">
            <el-input-number
              class="RailwayAggregationEditForm__item"
              v-model="railwayAggregation.wagonsAggregator"
              :min="1"/>
          </el-form-item>
        </el-col>
      </el-row>

      <div style="margin-top: 10px"></div>

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

    </el-form>

    <div slot="footer" class="RailwayAggregationEditForm__footer">
      <div class="RailwayAggregationEditForm__footer-cred">
        <Company
          :name="$store.state.companies.currentCompany.name"
          :avatar-size="30"
          avatar-only
        />

        <User
          :username="username"
          :avatar-size="30"
          avatar-only
        />
      </div>

      <Button type="primary" @click="handleConfirm">{{ buttonTitle }}</Button>

      <span style="width: 70px"></span>
    </div>

  </el-dialog>
</template>

<script>
import RailwayStationSelect from '@/components/Common/Railway/RailwayStationSelect'
import User from '@/components/Users/User'
import Company from '@/components/Companies/Company'
import Button from '@/components/Common/Buttons/Button'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { VALIDATION_TRIGGER, PHONE_MASK } from '@/utils/constants'

const getBlankRailwayAggregation = store => ({
  period: null,
  stationFrom: null,
  stationTo: null,
  goods: null,
  wagonsType: null,
  wagonsInRoute: 1,
  wagonsAggregator: 1,
  comment: '',
  userPhone: store.state.user.phone || '',
  userEmail: store.state.user.email || '',
  userName: store.getters['user/username']
})

export default {
  name: 'th-railway-aggregation-edit-form',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    RailwayStationSelect,
    User,
    Company,
    Button
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
      stationTo: null,

      phoneMask: PHONE_MASK,

      pickerOptions: {
        firstDayOfWeek: 1
      },

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
    username() {
      const { firstname, lastname } = this.$store.state.user
      return `${firstname} ${lastname}`
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
    },
    loadingGoods() {
      return this.$store.state.goods.loading
    },
    loadingRailwayAffilations() {
      return this.$store.state.railwayAffilations.loading
    }
  },

  methods: {
    show() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleStationFromChange(value) {
      this.railwayAggregation.stationFrom = value
      if (value) {
        this.$refs['station-from'].clearValidate()
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
              company_guid: this.$store.state.companies.currentCompany.guid,
              user_guid: this.$store.state.user.guid,
              wagons_in_route: this.railwayAggregation.wagonsInRoute,
              wagons_aggregator: this.railwayAggregation.wagonsAggregator,
              wagons_type: this.railwayAggregation.wagonsType,
              goods_classificator_code: this.railwayAggregation.goods,
              comment: this.railwayAggregation.comment,
              user_phone: this.railwayAggregation.userPhone,
              user_email: this.railwayAggregation.userEmail,
              user_name: this.railwayAggregation.userName
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

        if (this.railwayAffilations.length > 0) {
          this.railwayAggregation.wagonsType = this.railwayAffilations[0].value
        }
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
          wagonsType: this.dataIn.wagonsAffilationId || (() => {
            if (this.railwayAffilations.length > 0) {
              return this.railwayAffilations[0].value
            }
            return null
          })(),
          wagonsInRoute: this.dataIn.wagonsInRoute || 1,
          wagonsAggregator: this.dataIn.wagonsAggregator || 1,
          period: [ (this.dataIn.periodFrom || '').pToDate(), (this.dataIn.periodTo || '').pToDate() ],
          comment: this.dataIn.comment || ''
        }

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

      if (this.goods.length > 0) {
        this.railwayAggregation.goods = this.goods[0].value
      }

      if (this.railwayAffilations.length > 0) {
        this.railwayAggregation.wagonsType = this.railwayAffilations[0].value
      }

      this.$refs['station-from-select'].reset()
      this.$refs['station-to-select'].reset()
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &-cred {
    display: flex;
    flex-direction: row;
    margin-left: 10px;
  }
}
</style>
