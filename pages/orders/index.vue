<template>
  <div>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="22" :sm="16" :md="16" :lg="12" :xl="8">
        <el-card v-for="(item, index) in orders" v-bind:key="index" class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">Деталі</el-button>
          </div>
          <div>
            <el-form ref="form" label-width="100px" label-position="top" size="mini" :disabled="true">

              <el-form-item label="Вантаж">
                <el-input v-model="item.goods.name"></el-input>
              </el-form-item>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="Власник">
                    <el-input v-model="item.owner"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="Клієнт">
                    <el-input v-model="item.client"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="Пункт завантаження">
                    <el-input v-model="item.point_from.name"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="Пункт розвантаження">
                    <el-input v-model="item.point_to.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="Склад завантаження">
                    <el-input v-model="item.warehouse_from.name"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="Склад розвантаження">
                    <el-input v-model="item.warehouse_to.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    computed: {
      orders: function () {
        return this.$store.state.orders.list.slice()
      },
      fetching: function () {
        return this.$store.state.orders.fetching
      }
    }
  }

</script>

<style scoped>
  .box-card {
    width: 100%;
    margin-bottom: 20px;
  }

</style>
