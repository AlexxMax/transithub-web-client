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
      no-back-button/>

    <Group style="margin-top: -30px">
      <el-row :gutter="20">

        <el-col :xs="24" :md="12">
          <Field
            :title="$t('forms.common.period')"
            :value="period"/>
        </el-col>

        <el-col :xs="24" :md="12">
          <Field
            :title="$t('forms.common.goods')"
            :value="railwayRequest.goodsName"/>
        </el-col>

      </el-row>
    </Group>

    <Group style="margin-top: -10px">
      <el-row>
        <el-col :span="24">
          <Field
            :title="$t('forms.common.stationFrom')">
            <RailwayStation
              :name="railwayRequest.stationFromName"
              :road="railwayRequest.stationFromRoad"
              :rwCode="railwayRequest.stationFromRWCode"/>
          </Field>
        </el-col>
      </el-row>
    </Group>

    <Group style="margin-top: -10px">
      <el-row>
        <el-col :xs="24" :md="12">
          <Field
            :title="$t('forms.railwayRequest.wagonsType')"
            :value="railwayRequest.wagonsTypeName"/>
        </el-col>

        <el-col :xs="24" :md="12">
          <Field
            :title="$t('forms.railwayRequest.wagons')"
            :value="railwayRequest.wagons"/>
        </el-col>
      </el-row>
    </Group>

    <Group style="margin-top: -10px">
      <el-row>
        <el-col :xs="24" :md="12">
          <Field
            style="padding-top: 0"
            :title="$t('forms.common.company')">
            <Company
              :name="railwayRequest.companyName"
              :email="railwayRequest.companyEmail"
              :phone="railwayRequest.companyPhone"/>
          </Field>
        </el-col>

        <el-col :xs="24" :md="12">
          <Field
            style="padding-top: 0"
            :title="$t('forms.common.representative')">
            <User
              :username="railwayRequest.userFullname"
              :email="railwayRequest.userEmail"
              :phone="railwayRequest.userPhone"/>
          </Field>
        </el-col>
      </el-row>
    </Group>

    <Group style="margin-top: 0">
      <Field :title="$t('forms.common.comment')">
        <FormText :text="railwayRequest.comment"/>
      </Field>
    </Group>

    <div class="RailwayRequestFastView__button-wrapper">
      <nuxt-link :to="this.$i18n.path(`workspace/railway-requests/${guid}`)">
        <Button
          class="RailwayRequestFastView__button"
          type="primary">
          {{ $t('forms.common.showMoreInfo') }}
        </Button>
      </nuxt-link>
    </div>

  </el-dialog>
</template>

<script>
import Header from '@/components/Common/FormElements/FormHeader'
import Button from '@/components/Common/Buttons/Button'
import Group from '@/components/Common/FormElements/FormGroup'
import Field from '@/components/Common/FormElements/FormField'
import FormText from '@/components/Common/FormElements/FormText'
import RailwayStation from '@/components/Common/Railway/RailwayStation'
import Company from '@/components/Companies/Company'
import User from '@/components/Users/User'

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice"

export default {
  name: 'th-railway-requests-fast-view',

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    Header,
    Group,
    Field,
    FormText,
    RailwayStation,
    Company,
    User,
    Button
  },

  props: {
    visible: Boolean,
    guid: {
      type: [ String, Number ],
      defalt: null
    },
    subordinate: Boolean,
    aggregationGuid: String
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
  margin-top: 20px;

  .RailwayRequestFastView__button {
    display: flex;
    margin: auto;
  }
}
</style>
