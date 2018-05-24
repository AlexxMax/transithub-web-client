<template>
  <th-form>
    <template slot="header">
      <h3>{{ order.title }}</h3>
    </template>

    <template slot="content">
      <el-form label-position="top" label-width="100px" :model="order" size="mini">
        <el-form-item label="Client">
          <el-input v-model="order.client"></el-input>
        </el-form-item>

        <el-form-item label="Goods">
          <el-input v-model="order.goods_name"></el-input>
        </el-form-item>
      </el-form>
    </template>
  </th-form>
</template>

<script>
import CommonForm from '@/components/Common/Form'

export default {
  components: {
    "th-form": CommonForm
  },

  data() {
    const order = this.$store.state.orders.list.find(elem => elem.guid === this.$route.params.guid)
    return {
      order: {
        ...order
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
