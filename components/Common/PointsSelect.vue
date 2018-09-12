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
  name: 'th-point-select',

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

      if (kind === 4) {
        resolve([])
        return
      }

      if (kind === 1) {
        kind = 2
        regionCode = null
        districtCode = null
      } else if (kind === 2) {
        kind = 3
        districtCode = null
      } else if (kind === 3) {
        kind = 4
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
            leaf: kind === 4
          })
        }
        resolve(points)
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // async nodeCheck({ id }) {
      // const node = this.$refs.tree.getNode(id)

      // const getChildNodes = (node) => {
      //   const kind = node.data.kind
      //   if (kind === 1 || kind === 2 || kind === 3) {
      //     node.__proto__.expand.call(node, () => {
      //       for (const childNode of node.childNodes) {
      //         getChildNodes(childNode)
      //       }
      //     })
      //   }
      // }

      // getChildNodes(node)
    // },
    async getCheckedPoints() {
      let points = []
      const nodes = this.$refs.tree.getCheckedNodes()
      await this.getCheckedPointsRecursive(points, nodes)
      return points
    },
    async getCheckedPointsRecursive(points, items) {
      for (const item of items) {
        let { id, kind, countryCode, regionCode, districtCode } = item

        if (kind === 4 && !_find(points, { id })) {
          points.push(item)
        }

        if (kind !== 4) {
          const children = []

          const node = this.$refs.tree.getNode(id)
          if (node.expanded) {
            for (const childNode of node.childNodes) {
              children.push({
                id: childNode.data.id,
                label: childNode.data.label,
                kind: childNode.data.kind,
                countryCode: childNode.data.countryCode,
                regionCode: childNode.data.regionCode,
                districtCode: childNode.data.districtCode
              })
            }
            await this.getCheckedPointsRecursive(points, children)
          } else {
            if (kind === 1) {
              kind = 2
              regionCode = null
              districtCode = null
            } else if (kind === 2) {
              kind = 3
              districtCode = null
            } else if (kind === 3) {
              kind = 4
            }

            const { status, items: loadedItems } = await this.load(kind, countryCode, regionCode, districtCode)
            if (status) {
              for (const loadedItem of loadedItems) {
                children.push({
                  id: loadedItem.guid,
                  label: this.$store.state.locale === 'ua' ? loadedItem.nameUa : loadedItem.nameRu,
                  kind: loadedItem.kind,
                  countryCode: loadedItem.countryCode,
                  regionCode: loadedItem.regionCode,
                  districtCode: loadedItem.districtCode
                })
              }
              await this.getCheckedPointsRecursive(points, children)
            }
          }
        }
      }
    },
    async select() {
      const points = await this.getCheckedPoints()
      this.$emit('select', points)
      // this.$emit('select', this.$refs.tree.getCheckedNodes())
    },
    reset() {
      this.$refs.tree.setCheckedKeys([])
      this.$emit('select', this.$refs.tree.getCheckedNodes())
    },
    close() {
      // this.$emit('select', this.$refs.tree.getCheckedNodes())
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
