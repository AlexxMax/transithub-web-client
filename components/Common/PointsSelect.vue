<template>
  <el-dialog
    :title="$t('lists.filters.points')"
    :visible="visible"
    @close="close">
    <el-button type="primary" size="mini" @click="select">{{ $t('lists.select') }}</el-button>
    <el-button size="mini" @click="reset">{{ $t('lists.reset') }}</el-button>
    <el-input
      class="th-tree-input-wrapper"
      size="mini"
      :placeholder="$t('lists.filters.pointsInput')"
      v-model="filterText">
    </el-input>
    <el-tree
      class="th-tree-wrapper"
      :props="defaultProps"
      show-checkbox
      lazy
      :load="loadTree"
      :filter-node-method="filterNode"
      node-key="id"
      highlight-current
      expand-on-click-node
      ref="tree">
    </el-tree>
  </el-dialog>
</template>

<script>
import _find from 'lodash.find'

import API from '@/utils/api'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label',
        kind: 'kind',
        countryCode: 'countryCode',
        regionCode: 'regionCode',
        districtCode: 'districtCode',
        isLeaf: 'leaf'
      },

      filterText: ''
    }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    async load(kind, countryCode = null, regionCode = null, districtCode = null) {
      return await API.points.getPoints(null, null, kind, countryCode, regionCode, districtCode, this)
    },
    async loadTree(node, resolve) {
      let { kind, countryCode, regionCode, districtCode } = node.data || { kind: 1 }

      if (kind === 3) {
        resolve([])
        return
      }

      if (kind === 1) {
        kind = 2
      } else if (kind === 2) {
        kind = 4
      } else if (kind === 4) {
        kind = 3
      }

      const { status, items } = await this.load(kind, countryCode, regionCode, districtCode)
      if (status) {
        const points = []
        for (const {
          guid,
          nameUa,
          nameRu,
          kind,
          countryCode,
          regionCode,
          districtCode,
          descriptionUa,
          descriptionRu,
          koatuu,
          lat,
          lng,
          localityTypeUa,
          localityTypeRu
        } of items) {
          points.push({
            id: guid,
            label: this.$store.state.locale === 'ua' ? nameUa : nameRu,
            kind,
            countryCode,
            regionCode,
            districtCode,
            descriptionUa,
            descriptionRu,
            koatuu,
            lat,
            lng,
            localityTypeUa,
            localityTypeRu,
            leaf: kind === 3
          })
        }
        resolve(points)
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // async getCheckedPoints() {
    //   let points = []
    //   const nodes = this.$refs.tree.getCheckedNodes()
    //   await this.getCheckedPointsRecursive(points, nodes)
    //   return points
    // },
    // async getCheckedPointsRecursive(points, items) {
    //   for (const item of items) {
    //     let handleItem = false
    //     if (item.id) {
    //       if (!_find(points, { 'id': item.id })) {
    //         handleItem = true
    //         points.push(item)
    //         console.log(item);
    //       }
    //     } else {
    //       if (!_find(points, { 'id': item.guid })) {
    //         handleItem = true
    //         points.push({
    //           id: item.guid,
    //           label: this.$store.state.locale === 'ua' ? item.nameUa : item.nameRu,
    //           kind: item.kind,
    //           countryCode: item.countryCode,
    //           regionCode: item.regionCode,
    //           districtCode: item.districtCode,
    //           descriptionUa: item.descriptionUa,
    //           descriptionRu: item.descriptionRu,
    //           koatuu: item.koatuu,
    //           lat: item.lat,
    //           lng: item.lng,
    //           localityTypeUa: item.localityTypeUa,
    //           localityTypeRu: item.localityTypeRu,
    //           leaf: item.kind === 3
    //         })
    //         console.log(item);
    //       }
    //     }

    //     if (handleItem) {
    //       let { kind, countryCode, regionCode, districtCode } = item

    //       if (kind === 3) {
    //         continue
    //       }

    //       if (kind === 1) {
    //         kind = 2
    //       } else if (kind === 2) {
    //         kind = 4
    //       } else if (kind === 4) {
    //         kind = 3
    //       }

    //       const { status, items: children } = await this.load(kind, countryCode, regionCode, districtCode)
    //       if (status) {
    //         await this.getCheckedPointsRecursive(points, children)
    //       }
    //     }
    //   }
    // },
    select() {
      // const points = await this.getCheckedPoints()
      this.$emit('select', this.$refs.tree.getCheckedNodes())
    },
    reset() {
      this.$refs.tree.setCheckedKeys([])
    },
    close() {
      this.$emit('select', this.$refs.tree.getCheckedNodes())
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.th-tree-wrapper {
  margin: 10px 0;
}

.th-tree-input-wrapper {
  margin-top: 10px;
}
</style>
