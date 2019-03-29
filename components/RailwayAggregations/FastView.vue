<template>
  <el-dialog
    v-if="guid"
    :visible="visible"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="$emit('close')">


    <Header
      slot="title"
      :title="`${$t('forms.railwayAggregator.title')} №${railwayAggregation.number}`"
      :statusTitle="$t(railwayAggregation.status.localeKey)"
      :statusColor="railwayAggregation.status.color"
      no-back-button
    />

    <div v-loading="loading" class="RailwayAggregationFastView">

      <Group style="margin-top: -10px">
        <Field
          :title="$t('forms.common.stationFrom')"
          big-title
          :value="`${railwayAggregation.stationFromName} (${railwayAggregation.stationFromRWCode})`">
        </Field>
      </Group>

      <Group
        v-if="railwayAggregation.stationReferenceRWCode"
        style="margin-top: -10px"
      >
        <Field
          :title="$t('forms.common.stationMiddle')"
          big-title
          :value="railwayAggregation.stationReferenceName">
        </Field>
      </Group>

      <Group style="margin-top: -10px">
        <Field
          :title="$t('forms.common.stationTo')"
          big-title
          :value="`${railwayAggregation.stationToName} (${railwayAggregation.stationToRWCode})`">
        </Field>
      </Group>

      <Group style="margin-top: -10px">
        <el-row>
          <el-col :xs="24" :md="12">
            <Field
              :title="$t('forms.common.wagons')"
              big-title
              :value="railwayAggregation.wagonsAffilationName"
            />
          </el-col>

          <el-col :xs="24" :md="12">
            <Field
              :title="$t('forms.common.goods')"
              big-title
              :value="railwayAggregation.goodsName"
            />
          </el-col>
        </el-row>
      </Group>

      <Group style="margin-top: -10px">
        <el-row>
          <el-col :xs="24" :md="12">
            <Field
              :title="$t('forms.common.shipmentPeriod')"
              big-title
              :value="period"/>
          </el-col>

          <el-col :xs="24" :md="12">
            <Field
              :title="`${$t('forms.common.loadingRate')}, ${$t('forms.common.loadingRatePtc')}`"
              big-title
              :value="railwayAggregation.loadingRate"/>
          </el-col>
        </el-row>
      </Group>

      <Group tyle="margin-top: -10px">
        <div class="RailwayAggregationFastView__statistics">
          <FormFieldStatistics
            :title="$t('forms.railwayAggregator.wagonsInRoute')"
            :value="railwayAggregation.wagonsInRoute"
          />

          <FormFieldStatistics
            class="RailwayAggregationFastView__statistics-item"
            :title="$t('forms.railwayAggregator.wagonsAggregator')"
            :value="railwayAggregation.wagonsAggregator"
          />

          <FormFieldStatistics
            class="RailwayAggregationFastView__statistics-item"
            :title="$t('forms.railwayAggregator.wagonsProposed')"
            :value="wagonsProposed"
          />

          <FormFieldStatistics
            class="RailwayAggregationFastView__statistics-item"
            :title="$t('forms.railwayAggregator.wagonsDeficit')"
            :value="railwayAggregation.wagonsDeficit"
          />
        </div>
      </Group>

      <Group style="margin-top: -10px" v-if="railwayAggregation.comment">
        <el-row>
          <el-col :span="24">
            <Field :title="$t('forms.common.comment')" big-title>
              <FormText :text="railwayAggregation.comment"/>
            </Field>
          </el-col>
        </el-row>
      </Group>

      <Group style="margin-top: 10px">
        <el-row>
          <el-col :xs="24" :md="12">
            <Field
              style="padding-top: 0"
              :title="$t('forms.common.companyInitiator')"
              big-title>
              <Company :name="railwayAggregation.companyName"/>
            </Field>
          </el-col>

          <el-col :xs="24" :md="12">
            <Field
              style="padding-top: 0"
              :title="$t('forms.railwayAggregator.representative')"
              big-title>
              <User
                username-only
                :username="railwayAggregation.userFullname"
              />
            </Field>
          </el-col>
        </el-row>
      </Group>

      <div class="RailwayAggregationFastView__button-wrapper">
        <nuxt-link :to="$i18n.path(`workspace/railway-aggregations/${guid}`)">
          <Button
            class="RailwayAggregationFastView__button"
            type="primary"
            round>
            {{ $t('forms.common.showMoreInfo') }}
          </Button>
        </nuxt-link>
      </div>

    </div>

  </el-dialog>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import Header from '@/components/Common/FormElements/FormHeader'
import Group from '@/components/Common/FormElements/FormGroup'
import Field from '@/components/Common/FormElements/FormField'
import FormFieldStatistics from '@/components/Common/FormElements/FormFieldStatistics'
import FormText from '@/components/Common/FormElements/FormText'
import Company from '@/components/Companies/Company'
import User from '@/components/Users/User'

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice"

export default {
  name: 'th-railway-aggregation-fast-view',

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    Header,
    Group,
    Field,
    FormFieldStatistics,
    FormText,
    Company,
    User,
    Button
  },

  props: {
    visible: Boolean,
    guid: {
      type: [ String, Number ],
      defalt: null
    }
  },

  computed: {
    railwayAggregation() {
      return this.$store.state.railwayAggregations.item
    },
    loading() {
      return this.$store.state.railwayAggregations.loading
    },
    period() {
      let period = this.railwayAggregation.periodTo
      if (this.railwayAggregation.periodFrom && this.railwayAggregation.periodTo) {
        period = `${this.railwayAggregation.periodFrom} - ${this.railwayAggregation.periodTo}`
      } else if (this.railwayAggregation.periodFrom && !this.railwayAggregation.periodTo) {
        period = this.railwayAggregation.periodFrom
      }
      return period
    },
    wagonsProposed() {
      const { wagonsInRoute, wagonsAggregator, wagonsDeficit } = this.railwayAggregation
      return wagonsInRoute - wagonsAggregator - wagonsDeficit
    }
  },

  methods: {
    fetch() {
      this.$store.dispatch('railwayAggregations/loadElement', this.guid)
    }
  },

  created() {
    this.fetch()
  },

  watch: {
    guid() {
      this.fetch()
    }
  }
}
</script>

<style lang='scss' scoped>
.RailwayAggregationFastView {
  &__statistics {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;

    &-item {
      margin-left: 45px;
    }
  }

  &__button-wrapper {
    margin-top: 30px;
    text-align: center;

    &__button {
      display: flex;
      margin: auto;
    }
  }
}

@media only screen and (max-width: 991px) {
  .RailwayAggregationFastView {
    &__statistics {
      flex-direction: column;

      &-item {
        margin-left: 0;
      }
    }
  }
}
</style>
