<template>
  <div class="ListItem__wrapper">
    <div class="ListItem">
      <el-row :gutter="10">
        <ItemSegment
          v-for="(d, index) of data"
          :name="d.name"
          :key="index"
          :widthXs="d.widthXs"
          :widthMd="d.widthMd"
          :title="d.title"
          :value="d.value"
          :value-style="d.valueStyle"
          :sub-value="d.subValue"
          :sub-value-style="d.subValueStyle"
          :primary="d.primary"
          :complex="d.complex"
          :menu="d.menu"
          :menu-items="d.menuItems"
          :menu-commands="d.menuCommands"
          :status="d.status"
          @onClick="(colName) => { handleClick(colName, d) }"/>
      </el-row>
    </div>
  </div>
</template>

<script>
import ItemSegment from '@/components/Common/Lists/ItemSegment'

export default {
  name: 'ListItem',

  components: {
    ItemSegment
  },

  props: {
    row: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },

  methods: {
    handleClick(colName, d) {
      this.$emit('onClick', colName, d, this.row)
    }
  }
}
</script>

<style lang="scss" scoped>
.ListItem__wrapper {
  margin: 10px 0;
  padding: 0 5px;

  .ListItem {
    padding: 10px 20px;
    background-color: white;
    border: 1px solid #bebebe1a;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
  }
}
</style>
