<template>
  <th-form>
    <template slot="header">
      <h3>{{ order.title }}</h3>
    </template>

    <template slot="content">
      <el-form label-position="top" label-width="100px" :model="order" size="mini">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Client">
              <el-input v-model="order.client"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Goods">
              <el-input v-model="order.goods_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Point from">
              <el-input v-model="order.point_from_description"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Point to">
              <el-input v-model="order.point_to_description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Warehouse from">
              <el-input v-model="order.warehouse_from_fullname"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Warehouse to">
              <el-input v-model="order.warehouse_to_fullname"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-tabs v-model="activeName">
              <el-tab-pane label="Route" name="route">
                <iframe width="100%" height="450" frameborder="0" style="border:0" :src="`https://www.google.com/maps/embed/v1/directions?origin=${this.order.point_from_code}&destination=${this.order.point_to_code}&key=AIzaSyC-NMwliNHhxomPQJaQeu24GPQablR-rDk&language=uk`" allowfullscreen></iframe>
              </el-tab-pane>

              <el-tab-pane label="Schedule" name="schedule">
                <el-table
                  :data="schedule.items"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="Date"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="quantity"
                    label="Quantity"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="description"
                    label="Description">
                  </el-table-column>
                </el-table>
              </el-tab-pane>

            </el-tabs>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </th-form>
</template>

<script>
import CommonForm from "@/components/Common/Form";

export default {
  components: {
    "th-form": CommonForm
  },

  data() {
    return {
      activeName: "route",
      schedule: { items: [], count: 0 },
      order: {}
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData: async function() {
      const order = await this.$store.dispatch(
        "orders/loadElement",
        this.$route.params.guid
      );
      let schedule = { count: 0, items: [] };
      if (order) {
        schedule = order._schedule;
        delete order._schedule;
      }
      this.order = { ...order };
      this.schedule = { ...schedule };
    }
  }
};
</script>

<style lang="scss" scoped>
.el-tabs {
  margin-top: 30px;
}
</style>
