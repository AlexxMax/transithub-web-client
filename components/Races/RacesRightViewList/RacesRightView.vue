<template>
  <div>
    <RightView
      :loading="loading"
      :title="title"
      :visible="visible"
      width="70%"
      @close="hide()"
    >

      <SlideRight>
        <ViewList :request="request" />
      </SlideRight>

    </RightView>
  </div>
</template>

<script>
import RightView from '@/components/Common/RightView'
import SlideRight from '@/components/Common/Transitions/SlideRight'
import ViewList from '@/components/Races/RacesRightViewList/RacesRightViewList'

export default {
  name: 'th-races-form',

  components: {
    RightView,
    SlideRight,
    ViewList
  },

  props: {
    request: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    visible: false,
    loading: false,
    requestGuid: String
  }),

  computed: {
    title() {
      return this.$t('forms.request.titleDateNumber').replace('%1', this.request.number).replace('%2', this.request.scheduleDate)
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

      await this.$store.dispatch('races/fetchSubordinateRaces', {
        requestGuid: this.request.guid
      })

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
