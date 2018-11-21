<template>
  <treeselect
    v-loading="loading"
    :options="options"
    disable-branch-nodes
    show-count
    :placeholder="placeholder"
    v-model="value"
    @input="handleChange"/>
</template>

<script>
import Treeselect, { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'

import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'th-railway-station-select',

  components: {
    Treeselect
  },

  props: {
    placeholder: String,
    initValue: [ Number, String ],
    noFetch: Boolean
  },

  data() {
    return {
      value: null
    }
  },

  computed: {
    loading() {
      return this.$store.state.railwayStations.loading
    },
    options() {
      return this.$store.getters['railwayStations/getTreeSelectStations']
    }
  },

  methods: {
    // async fetchRoads() {
    //   if (!this.$store.state.railwayStations.roadsFetched) {
    //     await this.$store.dispatch('railwayStations/loadRoads')
    //   }

    //   this.options = this.$store.state.railwayStations.roads.map(({ guid, road }) => ({
    //     id: guid,
    //     label: road,
    //     children: null
    //   }))
    // },
    async fetchStations() {
      if (!this.$store.state.railwayStations.stationsFetched && !this.noFetch && !this.loading) {
        await this.$store.dispatch('railwayStations/loadStations')
      }
    },
    // async loadOptions({ action, parentNode, callback }) {
    //   if (action === LOAD_CHILDREN_OPTIONS) {
    //     if (!this.$store.getters['railwayStations/isRoadStationsFetched'](parentNode.id)) {
    //       await this.$store.dispatch('railwayStations/loadStations', parentNode.id)
    //       const stations = this.$store.getters['railwayStations/getRoadStations'](parentNode.id) || []
    //       parentNode.children = stations.map(item => ({
    //         id: item.guid,
    //         label: item.name,
    //         code: item.rwCode
    //       }))
    //     }

    //     callback()
    //   }
    // }
    reset() {
      this.value = null
    },
    handleChange() {
      this.$emit('change', this.value)
    },
    setValue(value) {
      this.value = value
    }
  },

  async mounted() {
    await this.fetchStations()
    this.value = this.initValue
  }
}
</script>

<style lang="scss">
.vue-treeselect__control {
  height: 14px;
  border: 1px solid rgb(220, 223, 230);
  border-radius: 4px;
}

.vue-treeselect__value-container {
  line-height: 26px;
}

.vue-treeselect__single-value {
  font-size: 12px;
  line-height: 2.2;
  padding-left: 10px;
  color: #606266;
}

.vue-treeselect__placeholder.vue-treeselect-helper-zoom-effect-off {
  font-size: 12px;
  line-height: 2.3;
  padding-left: 10px;
  color: #606266;
}
</style>
