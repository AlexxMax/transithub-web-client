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
          <el-form-item :label="$t('forms.common.shipmentPeriod')" prop="period">
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
              v-model="goodsModel"
              placeholder="Select"
              @change="handleGoodsChange">
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
              v-model="wagonsTypeModel"
              placeholder="Select"
              @change="handleWagonsTypeChange">
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

      <el-row :gutter="20">
        <el-col :xs="24" :md="12">
          <el-form-item :label="$t('forms.common.representative')" prop="userName">
            <el-input
              type='text'
              v-model="railwayRequest.userName"
              :placeholder="$t('forms.common.representative')">
              <fa class="input-internal-icon" icon="user" slot="prefix" />
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12"
          :class="{ 'RailwayRequestEditForm__contacts': !$_smallDeviceMixin_isDeviceSmall }">
          <el-form-item prop="userEmail">
            <el-input
              :class="{
                'RailwayRequestEditForm__contact-input-margin': !$_smallDeviceMixin_isDeviceSmall,
              }"
              type='email'
              v-model="railwayRequest.userEmail"
              :placeholder="$t('forms.common.email')">
              <fa class="input-internal-icon" icon="envelope" slot="prefix" />
            </el-input>
          </el-form-item>

          <el-form-item prop="userPhone">
            <el-input
              :class="{ 'RailwayRequestEditForm__contact-input-margin': !$_smallDeviceMixin_isDeviceSmall }"
              type='text'
              v-mask="phoneMask"
              v-model="railwayRequest.userPhone"
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
              v-model="railwayRequest.comment">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <div slot="footer" class="RailwayRequestEditForm__footer">
      <div class="RailwayRequestEditForm__footer-cred">
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
import Button from '@/components/Common/Buttons/Button'
import RailwayStationSelect from '@/components/Common/Railway/RailwayStationSelect'
import User from '@/components/Users/User'
import Company from '@/components/Companies/Company'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { VALIDATION_TRIGGER, PHONE_MASK } from '@/utils/constants'

const blankRailwayRequest = store => ({
  guid: null,
  number: '',
  goods: null,
  station: null,
  wagonsType: null,
  wagons: 1,
  period: null,
  comment: '',
  userPhone: store.state.user.phone || '',
  userEmail: store.state.user.email || '',
  userName: store.getters['user/username']
})

export default {
  name: 'th-railway-request-edit-form',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    Button,
    RailwayStationSelect,
    User,
    Company
  },

  props: {
    creation: Boolean,
    parendId: [ Number, String ],
    parentGoods: [ Number, String ],
    parentWagonsType: [ Number, String ],
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
      },
      userName: (rule, value, cb) => {
        if (!this.railwayRequest.userName) {
          return cb(new Error(this.$t('forms.common.validation.representative')))
        }
        cb()
      },
      userPhone: (rule, value, cb) => {
        if (!this.railwayRequest.userPhone) {
          return cb(new Error(this.$t('forms.common.validation.phone')))
        }
        cb()
      },
      userEmail: (rule, value, cb) => {
        if (!this.railwayRequest.userEmail) {
          return cb(new Error(this.$t('forms.common.validation.email')))
        }
        cb()
      }
    }

    return {
      dialogVisible: false,

      railwayRequest: blankRailwayRequest(this.$store),

      goodsModel: null,
      wagonsTypeModel: null,

      station: null,

      phoneMask: PHONE_MASK,

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
        ? this.$t('forms.railwayRequest.createPropositionDialog')
        : `${this.$t('forms.railwayRequest.editPropositionDialog')} №${this.railwayRequest.number}`
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
              comment: this.railwayRequest.comment,
              user_phone: this.railwayRequest.userPhone,
              user_email: this.railwayRequest.userEmail,
              user_name: this.railwayRequest.userName
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
    handleGoodsChange(value) {
      if (this.railwayRequest.goods !== value) {
        this.$confirm(this.$t('messages.onGoodsSelectRailwayRequest'), this.$t('forms.common.confirm'), {
          confirmButtonText: this.$t('forms.common.yes'),
          cancelButtonText: this.$t('forms.common.no'),
          type: 'warning'
        }).then(() => {
          this.railwayRequest.goods = value
        }).catch(() => {
          this.goodsModel = this.railwayRequest.goods
        })
      } else {
        this.railwayRequest.goods = value
      }
    },
    handleWagonsTypeChange(value) {
      if (this.railwayRequest.wagonsType !== value) {
        this.$confirm(this.$t('messages.onWagonsTypeSelectRailwayRequest'), this.$t('forms.common.confirm'), {
          confirmButtonText: this.$t('forms.common.yes'),
          cancelButtonText: this.$t('forms.common.no'),
          type: 'warning'
        }).then(() => {
          this.railwayRequest.wagonsType = value
        }).catch(() => {
          this.wagonsTypeModel = this.railwayRequest.wagonsType
        })
      } else {
        this.railwayRequest.wagonsType = value
      }
    },
    initGoods() {
      this.railwayRequest.goods = this.parentGoods
        ? this.parentGoods
        : (this.goods.length > 0
          ? this.goods[0].value
          : null)
      this.goodsModel = this.railwayRequest.goods
    },
    initWagonsType() {
      this.railwayRequest.wagonsType = this.parentWagonsType
        ? this.parentWagonsType
        : (this.railwayAffilations.length > 0
          ? this.railwayAffilations[0].value
          : null)
      this.wagonsTypeModel = this.railwayRequest.wagonsType
    },
    reset() {
      this.railwayRequest = blankRailwayRequest(this.$store)

      this.initGoods()
      this.initWagonsType()

      this.$refs['station-from'].reset()
    },
    init() {
      if (this.creation) {
        this.initGoods()
        this.initWagonsType()
      } else {
        this.railwayRequest = {
          ...blankRailwayRequest(this.$store),
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
          comment: this.dataIn.comment || '',
          userName: this.dataIn.userFullname,
          userEmail: this.dataIn.userEmail,
          userPhone: this.dataIn.userPhone
        }

        this.goodsModel = this.railwayRequest.goods
        this.wagonsTypeModel = this.railwayRequest.wagonsType

        try {
          this.$refs['station-from'].setValue(this.railwayRequest.station)
        } catch (e) {
          this.station = this.railwayRequest.station
        }
      }
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
.RailwayRequestEditForm__item {
  width: 100%;
}

.RailwayRequestEditForm__footer {
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

.RailwayRequestEditForm__contacts {
  margin-top: 34px;
}

.RailwayRequestEditForm__contact-input-margin {
  margin-top: 5px;
}
</style>
