<template>
  <div>
    <RightView
      :loading="loading"
      :title="title"
      :visible="visible"
      width="64%"
      @close="hide()"
    >
      <div>
        <SlideRight>
          <ListView :company-guid="company.guid" />
        </SlideRight>
      </div>
    </RightView>
  </div>
</template>

<script>
import RightView from '@/components/Common/RightView'
import SlideRight from '@/components/Common/Transitions/SlideRight'
import ListView from '@/components/Organisations/OrganisationsFormListView'

import { ACTIONS_KEYS, STORE_MODULE_NAME } from '@/utils/organisations'

export default {
  name: 'th-organisations-form',

  components: {
    RightView,
    SlideRight,
    ListView,
  },

  props: {
    company: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    visible: false,
    loading: false,
  }),

  computed: {
    title() {
      return this.$t('forms.common.titleCompany').replace('%1', this.company.name)
    }
  },

  methods:{
    show() {
      this.visible = true
    },

    hide() {
      this.visible = false
    },

    init() {
      this.loading = false
    },

    async fetch() {
      this.loading = true

      await this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_SUBORDINATE_LIST}`, this.company.guid)

      this.loading = false
    }
  },

  watch: {
    async visible() {
      if (this.visible) {
        this.init()
        await this.fetch()
      }
    }
  }
}

</script>

<style lang='scss' scoped>
.VehiclesRegistersGenerationForm {
  &__left-view {
    margin-left: -25px;
  }

  &__footer {
    text-align: center;
  }
}
</style>
