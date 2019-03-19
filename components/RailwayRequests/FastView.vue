<template>
  <el-dialog
    v-if="guid"
    :visible="visible"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="$emit('close')">

    <Header
      slot="title"
      :title="`${$t('forms.railwayRequest.title')} №${railwayRequest.number}`"
      :statusTitle="$t(railwayRequest.status.localeKey)"
      :statusColor="railwayRequest.status.color"
      no-back-button
    />

    <Group style="margin-top: -10px">
      <el-row>
        <el-col :xs="24" :md="12">
          <Field
            :title="$t('forms.common.stationFrom')"
            big-title
            :value="`${railwayRequest.stationFromName} (${railwayRequest.stationFromRWCode})`">
          </Field>
        </el-col>

        <el-col :xs="24" :md="12">
          <Field
            :title="$t('forms.common.stationMiddle')"
            big-title
            :value="railwayRequest.stationReferenceName">
          </Field>
        </el-col>
      </el-row>
    </Group>

    <Group style="margin-top: -10px">
      <el-row>
        <el-col :xs="24" :md="12">
          <Field
            :title="$t('forms.common.wagons')"
            big-title
            :value="railwayRequest.wagonsTypeName"
          />
        </el-col>

        <el-col :xs="24" :md="12">
          <Field
            :title="$t('forms.common.goods')"
            big-title
            :value="railwayRequest.goodsName"
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
            :value="railwayRequest.loadingRate"/>
        </el-col>
      </el-row>
    </Group>

    <Group style="margin-top: -10px">
      <el-row>
        <el-col :xs="24" :md="12">
          <Field
            :title="$t('forms.railwayAggregator.wagonsProposed')"
            big-title
            :value="railwayRequest.wagons"/>
        </el-col>
      </el-row>
    </Group>

    <Group style="margin-top: -10px" v-if="railwayRequest.comment">
      <el-row>
        <el-col :span="24">
          <Field :title="$t('forms.common.comment')" big-title>
            <FormText :text="railwayRequest.comment"/>
          </Field>
        </el-col>
      </el-row>
    </Group>

    <Group style="margin-top: 10px">
      <el-row>
        <el-col :span="24">
          <Field
            style="padding-top: 0"
            :title="$t('forms.common.company')"
            big-title>
            <Company :name="railwayRequest.companyName"/>
          </Field>
        </el-col>
      </el-row>
    </Group>

    <div
      v-if="showMoreButtonVisible"
      class="RailwayRequestFastView__button-wrapper">
      <nuxt-link :to="$i18n.path(`workspace/railway-requests/${guid}`)">
        <Button
          class="RailwayRequestFastView__button"
          type="primary"
          round>
          {{ $t('forms.common.showMoreInfo') }}
        </Button>
      </nuxt-link>
    </div>

  </el-dialog>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import Header from '@/components/Common/FormElements/FormHeader'
import Group from '@/components/Common/FormElements/FormGroup'
import Field from '@/components/Common/FormElements/FormField'
import FormText from '@/components/Common/FormElements/FormText'
import Company from '@/components/Companies/Company'

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice"

export default {
  name: 'th-railway-requests-fast-view',

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    Header,
    Group,
    Field,
    FormText,
    Company,
    Button
  },

  props: {
    visible: Boolean,
    guid: {
      type: [ String, Number ],
      defalt: null
    },
    subordinate: Boolean,
    aggregationGuid: String,
    showMoreButtonVisible: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      railwayRequest: {}
    }
  },

  computed: {
    period() {
      let period = this.railwayRequest.periodTo
      if (this.railwayRequest.periodFrom && this.railwayRequest.periodTo) {
        period = `${this.railwayRequest.periodFrom} - ${this.railwayRequest.periodTo}`
      } else if (this.railwayRequest.periodFrom && !this.railwayRequest.periodTo) {
        period = this.railwayRequest.periodFrom
      }
      return period
    }
  },

  watch: {
    guid() {
      if (this.subordinate) {
        this.railwayRequest = this.$store.getters['railwayRequests/getRailwayRequestFromSubordinateList']({
          aggregation: this.aggregationGuid,
          request: this.guid
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.RailwayRequestFastView__button-wrapper {
  margin-top: 30px;

  .RailwayRequestFastView__button {
    display: flex;
    margin: auto;
  }
}
</style>
