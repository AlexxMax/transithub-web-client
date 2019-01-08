<template>
  <el-dialog
    v-if="guid"
    :visible="visible"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="$emit('close')">

    <Header
      slot="title"
      :title="`${$t('forms.race.title')} №${race.number}`"
      :statusTitle="$t(race.status.localeKey)"
      :statusColor="race.status.color"
      no-back-button>

      <div class="RaceFastView__header-subtitle">
        <div>{{ `${$t('forms.race.date')}: ${race.date}` }}</div>
        <div>
          {{ `${$t('forms.race.lastEvent')}: ${race.lastEvent} - ${race.lastEventDate}` }}
        </div>
      </div>

    </Header>

    <Group style="margin-top: -20px" :title="$t('forms.common.driverGroup')">
      <el-row :gutter="20">
        <el-col :xs="24" :md="8">
          <Field
            :title="$t('forms.common.personCred')"
            :value="race.driverFullname"/>
        </el-col>

        <el-col :xs="24" :md="8">
          <Field
            :title="$t('forms.common.driverCert')"
            :value="race.driverCert"/>
        </el-col>

        <el-col :xs="24" :md="8">
          <ContactInfo
            class="RaceFastView__contact-info"
            :value="race.phone"
            type="phone"/>
        </el-col>
      </el-row>
    </Group>

    <Group :title="$t('forms.common.vehicleGroup')">
      <el-row :gutter="20">
        <el-col :xs="24" :md="8">
          <Field
            :title="$t('forms.common.vehicleNumber')"
            :value="race.vehicleNumber"/>
        </el-col>

        <el-col :xs="24" :md="16">
          <Field
            :title="$t('forms.common.vehicleTechPass')"
            :value="race.vehicleBrand"/>
        </el-col>
      </el-row>
    </Group>

    <Group :title="$t('forms.common.trailerGroup')">
      <el-row :gutter="20">
        <el-col :xs="24" :md="8">
          <Field
            :title="$t('forms.common.vehicleNumber')"
            :value="race.trailerNumber"/>
        </el-col>

        <el-col :xs="24" :md="16">
          <Field
            :title="$t('forms.common.vehicleTechPass')"
            :value="race.trailerBrand"/>
        </el-col>
      </el-row>
    </Group>

    <Group :title="$t('forms.common.goods')">
      <el-row :gutter="20">
        <el-col :xs="24" :md="8">
          <Field
            :title="$t('forms.common.goods')"
            :value="race.goodsName"/>
        </el-col>

        <el-col :xs="24" :md="16">
          <Field
            :title="$t('forms.race.quantityT')"
            :value="race.quantity"/>
        </el-col>
      </el-row>
    </Group>

    <Group :title="$t('forms.common.points')">
      <Point
        :name="race.pointFromName"
        :koatuu="race.pointFromKoatuu"
        :label="$t('forms.common.pointFrom')"/>

      <Point
        :name="race.pointToName"
        :koatuu="race.pointToKoatuu"
        :label="$t('forms.common.pointTo')"/>
    </Group>

    <Group :title="$t('forms.common.route')">
      <Map
        koatuu
        :pointFromKoatuu="race.pointFromKoatuu"
        :pointToKoatuu="race.pointToKoatuu"/>
    </Group>

    <div class="RaceFastView__button-wrapper">
      <nuxt-link :to="$i18n.path(`workspace/races/${guid}`)">
        <Button
          class="RaceFastView__button"
          type="primary">
          {{ $t('forms.common.showMoreInfo') }}
        </Button>
      </nuxt-link>
    </div>

  </el-dialog>
</template>

<script>
import Header from "@/components/Common/FormElements/FormHeader";
import Group from "@/components/Common/FormElements/FormGroup";
import Field from "@/components/Common/FormElements/FormField";
import ContactInfo from "@/components/Common/ContactInfo";
import Button from "@/components/Common/Buttons/Button";
import Point from '@/components/Common/Point'
import Map from '@/components/Common/Map'

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";

export default {
  name: "th-race-fast-view",

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    Header,
    Group,
    Field,
    ContactInfo,
    Button,
    Point,
    Map
  },

  props: {
    visible: Boolean,
    guid: {
      type: String,
      default: null
    },
    subordinate: Boolean,
    requestGuid: String,
    vehicleRegisterGuid: String
  },

  data() {
    return {
      race: {}
    };
  },

  watch: {
    guid: {
      handler: function() {
        if (this.subordinate) {
          this.race = this.$store.getters["races/getRaceFromSubordinateList"]({
            race: this.guid,
            request: this.requestGuid,
            vehicleRegister: this.vehicleRegisterGuid
          })
        } else {
          this.race = this.$store.getters["races/getRaceFromList"](this.guid)
        }
      },
      // immediate: true
    }
  }
};
</script>


<style lang="scss" scoped>
.RaceFastView__header-subtitle {
  margin-top: 8px;
  color: #909399;
}

.RaceFastView__contact-info {
  margin-top: 30px;
}

.RaceFastView__button-wrapper {
  margin-top: 20px;

  .RaceFastView__button {
    display: flex;
    margin: auto;
  }
}

@media only screen and (max-width: 991px) {
  .RaceFastView__contact-info {
    margin-top: 10px;
  }
}
</style>
