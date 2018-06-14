<template>
  <th-form>
    <template slot="header">
      <h3>{{ request.date }}</h3>
    </template>

    <template slot="content">
      <el-form :model="request" label-position="top" label-width="100px" size="mini">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Номер">
              <el-input v-model="request.number"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Перевізник">
              <el-input v-model="request.carrier_name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Дата">
              <el-input v-model="request.date"></el-input>
            </el-form-item>
          </el-col>

          <!-- ? !-->
          <el-col :span="12">
            <el-form-item label="Автор">
              <el-input v-model="request.logist_name"></el-input>
            </el-form-item>
          </el-col>

          <!-- ? !-->
          <el-col :span="12">
            <el-form-item label="Замовник">
              <el-input v-model="request.client_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </th-form>
</template>

<script>
import CommonForm from "@/components/Common/Form";

import { onFormCreated } from "@/utils/formsCommonMethods";

export default {
  components: {
    "th-form": CommonForm
  },

  data() {
    return {
      request: {}
    };
  },

  async created() {
    await this.fetchData();
    onFormCreated();
  },

  methods: {
    fetchData: async function() {
      const request = await this.$store.dispatch(
        "requests/loadElement",
        this.$route.params.guid
      );
      this.request = { ...request };
    }
  }
};
</script>

<style lang="scss" scoped>
.el-tabs {
  margin-top: 30px;
}
</style>
